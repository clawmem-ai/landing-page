# ClawMem Landing Page & Docs

Landing page, documentation, and blog for [ClawMem](https://clawmem.ai) — structured, persistent memory for OpenClaw agents.

## Links

| Service | URL |
|---------|-----|
| Landing page | https://clawmem.ai |
| Documentation | https://clawmem.ai/getting-started |
| Console | https://console.clawmem.ai |
| Discord | https://discord.com/invite/PwdFYdMm4t |
| GitHub | https://github.com/clawmem-ai |

## Tech Stack

- [Astro](https://astro.build) + [Starlight](https://starlight.astro.build) for docs
- Custom landing page at `/`
- Blog at `/blog`
- Deployed via Docker + nginx

## Development

```bash
npm install
npm run dev        # start dev server
npm run build      # production build
npm run preview    # preview production build
```

## Blog content

Posts live in `src/content/blog/*.md`. The blog index uses a card grid with
All posts, ClawMem, AGS, Use case, and Product announcement filters.
Each filter matches the card's single tag; counts update automatically.

Add these fields to a post's existing frontmatter to classify and style it:

```yaml
category: community # optional internal authorship metadata, not a visible filter
author: "Original author's name" # required for community posts
tag: AGS # exactly one: ClawMem | AGS | Use case | Product announcement
coverImage: "/blog/my-post/cover.jpg" # optional, file lives under public/
coverBackground: "#f6f2eb" # optional, match the image edges in letterboxed space
coverText: "A short cover headline" # optional fallback when there is no image
coverTheme: mint # coral | mint | sky | sand | plum
```

Each post must have exactly one `tag`, shared by its card, sidebar filter, and
article breadcrumb. `category` is internal authorship metadata only; community
contributions must still credit their original author on the article page.
Cards show a cover, date, title, and tag—no excerpt, source badge, author, or avatar.
Article pages retain attribution; descriptions remain available for page metadata.

Use a landscape cover image when available. Without one, the card uses a colored
text cover. Place assets in `public/blog/<post-slug>/`. Tag-filter pages live
under `/blog/category/<tag>/`, separate from the article URLs.
Only add approved content: an empty category shows a real empty state, not demo posts.

PNG files are ignored by default. Add an exact exception in `.gitignore` for each
approved PNG cover and commit the image itself alongside its frontmatter. Never
reference local Downloads or generated-image paths. Covers under `public/blog/`
are deployed with the site and do not require a separate image-hosting service.
After building, run `node scripts/check-blog-assets.mjs` to verify cover decoding,
rendered image paths, category pages, and byte-for-byte copies in `dist/`. Before
committing, stage the assets and add `--tracked` to also verify their Git index bytes.

## Deployment

```bash
docker build --build-arg GIT_SHA=$(git rev-parse --short HEAD) -t clawmem-landing .
docker run -p 8080:8080 clawmem-landing
```

## Skill Publishing

Publish the ClawMem install skill to CrawHub:

```bash
make clawmem-install   # install clawhub CLI
VERSION=x.y.z make clawmem-publish
```

Requires `CLAWHUB_TOKEN` in env or `.env` file.

## License

Apache-2.0
