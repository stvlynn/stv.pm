# Deployment

## Deployment target

- Hosting: Cloudflare Workers via OpenNext, or Vercel (native Next.js ISR). Any Node host that runs `next start` works the same way.
- CI: GitHub Actions (`.github/workflows/ci.yml`) runs lint, format check, typecheck and tests on pushes and pull requests to `main`. It does not build, because a build needs the Unsplash key and network access.

## Vercel project settings

`frontend/vercel.json` sets the framework and runs install and build from the repository root, where the lockfile and `backend/` live (the same layout the NotionNext blog deploys with).

| Setting | Value |
|---------|-------|
| Root Directory | `frontend` |
| Include files outside the root directory | enabled |
| Environment variables | `UNSPLASH_ACCESS_KEY` for Production and Preview |
| Domain | `stv.pm` |

## Build

```sh
pnpm build
```

The build renders the homepage once, so it needs `UNSPLASH_ACCESS_KEY` and network access to `blog.stv.pm` and `api.unsplash.com`.

## Content freshness

The homepage is regenerated at most once an hour (`export const revalidate = 3600` in `frontend/app/page.tsx`). If the blog or Unsplash fails during a regeneration, the previous page keeps being served and the error is logged by the host.

## Order of deploys

The homepage depends on the blog's JSON Feed carrying `id` and `date_published` on each item. Deploy the NotionNext change that adds them before the first deploy of this site.

## Rollback

Promote the previous deployment in Vercel. There is no state to migrate.

## Cloudflare Workers

OpenNext runs the Next.js server on Workers. Configuration lives in
`frontend/open-next.config.ts` and `frontend/wrangler.jsonc`; dependencies and
scripts remain at the repository root.

```sh
pnpm install --frozen-lockfile
pnpm exec wrangler r2 bucket create stv-pm-next-cache
pnpm build:worker
pnpm deploy:worker
```

Create the R2 bucket once. The `NEXT_INC_CACHE_R2_BUCKET` binding stores ISR
content, and the `NEXT_CACHE_DO_QUEUE` Durable Object coordinates hourly
regeneration. No D1 database is needed because the site does not use on-demand
tag or path revalidation.

Set `UNSPLASH_ACCESS_KEY` in both the build environment and the Worker's runtime
secrets. For local builds, use the ignored `frontend/.env.local`; for runtime
secrets, run `pnpm exec wrangler secret put UNSPLASH_ACCESS_KEY --config
frontend/wrangler.jsonc`. Never commit the key.

Workers Builds settings:

| Setting | Value |
|---------|-------|
| Root directory | `/` |
| Build command | `pnpm build:worker` |
| Deploy command | `pnpm deploy:worker` |
| Preview command | `cd frontend && pnpm exec opennextjs-cloudflare upload` |
| Build secret | `UNSPLASH_ACCESS_KEY` |

`pnpm preview:worker` serves a completed OpenNext build in the local Workers
runtime. Roll back by promoting a previous Worker version in Cloudflare.
