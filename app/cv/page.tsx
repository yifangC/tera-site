import { notFound, redirect } from 'next/navigation';
import { getSite } from '@/lib/content/queries';

export default async function CVPage() {
  const site = await getSite();
  if (!site.cv) notFound();
  redirect(site.cv.src);
}
