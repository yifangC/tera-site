import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { parseDocument } from 'yaml';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import { contentUrl, schemas, siteSchema, type Collection, type Entry, type Site } from './schemas';
import type { z } from 'zod';

export class ContentError extends Error {}

function parseYaml(source: string, filename: string): unknown {
  const doc = parseDocument(source, { uniqueKeys: true });
  if (doc.errors.length)
    throw new ContentError(`${filename}: ${doc.errors.map((error) => error.message).join('; ')}`);
  return doc.toJS({ maxAliasCount: 0 });
}

function validate<T>(schema: z.ZodType<T>, value: unknown, filename: string): T {
  const result = schema.safeParse(value);
  if (!result.success)
    throw new ContentError(
      result.error.issues
        .map((issue) => `${filename}: ${issue.path.join('.') || 'metadata'}: ${issue.message}`)
        .join('\n'),
    );
  return result.data;
}

const markdownParser = unified().use(remarkParse).use(remarkGfm);
type Node = { type: string; url?: string; children?: Node[] };

function walk(node: Node, visit: (node: Node) => void) {
  visit(node);
  node.children?.forEach((child) => walk(child, visit));
}

export async function checkLink(href: string, filename: string, root: string): Promise<void> {
  validate(contentUrl, href, filename);
  if (!href.startsWith('/') || href.startsWith('//')) return;
  let pathname: string;
  try {
    pathname = decodeURIComponent(href.split(/[?#]/)[0]);
  } catch {
    throw new ContentError(`${filename}: invalid URL encoding: ${href}`);
  }
  if (pathname.split('/').includes('..') || pathname.includes('\\'))
    throw new ContentError(`${filename}: invalid local path: ${href}`);
  if (pathname === '/' || pathname === '/cv') return;
  if (pathname.startsWith('/static/')) {
    const asset = await stat(path.join(root, 'public', pathname)).catch(() => null);
    if (!asset?.isFile()) throw new ContentError(`${filename}: missing asset ${href}`);
    return;
  }
  const route = path.join(root, 'app', pathname);
  const hasPage = (
    await Promise.all(
      ['page.tsx', 'page.js', 'page.ts', 'page.jsx'].map((name) =>
        stat(path.join(route, name)).catch(() => null),
      ),
    )
  ).some((file) => file?.isFile());
  if (!hasPage) throw new ContentError(`${filename}: unknown route ${href}`);
}

export async function readEntry<K extends Collection>(
  collection: K,
  filename: string,
  root = process.cwd(),
): Promise<Entry<K>> {
  const relative = `content/${collection}/${filename}`;
  const id = filename.replace(/\.md$/, '');
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id))
    throw new ContentError(`${relative}: use a lowercase-hyphenated filename`);
  const source = (await readFile(path.join(root, relative), 'utf8')).replace(/\r\n/g, '\n');
  const parts = /^---\n([\s\S]*?)\n---(?:\n|$)([\s\S]*)$/.exec(source);
  if (!parts)
    throw new ContentError(`${relative}: start the file with YAML frontmatter between --- lines`);
  const data = validate(
    schemas[collection] as z.ZodType,
    parseYaml(parts[1], relative),
    relative,
  ) as Entry<K>['data'];
  const body = parts[2].trim();
  if ((collection === 'news' || (collection === 'pages' && id === 'about')) && !body)
    throw new ContentError(`${relative}: Markdown body cannot be empty`);
  if ('end' in data && data.end && 'start' in data) {
    const precision = Math.min(data.start.length, data.end.length);
    if (data.end.slice(0, precision) < data.start.slice(0, precision))
      throw new ContentError(`${relative}: end must not precede start`);
  }
  const links: string[] = [];
  walk(markdownParser.parse(body), (node) => {
    if (node.type === 'html')
      throw new ContentError(
        `${relative}: use plain Markdown; HTML and JSX components are not supported`,
      );
    if (node.url) links.push(node.url);
  });
  await Promise.all(links.map((href) => checkLink(href, relative, root)));
  return { id, body, data };
}

export async function readCollection<K extends Collection>(
  collection: K,
  root = process.cwd(),
): Promise<Entry<K>[]> {
  const names = await readdir(path.join(root, 'content', collection));
  const unsupported = names.filter((name) => !name.startsWith('.') && !name.endsWith('.md'));
  if (unsupported.length)
    throw new ContentError(`content/${collection}: unsupported files: ${unsupported.join(', ')}`);
  return Promise.all(
    names
      .filter((name) => name.endsWith('.md'))
      .sort()
      .map((name) => readEntry(collection, name, root)),
  );
}

export async function readSite(root = process.cwd()): Promise<Site> {
  const filename = 'content/site.yaml';
  return validate(
    siteSchema,
    parseYaml(await readFile(path.join(root, filename), 'utf8'), filename),
    filename,
  );
}

export async function validateContent(root = process.cwd()) {
  const [site, entries] = await Promise.all([
    readSite(root),
    Promise.all(Object.keys(schemas).map((name) => readCollection(name as Collection, root))),
  ]);
  const collections = Object.fromEntries(
    Object.keys(schemas).map((key, index) => [key, entries[index]]),
  ) as { [K in Collection]: Entry<K>[] };
  await Promise.all(
    [
      site.portrait.src,
      ...(site.cv ? [site.cv.src] : []),
      ...site.navigation.map((link) => link.href),
      ...site.socials.map((link) => link.href),
    ].map((href) => checkLink(href, 'content/site.yaml', root)),
  );
  for (const entry of collections.publications)
    await Promise.all(
      entry.data.links.map((link) =>
        checkLink(link.href, `content/publications/${entry.id}.md: links`, root),
      ),
    );
  for (const collection of ['experience', 'education'] as const)
    await Promise.all(
      collections[collection].map((entry) =>
        checkLink(entry.data.logo, `content/${collection}/${entry.id}.md: logo`, root),
      ),
    );
  for (const entry of collections.presentations) {
    if (
      entry.data.publication &&
      !collections.publications.some((publication) => publication.id === entry.data.publication)
    )
      throw new ContentError(
        `content/presentations/${entry.id}.md: unknown publication ${entry.data.publication}`,
      );
  }
  for (const entry of collections.pages) {
    if (!entry.data.draft) await checkLink(`/${entry.id}`, `content/pages/${entry.id}.md`, root);
  }
  for (const link of site.navigation) {
    if (
      link.visible &&
      collections.pages.some((page) => `/${page.id}` === link.href && page.data.draft)
    )
      throw new ContentError(`content/site.yaml: hide navigation for draft page ${link.href}`);
  }
  if (!site.cv && site.navigation.some((link) => link.visible && link.href === '/cv'))
    throw new ContentError('content/site.yaml: hide CV navigation until a CV is configured');
  const labels = site.navigation.map((item) => item.label);
  if (new Set(labels).size !== labels.length)
    throw new ContentError('content/site.yaml: navigation labels must be unique');
  for (const required of ['about', 'publications', 'experiences', 'notes', 'visualizations']) {
    if (!collections.pages.some((entry) => entry.id === required))
      throw new ContentError(`content/pages/${required}.md: required page is missing`);
  }
  return { site, collections };
}
