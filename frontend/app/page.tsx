import { loadHome } from '@backend/interfaces/web'
import { HomePage } from '@/pages/home'

/** Regenerate at most hourly; a failed refresh keeps serving the last good page. */
export const revalidate = 3600

export default async function Page() {
  const { posts, photos } = await loadHome()
  return <HomePage posts={posts} photos={photos} year={new Date().getFullYear()} />
}
