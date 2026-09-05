import { useEffect, useLayoutEffect, useRef, useState } from 'react'

// Detect Tailwind breakpoints by toggling a hidden element with the
// breakpoint prefix and reading its computed display. Returns true when
// the viewport is below the named breakpoint (e.g. 'md'). This avoids
// hardcoding pixel values and follows Tailwind's responsive tokens.
function isBelowBreakpoint(bp) {
  if (typeof window === 'undefined' || !document.body) return false
  const id = `__bp_${bp}`
  let el = document.getElementById(id)
  if (!el) {
    el = document.createElement('div')
    el.id = id
    // hidden by default, becomes block at the breakpoint and above
    el.className = `${bp}:block hidden`
    el.style.position = 'absolute'
    el.style.left = '-9999px'
    el.style.width = '1px'
    el.style.height = '1px'
    document.body.appendChild(el)
  }
  return getComputedStyle(el).display === 'none'
}

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <path
        d="M2 2L20 20M20 2L2 20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

function ChevronIcon({ flip }) {
  return (
    <svg
      width="10"
      height="14"
      viewBox="0 0 10 14"
      fill="none"
      className={flip ? 'rotate-180' : ''}
      aria-hidden="true"
    >
      <path
        d="M9 1L3 7L9 13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function MobileImageStrip({ images }) {
  const trackRef = useRef(null)
  const [index, setIndex] = useState(0)
  const refHeight = useRef(null)

  const scrollToIndex = (i) => {
    const track = trackRef.current
    const item = track?.children[i]
    if (!item) return
    track.scrollTo({ left: item.offsetLeft, behavior: 'smooth' })
    // proactively set the index so the intended item starts playing
    setIndex(i)
  }

  const handleScroll = () => {
    const track = trackRef.current
    if (!track) return
    // Determine which child is visually centered in the scroll viewport.
    // Use centers (offsetLeft + half width) and compare to track's scroll center.
    const scrollCenter = track.scrollLeft + track.clientWidth / 2
    let closest = 0
    let minDiff = Infinity
    Array.from(track.children).forEach((child, i) => {
      const childCenter = child.offsetLeft + child.clientWidth / 2
      const diff = Math.abs(childCenter - scrollCenter)
      if (diff < minDiff) {
        minDiff = diff
        closest = i
      }
    })
    setIndex(closest)
  }

  // Ensure only the currently-selected video's element plays; pause others.
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const videos = Array.from(track.querySelectorAll('video'))
    videos.forEach((v) => {
      try {
        const pageAttr = v.getAttribute('data-page')
        const pageNum = pageAttr == null ? null : Number(pageAttr)
        if (pageNum === index) {
          v.muted = true
          v.controls = false
          const p = v.play()
          if (p && typeof p.catch === 'function') p.catch(() => {})
        } else {
          v.pause()
          try { v.currentTime = 0 } catch (e) {}
        }
      } catch (e) {}
    })
  }, [index])

  // Store active video's clientHeight so the first image can match it.
  const handleVideoMetadata = (e) => {
    try {
      refHeight.current = e.currentTarget.clientHeight
      // apply immediately to any already-rendered first image
      try {
        const track = trackRef.current
        if (track) {
          const firstImg = track.querySelector('img')
          if (firstImg && refHeight.current) {
            firstImg.style.maxHeight = `${refHeight.current}px`
            firstImg.style.width = 'auto'
          }
        }
      } catch (err) {}
    } catch (err) {}
  }

  if (images.length === 1) {
    return (
      <div className="border border-[#1f1c1c]">
        <img src={images[0]} alt="" className="h-auto w-full object-contain" />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4 text-sm font-medium">
        <button
          type="button"
          onClick={() => scrollToIndex(index - 1)}
          disabled={index === 0}
          aria-label="Previous image"
          className="disabled:opacity-30"
        >
          <ChevronIcon />
        </button>
        <span className="font-mono">
          {index + 1}/{images.length}
        </span>
        <button
          type="button"
          onClick={() => scrollToIndex(index + 1)}
          disabled={index === images.length - 1}
          aria-label="Next image"
          className="disabled:opacity-30"
        >
          <ChevronIcon flip />
        </button>
      </div>

      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="-mx-6 flex snap-x snap-mandatory items-start gap-3 overflow-x-auto scroll-pl-6 px-6 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((src, i) => (
          <div
            key={src}
            className="w-[calc((100vw-3rem)/1.2)] flex-none snap-start border border-[#1f1c1c]"
          >
            {typeof src === 'string' && src.toLowerCase().endsWith('.mp4') ? (
              <video data-page={i} src={src} muted playsInline loop onLoadedMetadata={handleVideoMetadata} className="h-auto w-full object-contain" />
            ) : (
              <img
                src={src}
                alt=""
                className="h-auto w-full object-contain"
                style={
                  i === 0 && refHeight.current && isBelowBreakpoint('md')
                    ? { maxHeight: `${refHeight.current}px`, width: 'auto' }
                    : undefined
                }
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

const GRID_COLS = { 1: 'grid-cols-1', 2: 'grid-cols-2', 3: 'grid-cols-3', 4: 'grid-cols-4' }

function frameClassFor(rowCount) {
  if (rowCount === 1) return 'w-full border border-[#1f1c1c]'
  if (rowCount >= 4) return 'aspect-[3/5] w-full overflow-hidden border border-[#1f1c1c]'
  return 'aspect-[3/2] w-full overflow-hidden border border-[#1f1c1c]'
}

function imageClassFor(rowCount) {
  if (rowCount === 1) return 'h-auto w-full object-contain'
  return 'h-full w-full object-cover'
}

function GridImages({ images, rowSizes }) {
  let cursor = 0
  return (
    <div className="flex flex-col gap-4">
      {rowSizes.map((count, rowIndex) => {
        const rowImages = images.slice(cursor, cursor + count)
        cursor += count
        return (
          <div key={rowIndex} className={`grid gap-4 ${GRID_COLS[count]}`}>
            {rowImages.map((src) => (
              <div key={src} className={frameClassFor(count)}>
                {typeof src === 'string' && src.toLowerCase().endsWith('.mp4') ? (
                  <video src={src} controls playsInline className={imageClassFor(count)} />
                ) : (
                  <img src={src} alt="" className={imageClassFor(count)} />
                )}
              </div>
            ))}
          </div>
        )
      })}
    </div>
  )
}

function PagerImages({ images }) {
  const [page, setPage] = useState(0)
  const videoRef = useRef(null)
  const refHeight = useRef(null)

  // Warm the browser cache for the neighboring slides so clicking next/prev
  // feels instant instead of showing a flash of loading — relevant once a
  // deck runs into dozens of pages, since only the current one is rendered.
  useEffect(() => {
    ;[page - 1, page + 1].forEach((i) => {
      if (i < 0 || i >= images.length) return
      const preload = new Image()
      preload.src = images[i]
    })
  }, [page, images])

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    try {
      v.muted = true
      v.controls = false
      const playPromise = v.play()
      if (playPromise && typeof playPromise.catch === 'function') playPromise.catch(() => {})
    } catch (e) {}
    return () => {
      try {
        v.pause()
        v.currentTime = 0
      } catch (e) {}
    }
  }, [page, images])

  // When an active video finishes loading metadata, store its rendered
  // height so images (like the first collage) can match that height.
  const handleVideoMetadata = (e) => {
    try {
      const v = e.currentTarget
      // store the rendered clientHeight for later use
      refHeight.current = v.clientHeight
    } catch (err) {}
  }

  return (
    <div className="flex flex-col gap-4">
        <div className="w-full border border-[#1f1c1c]">
        {typeof images[page] === 'string' && images[page].toLowerCase().endsWith('.mp4') ? (
          <video ref={videoRef} data-page={page} src={images[page]} autoPlay muted playsInline onLoadedMetadata={handleVideoMetadata} className="h-auto w-full object-contain" />
        ) : (
          <img
            src={images[page]}
            alt=""
            className="h-auto w-full object-contain"
            style={
              refHeight.current && isBelowBreakpoint('md')
                ? { maxHeight: `${refHeight.current}px`, width: 'auto' }
                : undefined
            }
          />
        )}
      </div>
      {images.length > 1 && (
        <div className="flex items-center gap-4 text-sm font-medium">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            aria-label="Previous image"
            className="disabled:opacity-30"
          >
            <ChevronIcon />
          </button>
          <span className="font-mono">
            {page + 1}/{images.length}
          </span>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(images.length - 1, p + 1))}
            disabled={page === images.length - 1}
            aria-label="Next image"
            className="disabled:opacity-30"
          >
            <ChevronIcon flip />
          </button>
        </div>
      )}
    </div>
  )
}

