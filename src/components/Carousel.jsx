import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import useContainerBleed from '../hooks/useContainerBleed'

const AUTO_ADVANCE_DELAY = 4000

function ArrowIcon({ flip }) {
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

export default function Carousel({ slides, loop = false, autoAdvance = false }) {
  const trackRef = useRef(null)
  const [index, setIndex] = useState(0)
  const total = slides.length
  const bleed = useContainerBleed()
  const indexRef = useRef(0)
  const timeoutRef = useRef(null)
  const settleTimeoutRef = useRef(null)
  // When looping, render the slides three times — a leading duplicate, the
  // real navigable set, and a trailing duplicate — so wrapping in either
  // direction can smoothly scroll into real duplicate content instead of
  // either hitting blank space or jumping instantly. `childOffset` is where
  // the real (middle) copy starts; every logical index (which can dip to -1
  // or up to `total` right after a wrap) is offset by it to find its child.
  const renderedSlides = loop ? [...slides, ...slides, ...slides] : slides
  const childOffset = loop ? total : 0
  const [hasOverflow, setHasOverflow] = useState(true)
  const [endSpacer, setEndSpacer] = useState(0)

  useEffect(() => {
    indexRef.current = index
  }, [index])

  // Without a loop, there's no trailing duplicate to provide scroll room —
  // the last slide needs enough trailing space to scroll all the way to
  // alignment with the viewport's start, or scrollLeft silently clamps
  // short of it and navigation can never fully reach the final slide.
  useEffect(() => {
    const track = trackRef.current
    if (!track || loop) return
    const update = () => {
      const lastItem = track.children[total - 1]
      if (!lastItem) return
      setEndSpacer(Math.max(0, track.clientWidth - lastItem.offsetWidth))
    }
    update()
    const resizeObserver = new ResizeObserver(update)
    Array.from(track.children).forEach((child) => resizeObserver.observe(child))
    window.addEventListener('resize', update)
    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [loop, total])

  // Hide the prev/next controls once every slide already fits in view at
  // once — there's nothing left to scroll to, so navigating is a no-op.
  // Watched via ResizeObserver (not just on mount) because slides sized by
  // aspect ratio (height fixed, width auto) don't know their final width
  // until their image finishes loading, after this effect's first run.
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const update = () => {
      // Span from the first real slide's start to the last real slide's
      // end — trailing gutter padding shouldn't count as "more to scroll to".
      const first = track.children[childOffset]
      const last = track.children[childOffset + total - 1]
      if (!first || !last) return
      const contentSpan = last.offsetLeft + last.offsetWidth - first.offsetLeft
      setHasOverflow(contentSpan > track.clientWidth + 1)
    }
    update()
    const resizeObserver = new ResizeObserver(update)
    Array.from(track.children).forEach((child) => resizeObserver.observe(child))
    window.addEventListener('resize', update)
    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [loop, total, childOffset])

  // scroll-padding-left reserves a gutter for every snapped slide (not just
  // the first) — offset our own scroll targets by the same amount so
  // programmatic scrolling rests exactly where the browser's own snapping
  // would, instead of landing flush against the edge.
  const scrollTargetFor = (track, item) => {
    const scrollPaddingLeft =
      parseFloat(getComputedStyle(track).scrollPaddingLeft) || 0
    return item.offsetLeft - scrollPaddingLeft
  }

  // Start positioned on the real (middle) copy's first slide rather than
  // wherever scrollLeft:0 would land (the leading duplicate).
  useLayoutEffect(() => {
    const track = trackRef.current
    if (!track || !loop) return
    const item = track.children[childOffset]
    if (!item) return
    track.scrollLeft = scrollTargetFor(track, item)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loop])

  const scrollToChild = (childIndex, behavior) => {
    const track = trackRef.current
    if (!track) return
    const item = track.children[childIndex]
    if (!item) return
    // Scroll the track directly rather than item.scrollIntoView(), which
    // walks every scrollable ancestor — including html/body, which can
    // technically still be scrolled programmatically despite
    // overflow-x: hidden, shifting the whole page sideways.
    track.scrollTo({ left: scrollTargetFor(track, item), behavior })
  }

  const advance = (step) => {
    const next = indexRef.current + step
    const clamped = loop ? next : Math.max(0, Math.min(total - 1, next))
    scrollToChild(childOffset + clamped, 'smooth')
    armTimer()
  }

  const armTimer = () => {
    clearTimeout(timeoutRef.current)
    if (!autoAdvance) return
    timeoutRef.current = setTimeout(() => advance(1), AUTO_ADVANCE_DELAY)
  }

  useEffect(() => {
    if (!autoAdvance) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    armTimer()
    return () => clearTimeout(timeoutRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoAdvance])

  const handleScroll = () => {
    const track = trackRef.current
    if (!track) return
    let closestChild = 0
    let minDiff = Infinity
    Array.from(track.children).forEach((child, i) => {
      const diff = Math.abs(child.offsetLeft - track.scrollLeft)
      if (diff < minDiff) {
        minDiff = diff
        closestChild = i
      }
    })
    const logical = closestChild - childOffset
    setIndex(((logical % total) + total) % total)
    armTimer()

    // Once the drag/scroll has settled, if we landed on a duplicate copy,
    // silently shift back into the real (middle) copy by one loop's width
    // so there's always another duplicate ahead (or behind) to scroll into.
    clearTimeout(settleTimeoutRef.current)
    if (loop && (logical < 0 || logical >= total)) {
      settleTimeoutRef.current = setTimeout(() => {
        const loopWidth = track.scrollWidth / 3
        track.scrollLeft += logical < 0 ? loopWidth : -loopWidth
      }, 150)
    }
  }

  return (
    <div>
      <div
        ref={trackRef}
        onScroll={handleScroll}
        style={{ '--bleed': `${bleed}px` }}
        className="relative flex snap-x snap-mandatory gap-6 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] -ml-[calc(1.5rem+var(--bleed))] -mr-[calc(1.5rem+var(--bleed))] pl-[calc(1.5rem+var(--bleed))] pr-[calc(1.5rem+var(--bleed))] scroll-pl-[calc(1.5rem+var(--bleed))] scroll-pr-[calc(1.5rem+var(--bleed))] md:gap-12 md:-ml-[calc(4rem+var(--bleed))] md:-mr-[calc(4rem+var(--bleed))] md:pl-[calc(4rem+var(--bleed))] md:pr-[calc(4rem+var(--bleed))] md:scroll-pl-[calc(4rem+var(--bleed))] md:scroll-pr-[calc(4rem+var(--bleed))] [&::-webkit-scrollbar]:hidden"
      >
        {renderedSlides.map((slide, i) => (
          <div
            key={i}
            className={`flex flex-none snap-start flex-col gap-4 ${slide.outerClass ?? ''}`}
          >
            <div className={`overflow-hidden ${slide.innerClass ?? ''}`}>
              {slide.image}
            </div>
            <p className="text-right text-sm font-medium">{slide.caption}</p>
          </div>
        ))}
        {!loop && (
          <div aria-hidden="true" className="flex-none" style={{ width: endSpacer }} />
        )}
      </div>

      {hasOverflow && (
        <div className="mt-6 flex items-center gap-4 text-sm font-medium">
          <button
            type="button"
            onClick={() => advance(-1)}
            disabled={!loop && index === 0}
            aria-label="Previous slide"
            className="transition-opacity disabled:opacity-30"
          >
            <ArrowIcon />
          </button>
          <span className="font-mono">
            {index + 1}/{total}
          </span>
          <button
            type="button"
            onClick={() => advance(1)}
            disabled={!loop && index === total - 1}
            aria-label="Next slide"
            className="transition-opacity disabled:opacity-30"
          >
            <ArrowIcon flip />
          </button>
        </div>
      )}
    </div>
  )
}
