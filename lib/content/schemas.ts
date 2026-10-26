import { z } from 'zod';

export function isContentDate(value: string): boolean {
  if (!/^\d{4}(-\d{2})?(-\d{2})?$/.test(value)) return false;
  const [year, month = '01', day = '01'] = value.split('-');
  const date = new Date(`${year}-${month}-${day}T12:00:00Z`);
  return !Number.isNaN(date.valueOf()) && date.toISOString().startsWith(`${year}-${month}-${day}`);
}

export const contentDate = z
  .string()
  .refine(isContentDate, 'Use a real date: YYYY, YYYY-MM, or YYYY-MM-DD');
const text = z.string().trim().min(1);
const localPath = text.refine(
  (value) =>
    value.startsWith('/') &&
    !value.startsWith('//') &&
    !value.split(/[?#]/)[0].split('/').includes('..'),
  'Use a root-relative path without ..',
);
const assetPath = localPath.refine(
  (value) => value.startsWith('/static/'),
  'Use an asset path beginning with /static/',
);
export const contentUrl = text.refine((value) => {
  if (value.startsWith('/') && !value.startsWith('//')) return localPath.safeParse(value).success;
  if (value.startsWith('#')) return value.length > 1;
  try {
    return ['https:', 'http:', 'mailto:'].includes(new URL(value).protocol);
  } catch {
    return false;
  }
}, 'Use an https:// URL, mailto: link, /local/path, or #anchor');

const base = {
  title: text,
  draft: z.boolean().default(false),
  order: z.number().int().nonnegative().optional(),
};
const authors = z.array(text).min(1);
const career = {
  ...base,
  organization: text,
  start: contentDate,
  end: contentDate.optional(),
  dateLabel: text,
  logo: assetPath,
};

export const schemas = {
  pages: z.strictObject({ ...base, description: text }),
  news: z.strictObject({ ...base, date: contentDate }),
  publications: z.strictObject({
    ...base,
    authors,
    status: z.enum(['under-review', 'accepted', 'published']),
    year: z.number().int().min(1900).max(2200).optional(),
    venue: text,
    badge: text.optional(),
    highlightAuthors: z.array(text).default([]),
    doi: text.optional(),
    links: z.array(z.strictObject({ label: text, href: contentUrl })).default([]),
  }),
  presentations: z.strictObject({
    ...base,
    authors,
    year: z.number().int().min(1900).max(2200),
    event: text,
    type: z.enum(['paper', 'poster', 'talk']),
    publication: z
      .string()
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
      .optional(),
  }),
  experience: z.strictObject(career),
  education: z.strictObject(career),
};

export const siteSchema = z.strictObject({
  name: text,
  shortName: text,
  url: z.httpUrl(),
  description: text,
  portrait: z.strictObject({
    src: assetPath,
    alt: text,
    width: z.number().int().positive(),
    height: z.number().int().positive(),
  }),
  cv: z
    .strictObject({
      src: assetPath.refine((value) => /\.pdf$/i.test(value), 'Use a PDF asset path'),
      label: text,
    })
    .optional(),
  socials: z.array(
    z.strictObject({
      label: text,
      href: contentUrl,
      icon: z.enum(['email', 'github', 'linkedin', 'scholar', 'instagram']),
    }),
  ),
  navigation: z.array(
    z.strictObject({ label: text, href: contentUrl, visible: z.boolean().default(true) }),
  ),
  sections: z.strictObject({ news: text, presentations: text, experience: text, education: text }),
});

export type Collection = keyof typeof schemas;
export type ContentData<K extends Collection> = z.output<(typeof schemas)[K]>;
export type Entry<K extends Collection> = { id: string; body: string; data: ContentData<K> };
export type Site = z.output<typeof siteSchema>;
