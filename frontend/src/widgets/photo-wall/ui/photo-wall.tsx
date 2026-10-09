'use client'

import { ArrowUpRight } from 'lucide-react'
import { useMemo } from 'react'
import { type Photo, photoTileSrc, photoTileSrcSet, photoViewerSrc } from '@/entities/photo'
import { site } from '@/shared/config'
import { copy } from '@/shared/i18n'
import {
  ImageViewer,
  ImageViewerContent,
  ImageViewerGallery,
  type ImageViewerImage,
  ImageViewerThumbnail,
  Reveal
} from '@/shared/ui/motion'
import { QuietLink, Section } from '@/shared/ui/section'

const labels = {
  gallery: copy.photos.gallery,
  open: copy.photos.open,
  ...copy.photos.viewer
}

/**
 * The latest Unsplash photographs as a masonry wall. A tile morphs into a
 * full-screen viewer with swipe, arrow-key and zoom controls.
 */
export function PhotoWall({ photos }: { photos: Photo[] }) {
  const images = useMemo<ImageViewerImage[]>(
    () =>
      photos.map((photo) => ({
        id: photo.id,
        src: photoViewerSrc(photo),
        thumbnailSrc: photoTileSrc(photo),
        thumbnailSrcSet: photoTileSrcSet(photo),
        alt: photo.description ?? copy.photos.untitled,
        width: photo.width,
        height: photo.height,
        placeholder: photo.color
      })),
    [photos]
  )
  const pages = useMemo(() => new Map(photos.map((photo) => [photo.id, photo.pageUrl])), [photos])

  return (
    <Section
      id="photos"
      title={copy.photos.title}
      action={<QuietLink href={site.social.unsplash.href}>{copy.photos.more}</QuietLink>}
    >
      <ImageViewer images={images} labels={labels}>
        <ImageViewerGallery className="columns-2 gap-3 sm:columns-3">
          {images.map((image, index) => (
            <Reveal key={image.id} delay={(index % 3) * 0.06} className="mb-3 break-inside-avoid">
              <ImageViewerThumbnail
                imageId={image.id}
                className="group block w-full cursor-zoom-in rounded-xl"
                imageClassName="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_0_0_1px_var(--border)]"
                />
              </ImageViewerThumbnail>
            </Reveal>
          ))}
        </ImageViewerGallery>
        <ImageViewerContent
          renderCaption={(image) => (
            <span className="flex flex-col items-center gap-1">
              <span className="line-clamp-1 text-white/80 first-letter:uppercase">{image.alt}</span>
              <a
                href={pages.get(image.id)}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-0.5 text-xs text-white/55 transition-colors hover:text-white"
              >
                {copy.photos.viewOnUnsplash}
                <ArrowUpRight aria-hidden="true" className="size-3" />
              </a>
            </span>
          )}
        />
      </ImageViewer>
    </Section>
  )
}
