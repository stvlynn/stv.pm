import type { Photo } from '@/entities/photo'
import type { Post } from '@/entities/post'
import { Reveal } from '@/shared/ui/motion'
import { Elsewhere } from '@/widgets/elsewhere'
import { Intro } from '@/widgets/intro'
import { PhotoWall } from '@/widgets/photo-wall'
import { SiteFooter } from '@/widgets/site-footer'
import { SignOff } from '@/widgets/sign-off'
import { SiteHeader } from '@/widgets/site-header'
import { Work } from '@/widgets/work'
import { Writing } from '@/widgets/writing'

export interface HomePageProps {
  posts: Post[]
  photos: Photo[]
  year: number
}

/**
 * One narrow reading column; the photo wall alone widens to give the
 * pictures room. Sections settle in one after another on first paint, and
 * the handwritten signature closes the page over the Pale Blue Dot.
 */
export function HomePage({ posts, photos, year }: HomePageProps) {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto w-full max-w-2xl space-y-16 px-5 pt-12 sm:px-6 sm:pt-24">
          <Intro />
          <Reveal delay={0.3}>
            <Work />
          </Reveal>
          <Reveal delay={0.4}>
            <Writing posts={posts} />
          </Reveal>
        </div>
        <div className="mx-auto mt-16 w-full max-w-4xl px-5 sm:px-6">
          <PhotoWall photos={photos} />
        </div>
        <div className="mx-auto mt-16 w-full max-w-2xl px-5 sm:px-6">
          <Reveal>
            <Elsewhere />
          </Reveal>
        </div>
        <div className="mt-16">
          <SignOff />
        </div>
      </main>
      <SiteFooter year={year} />
    </div>
  )
}
