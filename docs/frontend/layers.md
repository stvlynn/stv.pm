# Layers

FSD uses six layers. Each layer has a single responsibility and a strict downward dependency direction.

## `app`

- Application initialization.
- Global providers (theme, router, state store, i18n).
- Global styles and CSS variables.
- Routing entry point.

**Does not contain:** business logic, reusable UI, or page-specific code.

## `pages`

- Page components mapped to URLs.
- Reading route parameters and passing them down.
- Page-level layout skeleton (header / content / footer).
- Composing widgets and features into a complete screen.

**Does not contain:** reusable UI, business logic, or direct API calls. Keep pages thin.

## `widgets`

- Self-contained UI blocks that belong to a page or a feature.
- Examples: header, sidebar, dashboard card, order summary panel.
- Can compose features and entities, but should remain focused on one visual block.

**Does not contain:** application-wide state or routing logic.

## `features`

- Complete user scenarios.
- Examples: authentication, search, add to cart, submit feedback.
- Contains UI, state, API calls, and utilities that belong to that scenario.

**Does not contain:** generic primitives (those go in `shared`) or domain rules that belong to `entities`.

## `entities`

- Domain data and rules.
- Examples: `User`, `Order`, `Product`, `Comment`.
- Contains types, factories, validation, and pure functions that operate on the entity.

**Does not contain:** UI, HTTP clients, or framework-specific code.

## `shared`

- Reusable primitives and utilities used by any layer.
- Examples: `Button`, `Input`, `formatDate`, `httpClient`, theme tokens, i18n helpers.

**Does not contain:** business logic or references to specific entities/features.

## Layer dependency direction

Imports can only go downward:

```
app -> pages -> widgets -> features -> entities -> shared
```

`shared` cannot import from any other layer. `entities` cannot import from `features` or above.

## In this project (Next.js App Router)

Next.js owns `frontend/app/` for routing, so the FSD layers live in `frontend/src/`:

| FSD layer | Path | Contents |
|-----------|------|----------|
| `app` | `src/app/` | `RootLayout`, `ThemeProvider`, `globals.css` (Navy Ink tokens), `metadata`, Open Graph image |
| `pages` | `src/pages/` | `home` |
| `widgets` | `src/widgets/` | `intro`, `work`, `writing`, `photo-wall`, `elsewhere`, `sign-off`, `site-header`, `site-footer` |
| `features` | `src/features/` | `toggle-theme` |
| `entities` | `src/entities/` | `post`, `photo` |
| `shared` | `src/shared/` | `assets`, `config`, `i18n`, `lib`, `ui/{motion,brand,signature,section}` |

`frontend/app/layout.tsx` and `frontend/app/page.tsx` stay one-liners: they import from `@/app` and `@/pages/home`, and `page.tsx` is the only frontend file that calls the backend. The empty `frontend/pages/` folder stops Next.js from treating `src/pages/` as the Pages Router.

Path aliases: `@/app`, `@/pages/*`, `@/widgets/*`, `@/features/*`, `@/entities/*`, `@/shared/*`, and `@backend/*` for `backend/src/*`. ESLint rejects upward imports and imports of slice internals.

`shared/ui/motion` holds components adapted from [beUI](https://beui.dev) (`SharedLayoutBg`, `TextReveal`, `ImageViewer`, `IconSwap`, `useViewTransitionTheme`) plus `Reveal` and `ScrollDrawer`. The signature (`shared/ui/signature`) comes in an `outline` variant (the artwork as drawn) and a `solid` variant (strokes filled, for use over photographs); its write animation holds while it sits inside a closed `ScrollDrawer` (`data-drawer="closed"`). Adapted files keep a header comment naming their beUI source; labels are passed in from `shared/i18n` instead of being written in the component.
