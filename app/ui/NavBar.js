// import siteMetadata from '@/data/siteMetadata'
import Link from "./Link";

const headerNavLinks = [
  { href: "/about", title: "about" },
  { href: "/experiences", title: "experiences" },
  { href: "/publications", title: "publications" },
  { href: "/visualizations", title: "visualizations" },
  { href: "/static/pdf/yifang-cv.pdf", title: "cv" },
];

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
