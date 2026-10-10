import { loadHome } from '@backend/interfaces/web'
import { HomePage } from '@/pages/home'

export default async function Page() {
  const { posts, photos } = await loadHome()
  return <HomePage posts={posts} photos={photos} year={new Date().getFullYear()} />
}
