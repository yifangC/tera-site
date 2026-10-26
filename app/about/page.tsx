import { pageMetadata } from '@/lib/content/metadata';
import Image from 'next/image';
import Markdown from '@/components/content/Markdown';
import SocialLinks from '@/components/content/SocialLinks';
import { NewsList } from '@/components/content/Entries';
import { getCollection, getPage, getSite } from '@/lib/content/queries';

export function generateMetadata() {
  return pageMetadata('about');
}

export default async function AboutPage() {
  const [site, page, news] = await Promise.all([
    getSite(),
    getPage('about'),
    getCollection('news'),
  ]);
  return (
    <div className="items-start gap-x-8 xl:grid xl:grid-cols-3">
      <aside className="mb-2 flex flex-col items-center pt-8 xl:mb-0">
        <Image
          {...site.portrait}
          alt={site.portrait.alt}
          sizes="(min-width: 1280px) 320px, (min-width: 640px) 720px, calc(100vw - 32px)"
          preload
          className="h-auto w-full rounded-sm shadow-lg shadow-gray-500/70 hover:shadow-xl hover:shadow-gray-500/90 transition-shadow duration-300"
        />
        <SocialLinks links={site.socials} />
      </aside>
      <div className="min-w-0 pt-8 pb-2 xl:col-span-2">
        <Markdown>{page.body}</Markdown>
        {news.length ? (
          <section className="pt-6" aria-labelledby="recent-news">
            <h2 id="recent-news" className="mb-10 text-2xl font-bold">
              {site.sections.news}
            </h2>
            <NewsList entries={news} />
          </section>
        ) : null}
      </div>
    </div>
  );
}
