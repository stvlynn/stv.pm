# Local Development

## Prerequisites

- Node.js 22+ and pnpm 9.
- An Unsplash app's **Access Key** (https://unsplash.com/oauth/applications). The demo tier allows 50 requests an hour, far above what a build uses.

## Setup

1. `pnpm install`
2. `cp .env.example .env.local` and set `UNSPLASH_ACCESS_KEY`. Next.js reads `.env.local` from `frontend/`, so either put the file there or export the variables in your shell.
3. `pnpm dev` and open http://localhost:3000.

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `UNSPLASH_ACCESS_KEY` | yes | Unsplash API access key. Missing → `ConfigurationError` and the page does not render. |
| `BLOG_FEED_URL` | no | JSON Feed of the blog. Defaults to `https://blog.stv.pm/rss/feed.json`. |
| `UNSPLASH_API_URL` | no | Unsplash API base. Defaults to `https://api.unsplash.com`. |
| `UNSPLASH_USERNAME` | no | Whose photos to show. Defaults to `stvlynn`. |

The endpoint overrides exist to point the app at a local stub, for example when working offline. A stub needs to serve `GET /rss/feed.json` (JSON Feed with `id`, `title`, `url`, `date_published` per item) and `GET /users/:username/photos` (Unsplash photo objects with `id`, `width`, `height`, `color`, `alt_description`, `urls.raw`, `links.html`).

## Running tests

```sh
pnpm test
```

## Linting and formatting

```sh
pnpm lint            # ESLint, including FSD/DDD import boundaries
pnpm format          # Prettier (with the Tailwind class sorter)
```

## Common issues

- **`UNSPLASH_ACCESS_KEY is not set`** — the variable is not visible to `next`; see setup step 2.
- **`[blog] expected non-empty string "date_published"`** — the blog is on a NotionNext version from before the feed contract. Deploy the blog first.
