# STV.PM

Steven Lynn's personal homepage, built as a Vite + React portfolio site. The page combines a full-screen personal intro, open-source project highlights, work experience, an Unsplash photography reel, and social/contact links.

## Overview

This site presents Steven Lynn as an AI explorer, open-source builder, and amateur landscape photographer. It is designed with an editorial grid system, sharp black rules, warm paper-toned background, large typographic hierarchy, and low-saturation imagery that transitions to full color on hover.

## Features

- Full-screen hero section with responsive text and artwork.
- Streaming XMarkdown hero copy with an animated hook-word click.
- Free cursor guide overlay inspired by software cursor rendering, with keyword framing and section-aware re-entry.
- Low-saturation image treatment with slow non-linear hover transitions.
- Open-source project grid linking to Steven's GitHub repositories.
- Personal operating-system section describing Steven's AI/product focus.
- Work experience section with LobeHub company icons and a LinkedIn CTA.
- Auto-scrolling Unsplash photography reel with reduced-motion support.
- Footer with email, GitHub, X, blog, Telegram, and LinkedIn links.
- Optimized hero imagery with WebP and JPEG fallback.

## Tech Stack

- React 19
- TypeScript
- Vite
- CSS Modules
- Ant Design XMarkdown
- LobeHub Icons
- ESLint

## Project Structure

```text
.
├── Makefile
├── README.md
└── portfolio/
    ├── public/
    │   └── images/
    │       ├── hero-lynn.jpg
    │       └── hero-lynn.webp
    ├── src/
    │   ├── components/
    │   │   ├── FreeCursorGuide.tsx
    │   │   ├── Hero.tsx
    │   │   ├── InfoTable.tsx
    │   │   ├── PhotographyReel.tsx
    │   │   ├── ProjectCard.tsx
    │   │   ├── ProjectGrid.tsx
    │   │   ├── SectionHeader.tsx
    │   │   ├── SiteFooter.tsx
    │   │   └── WorkExperience.tsx
    │   ├── data/
    │   │   ├── cursorGuide.ts
    │   │   ├── experience.ts
    │   │   ├── photography.ts
    │   │   └── projects.ts
    │   ├── App.tsx
    │   ├── index.css
    │   └── main.tsx
    └── package.json
```

## Getting Started

Install dependencies from the repository root:

```bash
make install
```

Start the local development server:

```bash
make dev
```

Build for production:

```bash
make build
```

Run lint and production build together:

```bash
make check
```

Preview the production build:

```bash
make preview
```

## Makefile Commands

```text
make help       Show available commands
make install    Install app dependencies
make dev        Start the Vite development server
make build      Build the production bundle
make lint       Run ESLint
make preview    Preview the production build
make check      Run lint and production build
make clean      Remove generated build artifacts
make reinstall  Reinstall dependencies from scratch
```

## Content Sources

The homepage copy and links are based on Steven Lynn's public profiles:

- GitHub: [https://github.com/stvlynn](https://github.com/stvlynn)
- X: [https://x.com/stv_lynn](https://x.com/stv_lynn)
- Blog: [https://blog.stv.pm](https://blog.stv.pm)
- Steven's Diary: [https://t.me/stv_diary](https://t.me/stv_diary)
- FirstLab: [https://discord.gg/PwZDHH4mv3](https://discord.gg/PwZDHH4mv3)
- Telegram: [https://t.me/stvlynn](https://t.me/stvlynn)
- Hugging Face: [https://huggingface.co/stvlynn](https://huggingface.co/stvlynn)
- LinkedIn: [https://www.linkedin.com/in/hongyiling/](https://www.linkedin.com/in/hongyiling/)
- Unsplash: [https://unsplash.com/@stvlynn](https://unsplash.com/@stvlynn)

Photography images in the reel link back to Steven's public Unsplash photo pages. The section uses Unsplash-hosted image URLs with size and quality parameters for reasonable page weight.

## Image Assets

The hero artwork lives in:

```text
portfolio/public/images/hero-lynn.jpg
portfolio/public/images/hero-lynn.webp
```

The WebP image is preferred by browsers that support it. JPEG is kept as a fallback.

## Accessibility And Motion

- External links open in a new tab with `rel="noreferrer"`.
- Hero artwork includes descriptive alt text.
- Animated image transitions and the photography reel respect `prefers-reduced-motion`.
- Duplicate reel items are hidden from keyboard focus and screen readers.

## Deployment

The app is a standard Vite static build. Run:

```bash
make build
```

Then deploy the generated output from:

```text
portfolio/dist
```

## License

No license has been specified yet.