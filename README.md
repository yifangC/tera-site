# Yi-Fang Cheng — Personal Website

Academic website for Yi-Fang Cheng at [yifangcheng.me](https://yifangcheng.me/about). This repository, [yifangC/tera-site](https://github.com/yifangC/tera-site), is the current project; the separate `yifangcheng.me` repository is an older version.

The site separates **content** (plain Markdown and YAML), **content validation**, and **presentation** (Next.js/React components). Humans and agents use the same files and checks. Routine updates do not require editing JSX or application code.

## Run locally

```sh
nvm install
nvm use
npm ci
npm run dev
```

Open [localhost:3000/about](http://localhost:3000/about). `.nvmrc` selects Node 26, which is also used by GitHub Actions. The application supports Node 24 or newer for hosting compatibility. Local development uses Next.js’s supported Webpack mode to avoid the repeated reloads observed with Turbopack in this project. Production builds still use the default Next.js bundler. No database, CMS, authentication, or environment variables are required. Fresh builds may require internet access for Google fonts.

## Update content

See **[the editing guide](docs/editing-content.md)** for field definitions, examples, GitHub editing, and publishing instructions.

| Update                                          | File or folder                                              |
| ----------------------------------------------- | ----------------------------------------------------------- |
| Biography                                       | `content/pages/about.md`                                    |
| News                                            | `content/news/`                                             |
| Publications                                    | `content/publications/`                                     |
| Conference presentations                        | `content/presentations/`                                    |
| Professional experience                         | `content/experience/`                                       |
| Education                                       | `content/education/`                                        |
| Profile, social links, CV, portrait, navigation | `content/site.yaml`                                         |
| Notes and visualization text                    | `content/pages/notes.md`, `content/pages/visualizations.md` |

Every collection entry is an independent `.md` file with YAML frontmatter. The body supports standard Markdown and GitHub-flavored Markdown. Content contains no HTML, JSX, component names, or styling classes.

Create an entry from a template:

```sh
npm run content:new -- news my-announcement
npm run content:new -- publications my-paper
npm run content:check
```

New entries start as drafts. Edit the generated fields and set `draft: false` when ready. Drafts are hidden in local and production pages, but still validated. Dates do not schedule publication. Optional `order` values control placement; otherwise entries sort newest first with deterministic filename ties.

The CV is currently removed. To restore it, add the updated PDF to `public/static/pdf/`, add a `cv` block with `src` and `label` to `content/site.yaml`, and show its navigation entry. `/cv` redirects to the configured PDF, or returns 404 when `cv` is omitted. See the editing guide for the full example.

## Commands

| Command                                      | Purpose                                                                 |
| -------------------------------------------- | ----------------------------------------------------------------------- |
| `npm run dev`                                | Start local development. Save content edits and refresh the page.       |
| `npm run content:new -- <collection> [slug]` | Copy a collection template without overwriting existing files.          |
| `npm run content:check`                      | Validate content fields, Markdown, local routes/assets, and references. |
| `npm run lint`                               | Check Next.js, React, and accessibility rules with no warnings allowed. |
| `npm test`                                   | Run content validation and selection regression tests.                  |
| `npm run typecheck`                          | Generate route types and run the TypeScript compiler.                   |
| `npm run build`                              | Validate content and create a production build.                         |
| `npm start`                                  | Serve the production build.                                             |
| `npm run check`                              | Run lint, tests, type checking, and the production build.               |

## Project structure

```text
content/                  # Markdown collections and site.yaml
app/                      # Routes, server layout, sitemap, robots
components/content/       # Markdown, cards, lists, links
components/layout/        # Header, mobile navigation, footer
components/interactive/   # Theme provider and toggle
lib/content/              # Schemas, loading, public selection, queries
templates/                # Starting points for new content
scripts/                  # Content commands
tests/                    # Regression tests
docs/                     # Editing instructions
public/static/            # Existing images, PDFs, logos, and CSV assets
.github/workflows/        # Automated checks
```

## Architecture

- **Content contract:** `lib/content/schemas.ts` defines strict Zod schemas and inferred TypeScript types. Missing fields, unknown keys, bad dates, duplicate YAML keys, empty links, missing local assets, and unknown references fail validation with source filenames.
- **One loading path:** `lib/content/load.ts` parses YAML and Markdown. `selection.ts` filters drafts and sorts records. The server-only `queries.ts` exposes request-deduplicated queries to pages. There is no process-global content cache, so local refreshes read current files.
- **One renderer:** `components/content/Markdown.tsx` uses `react-markdown` and `remark-gfm`. HTML/JSX is rejected during validation. Publication, news, career, and presentation layouts receive data instead of executing content as React code.
- **Server rendering:** route composition, content reads, and the root layout are Server Components. Only theme controls, navigation state, and the local footer clock require client behavior. Published content is prerendered during the production build.
- **Presentation:** Tailwind CSS 4 and `app/ui/global.css` provide the existing yellow/amber themes, shared typography, and hover effects. Typography and cards adapt to narrow screens. Mobile navigation has an accessible native disclosure menu.
- **Metadata:** Next.js metadata APIs supply titles, descriptions, canonical URLs, social previews, icons, sitemap, and robots. Draft pages are excluded from the sitemap and unavailable at their routes. Hidden navigation items retain accessible routes unless their page is a draft.

The project uses Next.js 16, React 19, and Zod 4. Type checking uses the TypeScript 7 native compiler. ESLint still needs the TypeScript 6 programmatic API, so the project uses the official side-by-side npm aliases: `@typescript/native` supplies `tsc`, and `typescript` aliases `@typescript/typescript6` for tooling. See [TypeScript's compatibility guidance](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/#running-side-by-side-with-typescript-6.0).

## Routes

| Route                         | Purpose                                                                   |
| ----------------------------- | ------------------------------------------------------------------------- |
| `/`                           | Redirect to `/about`.                                                     |
| `/about`                      | Biography, portrait, social links, and news.                              |
| `/publications`               | Publication cards and conference presentations.                           |
| `/experiences`                | Professional experience and education; hidden from navigation by default. |
| `/cv`                         | Redirect to the configured CV; return 404 when no CV is configured.                     |
| `/notes`                      | Markdown placeholder; hidden from navigation by default.                  |
| `/visualizations`             | Markdown placeholder for future interactive research work.                |
| `/sitemap.xml`, `/robots.txt` | Generated discovery metadata.                                             |

A new collection entry appears automatically on its existing page. A new top-level page still needs a Next.js route. Future interactive visualizations belong in application components; the surrounding prose can continue to use Markdown. Existing CSV assets remain available, but there is no active chart yet.

## Validation and publishing

Run `npm run check` before publishing. GitHub Actions runs the same checks on pushes and pull requests. A build fails on invalid content even when only Markdown files changed. External link syntax is checked, but external availability and fragment anchors are not checked by the build.

Local editing and a production build were verified during the refactor. Hosting settings remain external: confirm the linked repository, production branch, runtime, and preview deployment settings in the hosting dashboard. This repository does not configure a hosting account or automatically authorize publication. Content changes reach production when the hosting workflow rebuilds and deploys the approved branch.

The previous MDX files, duplicate renderers, unused database tutorial code, and tutorial customer images have been removed. The git history retains them. Agent editing instructions live in [AGENTS.md](AGENTS.md).
