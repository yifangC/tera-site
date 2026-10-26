import type { MetadataRoute } from 'next';
import { getCollection, getSite } from '@/lib/content/queries';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [site, pages] = await Promise.all([getSite(), getCollection('pages')]);
  return pages.map((page) => ({ url: `${site.url}/${page.id}` }));
}
