/**
 * Every user-facing string on the site, in English (the default locale).
 * Components read from a dictionary by key; nothing visible is written inline
 * in JSX. `ja.ts` and `zh.ts` must provide the same keys (`Dictionary`).
 */
export const en = {
  meta: {
    title: 'Steven Lynn',
    description: 'Building foundations for the next generation of humans and agents.'
  },
  intro: {
    name: 'Steven Lynn',
    bio: [
      'Building foundations for the next generation of humans and agents.',
      'On the way to AGI.'
    ]
  },
  work: {
    title: 'Work',
    companies: {
      tencent: { name: 'Tencent', role: 'Product Manager', period: 'Now' },
      dify: { name: 'Dify', role: 'Operations', period: 'Before' }
    }
  },
  writing: {
    title: 'Writing',
    all: 'All posts'
  },
  photos: {
    title: 'Photos',
    more: 'More on Unsplash',
    gallery: 'Photographs by Steven Lynn',
    untitled: 'Untitled photograph',
    viewOnUnsplash: 'View on Unsplash',
    open: (alt: string) => `Open ${alt}`,
    viewer: {
      close: 'Close viewer',
      previous: 'Previous photo',
      next: 'Next photo',
      zoomIn: 'Zoom in',
      zoomOut: 'Zoom out',
      panHelp:
        'When zoomed in, drag the photo to pan, or keep this control focused and use the arrow keys.',
      failed: 'This photo could not be loaded.'
    }
  },
  elsewhere: {
    title: 'Elsewhere',
    links: {
      x: 'X',
      telegram: 'Telegram',
      github: 'GitHub',
      unsplash: 'Unsplash'
    }
  },
  signOff: {
    label: 'Signed, Steven Lynn',
    photoAlt:
      'Earth as a single pale blue point of light inside a band of scattered sunlight, photographed by Voyager 1 from about six billion kilometres away',
    credit: 'Pale Blue Dot · Voyager 1, 14 February 1990 · NASA/JPL-Caltech'
  },
  theme: {
    toLight: 'Switch to light theme',
    toDark: 'Switch to dark theme'
  },
  footer: {
    copyright: (year: number) => `© ${year} Steven Lynn`,
    rss: 'RSS'
  },
  language: {
    label: 'Language'
  },
  notFound: {
    title: 'Page not found',
    home: 'Back to the homepage'
  }
} as const
