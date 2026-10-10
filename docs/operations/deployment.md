# Deployment

## Deployment target

The application is exported to `frontend/out` and served by Cloudflare Workers
Static Assets. There is no Worker application script, server runtime, R2 bucket,
Durable Object, database, or runtime secret. Any static host can serve the output.

CI runs lint, format check, typecheck and tests on pushes and pull requests to
`main`. A production build also needs the Unsplash key and network access.

Wrangler requires Node.js 22 or later. Workers Builds and GitHub CI read
`.nvmrc` to select a compatible runtime.

## Build and deploy

```sh
pnpm install --frozen-lockfile
pnpm build
pnpm deploy:worker
```

Each build clears Next.js' persisted fetch cache, fetches the blog JSON Feed and Unsplash photos, renders the homepage,
and exports HTML, CSS, JavaScript, and metadata files. Set `UNSPLASH_ACCESS_KEY`
in the build environment or the ignored `frontend/.env.local`; never commit it.
The key is only used during compilation and is not included in public assets.

`wrangler.jsonc` uploads `frontend/out` as static assets to `stv-pm`.
`pnpm start` or `pnpm preview:worker` previews the completed export locally.

## Content freshness

Content changes only when a new build is deployed. Visitors receive the
precompiled files and do not trigger blog or Unsplash API requests. Gallery
images continue loading directly from the Unsplash image CDN. A failed source
fails the build and leaves the previous deployment available.

The blog feed must provide `id`, `title`, `url`, and `date_published` for each item.

## Workers Builds settings

| Setting | Value |
|---------|-------|
| Root directory | `/` |
| Build command | `pnpm build` |
| Deploy command | `pnpm deploy:worker` |
| Preview command | `pnpm exec wrangler versions upload` |
| Build secret | `UNSPLASH_ACCESS_KEY` |

The root Wrangler configuration prevents automatic framework migration to OpenNext.
Set the build command explicitly so the export exists before deployment.

Git integration is optional; the commands also support local deployments.

## Rollback

Promote a previous static deployment in Cloudflare. There is no application state
to migrate.
