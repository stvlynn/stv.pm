# Project

This section describes the project at a high level: what it is, what it is not, and how the major parts fit together.

## Documents

- [`architecture.md`](architecture.md) — system architecture, module boundaries, and data flow.

## Project overview

`stv.pm` is Steven Lynn's personal homepage. It is one page, in English:

1. Name and a one-line bio.
2. **Work** — Tencent (product manager, now) and Dify (operations, before), each with a square logo.
3. **Writing** — the six latest posts from the blog at https://blog.stv.pm.
4. **Photos** — the twelve latest photographs from https://unsplash.com/@stvlynn, with a lightbox.
5. **Elsewhere** — X, Telegram, GitHub, Unsplash.
6. **Sign-off** — closes the page where a call to action would sit: a drawer that opens with the scroll onto Voyager 1's *Pale Blue Dot* (NASA/JPL-Caltech, public domain). It rises as a rounded sheet, widens to full screen and pins; once it is open the solid white signature writes itself. A faint halo breathes around Earth, and the footer sits on the pale band of sunlight at the bottom.

The Open Graph image (`frontend/app/opengraph-image.tsx`, rendered at build time) is the solid white signature over the same photograph, with no text.

## Goals

- Restrained, typographic layout after https://chloemaillot.fr: one narrow column, quiet section headings, content first.
- Purposeful motion: entrance reveals, a gliding hover pill on lists, a thumbnail-to-viewer morph, a view-transition theme switch, a scroll-driven drawer for the sign-off. Everything respects `prefers-reduced-motion`.
- Content stays current without redeploying: the page regenerates hourly from the blog and Unsplash.

## Non-goals

- No CMS of its own. Posts belong to the blog, photos to Unsplash.
- No client-side data fetching, analytics or tracking.

## Boundaries

- **Frontend:** [Feature-Sliced Design (FSD)](../frontend/README.md).
- **Backend:** [Domain-Driven Design (DDD) layered architecture](../backend/README.md).

Anything that crosses both boundaries is documented in [`architecture.md`](architecture.md).
