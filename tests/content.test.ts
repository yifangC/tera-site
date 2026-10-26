import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { schemas, siteSchema, contentUrl, isContentDate, type Entry } from '../lib/content/schemas';
import { readEntry, readSite, checkLink, validateContent } from '../lib/content/load';
import { publishedEntries } from '../lib/content/selection';

test('dates preserve year/month precision and reject impossible calendar dates', () => {
  for (const date of ['2026', '2026-02', '2024-02-29'])
    assert.equal(isContentDate(date), true, date);
  for (const date of ['2026-02-29', '2026-13', '2026-04-31', 'Feb 2026', '2026-2'])
    assert.equal(isContentDate(date), false, date);
});

test('publication validation rejects unknown fields, empty authors, and empty links', () => {
  const publication = {
    title: 'A paper',
    authors: ['A. Researcher'],
    status: 'under-review',
    venue: 'Under review',
  };
  assert.equal(schemas.publications.safeParse(publication).success, true);
  assert.equal(schemas.publications.safeParse({ ...publication, authors: [] }).success, false);
  assert.equal(
    schemas.publications.safeParse({ ...publication, links: [{ label: 'Paper', href: '' }] })
      .success,
    false,
  );
  assert.equal(
    schemas.publications.safeParse({ ...publication, authros: ['Typo'] }).success,
    false,
  );
});

test('links allow supported destinations and reject executable or ambiguous URLs', () => {
  for (const href of ['https://example.com/paper', 'mailto:me@example.com', '/cv', '#paper'])
    assert.equal(contentUrl.safeParse(href).success, true);
  for (const href of [
    '',
    'static/pdf/cv.pdf',
    '//example.com',
    'javascript:alert(1)',
    '/static/../secret',
  ])
    assert.equal(contentUrl.safeParse(href).success, false);
});

test('public collections omit drafts, honor explicit ordering, and have deterministic date ties', () => {
  const news = (id: string, date: string, extra = {}): Entry<'news'> => ({
    id,
    body: 'News',
    data: { title: id, date, draft: false, ...extra },
  });
  const input = [
    news('older', '2025'),
    news('zebra', '2026-02'),
    news('draft', '2027', { draft: true }),
    news('alpha', '2026-02'),
    news('pinned', '2024', { order: 0 }),
  ];
  assert.deepEqual(
    publishedEntries(input).map((entry) => entry.id),
    ['pinned', 'alpha', 'zebra', 'older'],
  );
  assert.equal(input.length, 5);
});

async function fixture(
  run: (root: string, write: (text: string) => Promise<void>) => Promise<void>,
) {
  const root = await mkdtemp(path.join(os.tmpdir(), 'tera-content-test-'));
  await mkdir(path.join(root, 'content/news'), { recursive: true });
  try {
    await run(root, (text) => writeFile(path.join(root, 'content/news/example.md'), text));
  } finally {
    await rm(root, { recursive: true, force: true });
  }
}

test('editing Markdown updates parsed content without editing application code', () =>
  fixture(async (root, write) => {
    await write('---\ntitle: Announcement\ndate: "2026-02"\n---\n\nOriginal news.');
    assert.equal((await readEntry('news', 'example.md', root)).body, 'Original news.');
    await write('---\ntitle: Announcement\ndate: "2026-02"\n---\n\nUpdated **news**.');
    assert.equal((await readEntry('news', 'example.md', root)).body, 'Updated **news**.');
  }));

test('malformed fields identify the source file and field', () =>
  fixture(async (root, write) => {
    await write('---\ntitle: Announcement\ndate: "2026-02-30"\n---\nNews.');
    await assert.rejects(readEntry('news', 'example.md', root), /content\/news\/example.md: date/);
  }));

test('duplicate YAML keys, missing frontmatter, and JSX fail validation', () =>
  fixture(async (root, write) => {
    await write('---\ntitle: First\ntitle: Second\ndate: "2026"\n---\nNews.');
    await assert.rejects(readEntry('news', 'example.md', root), /unique|duplicate/i);
    await write('No frontmatter');
    await assert.rejects(readEntry('news', 'example.md', root), /frontmatter/);
    await write('---\ntitle: News\ndate: "2026"\n---\n<NewsItem>Text</NewsItem>');
    await assert.rejects(readEntry('news', 'example.md', root), /HTML and JSX/);
  }));

test('missing assets and encoded traversal paths are rejected', () =>
  fixture(async (root) => {
    await assert.rejects(checkLink('/static/missing.pdf', 'example.md', root), /missing asset/);
    await assert.rejects(
      checkLink('/static/%2e%2e/secret', 'example.md', root),
      /invalid local path/,
    );
  }));

test('repository content validates and collection IDs are unique', async () => {
  const { collections } = await validateContent();
  for (const entries of Object.values(collections))
    assert.equal(new Set(entries.map((entry) => entry.id)).size, entries.length);
});

test('career date ranges compare only known precision', () =>
  fixture(async (root) => {
    await mkdir(path.join(root, 'content/experience'), { recursive: true });
    const filename = path.join(root, 'content/experience/example.md');
    const source = (end: string) =>
      `---\ntitle: Researcher\norganization: University\nstart: "2025-06"\nend: "${end}"\ndateLabel: "2025"\nlogo: /static/logo.png\n---\n`;
    await writeFile(filename, source('2025'));
    assert.equal((await readEntry('experience', 'example.md', root)).data.end, '2025');
    await writeFile(filename, source('2025-05'));
    await assert.rejects(readEntry('experience', 'example.md', root), /end must not precede start/);
  }));

test('CV configuration is optional and still validates configured PDF destinations', async () => {
  const site = await readSite();
  const withoutCV = { ...site };
  delete withoutCV.cv;
  assert.equal(siteSchema.safeParse(withoutCV).success, true);
  assert.equal(
    siteSchema.safeParse({ ...withoutCV, cv: { src: '/static/pdf/new-cv.pdf', label: 'CV' } })
      .success,
    true,
  );
  assert.equal(
    siteSchema.safeParse({ ...withoutCV, cv: { src: '/static/images/cv.png', label: 'CV' } })
      .success,
    false,
  );
});
