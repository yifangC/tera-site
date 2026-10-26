import Link from 'next/link';
import type { ComponentProps } from 'react';

export default function SiteLink({
  href = '',
  className = '',
  children,
  ...props
}: ComponentProps<'a'>) {
  const style = `font-bold text-primary-600 dark:text-pink-600 hvr-bounce-to-top transition-colors duration-300 ${className}`;
  if (href.startsWith('/') && !href.startsWith('//') && !href.startsWith('/static/'))
    return (
      <Link href={href} className={style} {...props}>
        {children}
      </Link>
    );
  const external = /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      className={style}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...props}
    >
      {children}
    </a>
  );
}
