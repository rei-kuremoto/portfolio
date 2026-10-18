import { useEffect, useRef, useState } from 'react'

// Sticky offset that keeps a column fully reachable: 0 when it fits in the
// viewport, otherwise negative so it scrolls until its bottom edge is in view
// and sticks there.
export default function useStickyTop() {
  const ref = useRef(null)
  const [top, setTop] = useState(0)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    const update = () => setTop(Math.min(0, window.innerHeight - element.offsetHeight))
    update()
    const observer = new ResizeObserver(update)
    observer.observe(element)
    window.addEventListener('resize', update)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [])

  return [ref, top]
}
