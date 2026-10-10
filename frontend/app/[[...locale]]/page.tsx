import { loadHome } from '@backend/interfaces/web'
import { localeFromParams, type LocaleParams, localeStaticParams } from '@/app'
import { HomePage } from '@/pages/home'

export const dynamicParams = false
export const generateStaticParams = localeStaticParams

export default async function Page({ params }: { params: Promise<LocaleParams> }) {
  const locale = localeFromParams(await params)
  const { posts, photos } = await loadHome()
  return <HomePage locale={locale} posts={posts} photos={photos} year={new Date().getFullYear()} />
}
