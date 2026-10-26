import type { Collection, Entry } from './schemas';

export function publishedEntries<K extends Collection>(entries: Entry<K>[]): Entry<K>[] {
  return entries
    .filter((entry) => !entry.data.draft)
    .sort((a, b) => {
      const order =
        (a.data.order ?? Number.MAX_SAFE_INTEGER) - (b.data.order ?? Number.MAX_SAFE_INTEGER);
      if (order) return order;
      const aDate =
        'date' in a.data
          ? a.data.date
          : 'year' in a.data
            ? String(a.data.year ?? '')
            : 'start' in a.data
              ? a.data.start
              : '';
      const bDate =
        'date' in b.data
          ? b.data.date
          : 'year' in b.data
            ? String(b.data.year ?? '')
            : 'start' in b.data
              ? b.data.start
              : '';
      return bDate.localeCompare(aDate) || a.id.localeCompare(b.id);
    });
}
