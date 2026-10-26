import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Inconsolata, Rubik } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ThemeProvider from '@/components/interactive/ThemeProvider';
import { getSite } from '@/lib/content/queries';
import './ui/global.css';

const inconsolata = Inconsolata({ subsets: ['latin'], display: 'swap' });
const rubik = Rubik({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-badge',
});

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  return {
    metadataBase: new URL(site.url),
    title: { default: site.name, template: `%s | ${site.name}` },
    description: site.description,
    openGraph: {
      title: site.name,
      description: site.description,
      type: 'website',
      images: [{ url: site.portrait.src, alt: site.portrait.alt }],
    },
    icons: { icon: '/static/favicons/favicon.ico', apple: '/static/favicons/apple-touch-icon.png' },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fff' },
    { media: '(prefers-color-scheme: dark)', color: '#404040' },
  ],
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const site = await getSite();
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`bg-white antialiased transition-colors duration-300 dark:bg-gray-700 ${rubik.variable}`}
      >
        <ThemeProvider>
          <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-4 text-gray-700 sm:px-6 xl:max-w-5xl xl:px-0 dark:text-gray-300">
            <a href="#main-content" className="sr-only focus:not-sr-only focus:p-3">
              Skip to content
            </a>
            <Header
              name={site.name}
              shortName={site.shortName}
              navigation={site.navigation}
              cvLabel={site.cv?.label ?? 'Download CV'}
              fontClass={inconsolata.className}
            />
            <main id="main-content" className="mb-auto">
              {children}
            </main>
            <Footer author={site.name} />
          </div>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
