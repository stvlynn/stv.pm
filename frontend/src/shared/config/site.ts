/** Canonical addresses and handles. Copy lives in `shared/i18n`, not here. */
export const site = {
  url: 'https://stv.pm',
  blogUrl: 'https://blog.stv.pm',
  blogFeedUrl: 'https://blog.stv.pm/rss/feed.xml',
  /** Dates on the page are shown in the owner's time zone. */
  timeZone: 'Asia/Shanghai',
  social: {
    x: { href: 'https://x.com/stv_lynn', handle: '@stv_lynn' },
    telegram: { href: 'https://t.me/stvlynn', handle: '@stvlynn' },
    github: { href: 'https://github.com/stvlynn', handle: 'stvlynn' },
    unsplash: {
      href: 'https://unsplash.com/@stvlynn?utm_source=stv.pm&utm_medium=referral',
      handle: '@stvlynn'
    }
  },
  /** Coffee chat booking (Feishu / Lark Scheduler): full page and inline embed. */
  coffeeChat: {
    href: 'https://astrafoundry.feishu.cn/scheduler/723c3c81f9126023',
    embedUrl: 'https://astrafoundry.feishu.cn/scheduler/embed/723c3c81f9126023',
    widgetScript: 'https://astrafoundry.feishu.cn/scheduler/embed/scheduler-widget.js'
  },
  work: {
    tencent: { href: 'https://www.tencent.com/en-us/' },
    dify: { href: 'https://dify.ai' }
  }
} as const

export type SocialId = keyof typeof site.social
export type CompanyId = keyof typeof site.work
