import { useEffect } from 'react'
import headingProfile from '../assets/images/heading-profile.svg'
import { history, aboutMeParagraphs } from './profileContent'
import EmailCopyButton from './EmailCopyButton'

function CloseChevron() {
  return (
    <svg width="12" height="16.8" viewBox="0 0 10 14" fill="none" aria-hidden="true">
      <path
        d="M1 1L7 7L1 13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function ProfileDrawer({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen, onClose])

  return (
    <div className="hidden md:block">
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-[#1f1c1c]/40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      <aside
        aria-hidden={!isOpen}
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-[560px] overflow-y-auto bg-[#e8e8e8] transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col gap-10 px-16 py-16">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close profile"
            className="w-fit"
          >
            <CloseChevron />
          </button>
          <img src={headingProfile} alt="profile" className="h-auto w-[208px]" />
        </div>

        <div className="h-px w-full bg-[#1f1c1c]" />

        <div className="flex flex-col gap-4 px-16 py-10">
          <h3 className="font-mono text-2xl font-medium">history</h3>
          <div className="flex flex-col gap-3 text-sm">
            {history.map((item) => (
              <div key={item.date} className="flex justify-between gap-4">
                <p>{item.date}</p>
                <p className="text-right">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="h-px w-full bg-[#1f1c1c]" />

        <div className="flex flex-col gap-4 px-16 py-10">
          <h3 className="font-mono text-2xl font-medium">about me</h3>
          <div className="flex flex-col gap-4 text-sm leading-[1.6]">
            {aboutMeParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="h-px w-full bg-[#1f1c1c]" />

        <EmailCopyButton className="px-16 py-10" />
      </aside>
    </div>
  )
}
