# Architecture

> High-level system architecture. Update this file when modules are added or boundaries move.

## Overview

One Next.js application (`frontend/`) renders a single statically generated page. On the server it calls the DDD backend (`backend/src/`), which reads two external sources. Nothing is fetched from the browser except images.

```text
                      build time only
+---------------------+   loadHome()   +------------------------------+
| frontend/app/[[...  | -------------> | backend/src/interfaces/web   |
| locale]]/page       |                | composition root             |
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
  app/                 Next.js routing only: [[...locale]]/{layout,page}.tsx, global-not-found.tsx,
                       icon.svg, opengraph-image.tsx
  pages/               empty on purpose (keeps Next.js off src/pages)
  src/
    app/               FSD app layer: root layout, theme provider, global CSS, metadata,
                       locale route params, 404 page, Open Graph image
    pages/home/        the homepage composition
    widgets/           intro, work, writing, photo-wall, elsewhere, sign-off, site-header, site-footer
    features/          toggle-theme, switch-language
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
| `frontend/app` | Next.js routes; the only place that calls the backend | `[[...locale]]/page.tsx` calls `loadHome()` |
| Frontend `app` | Document shell, providers, tokens | `RootLayout`, `globals.css` |
| Frontend `pages` | Page composition | `HomePage` |
| Frontend `widgets` | One block of the page each | `PhotoWall`, `Writing` |
| Frontend `features` | User scenarios | `ThemeToggle` |
| Frontend `entities` | Post/photo types and pure helpers | `formatPostDate`, `photoUrl` |
| Frontend `shared` | Copy, config, primitives, beUI motion components | `getCopy`, `SharedLayoutBg`, `ScrollDrawer` |
| Backend `interfaces` | Composition root for the web route | `loadHome` |
| Backend `application` | Use cases returning DTOs | `getHome` |
| Backend `domain` | Entities, ports, ordering rules | `Post`, `byNewest`, `PhotoRepository` |
| Backend `infrastructure` | External sources and configuration | `UnsplashPhotoRepository` |

Import direction is enforced by ESLint (`eslint.config.mjs`): FSD layers import only downward and only through a slice's `index.ts`; `domain` imports nothing outside itself; `application` does not import `infrastructure` or `interfaces`.

## Cross-cutting concerns

- **Frontend/backend contract** — `backend/src/application/home/dto.ts`. The frontend entities re-export `PostDto` and `PhotoDto` as `Post` and `Photo` (documented exception to "entities import only from shared"). Dates cross as ISO strings.
- **Blog contract** — the blog's JSON Feed must give every item `id`, `title`, `url` and `date_published`; NotionNext documents this in `docs/backend/interfaces.md`.
- **Error handling** — adapters raise `UpstreamError` or `ConfigurationError`. Nothing is swallowed: a failed source fails the render. A failed source fails the build; the previous deployment stays online until a successful build is deployed.
- **Copy and languages** — every visible string lives in `frontend/src/shared/i18n/{en,ja,zh}.ts`; `ja` and `zh` are typed against English (`Dictionary`), and a test checks they have exactly the same keys. Components take a `locale` prop and read `getCopy(locale)`. Addresses and handles live in `frontend/src/shared/config/site.ts`. Blog post titles and Unsplash descriptions come from their sources and are not translated.
- **Locale routing** — the root layout is the optional catch-all `app/[[...locale]]`: no segment is English at `/`, one segment is `/ja` or `/zh`. All three pages are prerendered (`generateStaticParams`, `dynamicParams = false`), each with its own `<html lang>` (`en`, `ja`, `zh-CN`) so browsers pick the regional CJK glyphs, `hreflang` alternates, `og:locale` and a per-locale CJK font fallback (`--font-cjk`). Because each locale is its own root layout, switching languages is a full page load. With no root layout at `app/`, the 404 page is `app/global-not-found.tsx` (`experimental.globalNotFound`), in English. `TextReveal` animates CJK text one character at a time (`splitTextUnits`) so lines without spaces still wrap.
- **Cursor** — on devices with a fine pointer the whole site uses its own arrow cursor, filled with the signature heart's pink (`#fba1a1`) and outlined in white; links and buttons show the same arrow slightly larger. They are native CSS cursors (SVG data URIs with 1x/2x `image-set`) in `globals.css`, so they appear with the first paint and never trail the pointer. Do not add `cursor-*` utilities that would bring back system cursors. Small controls (the theme toggle, the language switcher, the photo viewer's close/previous/next) are wrapped in `Magnetic` (`shared/ui/motion`): over them the cursor hides and a heart-pink highlight (`--heart-glow`) takes its place, leaning toward the pointer further than the control's content, then both spring back on leave. Disabled controls and touch input are left alone.
- **Theming** — Navy Ink tokens in `frontend/src/app/styles/globals.css`, light/dark via `next-themes` (`.dark` on `<html>`).
- **Pale Blue Dot** — `shared/assets/pale-blue-dot.jpg` is served through `next/image` as the original exported asset (no runtime image optimizer) in the sign-off drawer, loaded eagerly with the page together with `signature.png` (both are preloaded in `<head>`) so the drawer never opens onto an empty frame, and read from disk by the Open Graph route. `PALE_BLUE_DOT.earth` records where Earth sits in the frame; the drawer keeps that point in view at every aspect ratio. Nothing is overlaid on the photograph. Colours on the photo come from theme-independent tokens (`--photo-night`, `--on-photo-glow`).
- **Images** — gallery images are hot-linked from Unsplash's CDN (`urls.raw` plus imgix sizing), as Unsplash's API guidelines require; links back carry `utm_source=stv.pm&utm_medium=referral`.

## Technology stack

- Runtime: Node.js 22+ (`.nvmrc`), pnpm 9
- Framework: Next.js 16 App Router with static export (`output: 'export'`), React 19, TypeScript 5.9
- Styling: Tailwind CSS 4, Navy Ink tokens, Geist Sans/Mono (`geist` package, self-hosted)
- Motion: `motion` 13; components adapted from beUI (https://beui.dev)
- Icons: `lucide-react`, `simple-icons` (social), LobeHub marks (company logos)
- Tests: Vitest
- Hosting: Cloudflare Workers Static Assets (no server runtime or resource bindings), or any static host (see [`../operations/deployment.md`](../operations/deployment.md))
