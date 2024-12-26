'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const DynamicLink = ({ className, inconsolata }) => {
  const pathname = usePathname(); // Get the current route
  const isHomePage = pathname === '/about'; // Check if the current route is "/" 

  return (
    <Link
      href="/"
      className={`hvr-bounce-to-top text-4xl font-extrabold text-gray-700 dark:text-gray-300 hover:text-white-900 dark:hover:text-gray-700 transition-colors duration-300 ${className} ${inconsolata.className}`}
    >
      {isHomePage ? (
        '~/Y-F.'
      ) : (
        <>
          <span className="font-bold">Yi-Fang</span>{' '}
          <span className="font-normal">Tera Cheng</span> 
        </>
      )}
    </Link>
  );
};

export default DynamicLink;