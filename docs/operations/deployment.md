# Deployment

## Deployment target

- Hosting: Vercel (native Next.js ISR). Any Node host that runs `next start` works the same way.
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
