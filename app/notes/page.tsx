import { pageMetadata } from '@/lib/content/metadata';
import Markdown from '@/components/content/Markdown';
import { getPage } from '@/lib/content/queries';

export function generateMetadata() {
  return pageMetadata('notes');
}

export default async function NotesPage() {
  const page = await getPage('notes');
  return (
    <div className="pt-8">
      <h1 className="mb-6 text-4xl">{page.data.title}</h1>
      <Markdown>{page.body}</Markdown>
    </div>
  );
}
