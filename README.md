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
