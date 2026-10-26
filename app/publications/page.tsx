import { pageMetadata } from '@/lib/content/metadata';
import Markdown from '@/components/content/Markdown';
import { PublicationList, PresentationList } from '@/components/content/Entries';
import { getCollection, getPage, getSite } from '@/lib/content/queries';

export function generateMetadata() {
  return pageMetadata('publications');
}

export default async function PublicationsPage() {
  const [site, page, publications, presentations] = await Promise.all([
    getSite(),
    getPage('publications'),
    getCollection('publications'),
    getCollection('presentations'),
  ]);
  return (
    <div className="pt-8">
      <h1 className="mb-6 text-4xl">{page.data.title}</h1>
      <Markdown>{page.body}</Markdown>
      <PublicationList entries={publications} author={site.name} />
      {presentations.length ? (
        <section aria-labelledby="presentations">
          <h2 id="presentations" className="mb-6 text-3xl">
            {site.sections.presentations}
          </h2>
          <PresentationList entries={presentations} />
        </section>
      ) : null}
    </div>
  );
}
