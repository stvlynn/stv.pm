import type { Dictionary } from './types'

export const ja: Dictionary = {
  meta: {
    title: 'Steven Lynn',
    description: '次世代の人間とエージェントのための基盤をつくっています。'
  },
  intro: {
    name: 'Steven Lynn',
    bio: ['次世代の人間とエージェントのための基盤をつくっています。', 'AGI へ続く道の途中で。']
  },
  work: {
    title: '経歴',
    companies: {
      tencent: { name: 'Tencent', role: 'プロダクトマネージャー', period: '現在' },
      dify: { name: 'Dify', role: 'オペレーション', period: '以前' }
    }
  },
  writing: {
    title: '執筆',
    all: 'すべての記事'
  },
  photos: {
    title: '写真',
    more: 'Unsplash でもっと見る',
    gallery: 'Steven Lynn の写真',
    untitled: '無題の写真',
    viewOnUnsplash: 'Unsplash で見る',
    open: (alt: string) => `${alt}を開く`,
    viewer: {
      close: 'ビューアを閉じる',
      previous: '前の写真',
      next: '次の写真',
      zoomIn: '拡大',
      zoomOut: '縮小',
      panHelp:
        '拡大中は写真をドラッグして動かせます。このボタンにフォーカスしたまま矢印キーでも移動できます。',
      failed: '写真を読み込めませんでした。'
    }
  },
  coffeeChat: {
    title: 'コーヒーチャット',
    note: 'ご都合のよい時間をお選びください。',
    book: '日程を予約'
  },
  elsewhere: {
    title: 'リンク',
    links: {
      x: 'X',
      telegram: 'Telegram',
      github: 'GitHub',
      unsplash: 'Unsplash'
    }
  },
  signOff: {
    label: 'Steven Lynn の署名',
    photoAlt:
      'ボイジャー1号が約60億キロメートル彼方から撮影した、散乱した太陽光の帯の中に浮かぶ淡い青い点としての地球',
    credit: 'ペイル・ブルー・ドット · ボイジャー1号、1990年2月14日 · NASA/JPL-Caltech'
  },
  theme: {
    toLight: 'ライトテーマに切り替え',
    toDark: 'ダークテーマに切り替え'
  },
  footer: {
    copyright: (year: number) => `© ${year} Steven Lynn`,
    rss: 'RSS'
  },
  language: {
    label: '言語'
  },
  notFound: {
    title: 'ページが見つかりません',
    home: 'ホームに戻る'
  }
}
