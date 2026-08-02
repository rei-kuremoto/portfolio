import { useEffect, useRef } from 'react'

const SPEED_PX_PER_SEC = 40
const RESUME_DELAY_MS = 1500

// Continuously auto-scrolls a horizontally-scrollable track, looping
// seamlessly by relying on the track rendering its content twice (so
// scrollWidth / 2 is exactly one loop's distance) and wrapping scrollLeft
// back by that amount once it's been scrolled past. Pauses while the user
// is actively dragging/wheeling the track and resumes shortly after they
// let go.
export default function useMarquee(trackRef, { disabled = false } = {}) {
  const pausedRef = useRef(false)
  const resumeTimeoutRef = useRef(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track || disabled) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frameId
    let lastTime = performance.now()

    const step = (time) => {
      const delta = time - lastTime
      lastTime = time
      if (!pausedRef.current) {
        const loopWidth = track.scrollWidth / 2
        track.scrollLeft += (SPEED_PX_PER_SEC * delta) / 1000
        if (track.scrollLeft >= loopWidth) {
          track.scrollLeft -= loopWidth
        }
      }
      frameId = requestAnimationFrame(step)
    }
    frameId = requestAnimationFrame(step)

    const pause = () => {
      pausedRef.current = true
      clearTimeout(resumeTimeoutRef.current)
    }
    const scheduleResume = () => {
      clearTimeout(resumeTimeoutRef.current)
      resumeTimeoutRef.current = setTimeout(() => {
        pausedRef.current = false
      }, RESUME_DELAY_MS)
    }
    const interact = () => {
      pause()
      scheduleResume()
    }

    track.addEventListener('pointerdown', pause)
    track.addEventListener('pointerup', scheduleResume)
    track.addEventListener('pointercancel', scheduleResume)
    track.addEventListener('touchstart', pause, { passive: true })
    track.addEventListener('touchend', scheduleResume)
    track.addEventListener('touchcancel', scheduleResume)
    track.addEventListener('wheel', interact, { passive: true })

    return () => {
      cancelAnimationFrame(frameId)
      clearTimeout(resumeTimeoutRef.current)
      track.removeEventListener('pointerdown', pause)
      track.removeEventListener('pointerup', scheduleResume)
      track.removeEventListener('pointercancel', scheduleResume)
      track.removeEventListener('touchstart', pause)
      track.removeEventListener('touchend', scheduleResume)
      track.removeEventListener('touchcancel', scheduleResume)
      track.removeEventListener('wheel', interact)
    }
  }, [trackRef, disabled])
}
