import { pageMetadata } from '@/lib/content/metadata';
import Markdown from '@/components/content/Markdown';
import { CareerList } from '@/components/content/Entries';
import { getCollection, getPage, getSite } from '@/lib/content/queries';

export function generateMetadata() {
  return pageMetadata('experiences');
}

export default async function ExperiencesPage() {
  const [site, page, experience, education] = await Promise.all([
    getSite(),
    getPage('experiences'),
    getCollection('experience'),
    getCollection('education'),
  ]);
  return (
    <div className="pt-8">
      <h1 className="mb-6 text-4xl">{page.data.title}</h1>
      <Markdown>{page.body}</Markdown>
      <section aria-labelledby="experience">
        <h2 id="experience" className="mt-8 text-2xl font-bold">
          {site.sections.experience}
        </h2>
        <CareerList entries={experience} collection="experience" />
      </section>
      <section aria-labelledby="education">
        <h2 id="education" className="mt-10 text-2xl font-bold">
          {site.sections.education}
        </h2>
        <CareerList entries={education} collection="education" />
      </section>
    </div>
  );
}
