'use client'
// Adapted from beui.dev/components/motion/image-viewer. Changes: every label
// is injected through `labels`; thumbnails may use a smaller source and a
// colour placeholder than the full-size image shown in the viewer.

import { ChevronLeft, ChevronRight, Minus, Plus, X } from 'lucide-react'
import {
  AnimatePresence,
  type HTMLMotionProps,
  LayoutGroup,
  motion,
  useIsPresent,
  useMotionValue,
  useReducedMotion,
  type Variants
} from 'motion/react'
import {
  type ComponentPropsWithRef,
  createContext,
  type ReactNode,
  useContext,
  useId,
  useLayoutEffect,
  useRef,
  useState
} from 'react'
import { createPortal } from 'react-dom'
import { cn, EASE_DRAWER, EASE_OUT, SPRING_LAYOUT, SPRING_PRESS, useIsClient } from '@/shared/lib'
import { Magnetic } from './magnetic'
import { PresenceGate } from './presence-gate'
import { useModalScope } from './use-modal-scope'

export interface ImageViewerImage {
  id: string
  /** Full-size source shown in the viewer. */
  src: string
  alt: string
  /** Intrinsic dimensions preserve aspect ratio through the thumbnail morph. */
  width: number
  height: number
  /** Smaller source for the gallery tile; defaults to `src`. */
  thumbnailSrc?: string
  thumbnailSrcSet?: string
  /** Background shown behind the tile while it loads. */
  placeholder?: string
}

export interface ImageViewerLabels {
  gallery: string
  open: (alt: string) => string
  close: string
  previous: string
  next: string
  zoomIn: string
  zoomOut: string
  panHelp: string
  failed: string
}

type ImageSwap = { direction: -1 | 1; reduce: boolean }
// Paging needs a definite arrival; an overdamped spring creeps through the
// last few pixels before snapping to rest.
const IMAGE_SLIDE_TRANSITION = { type: 'tween', duration: 0.28, ease: EASE_DRAWER } as const
const imageSwapVariants: Variants = {
  enter: ({ direction, reduce }: ImageSwap) => ({
    opacity: reduce ? 0 : 1,
    x: `${reduce ? 0 : direction * 100}%`
  }),
  visible: ({ reduce }: ImageSwap) => ({
    opacity: 1,
    x: '0%',
    transition: reduce ? { duration: 0.1, ease: EASE_OUT } : IMAGE_SLIDE_TRANSITION
  }),
  exit: ({ direction, reduce }: ImageSwap) => ({
    opacity: reduce ? 0 : 1,
    x: `${reduce ? 0 : direction * -100}%`,
    transition: reduce ? { duration: 0.1, ease: EASE_OUT } : IMAGE_SLIDE_TRANSITION
  })
}

const controlClass =
  'inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:opacity-30'

type ViewerContextValue = {
  images: ImageViewerImage[]
  value: string | null
  image: ImageViewerImage | undefined
  index: number
  labels: ImageViewerLabels
  groupId: string
  reduce: boolean
  select: (id: string | null) => void
  move: (direction: -1 | 1) => void
}
const ViewerContext = createContext<ViewerContextValue | null>(null)

function useViewerContext(part: string) {
  const context = useContext(ViewerContext)
  if (!context) throw new Error(`${part} must be used within ImageViewer.`)
  return context
}

/** Selection and navigation for custom viewer chrome. */
export function useImageViewer() {
  const { images, value, image, index, select, move } = useViewerContext('useImageViewer')
  return {
    images,
    value,
    image,
    index,
    close: () => select(null),
    previous: () => move(-1),
    next: () => move(1)
  }
}

export interface ImageViewerProps {
  images: ImageViewerImage[]
  labels: ImageViewerLabels
  defaultValue?: string | null
  /** Compose gallery and viewer parts. */
  children: ReactNode
}

/** A composable image gallery with a focus-managed, thumbnail-connected viewer. */
export function ImageViewer({ images, labels, defaultValue = null, children }: ImageViewerProps) {
  const [value, setValue] = useState(defaultValue)
  const index = images.findIndex((image) => image.id === value)
  const image = images[index]
  const groupId = useId()
  const reduce = useReducedMotion() ?? false
  if (new Set(images.map((item) => item.id)).size !== images.length)
    throw new Error('ImageViewer requires unique image ids.')
  // Drop removed identities instead of letting a re-added image reopen a session.
  if (value !== null && index < 0) setValue(null)
  const move = (direction: -1 | 1) => {
    const next = images[index + direction]
    if (image && next) setValue(next.id)
  }
  return (
    <ViewerContext.Provider
      value={{ images, value, image, index, labels, groupId, reduce, select: setValue, move }}
    >
      <LayoutGroup id={groupId}>{children}</LayoutGroup>
    </ViewerContext.Provider>
  )
}

