# Yi-Fang Cheng — Personal Website

Personal academic website for Yi-Fang Cheng, featuring a biography, research publications, conference presentations, recent news, and a downloadable CV.

- Website: [yifangcheng.me](https://yifangcheng.me/about)
- Repository: [yifangC/tera-site](https://github.com/yifangC/tera-site)

This is the project whose About content and navigation match the published website. The separate `yifangcheng.me` repository is an older version. Work on the current site belongs in `tera-site`.

## Technology

- Next.js 16 App Router and React 19, with JavaScript and TypeScript components.
- MDX for editable content, using `@next/mdx`, `next-mdx-remote`, and `gray-matter`.
- Tailwind CSS 4 and custom CSS for layout, typography, colors, and hover effects.
- `next-themes` for light and dark modes; `react-icons` for icons.
- `next/font/google` for fonts and Vercel Analytics in the shared layout.

The current pages read content from local files. They do not require a database, authentication, or a CMS.

## Local development

Run these commands from the repository root:

```sh
nvm install
nvm use
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000). The home route redirects to `/about`.

Node.js 24 or newer is required by this project. `.nvmrc` selects the latest major release, Node 26; the `nvm` commands above use that version if you have nvm installed. Node 24 remains supported for hosts such as Vercel, whose current runtime options are documented in [Supported Node.js versions](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions). Otherwise, install a compatible Node.js runtime before running the npm commands.

No environment variables are required by the current page code. `.env.example` contains authentication settings left over from the original tutorial. Google fonts are downloaded through `next/font/google`, so a fresh build may require network access.

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server. |
| `npm run build` | Create a production build. |
| `npm start` | Serve an existing production build. |
| `npm run typecheck` | Check TypeScript types without emitting files. |

There are currently no automated test or lint scripts in `package.json`.

Direct dependencies target the latest stable registry releases as checked on October 24, 2026. Major upgrades include Next.js 16.4.3, React 19.3.1, Tailwind CSS 4.3.3, and TypeScript 7.0.2. The lockfile records the resolved dependency tree. A scoped override updates the typography plugin's selector parser to patched version 7.1.7 or newer. The old React 18 resolution pins have been removed. The root theme provider lives inside the page body, and the theme toggle uses the resolved system preference without rendering different server and client icons.

## Pages and navigation

| URL | Current behavior | Source |
| --- | --- | --- |
| `/` | Redirects to `/about`. | `app/page.js` |
| `/about` | Portrait, social links, biography, and recent news. | `app/about/page.js` |
| `/publications` | Publication entries and conference presentations. | `app/publications/page.js` |
| `/visualizations` | Under-construction message; the D3 chart implementation is commented out. | `app/visualizations/page.js` |
| `/experiences` | Experience and education cards; not linked in the main navigation. | `app/experiences/page.js` |
| `/notes` | Under-construction message; not linked in the main navigation. | `app/notes/page.js` |
| `/cv` | Incomplete route that renders an empty link to itself. | `app/cv/page.tsx` |

The **cv** menu item opens `/static/pdf/cv_Jul_26.pdf` directly, rather than using the `/cv` route. Menu entries are defined in `app/ui/NavBar.js`.

## Editing content

Most text updates belong in `app/content/`:

| Update | File |
| --- | --- |
| Biography and research interests | `app/content/about.mdx` |
| Recent news | `app/content/recent_news.mdx` |
| Publications and conference presentations | `app/content/publications.mdx` |
| Experience and education | `app/content/experiences.mdx` |
| Email and social profile links | `app/ui/SocialIcons.js` |
| Navigation labels, destinations, and CV link | `app/ui/NavBar.js` |
| Portrait and About page arrangement | `app/about/page.js` |

MDX supports ordinary Markdown plus the custom components shown below. Entries display in file order; put newer entries first where appropriate.

### Add a news item

Add a `NewsItem` to `app/content/recent_news.mdx`:

```mdx
<NewsItem date="Month YYYY">
  Your announcement, with an optional [link](https://example.com).
</NewsItem>
```

The date badge and row layout are implemented in `app/components/RecentNews.js`.

### Add a publication

Add a `PublicationEntry` to `app/content/publications.mdx`:

```mdx
<PublicationEntry
  title="Publication title"
  conference="Venue abbreviation"
  conferenceFullName="Full venue name or publication status"
  authors={["Yi-Fang Cheng", "Coauthor Name"]}
  highlightAuthors={["Yi-Fang Cheng"]}
  links={[{ title: "Paper", link: "https://example.com/paper" }]}
/>
```

Use `links={[]}` when no public link is available. Conference presentations below the publication entries are ordinary Markdown text. The publication component and its badges are defined in `app/publications/page.js`.

### Add experience or education

Add an `ExperienceCard` to the appropriate section in `app/content/experiences.mdx`:

```mdx
<ExperienceCard
  logo="/static/logos/purdue.jpeg"
  company="Organization name"
  position="Role or degree"
  years="Start – End"
/>
```

The card component is defined in `app/experiences/page.js`.

### Replace the CV or other assets

1. Place the new PDF in `public/static/pdf/`.
2. Update the CV destination in `app/ui/NavBar.js` if the filename changes.
3. Check the PDF through the navigation after starting the site.

Files under `public/` are served from the website root. For example, `public/static/pdf/cv_Jul_26.pdf` is available at `/static/pdf/cv_Jul_26.pdf`. Use root-relative paths beginning with `/static/` in content links.

The About portrait is `public/static/images/yi-fang_jpeg.jpg`; the pianist biography is `public/static/pdf/pianist_v1.pdf`. Organization logos live in `public/static/logos/`.

## How the site fits together

`app/layout.js` supplies the shared header, theme provider, footer, favicon links, and analytics. Each route renders its content inside that layout.

The About page uses `app/components/AboutMe.js` and `app/components/RecentNews.js` to read MDX files from disk and render them with `next-mdx-remote/rsc`. The experience page uses the same approach. Publications instead imports its MDX file directly through the `@next/mdx` configuration in `next.config.mjs`.

`app/components/markdownStyles.js` defines shared rendering for Markdown headings, paragraphs, lists, and links. `mdx-components.js` supplies the component mapping for compiled MDX.

Styling is split between Tailwind utility classes in components, theme settings in `tailwind.config.mjs`, and `app/ui/global.css`. The global stylesheet imports Tailwind, explicitly loads the shared configuration with `@config`, and defines custom link animations, icon effects, and other shared styles. PostCSS uses the Tailwind 4 `@tailwindcss/postcss` plugin. Dark mode uses a class on the document; the toggle is in `app/ui/ThemeSwitch.tsx`.

## Verification and publishing

After changing content, preview the affected page with `npm run dev`. Check links and downloads, light and dark themes, and narrow and wide layouts. Before publishing, run:

```sh
npm run typecheck
npm run build
npm start
```

The dependency upgrade was checked with clean installation, TypeScript checking, production builds on Node 24 and Node 26, and browser checks for page rendering, themes, mobile layout, images, and PDF downloads.

Vercel is connected to this repository and automatically deploys pushes to `main` to the production site. No separate deployment workflow or `vercel.json` is required for this Git integration.

To select the hosted Node.js version, open the project in Vercel and go to **Settings → Build and Deployment → Node.js Version**, choose **24.x**, and save. The repository's `package.json` currently declares `engines.node` as `>=24.0.0`; this supports Vercel's Node 24 runtime. The `engines.node` field can override the dashboard setting. `.nvmrc` selects Node 26 for local development and does not set Vercel's runtime.

A runtime setting applies to new deployments. Push the updated project to `main`, or redeploy the latest production deployment from Vercel's **Deployments** tab to apply the setting to the live site.

## Existing limitations and tutorial leftovers

- Navigation is hidden below the `sm` breakpoint, with no replacement mobile menu.
- The Google Scholar link in `app/ui/SocialIcons.js` has an empty destination.
- `/visualizations`, `/notes`, and `/cv` are unfinished as described above.
- The layout references `/feed.xml` and a Safari pinned-tab SVG that are not present in the repository.
- `app/ui/News.js` is an older, unused news component. Edit `app/content/recent_news.mdx` for the current About page.
- `app/.lib/`, `scripts/seed.js`, and `public/customers/` are leftovers from the Next.js dashboard tutorial. The database helpers and seed script are not part of the active site. The seed script also refers to `app/lib/placeholder-data.js`, while the retained file is under `app/.lib/`; it is not a setup step for this website.
- D3 and vowel-space CSV files remain for visualization work, but the current visualization page does not load or display them.
