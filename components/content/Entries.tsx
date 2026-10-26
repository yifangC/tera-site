import Image from 'next/image';
import type { Entry } from '@/lib/content/schemas';
import Markdown from './Markdown';
import SiteLink from './SiteLink';

export function formatContentDate(value: string) {
  const parts = value.split('-');
  if (parts.length === 1) return value;
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    ...(parts.length === 3 ? { day: 'numeric' } : {}),
    timeZone: 'UTC',
  })
    .format(new Date(`${value}${parts.length === 2 ? '-01' : ''}T12:00:00Z`))
    .replace(/^(\w{3})(?!\.)\s/, '$1. ');
}

export function NewsList({ entries }: { entries: Entry<'news'>[] }) {
  if (!entries.length) return null;
  return (
    <div className="flow-root">
      {entries.map(({ id, data, body }) => (
        <article
          key={id}
          id={`news-${id}`}
          aria-label={data.title}
          className="my-2 flex items-start gap-4"
        >
          <time dateTime={data.date} className="news-date">
            {formatContentDate(data.date)}
          </time>
          <div className="basis-3/4 text-left">
            <Markdown>{body}</Markdown>
          </div>
        </article>
      ))}
    </div>
  );
}

export function PublicationList({
  entries,
  author,
}: {
  entries: Entry<'publications'>[];
  author: string;
}) {
  return (
    <div>
      {entries.map(({ id, data, body }) => (
        <article
          id={`publication-${id}`}
          key={id}
          className="my-12 grid gap-4 sm:grid-cols-[1fr_3fr]"
        >
          <div>{data.badge ? <span className="badge">{data.badge}</span> : null}</div>
          <div className="min-w-0 space-y-2">
            <h2 className="text-lg font-bold leading-relaxed">{data.title}</h2>
            <p>
              {data.authors.map((name, index) => (
                <span key={`${index}-${name}`}>
                  <span
                    className={
                      name === author || data.highlightAuthors.includes(name)
                        ? 'underline'
                        : undefined
                    }
                  >
                    {name}
                  </span>
                  {index < data.authors.length - 1 ? ', ' : ''}
                </span>
              ))}
            </p>
            <p className="italic text-gray-500 dark:text-gray-400">{data.venue}</p>
            {body ? <Markdown>{body}</Markdown> : null}
            {data.links.length ? (
              <div className="flex flex-wrap gap-3 pt-2">
                {data.links.map((link) => (
                  <SiteLink
                    key={`${link.label}-${link.href}`}
                    href={link.href}
                    className="rounded-sm border-2 border-current px-4 py-0.5"
                  >
                    {link.label}
                  </SiteLink>
                ))}
              </div>
            ) : null}
          </div>
        </article>
      ))}
    </div>
  );
}

export function CareerList({
  entries,
  collection,
}: {
  entries: (Entry<'experience'> | Entry<'education'>)[];
  collection: 'experience' | 'education';
}) {
  return (
    <div>
      {entries.map(({ id, data, body }) => (
        <article
          key={id}
          id={`${collection}-${id}`}
          className="grid grid-cols-[5rem_1fr] gap-5 border-b border-gray-200 py-6 dark:border-gray-600 sm:grid-cols-[1fr_2fr]"
        >
          <div className="flex justify-center">
            <Image
              src={data.logo}
              alt={`${data.organization} logo`}
              width={80}
              height={80}
              className="h-20 w-20 object-contain"
            />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold">{data.organization}</h3>
            <p>{data.title}</p>
            <p className="italic text-gray-500 dark:text-gray-400">{data.dateLabel}</p>
            {body ? <Markdown>{body}</Markdown> : null}
          </div>
        </article>
      ))}
    </div>
  );
}

export function PresentationList({ entries }: { entries: Entry<'presentations'>[] }) {
  return (
    <div>
      {entries.map(({ id, data, body }) => (
        <article id={`presentation-${id}`} key={id} className="mb-5 text-lg leading-relaxed">
          <p>
            {data.authors
              .map(
                (name, index) =>
                  `${index === 0 ? '' : index === data.authors.length - 1 ? ', & ' : ', '}${name}`,
              )
              .join('')}{' '}
            ({data.year}). {data.title}
            {/[.!?]$/.test(data.title) ? '' : '.'} {data.event}
          </p>
          {body ? <Markdown>{body}</Markdown> : null}
        </article>
      ))}
    </div>
  );
}
