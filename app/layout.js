'use client';
import { useState, useEffect } from 'react';


import { Analytics } from '@vercel/analytics/react';
import './ui/global.css';
import { ThemeProvider } from 'next-themes';
import { Inconsolata } from 'next/font/google';
import NavBar from './ui/NavBar';
import ThemeSwitch from './ui/ThemeSwitch';
import Footer from './ui/Footer';
import DynamicLink from './ui/logo';

const inconsolata = Inconsolata({
  subsets: ['latin'],
  display: 'swap',
});


function Header({ inconsolata }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40); // Change transparency after scrolling 40px 
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 flex items-center justify-between py-6 transition-colors duration-300 ${
        isScrolled
          ? 'bg-white dark:bg-gray-700 backdrop-blur-md border-b border-gray-300/50 dark:border-gray-700/50'
          : 'bg-transparent'
      }`}
    >
      <div className="flex items-center">
        {/* Dynamic Link */}
        <DynamicLink className="hvr-bounce-to-top" inconsolata={inconsolata} />
      </div>

      <div className="flex items-center text-base leading-5 space-x-4"> 
        {/* Navigation Bar */}
        <NavBar />
        {/* Theme Switch */}
        <ThemeSwitch />
      </div>
    </header>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <ThemeProvider attribute="class">
        <head>
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href="/static/favicons/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/static/favicons/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/static/favicons/favicon-16x16.png"
          />
          <link rel="manifest" href="/static/favicons/site.webmanifest" />
          <link
            rel="mask-icon"
            href="/static/favicons/safari-pinned-tab.svg"
            color="#5bbad5"
          />
          <meta name="msapplication-TileColor" content="#000000" />
          <meta
            name="theme-color"
            media="(prefers-color-scheme: light)"
            content="#fff"
          />
          <meta
            name="theme-color"
            media="(prefers-color-scheme: dark)"
            content="#000"
          />
          <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
        </head>
        <body className="antialiased bg-white dark:bg-gray-700 transition-colors duration-700">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
            <div className="flex h-screen flex-col justify-between">
              {/* <header className="sticky top-0 z-50 flex items-center justify-between py-4 bg-white dark:bg-gray-700 backdrop-blur-md transition-colors duration-700">
                <DynamicLink
                  className="hvr-bounce-to-top"
                  inconsolata={inconsolata}
                />
                <div className="flex items-center text-base leading-5 space-x-4">
                  <NavBar />
                  <ThemeSwitch />
                </div>
              </header> */}

              <Header inconsolata={inconsolata} />
              <main className="mb-auto">{children}</main>
              <Footer />
            </div>
          </div>
          <Analytics />
        </body>
      </ThemeProvider>
    </html>
  );
}