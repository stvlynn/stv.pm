import type { ReactNode } from 'react'
import { RootLayout } from '@/app'

export { metadata, viewport } from '@/app'

export default function Layout({ children }: { children: ReactNode }) {
  return <RootLayout>{children}</RootLayout>
}
