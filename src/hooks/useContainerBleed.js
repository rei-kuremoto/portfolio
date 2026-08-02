import { useEffect, useState } from 'react'

const CONTENT_MAX_WIDTH = 1440

// On screens wider than the page's centered max-width container, this is the
// extra inset between the true viewport edge and the container edge. Used to
// let horizontally-scrolling strips bleed flush to both real viewport edges
// while keeping their resting (unscrolled) position aligned with the rest of
// the max-width-capped page.
export default function useContainerBleed() {
  const [bleed, setBleed] = useState(0)

  useEffect(() => {
    const update = () => {
      // clientWidth excludes the vertical scrollbar; innerWidth doesn't, which
      // would make the strips compute slightly wider than the real content area.
      const viewportWidth = document.documentElement.clientWidth
      setBleed(Math.max(0, (viewportWidth - CONTENT_MAX_WIDTH) / 2))
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return bleed
}
