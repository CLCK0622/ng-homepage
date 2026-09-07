# CLCK’s personal site

Next.js App Router site with Markdown writing, project notes, and an Unsplash photo gallery.

## Development

```sh
pnpm install
pnpm dev
pnpm lint
pnpm build
pnpm start --hostname 127.0.0.1 --port 3001
pnpm check:site
```

`check:site` checks every sitemap page, real 404 responses, canonical URLs, social metadata, RSS, the default PNG share image, and gallery cache headers. It defaults to `http://127.0.0.1:3001`; override with `SITE_CHECK_URL` to use another preview. Run it against a production build for accurate HTTP status checks.

## Content and SEO

- Articles: `src/posts/*.md`. Frontmatter supports `title`, `description`, `date`, `updated`, `tags`, `image`, `lang`, and `snow`. Set `updated` only when content actually changes; preserve the original publication date.
- Topic collections: `src/lib/topics.ts`. Project notes: `src/lib/caseStudies.ts`.
- Shared metadata and author identity: `src/lib/seo.ts`. A default share image is rendered at `/og`.
- When changing the main pages’ content, update the explicit date in `src/app/sitemap.ts`. Do not replace it with a deployment timestamp.
- Unknown article, topic, and project URLs return 404. New Markdown articles and configured project/topic slugs are generated on the next build.
- The Caveat font is locally hosted and subset to the handwritten page titles: Projects, Gallery, Writing, and About Me. Its OFL license is in `public/fonts`. Regenerate the subset if those titles change.

## Photography

Set `UNSPLASH_ACCESS_KEY` in the deployment environment (or `.env.local`). Optionally set `UNSPLASH_COLLECTION_ID` for the homepage’s rotating photo. Keys stay on the server.

Photo lists and statistics share a one-hour Next.js fetch cache. Photo details are cached for 24 hours. The public API also sends browser caching (5 minutes), CDN caching (1 hour), and stale-while-revalidate (24 hours). Lightbox details have a bounded 5-minute in-memory cache. Errors return 503 with `no-store`, and the gallery offers a retry.

Every thumbnail reserves the same 3:2 slot before its image downloads. Skeletons cover these existing slots; pagination never inserts differently sized placeholder rows. Unsplash thumbnails and lightbox images use its image CDN directly with responsive sizes.
