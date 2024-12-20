// import siteMetadata from '@/data/siteMetadata'
import Link from './Link'

const headerNavLinks = [
  { href: '/about', title: 'About' },
  { href: '/publications', title: 'Publications' },
  // { href: '/blog/123', title: 'Blog' },
  { href: '/static/pdf/cv.pdf', title: 'CV'} 
  // { href: '/cv', title: 'CV'}
]

export default function NavBar() {
  return (
    <div className="hidden sm:block">
      {headerNavLinks.map((link) => (
        <Link
          key={link.title}
          href={link.href}
          className="ml-2 mr-2 font-bold text-gray-700 dark:text-gray-300 hvr-underline-from-center"
        >
          {link.title}
        </Link>
      ))}
    </div>
  );
}


// import Link from './Link';

// const headerNavLinks = [
//   { href: '/about', title: 'About' },
//   { href: '/publications', title: 'Publications' },
//   { href: '/static/pdf/cv.pdf', title: 'CV' },
// ];

// export default function NavBar() {
//   return (
//     <div className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-300/50 dark:border-gray-700/50">
//       <div className="hidden sm:flex justify-center space-x-4 py-2">
//         {headerNavLinks.map((link) => (
//           <Link
//             key={link.title}
//             href={link.href}
//             className="ml-2 mr-2 font-bold text-gray-700 dark:text-gray-300 hvr-underline-from-center"
//           >
//             {link.title}
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }