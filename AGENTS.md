<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Website content workflow

This is the current `tera-site` project for yifangcheng.me. Read `docs/editing-content.md` before content changes.

- Routine edits belong in `content/` and new assets in `public/static/`; keep layout changes in `app/` and `components/`.
- Content is plain Markdown with YAML frontmatter. Do not insert JSX, HTML, imports, or styling classes.
- Use `lib/content/schemas.ts` as the content contract and `templates/` as examples. New fields require intentional schema and rendering changes.
- Keep one entry per file. Preserve stable filenames, author order, research claims, publication status, and known date precision. Never invent missing authors, dates, venues, or links.
- Publication status (`under-review`, `accepted`, `published`) is independent of site `draft` status. Unavailable links are omitted, not empty strings.
- New entries created with `npm run content:new -- <collection> <slug>` are drafts. Drafts remain hidden in all environments until explicitly marked ready.
- `content/site.yaml` is the source for profile/social links, navigation, section labels, portrait, and CV. Hide unavailable social profiles by omitting them.
- Links to assets start with `/static/`. Preserve existing public asset URLs when replacing or adding files unless removal is requested. The optional `cv` block configures `/cv`; when omitted, hide its navigation and remove any CV PDF that should no longer be public.
- Explicit numeric `order` takes precedence over date ordering. Do not reorder existing publications or citations accidentally.
- Presentation citations render from metadata. Put only additional notes in the Markdown body. Career `title` is the displayed role/degree; keep `dateLabel` consistent with `start`/`end`.
- Run `npm run content:check` for content edits and `npm run check` before final delivery. Do not bypass content validation to make a build pass.
- For layout changes, inspect mobile/desktop views and theme switching. Keep content loading server-side and interactive client components small.
- Update the editing guide and templates if content conventions change. Preserve the generated Next.js guidance above.