export function ImageViewerGallery({ className, ...props }: ComponentPropsWithRef<'section'>) {
  const { labels } = useViewerContext('ImageViewerGallery')
  return <section aria-label={labels.gallery} {...props} className={className} />
}

export interface ImageViewerThumbnailProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  imageId: string
  imageClassName?: string
  children?: ReactNode
}

/** The image keeps its shared-layout identity when the trigger is customised. */
export function ImageViewerThumbnail({
  imageId,
  className,
  imageClassName,
  children,
  onClick,
  disabled,
  style,
  ...props
}: ImageViewerThumbnailProps) {
  const { images, value, labels, groupId, reduce, select } =
    useViewerContext('ImageViewerThumbnail')
  const image = images.find((item) => item.id === imageId)
  if (!image) throw new Error(`ImageViewerThumbnail: unknown image id "${imageId}".`)
  return (
    <motion.button
      type="button"
      aria-label={labels.open(image.alt)}
      whileTap={reduce ? undefined : { scale: 0.98 }}
      transition={SPRING_PRESS}
      {...props}
      disabled={disabled}
      aria-haspopup="dialog"
      aria-expanded={image.id === value}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented && !disabled) select(image.id)
      }}
      style={{ backgroundColor: image.placeholder, ...style }}
      className={cn(
        'relative overflow-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none',
        className
      )}
    >
      <motion.img
        layoutId={reduce ? undefined : `${groupId}-${image.id}`}
        src={image.thumbnailSrc ?? image.src}
        srcSet={image.thumbnailSrcSet}
        sizes={image.thumbnailSrcSet ? '(min-width: 1024px) 320px, 50vw' : undefined}
        alt=""
        width={image.width}
        height={image.height}
        loading="lazy"
        decoding="async"
        draggable={false}
        transition={SPRING_LAYOUT}
        className={cn('block h-auto w-full', imageClassName)}
      />
      {children}
    </motion.button>
  )
}

export function ImageViewerCounter({ className, ...props }: ComponentPropsWithRef<'span'>) {
  const { index, images } = useViewerContext('ImageViewerCounter')
  return (
    <span aria-live="polite" {...props} className={cn('text-xs tabular-nums', className)}>
      {index + 1} / {images.length}
    </span>
  )
}

type ViewerButtonProps = ComponentPropsWithRef<'button'>
function ViewerButton({
  action,
  className,
  children,
  disabled,
  onClick,
  ...props
}: ViewerButtonProps & { action: 'close' | 'previous' | 'next' }) {
  const { index, images, labels, select, move } = useViewerContext('ImageViewer controls')
  const unavailable =
    action === 'previous'
      ? index <= 0
      : action === 'next'
        ? index < 0 || index >= images.length - 1
        : false
  const Icon = action === 'close' ? X : action === 'previous' ? ChevronLeft : ChevronRight
  return (
    <Magnetic disabled={disabled || unavailable}>
      <button
        type="button"
        aria-label={labels[action]}
        {...props}
        disabled={disabled || unavailable}
        onClick={(event) => {
          onClick?.(event)
          if (!event.defaultPrevented) {
            if (action === 'close') select(null)
            else move(action === 'previous' ? -1 : 1)
          }
        }}
        className={cn(controlClass, className)}
      >
        {children ?? <Icon size={18} aria-hidden="true" />}
      </button>
    </Magnetic>
  )
}
export function ImageViewerClose(props: ViewerButtonProps) {
  return <ViewerButton {...props} action="close" />
}
export function ImageViewerPrevious(props: ViewerButtonProps) {
  return <ViewerButton {...props} action="previous" />
}
export function ImageViewerNext(props: ViewerButtonProps) {
  return <ViewerButton {...props} action="next" />
}

export interface ImageViewerContentProps {
  className?: string
  /** Footer between the previous and next controls, given the open image. */
  renderCaption: (image: ImageViewerImage) => ReactNode
}

