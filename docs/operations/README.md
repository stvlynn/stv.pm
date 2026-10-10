# Operations

This section covers how the project is run, built, deployed, and monitored.

## Documents

- [`local-dev.md`](local-dev.md) — local development setup.
- [`deployment.md`](deployment.md) — deployment guide.

## Environment

- Runtime: Node.js 20+ (`.nvmrc`), pnpm 9 (`packageManager` in `package.json`).
- Environment variables: see [`local-dev.md`](local-dev.md#environment-variables).
- No database, cache or broker. Content comes from the blog's JSON Feed and the Unsplash API.

## Commands

```sh
pnpm install          # install dependencies
pnpm dev              # dev server on http://localhost:3000
pnpm build            # production build (fetches the blog feed and Unsplash)
pnpm start            # serve the production build
pnpm check            # typecheck + lint + test (what CI runs, plus format:check)
```

`make help` lists the same commands.
