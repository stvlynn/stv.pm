import type { Dictionary } from './types'

export const zh: Dictionary = {
  meta: {
    title: 'Steven Lynn',
    description: '为下一代人类与 Agent 构建基座。'
  },
  intro: {
    name: 'Steven Lynn',
    bio: ['为下一代人类与 Agent 构建基座。', '在通往 AGI 的路上。']
  },
  work: {
    title: '经历',
    companies: {
      tencent: { name: '腾讯', role: '产品经理', period: '现在' },
      dify: { name: 'Dify', role: '运营', period: '此前' }
    }
  },
  writing: {
    title: '文章',
    all: '全部文章'
  },
  photos: {
    title: '摄影',
    more: '在 Unsplash 查看更多',
    gallery: 'Steven Lynn 的摄影作品',
    untitled: '未命名照片',
    viewOnUnsplash: '在 Unsplash 查看',
    open: (alt: string) => `打开：${alt}`,
    viewer: {
      close: '关闭查看器',
      previous: '上一张',
      next: '下一张',
      zoomIn: '放大',
      zoomOut: '缩小',
      panHelp: '放大后可拖动照片平移，也可以保持此按钮聚焦并使用方向键移动。',
      failed: '照片加载失败。'
    }
  },
  elsewhere: {
    title: '其他平台',
    links: {
      x: 'X',
      telegram: 'Telegram',
      github: 'GitHub',
      unsplash: 'Unsplash'
    }
  },
  signOff: {
    label: '署名：Steven Lynn',
    photoAlt: '旅行者 1 号在约 60 亿公里外拍摄的地球：散射阳光光带中一个暗淡的蓝色光点',
    credit: '暗淡蓝点 · 旅行者 1 号，1990 年 2 月 14 日 · NASA/JPL-Caltech'
  },
  theme: {
    toLight: '切换到浅色主题',
    toDark: '切换到深色主题'
  },
  footer: {
    copyright: (year: number) => `© ${year} Steven Lynn`,
    rss: 'RSS'
  },
  language: {
    label: '语言'
  },
  notFound: {
    title: '页面不存在',
    home: '返回首页'
  }
}
