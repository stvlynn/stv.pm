# 001: Next.js with ISR for a one-page site

## Status

Accepted

## Context

The homepage shows content owned elsewhere: posts on the NotionNext blog and photos on Unsplash. It should stay current without manual redeploys, load fast, and keep the Unsplash access key off the client. The blog is already Next.js and React, and the UI uses beUI components, which are React + Motion.

## Decision

Build the site with the Next.js App Router and render the page on the server with incremental static regeneration (`revalidate = 3600`). Data loading goes through a small DDD backend (`backend/src`) that the route calls directly; there is no separate API.

## Alternatives considered

- **Static export, rebuilt on a schedule** — needs a cron and a redeploy for every refresh.
- **Client-side fetching** — exposes the Unsplash key (or needs a proxy anyway) and paints empty sections first.
- **Astro or Vite** — would work, but beUI targets React, and sharing conventions with the blog matters more than the smaller runtime.

## Consequences

- One hourly server render per region; the page is otherwise static.
- A failing source never produces a partial page: regeneration fails and the last good page stays up.
- The first build needs network access and the Unsplash key, so CI does not build.
