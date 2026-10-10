# Project

This section describes the project at a high level: what it is, what it is not, and how the major parts fit together.

## Documents

- [`architecture.md`](architecture.md) — system architecture, module boundaries, and data flow.

## Project overview

`stv.pm` is Steven Lynn's personal homepage. It is one page, published in English (default, at `/`), Japanese (`/ja`) and Simplified Chinese (`/zh`); an EN · JA · ZH switcher sits in the header next to the theme toggle:

1. Name and a two-line introduction: building foundations for the next generation of humans and agents, on the way to AGI. Roles live under **Work**, not here.
2. **Work** — Tencent (product manager, now) and Dify (operations, before), each with a square logo.
3. **Writing** — the six latest posts from the blog at https://blog.stv.pm.
4. **Photos** — the twelve latest photographs from https://unsplash.com/@stvlynn, with a lightbox.
5. **Coffee chat** — one line and Feishu's (Lark) Scheduler inline embed (`site.coffeeChat.embedUrl`, 626px tall) to book a call on the page; a link next to the heading opens the full scheduler in a new tab.
6. **Elsewhere** — X, Telegram, GitHub, Unsplash.
7. **Sign-off** — closes the page where a call to action would sit: a drawer that opens with the scroll onto Voyager 1's *Pale Blue Dot* (NASA/JPL-Caltech, public domain). It rises as a rounded sheet, widens to full screen and pins, showing the original handwritten signature image (`shared/assets/signature.png`) as drawn. The photograph is shown as is, with nothing drawn over it, and the footer sits on the pale band of sunlight at the bottom.

The Open Graph image (`frontend/app/opengraph-image.tsx`, rendered at build time) is a solid white vector trace of the signature over the same photograph, with no text.

## Goals

- Restrained, typographic layout after https://chloemaillot.fr: one narrow column, quiet section headings, content first.
- Purposeful motion: entrance reveals, a gliding hover pill on lists, a thumbnail-to-viewer morph, a view-transition theme switch, a scroll-driven drawer for the sign-off. Everything respects `prefers-reduced-motion`.
- Content is captured from the blog and Unsplash at build time. Rebuild and redeploy to publish fresh content.

## Non-goals

- No CMS of its own. Posts belong to the blog, photos to Unsplash.
- No client-side data fetching, analytics or tracking.

## Boundaries

- **Frontend:** [Feature-Sliced Design (FSD)](../frontend/README.md).
- **Backend:** [Domain-Driven Design (DDD) layered architecture](../backend/README.md).

Anything that crosses both boundaries is documented in [`architecture.md`](architecture.md).
