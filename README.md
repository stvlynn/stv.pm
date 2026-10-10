# stv.pm

Steven Lynn's personal homepage: a handwritten signature, a short bio, work,
the latest posts from [blog.stv.pm](https://blog.stv.pm), a photo wall from
[Unsplash](https://unsplash.com/@stvlynn) and links elsewhere.

Agents start with **`AGENTS.md`** (same file as `CLAUDE.md`).

## Quick start

```sh
pnpm install
cp .env.example .env.local   # add UNSPLASH_ACCESS_KEY
pnpm dev                     # http://localhost:3000
pnpm check                   # typecheck + lint + test
```

## Stack

Next.js 16 (App Router, static export) · React 19 · Tailwind CSS 4 · Motion · beUI
components · Navy Ink design tokens (shared with the blog). See
[`docs/project/architecture.md`](docs/project/architecture.md).

## Documentation map

- [`docs/`](docs/README.md) — top-level documentation index.
- [`docs/project/`](docs/project/README.md) — what the site is and how it fits together.
- [`docs/frontend/`](docs/frontend/README.md) — **Feature-Sliced Design (FSD)** conventions.
- [`docs/backend/`](docs/backend/README.md) — **Domain-Driven Design (DDD)** layered conventions.
- [`docs/operations/`](docs/operations/README.md) — local development and deployment.
- [`docs/quality/`](docs/quality/README.md) — testing, code review and Agent Skills.
- [`docs/decisions/`](docs/decisions/README.md) — architecture decision records (ADRs).
