import { useEffect, useRef } from 'react'
import useContainerBleed from '../hooks/useContainerBleed'
import useMarquee from '../hooks/useMarquee'
import { photos } from './photographyPhotos'

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

export default function PhotographyModal({ isOpen, onClose }) {
  const bleed = useContainerBleed()
  const trackRef = useRef(null)
  useMarquee(trackRef, { disabled: !isOpen })

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

  return (
    <div
      aria-hidden={!isOpen}
      onClick={onClose}
      className={`fixed inset-0 z-50 overflow-x-hidden overflow-y-auto bg-[#1f1c1c] transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-6 top-6 text-[#f8f8f8] md:right-10 md:top-10"
      >
        <CloseIcon />
      </button>

      <div
        onClick={(event) => event.stopPropagation()}
        className="mx-auto max-w-[1440px] py-16 md:py-20"
      >
        <div className="mb-10 flex flex-col items-start gap-2 px-6 md:mb-14 md:px-16">
          <span className="text-sm font-medium text-[#f8f8f8] md:text-[16px]">
            personal work
          </span>
          <h2 className="text-3xl font-bold text-[#f8f8f8] md:text-[40px]">
            Photography
          </h2>
        </div>
        <div
          ref={trackRef}
          style={{ '--bleed': `${bleed}px` }}
          className="mt-16 flex gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] -ml-[calc(1.5rem+var(--bleed))] -mr-[calc(1.5rem+var(--bleed))] pl-[calc(1.5rem+var(--bleed))] pr-[calc(1.5rem+var(--bleed))] md:mt-10 md:-ml-[calc(4rem+var(--bleed))] md:-mr-[calc(4rem+var(--bleed))] md:pl-[calc(4rem+var(--bleed))] md:pr-[calc(4rem+var(--bleed))] [&::-webkit-scrollbar]:hidden"
        >
          {[...photos, ...photos].map(({ src, wide }, i) => (
            <img
              key={i}
              src={src}
              alt=""
              className={`h-[270px] flex-none object-cover md:h-[335px] ${
                wide ? 'w-[407px] md:w-[503px]' : 'w-[180px] md:w-[222px]'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
