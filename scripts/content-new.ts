import { readFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { schemas } from '../lib/content/schemas';

async function main() {
  const [collection, requestedSlug] = process.argv.slice(2);
  if (!Object.hasOwn(schemas, collection ?? ''))
    throw new Error(`Usage: npm run content:new -- <${Object.keys(schemas).join('|')}> [slug]`);
  const date = new Date().toISOString().slice(0, 10);
  const slug = requestedSlug ?? `new-${collection}-${date}`;
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error('Use a lowercase-hyphenated slug.');
  const template = await readFile(
    path.join(process.cwd(), 'templates', `${collection}.md`),
    'utf8',
  );
  const destination = path.join('content', collection, `${slug}.md`);
  await mkdir(path.dirname(destination), { recursive: true });
  await writeFile(
    destination,
    template.replaceAll('{{DATE}}', date).replaceAll('{{YEAR}}', date.slice(0, 4)),
    { flag: 'wx' },
  );
  console.log(
    `Created ${destination}. Edit its fields, then set draft: false when ready. Run npm run content:check.`,
  );
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
