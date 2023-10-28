'use client'

import './ui/global.css';
import { ThemeProvider } from 'next-themes'
import { Inconsolata } from 'next/font/google' 

import Link from './ui/Link'
import NavBar from './ui/NavBar'
import ThemeSwitch from './ui/ThemeSwitch'
import Footer from './ui/Footer'


const inconsolata = Inconsolata({
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <ThemeProvider attribute="class">
        <head>
          <link rel="apple-touch-icon" sizes="76x76" href="/static/favicons/apple-touch-icon.png" />
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
          <link rel="mask-icon" href="/static/favicons/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#000000" />
          <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
          <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
          <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
        </head>
        <body className="antialiased bg-white dark:bg-gray-700 transition-colors duration-1000">
          
          <div className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
            <div className="flex h-screen flex-col justify-between">
              
              <header className="flex items-center justify-between py-10">
                <div className="flex items-center justify-between"> 
                  <div className="flex items-center justify-between">
                    <Link href='/' className={`hvr-bounce-to-top text-4xl font-extrabold text-gray-700 dark:text-gray-300 hover:text-white-900 dark:hover:text-gray-700 transition-colors duration-300 ${inconsolata.className}`}> ~/C. </Link> 
                  </div>
                </div>

                <div className="flex items-center text-base leading-5">
                  <NavBar/ > 
                  <ThemeSwitch />
                </div>
              </header>

              <main className="mb-auto">
                {children}
              </main>

              <Footer />
            </div>
          </div>

        </body>
      </ThemeProvider>
    </html>
  );
}