/** Owns the portal, focus scope, swipe/zoom frame and exit interaction gate. */
export function ImageViewerContent({ className, renderCaption }: ImageViewerContentProps) {
  const context = useViewerContext('ImageViewerContent')
  const { image, index, labels, groupId, reduce, select, move } = context
  const mounted = useIsClient()
  const portal = useRef<HTMLDivElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  useModalScope(mounted && Boolean(image), portal, panel, () => select(null))
  const selectedId = image?.id
  const previousId = useRef<string | undefined>(undefined)
  useLayoutEffect(() => {
    const previous = previousId.current
    previousId.current = mounted ? selectedId : undefined
    if (!mounted || !selectedId || !previous || !panel.current) return
    const focused = document.activeElement
    if (
      !panel.current.contains(focused) ||
      (focused instanceof HTMLButtonElement && focused.disabled)
    ) {
      ;(
        panel.current.querySelector<HTMLButtonElement>('button:not(:disabled)') ?? panel.current
      ).focus({
        preventScroll: true
      })
    }
  }, [mounted, selectedId])
  if (!mounted) return null
  return createPortal(
    <div ref={portal}>
      <AnimatePresence>
        {image && (
          <PresenceGate>
            {({ isPresent, gate }) => (
              <ViewerContext.Provider value={context}>
                <motion.button
                  {...gate}
                  type="button"
                  tabIndex={-1}
                  aria-hidden="true"
                  onClick={() => select(null)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduce ? 0.1 : 0.18, ease: EASE_OUT }}
                  className="fixed inset-0 z-[100] h-full w-full bg-black/90"
                />
                <div
                  inert={!isPresent}
                  className="pointer-events-none fixed inset-3 z-[101] sm:inset-6"
                >
                  <div
                    {...gate}
                    ref={panel}
                    role="dialog"
                    aria-modal="true"
                    aria-label={labels.gallery}
                    tabIndex={-1}
                    className={cn('flex h-full flex-col outline-none', className)}
                    onPointerDownCapture={(event) => {
                      const target = event.target
                      if (
                        target instanceof Element &&
                        !target.closest(
                          'button, a, input, select, textarea, [data-lightbox-content]'
                        )
                      ) {
                        event.preventDefault()
                        select(null)
                      }
                    }}
                    onKeyDown={(event) => {
                      if (
                        event.defaultPrevented ||
                        event.altKey ||
                        event.ctrlKey ||
                        event.metaKey ||
                        event.shiftKey
                      )
                        return
                      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
                        event.preventDefault()
                        move(event.key === 'ArrowLeft' ? -1 : 1)
                      }
                    }}
                  >
                    <div
                      data-lightbox-content=""
                      className="flex items-center justify-between gap-3 pb-3 text-white"
                    >
                      <ImageViewerCounter />
                      <ImageViewerClose />
                    </div>
                    <LightboxFrame
                      image={image}
                      index={index}
                      labels={labels}
                      layoutId={reduce ? undefined : `${groupId}-${image.id}`}
                      reduce={reduce}
                      onSwipe={move}
                    />
                    <div
                      data-lightbox-content=""
                      className="flex items-center justify-between gap-3 pt-3 text-white"
                    >
                      <ImageViewerPrevious />
                      <div aria-live="polite" className="min-w-0 text-center text-sm">
                        {renderCaption(image)}
                      </div>
                      <ImageViewerNext />
                    </div>
                  </div>
                </div>
              </ViewerContext.Provider>
            )}
          </PresenceGate>
        )}
      </AnimatePresence>
    </div>,
    document.body
  )
}

