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
6. **Sign-off** — the handwritten signature closes the page where a call to action would sit. It writes itself once it scrolls into view.

The blog (repository `stvlynn/NotionNext`, theme `navyink`) links back here from its header ("About") and footer, and both sites use the same Navy Ink design tokens.

## Goals

- Restrained, typographic layout after https://chloemaillot.fr: one narrow column, quiet section headings, content first.
- Purposeful motion: entrance reveals, a gliding hover pill on lists, a thumbnail-to-viewer morph, a view-transition theme switch. Everything respects `prefers-reduced-motion`.
- Content stays current without redeploying: the page regenerates hourly from the blog and Unsplash.

## Non-goals

- No CMS of its own. Posts belong to the blog, photos to Unsplash.
- No client-side data fetching, analytics or tracking.

## Boundaries

- **Frontend:** [Feature-Sliced Design (FSD)](../frontend/README.md).
- **Backend:** [Domain-Driven Design (DDD) layered architecture](../backend/README.md).

Anything that crosses both boundaries is documented in [`architecture.md`](architecture.md).
