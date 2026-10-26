import { pageMetadata } from '@/lib/content/metadata';
import Markdown from '@/components/content/Markdown';
import { getPage } from '@/lib/content/queries';

export function generateMetadata() {
  return pageMetadata('visualizations');
}

export default async function VisualizationsPage() {
  const page = await getPage('visualizations');
  return (
    <div className="pt-8">
      <h1 className="mb-6 text-4xl">{page.data.title}</h1>
      <Markdown>{page.body}</Markdown>
    </div>
  );
}
