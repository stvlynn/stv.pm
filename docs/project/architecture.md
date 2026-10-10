# Architecture

> High-level system architecture. Update this file when modules are added or boundaries move.

## Overview

One Next.js application (`frontend/`) renders a single statically generated page. On the server it calls the DDD backend (`backend/src/`), which reads two external sources. Nothing is fetched from the browser except images.

```text
                      build / hourly ISR
+---------------------+   loadHome()   +------------------------------+
| frontend/app/page   | -------------> | backend/src/interfaces/web   |
| (Next.js route)     |                | composition root             |
+---------------------+                +------------------------------+
          |                                          |
          v                                          v
+---------------------+                +------------------------------+
| frontend/src        |                | application/home/get-home    |
| FSD: pages/home ->  |                | (use case, returns DTOs)     |
| widgets -> features |                +------------------------------+
| -> entities ->      |                       |               |
| shared              |                       v               v
+---------------------+        +-------------------+  +----------------------+
                               | JsonFeedPost-     |  | UnsplashPhoto-       |
                               | Repository        |  | Repository           |
                               +-------------------+  +----------------------+
                                        |                      |
                                        v                      v
                         blog.stv.pm/rss/feed.json   api.unsplash.com/users/
                         (NotionNext, JSON Feed)     stvlynn/photos
```

## Directory layout

```text
frontend/
  app/                 Next.js routing only: layout.tsx, page.tsx, icon.svg, opengraph-image.tsx
  pages/               empty on purpose (keeps Next.js off src/pages)
  src/
    app/               FSD app layer: root layout, theme provider, global CSS, metadata
    pages/home/        the homepage composition
    widgets/           intro, work, writing, photo-wall, elsewhere, sign-off, site-header, site-footer
    features/          toggle-theme
    entities/          post, photo (types = backend DTOs, plus pure helpers)
    shared/            assets (Pale Blue Dot, signature), config, i18n (all copy), lib, ui (motion, brand, section)
backend/src/
  domain/              Post, Photo, repository ports, errors
  application/home/    getHome use case and DTOs
  infrastructure/      env config, JSON Feed and Unsplash adapters, HTTP helpers
  interfaces/web/      loadHome(): wires adapters into the use case
```

## Module boundaries

| Module | Responsibility | Example |
|--------|----------------|---------|
| `frontend/app` | Next.js routes; the only place that calls the backend | `page.tsx` calls `loadHome()` |
| Frontend `app` | Document shell, providers, tokens | `RootLayout`, `globals.css` |
| Frontend `pages` | Page composition | `HomePage` |
| Frontend `widgets` | One block of the page each | `PhotoWall`, `Writing` |
| Frontend `features` | User scenarios | `ThemeToggle` |
| Frontend `entities` | Post/photo types and pure helpers | `formatPostDate`, `photoUrl` |
| Frontend `shared` | Copy, config, primitives, beUI motion components | `copy`, `SharedLayoutBg`, `Signature` |
| Backend `interfaces` | Composition root for the web route | `loadHome` |
| Backend `application` | Use cases returning DTOs | `getHome` |
| Backend `domain` | Entities, ports, ordering rules | `Post`, `byNewest`, `PhotoRepository` |
| Backend `infrastructure` | External sources and configuration | `UnsplashPhotoRepository` |

Import direction is enforced by ESLint (`eslint.config.mjs`): FSD layers import only downward and only through a slice's `index.ts`; `domain` imports nothing outside itself; `application` does not import `infrastructure` or `interfaces`.

## Cross-cutting concerns

- **Frontend/backend contract** — `backend/src/application/home/dto.ts`. The frontend entities re-export `PostDto` and `PhotoDto` as `Post` and `Photo` (documented exception to "entities import only from shared"). Dates cross as ISO strings.
- **Blog contract** — the blog's JSON Feed must give every item `id`, `title`, `url` and `date_published`; NotionNext documents this in `docs/backend/interfaces.md`.
- **Error handling** — adapters raise `UpstreamError` or `ConfigurationError`. Nothing is swallowed: a failed source fails the render. With ISR, a failed hourly regeneration keeps serving the last good page; a failed first build fails the deploy.
- **Copy** — every visible string lives in `frontend/src/shared/i18n/en.ts`; addresses and handles in `frontend/src/shared/config/site.ts`.
- **Theming** — Navy Ink tokens in `frontend/src/app/styles/globals.css`, light/dark via `next-themes` (`.dark` on `<html>`).
- **Pale Blue Dot** — `shared/assets/pale-blue-dot.jpg` is served through `next/image` (resized, modern formats, blur placeholder) in the sign-off drawer, and read from disk by the Open Graph route. `PALE_BLUE_DOT.earth` records where Earth sits in the frame; the drawer keeps that point in view at every aspect ratio and draws its halo there. Colours on the photo come from theme-independent tokens (`--photo-night`, `--on-photo-glow`).
- **Images** — gallery images are hot-linked from Unsplash's CDN (`urls.raw` plus imgix sizing), as Unsplash's API guidelines require; links back carry `utm_source=stv.pm&utm_medium=referral`.

## Technology stack

- Runtime: Node.js 20+ (`.nvmrc`), pnpm 9
- Framework: Next.js 16 App Router with ISR (`revalidate = 3600`), React 19, TypeScript 5.9
- Styling: Tailwind CSS 4, Navy Ink tokens, Geist Sans/Mono (`geist` package, self-hosted)
- Motion: `motion` 13; components adapted from beUI (https://beui.dev)
- Icons: `lucide-react`, `simple-icons` (social), LobeHub marks (company logos)
- Tests: Vitest
- Hosting: Vercel (see [`../operations/deployment.md`](../operations/deployment.md))
