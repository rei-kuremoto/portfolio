import { useState } from 'react'
import wordmarkEmailDark from '../assets/images/wordmark-email-dark.svg'

const EMAIL = 'rei.kuremoto@gmail.com'

function MailIcon() {
  return (
    <svg width="20" height="15" viewBox="0 0 20 15" fill="none" aria-hidden="true">
      <rect
        x="0.7"
        y="0.7"
        width="18.6"
        height="13.1455"
        rx="1.94463"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M3.5435 3.30566L8.86416 7.3991C9.53377 7.91426 10.4662 7.91426 11.1358 7.3991L16.4565 3.30566"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function EmailCopyButton({ className = '' }) {
  const [copied, setCopied] = useState(false)

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard API unavailable — silently no-op.
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`flex items-center gap-2 ${className}`}
    >
      <MailIcon />
      <img src={wordmarkEmailDark} alt={EMAIL} className="h-[16px] w-auto" />
      <span className="text-sm font-medium" aria-live="polite">
        {copied ? 'copied!' : ''}
      </span>
    </button>
  )
}