// Column widths the desktop layout renders at when the card is at its full
// 1280px — matches the old w-3/5 / w-2/5 proportions of the card's content
// area (1280 minus px-16 padding minus the gap-16 between columns).
const IMAGE_NATURAL_WIDTH = 653
const TEXT_NATURAL_WIDTH = 435
const ROW_CONTENT_WIDTH = IMAGE_NATURAL_WIDTH + TEXT_NATURAL_WIDTH

const CARD_MAX_WIDTH = 1280
const CARD_PADDING_X = 128 // px-16 × 2
const ROW_GAP = 64 // gap-16
const OUTER_PADDING_X = 80 // md:p-10 × 2

// Shrinks both columns together (keeping their 60/40 ratio) once the
// viewport can't fit the card at its full design width, instead of only the
// image column absorbing the deficit while text stays a fixed size.
function useResponsiveColumnWidths() {
  const [widths, setWidths] = useState({
    image: IMAGE_NATURAL_WIDTH,
    text: TEXT_NATURAL_WIDTH,
  })

  useEffect(() => {
    const update = () => {
      const cardWidth = Math.min(window.innerWidth - OUTER_PADDING_X, CARD_MAX_WIDTH)
      const rowContentWidth = Math.max(0, cardWidth - CARD_PADDING_X - ROW_GAP)
      const scale = Math.min(1, rowContentWidth / ROW_CONTENT_WIDTH)
      setWidths({
        image: IMAGE_NATURAL_WIDTH * scale,
        text: TEXT_NATURAL_WIDTH * scale,
      })
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return widths
}

function FitToHeight({ children, deps, naturalWidth }) {
  const containerRef = useRef(null)
  const contentRef = useRef(null)
  const [transform, setTransform] = useState({ scale: 1, offsetY: 0 })

  useLayoutEffect(() => {
    const container = containerRef.current
    const content = contentRef.current
    if (!container || !content) return

    // scrollHeight reflects layout size, not the visual (transformed) size,
    // so it's already "natural" regardless of the currently-applied scale.
    const update = () => {
      const naturalHeight = content.scrollHeight
      const availableHeight = container.clientHeight
      const scale =
        naturalHeight > availableHeight && availableHeight > 0
          ? availableHeight / naturalHeight
          : 1
      // When content is shorter than the available height (scale stays at
      // 1), center it vertically instead of leaving it stuck to the top —
      // computed as an offset rather than flex `items-center`, since that
      // positions the box using its pre-transform (natural, oversized) size
      // and clips instead of shrinking when the two get out of sync.
      const scaledHeight = naturalHeight * scale
      const offsetY = availableHeight > 0 ? Math.max(0, (availableHeight - scaledHeight) / 2) : 0
      setTransform({ scale, offsetY })
    }

    update()

    // <img> elements sized via h-auto (single/pager layouts, as opposed to
    // GridImages' fixed aspect-ratio cells) report 0 height until their
    // bytes actually finish loading — the scrollHeight read above can't be
    // trusted for those until each image fires its own load event.
    const images = content.querySelectorAll('img')
    images.forEach((img) => {
      if (!img.complete) img.addEventListener('load', update)
    })

    const resizeObserver = new ResizeObserver(update)
    resizeObserver.observe(container)
    return () => {
      resizeObserver.disconnect()
      images.forEach((img) => img.removeEventListener('load', update))
    }
    // naturalWidth is included so a viewport-driven width change re-measures
    // the (now different) natural height at that width.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, naturalWidth])

  return (
    // The outer box's *layout* width shrinks with the image (not just its
    // paint), so the flex row below can actually reclaim that space and
    // center the image+text pair instead of leaving it stranded as blank
    // padding inside a column that never gave the space back.
    <div
      ref={containerRef}
      className="h-full min-h-0 flex-none overflow-hidden"
      style={{ width: naturalWidth * transform.scale }}
    >
      <div
        ref={contentRef}
        style={{
          width: naturalWidth,
          transform: `translateY(${transform.offsetY}px) scale(${transform.scale})`,
          transformOrigin: 'top left',
        }}
      >
        {children}
      </div>
    </div>
  )
}

export default function WorkDetailModal({ work, isOpen, onClose }) {
  const columnWidths = useResponsiveColumnWidths()

  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!work) return null

  return (
    <div
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <div aria-hidden="true" className="absolute inset-0 bg-[#1f1c1c]/50" />

      <div
        onClick={onClose}
        className="absolute inset-0 overflow-y-auto md:flex md:items-[safe_center] md:justify-center md:p-10"
      >
        <div
          onClick={(event) => event.stopPropagation()}
          className="relative min-h-full w-full bg-[#f8f8f8] md:flex md:h-[780px] md:max-h-[85vh] md:min-h-0 md:max-w-[1280px] md:flex-col md:border md:border-[#1f1c1c]"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute left-5 top-5 z-10 md:left-auto md:right-11 md:top-9"
          >
            <CloseIcon />
          </button>

          {/* Mobile layout */}
          <div className="flex flex-col gap-8 px-6 pb-16 pt-20 md:hidden">
            <div>
              <h2 className="text-3xl font-bold">{work.title}</h2>
              {work.subtitle && (
                <p className="mt-1 text-lg font-bold">{work.subtitle}</p>
              )}
            </div>

            <div className="flex flex-col gap-4 text-sm leading-[1.7]">
              {work.description.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <MobileImageStrip key={work.images[0]} images={work.images} />

            <div className="font-mono text-sm">
              <p>{work.tags.join(', ')}</p>
              <p>/ {work.date}</p>
            </div>
          </div>

          {/* Desktop layout */}
          <div className="hidden md:flex md:min-h-0 md:flex-1 md:justify-center md:gap-16 md:px-16 md:py-16">
            <FitToHeight deps={[work]} naturalWidth={columnWidths.image}>
              {work.layout === 'pager' ? (
                <PagerImages key={work.images[0]} images={work.images} />
              ) : (
                <GridImages images={work.images} rowSizes={work.rowSizes} />
              )}
            </FitToHeight>

            <div
              style={{ width: columnWidths.text }}
              className="flex min-h-0 flex-none flex-col justify-between gap-10 overflow-y-auto"
            >
              <div className="flex flex-col gap-6">
                <div>
                  <h2 className="text-5xl font-bold">{work.title}</h2>
                  {work.subtitle && (
                    <p className="mt-2 text-2xl font-bold">{work.subtitle}</p>
                  )}
                </div>
                <div className="flex flex-col gap-4 leading-[1.7]">
                  {work.description.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>

              <div className="font-mono text-sm">
                <p>{work.tags.join(', ')}</p>
                <p className="mt-1">{work.date}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
