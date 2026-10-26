import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import SiteLink from './SiteLink';

const plugins = [remarkGfm];

export default function Markdown({ children }: { children: string }) {
  return (
    <div className="content-markdown">
      <ReactMarkdown
        remarkPlugins={plugins}
        skipHtml
        components={{ a: ({ href, children }) => <SiteLink href={href}>{children}</SiteLink> }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
