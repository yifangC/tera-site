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
