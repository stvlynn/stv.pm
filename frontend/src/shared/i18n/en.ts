/**
 * Every user-facing string on the site. Components read from here by key;
 * nothing visible is written inline in JSX.
 */
export const en = {
  meta: {
    title: 'Steven Lynn',
    description: 'Product manager at Tencent. Previously in operations at Dify.'
  },
  intro: {
    name: 'Steven Lynn',
    bio: ['Product manager at Tencent.', 'Before that, I ran operations at Dify.']
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
    label: 'Signed, Steven Lynn'
  },
  theme: {
    toLight: 'Switch to light theme',
    toDark: 'Switch to dark theme'
  },
  footer: {
    copyright: (year: number) => `© ${year} Steven Lynn`,
    rss: 'RSS'
  }
} as const
