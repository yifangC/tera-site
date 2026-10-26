import 'server-only';
import { cache } from 'react';
import { notFound } from 'next/navigation';
import { readCollection, readSite } from './load';
import type { Collection, Entry } from './schemas';
import { publishedEntries } from './selection';

export const getSite = cache(readSite);

export const getCollection = cache(
  async <K extends Collection>(collection: K): Promise<Entry<K>[]> =>
    publishedEntries(await readCollection(collection)),
);

export const getPage = cache(async (id: string) => {
  const page = (await getCollection('pages')).find((entry) => entry.id === id);
  if (!page) notFound();
  return page;
});
