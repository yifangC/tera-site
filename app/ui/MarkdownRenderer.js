'use client'

import { MDXRemote } from 'next-mdx-remote';
import Link from '@/app/ui/Link';

const MarkdownRenderer = ({ source }) => {
  const components = {
    a: ({ href, children }) => (
      <Link href={href} className="text-blue-500 hover:underline">
        {children}
      </Link>
    ),
  };

  return <MDXRemote {...source} components={components} />;
};

export default MarkdownRenderer;