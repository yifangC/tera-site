import type { Metadata } from 'next';
import { getPage, getSite } from './queries';

export async function pageMetadata(id: string): Promise<Metadata> {
  const [page, site] = await Promise.all([getPage(id), getSite()]);
  return {
    title: page.data.title,
    description: page.data.description,
    alternates: { canonical: `/${id}` },
    openGraph: {
      title: page.data.title,
      description: page.data.description,
      url: `/${id}`,
      type: 'website',
      images: [{ url: site.portrait.src, alt: site.portrait.alt }],
    },
  };
}
