/** Canonical addresses and handles. Copy lives in `shared/i18n`, not here. */
export const site = {
  url: 'https://stv.pm',
  blogUrl: 'https://blog.stv.pm',
  blogFeedUrl: 'https://blog.stv.pm/rss/feed.xml',
  /** Dates on the page are shown in the owner's time zone. */
  timeZone: 'Asia/Shanghai',
  locale: 'en',
  social: {
    x: { href: 'https://x.com/stv_lynn', handle: '@stv_lynn' },
    telegram: { href: 'https://t.me/stvlynn', handle: '@stvlynn' },
    github: { href: 'https://github.com/stvlynn', handle: 'stvlynn' },
    unsplash: {
      href: 'https://unsplash.com/@stvlynn?utm_source=stv.pm&utm_medium=referral',
      handle: '@stvlynn'
    }
  },
  work: {
    tencent: { href: 'https://www.tencent.com/en-us/' },
    dify: { href: 'https://dify.ai' }
  }
} as const

export type SocialId = keyof typeof site.social
export type CompanyId = keyof typeof site.work
