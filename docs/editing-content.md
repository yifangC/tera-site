# Editing the website

Content lives in `content/`. Page layouts live in `app/` and `components/`. Routine text, publication, news, profile, and CV updates should only change content files and any new assets under `public/static/`.

## Quick start

From the repository root:

```sh
nvm install
nvm use
npm ci
npm run dev
```

Open http://localhost:3000/about. Save your content edits and refresh the page. A production site shows changes after it is rebuilt and deployed.

## Find the right file

| Update                                                               | Location                                                      |
| -------------------------------------------------------------------- | ------------------------------------------------------------- |
| Biography                                                            | `content/pages/about.md`                                      |
| News announcement                                                    | One file in `content/news/`                                   |
| Publication                                                          | One file in `content/publications/`                           |
| Conference presentation                                              | One file in `content/presentations/`                          |
| Job, research, or teaching role                                      | One file in `content/experience/`                             |
| Degree or certificate                                                | One file in `content/education/`                              |
| Name, contact/social links, portrait, CV, navigation, section labels | `content/site.yaml`                                           |
| Notes or visualization placeholder text                              | `content/pages/notes.md` or `content/pages/visualizations.md` |

## Markdown and metadata

Each `.md` file starts with YAML metadata between two `---` lines. Everything below that is ordinary Markdown. JSX, HTML, imports, and React components are not part of the content format.

```markdown
---
title: 'A new announcement'
date: '2026-02'
draft: false
---

Write paragraphs, **bold text**, lists, and [links](https://example.com).
```

Quote dates and text containing colons. Dates support `YYYY`, `YYYY-MM`, or `YYYY-MM-DD`; use only the precision you know. Dates describe content and do not schedule publishing. Adding a future date does not delay publication.

Filenames are stable identifiers: use lowercase words separated by hyphens, such as `labphon-2026.md`. Changing a title does not require renaming its file. Different collections may reuse the same filename.

## Add an entry

Use a template through the creation command:

```sh
npm run content:new -- news my-announcement
npm run content:new -- publications my-paper
npm run content:new -- presentations conference-talk
npm run content:new -- experience new-role
npm run content:new -- education new-degree
```

The command creates a file with `draft: true` and never overwrites an existing file. Omitting the final name creates a dated filename. Fill in the fields and set `draft: false` when ready to show it. Drafts are hidden in local previews and production, but still validated. To preview a draft locally, temporarily set it to `false`.

Items sort by optional numeric `order` first (lower numbers first), then date/year descending, then filename. Existing publication and presentation entries use explicit order to preserve their original sequence. To place an entry among them, assign its order and adjust neighboring entries if needed. News usually needs no order field.

## Publication fields

```yaml
title: 'Paper title'
authors:
  - 'Yi-Fang Cheng'
  - 'Coauthor Name'
status: accepted
venue: 'Accepted to Journal Name'
badge: 'Journal abbreviation'
links:
  - label: 'Paper'
    href: 'https://example.com/paper'
draft: false
```

Required fields are `title`, `authors`, `status`, and `venue`. Status must be `under-review`, `accepted`, or `published`. This is the research status, independent of the site's `draft` field. Optional fields include `badge`, `year`, `doi`, `highlightAuthors`, and `order`. Authors display in the exact order given. The site owner's name is underlined automatically; `highlightAuthors` can identify additional names to underline.

Email buttons use a `mailto:` destination, including the prefix:

```yaml
links:
  - label: 'Email'
    href: 'mailto:you@example.com'
```

A bare address such as `you@example.com` is not a URL and fails link validation. To add a subject, use `mailto:you@example.com?subject=Paper%20request`.

Use `links: []` when no link is available. Empty links are invalid. The `venue` field is the displayed venue or status wording; update it along with `status` when a paper is accepted or published. A DOI is stored as metadata; add a DOI URL to `links` to display a button. An optional Markdown body supplies an abstract or extra description.

## Presentations

Use a lowercase filename such as `llu-2026.md`, including for conference abbreviations. `LLU2026.md` is rejected by validation and prevents the Publications page from rendering. Create a correctly named draft with `npm run content:new -- presentations llu-2026`, then fill in the fields and set `draft: false`.

Required fields are `title`, ordered `authors`, `year`, `event`, and `type` (`paper`, `poster`, or `talk`). Use author names in the form you want displayed. `event` contains the displayed event sentence, including presentation status and location when known. The citation is generated from these fields; do not paste a duplicate citation in the Markdown body. The body is for optional extra notes.

An optional `publication` field can reference a publication's filename without `.md`. Validation checks that the referenced entry exists. This does not add a visible related-paper link automatically.

## Experience and education

Required fields are `title` (the role or degree), `organization`, `start`, `dateLabel`, and `logo`. Add an `end` date when appropriate; omit it for ongoing work. `dateLabel` preserves the human-readable date wording and should be updated alongside the dates. The optional Markdown body holds further details.

## Profile, navigation, and assets

Edit `content/site.yaml` to change social destinations, the portrait, or the CV. Supported social icons are `email`, `github`, `linkedin`, `scholar`, and `instagram`. Omit an unavailable profile rather than adding an empty URL.

The portrait includes required alternative text and image dimensions. Replace the file at its existing path or update its `src` in YAML. Add new logos under `public/static/logos/`.

The CV is currently unavailable: the `cv` block is omitted and its navigation entry has `visible: false`. `/cv` returns 404 while no CV is configured.

To publish an updated CV:

1. Add the PDF under `public/static/pdf/`.
2. Add the configuration below to `content/site.yaml` and set the `/cv` navigation entry to `visible: true`.
3. Open `/cv` and verify the download.

```yaml
cv:
  src: /static/pdf/your-file.pdf
  label: Download CV
```

To remove the CV again, omit the `cv` block, hide its navigation entry, and remove the old PDF from `public/static/pdf/` so its direct URL is also unavailable.

Links to local assets begin with `/static/`, without `public`. Internal routes begin with `/`. External links use `https://` (or `http://`); email links use `mailto:`. Validation checks local files and routes, plus URL syntax. It does not contact external websites or verify fragment anchors.

Navigation is a list of label/href/visible records in `site.yaml`. Set `visible: false` to hide an item from both desktop and mobile navigation. Visibility does not disable its route. Set `draft: true` in a page's frontmatter to make that page unavailable; hide its navigation item too. Published pages appear in the sitemap even if they are not in the navigation.

Existing page text and descriptions can be edited freely. Adding an entirely new page needs an application route as well as content; the `pages` template does not create route code.

## Check and publish

```sh
npm run content:check
npm run check
```

The first command checks metadata, Markdown, local links/assets, and references. Errors name the affected file and field. The full command runs lint, tests, type checking, and the production build. Builds also run content validation automatically.

In GitHub, edit or add the same files, then open a pull request so the checks can run. Preview deployments depend on the connected hosting project's configuration; this refactor does not configure or publish a deployment. Review the content diff and preview before merging into the configured production branch.

Do not invent authors, dates, publication statuses, or URLs to satisfy validation. Keep drafts hidden while resolving missing required information. The source of truth for available fields is `lib/content/schemas.ts`; examples live in `templates/`.
