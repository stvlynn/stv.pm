import type { ReactNode } from 'react'
import { buildMetadata, localeFromParams, type LocaleParams, RootLayout } from '@/app'

export { viewport } from '@/app'

export async function generateMetadata({ params }: { params: Promise<LocaleParams> }) {
  return buildMetadata(localeFromParams(await params))
}

export default async function Layout({
  children,
  params
}: {
  children: ReactNode
  params: Promise<LocaleParams>
}) {
  return <RootLayout locale={localeFromParams(await params)}>{children}</RootLayout>
}
