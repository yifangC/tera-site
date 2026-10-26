'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useSyncExternalStore } from 'react';
import type { Site } from '@/lib/content/schemas';
import ThemeToggle from '@/components/interactive/ThemeToggle';

function subscribeToScroll(callback: () => void) {
  window.addEventListener('scroll', callback, { passive: true });
  return () => window.removeEventListener('scroll', callback);
}
const scrollSnapshot = () => window.scrollY > 40;
const serverScrollSnapshot = () => false;

export default function Header({
  name,
  shortName,
  navigation,
  fontClass,
  cvLabel,
}: Pick<Site, 'name' | 'shortName' | 'navigation'> & { fontClass: string; cvLabel: string }) {
  const pathname = usePathname();
  const scrolled = useSyncExternalStore(subscribeToScroll, scrollSnapshot, serverScrollSnapshot);
  const links = navigation.filter((entry) => entry.visible);
  return (
    <header
      className={`sticky top-0 z-50 flex items-center justify-between py-6 transition-colors duration-300 ${scrolled ? 'border-b border-gray-300/50 bg-white backdrop-blur-md dark:border-gray-700/50 dark:bg-gray-700' : 'bg-transparent'}`}
    >
      <Link
        href="/about"
        aria-label={`${name} home`}
        className={`hvr-bounce-to-top text-4xl font-extrabold ${fontClass}`}
      >
        {pathname === '/about' ? shortName : name}
      </Link>
      <div className="flex items-center space-x-4 text-base leading-5">
        <nav aria-label="Main navigation" className="hidden sm:block">
          {links.map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              aria-label={href === '/cv' ? cvLabel : undefined}
              aria-current={pathname === href ? 'page' : undefined}
              className="hvr-underline-from-center mx-2 font-bold"
            >
              {label}
            </Link>
          ))}
        </nav>
        <details key={pathname} className="relative sm:hidden">
          <summary className="cursor-pointer rounded-sm p-3 font-bold">Menu</summary>
          <nav
            aria-label="Mobile navigation"
            className="absolute right-0 top-full flex min-w-44 flex-col gap-1 rounded-sm border border-gray-200 bg-white p-3 shadow-lg dark:border-gray-600 dark:bg-gray-700"
          >
            {links.map(({ href, label }) => (
              <Link
                key={label}
                href={href}
                aria-label={href === '/cv' ? cvLabel : undefined}
                aria-current={pathname === href ? 'page' : undefined}
                className="rounded-sm px-3 py-2 font-bold hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                {label}
              </Link>
            ))}
          </nav>
        </details>
        <ThemeToggle />
      </div>
    </header>
  );
}
