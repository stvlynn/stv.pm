import { formatPostDate, type Post } from '@/entities/post'
import { site } from '@/shared/config'
import { getCopy, type Locale } from '@/shared/i18n'
import { SharedLayoutBg } from '@/shared/ui/motion'
import { QuietLink, Section } from '@/shared/ui/section'

/** Latest posts from blog.stv.pm, newest first. */
export function Writing({ posts, locale }: { posts: Post[]; locale: Locale }) {
  const copy = getCopy(locale)
  return (
    <Section
      id="writing"
      title={copy.writing.title}
      action={<QuietLink href={site.blogUrl}>{copy.writing.all}</QuietLink>}
    >
      <SharedLayoutBg as="ul">
        {posts.map((post) => (
          <li key={post.id}>
            <a
              href={post.url}
              className="flex items-baseline justify-between gap-6 rounded-xl py-2.5 outline-offset-4"
            >
              <span className="line-clamp-2 min-w-0 sm:line-clamp-1">{post.title}</span>
              <time
                dateTime={post.publishedAt}
                className="shrink-0 text-sm text-subtle-foreground tabular-nums"
              >
                {formatPostDate(post.publishedAt, locale)}
              </time>
            </a>
          </li>
        ))}
      </SharedLayoutBg>
    </Section>
  )
}
