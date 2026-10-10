import { buildNotFoundMetadata, NotFoundPage } from '@/app'

export { viewport } from '@/app'
export const metadata = buildNotFoundMetadata()

export default function GlobalNotFound() {
  return <NotFoundPage />
}