function LightboxFrame({
  image,
  index,
  labels,
  layoutId,
  reduce,
  onSwipe
}: {
  image: ImageViewerImage
  index: number
  labels: ImageViewerLabels
  layoutId: string | undefined
  reduce: boolean
  onSwipe: (direction: -1 | 1) => void
}) {
  const [zoom, setZoom] = useState(false)
  const [failed, setFailed] = useState(false)
  const session = `${image.id}-${image.src}`
  const [selection, setSelection] = useState<{ session: string; index: number; direction: -1 | 1 }>(
    {
      session,
      index,
      direction: 1
    }
  )
  const changed = selection.session !== session
  const direction = changed ? (index < selection.index ? -1 : 1) : selection.direction
  // Keep the shared-layout frame mounted; only the image layer changes identity.
  if (changed) {
    setSelection({ session, index, direction })
    setZoom(false)
    setFailed(false)
  }
  const swipe = useRef<{ x: number; y: number } | null>(null)
  const present = useIsPresent()
  const bounds = useRef<HTMLDivElement>(null)
  const imageBox = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const panHelp = useId()
  const positionSession = useRef(session)
  useLayoutEffect(() => {
    if (positionSession.current === session) return
    positionSession.current = session
    x.set(0)
    y.set(0)
    swipe.current = null
  }, [session, x, y])
  useLayoutEffect(() => {
    const measure = () => {
      if (!bounds.current || !imageBox.current) return
      const next = {
        x: Math.max(0, (imageBox.current.clientWidth * 2 - bounds.current.clientWidth) / 2),
        y: Math.max(0, (imageBox.current.clientHeight * 2 - bounds.current.clientHeight) / 2)
      }
      setPan(next)
      x.set(Math.max(-next.x, Math.min(next.x, x.get())))
      y.set(Math.max(-next.y, Math.min(next.y, y.get())))
    }
    measure()
    const observer = new ResizeObserver(measure)
    if (bounds.current) observer.observe(bounds.current)
    if (imageBox.current) observer.observe(imageBox.current)
    return () => observer.disconnect()
  }, [x, y])
  return (
    <div className="relative flex min-h-0 flex-1 items-center justify-center">
      <div
        ref={bounds}
        className="flex h-full w-full items-center justify-center overflow-hidden rounded-lg"
      >
        <motion.div
          ref={imageBox}
          data-lightbox-content=""
          layoutId={layoutId}
          transition={SPRING_LAYOUT}
          className="relative flex max-h-full max-w-full items-center justify-center"
          style={{
            aspectRatio: `${image.width} / ${image.height}`,
            width: `min(100%, calc((100dvh - 160px) * ${image.width / image.height}))`,
            backgroundColor: image.placeholder
          }}
        >
          <div className={cn('absolute inset-0', !zoom && 'overflow-hidden')}>
            <AnimatePresence initial={false} custom={{ direction, reduce }}>
              <PresenceGate key={session}>
                {({ isPresent: slidePresent, gate }) => (
                  <motion.div
                    {...gate}
                    custom={{ direction, reduce }}
                    variants={imageSwapVariants}
                    initial="enter"
                    animate="visible"
                    exit="exit"
                    className="absolute inset-0"
                  >
                    <motion.img
                      src={image.src}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      draggable={false}
                      onError={() => {
                        if (slidePresent && present) setFailed(true)
                      }}
                      // Keep Motion's drag/layout registration mounted across zoom changes.
                      drag
                      dragListener={zoom}
                      dragConstraints={{ left: -pan.x, right: pan.x, top: -pan.y, bottom: pan.y }}
                      dragElastic={0.08}
                      dragMomentum={false}
                      animate={{
                        scale: zoom && present ? 2 : 1,
                        ...(!present ? { x: 0, y: 0 } : {})
                      }}
                      transition={reduce ? { duration: 0 } : SPRING_LAYOUT}
                      onPointerDown={(event) => {
                        // Swiping the image keeps keyboard focus on the controls.
                        event.preventDefault()
                        if (!zoom && event.isPrimary)
                          swipe.current = { x: event.clientX, y: event.clientY }
                      }}
                      onPointerUp={(event) => {
                        const start = swipe.current
                        swipe.current = null
                        if (!start || zoom) return
                        const dx = event.clientX - start.x
                        const dy = event.clientY - start.y
                        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5)
                          onSwipe(dx < 0 ? 1 : -1)
                      }}
                      onPointerCancel={() => {
                        swipe.current = null
                      }}
                      className="block h-full w-full object-contain select-none"
                      style={{
                        x,
                        y,
                        touchAction: zoom ? 'none' : 'pan-y',
                        cursor: zoom ? 'grab' : undefined
                      }}
                    />
                  </motion.div>
                )}
              </PresenceGate>
            </AnimatePresence>
          </div>
          {failed && (
            <p
              role="status"
              className="absolute inset-0 flex items-center justify-center bg-neutral-900 p-4 text-center text-sm text-white"
            >
              {labels.failed}
            </p>
          )}
        </motion.div>
      </div>
      <button
        type="button"
        aria-label={zoom ? labels.zoomOut : labels.zoomIn}
        aria-pressed={zoom}
        aria-describedby={panHelp}
        onKeyDown={(event) => {
          if (!zoom) return
          const dx = event.key === 'ArrowLeft' ? -40 : event.key === 'ArrowRight' ? 40 : 0
          const dy = event.key === 'ArrowUp' ? -40 : event.key === 'ArrowDown' ? 40 : 0
          if (!dx && !dy) return
          event.preventDefault()
          event.stopPropagation()
          x.set(Math.max(-pan.x, Math.min(pan.x, x.get() + dx)))
          y.set(Math.max(-pan.y, Math.min(pan.y, y.get() + dy)))
        }}
        onClick={() => {
          x.set(0)
          y.set(0)
          setZoom((current) => !current)
        }}
        className={cn(controlClass, 'absolute right-3 bottom-3 bg-black/60')}
      >
        {zoom ? <Minus size={18} aria-hidden="true" /> : <Plus size={18} aria-hidden="true" />}
      </button>
      <span id={panHelp} className="sr-only">
        {labels.panHelp}
      </span>
    </div>
  )
}
