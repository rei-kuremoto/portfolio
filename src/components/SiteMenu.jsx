import { useEffect } from 'react'
import closeIcon from '../assets/images/v2/ui/close.svg'
import { menuProjects } from './portfolioContent'
import { routes } from '../hooks/useHashRoute'

const pages = [
  { label: 'top', href: routes.top },
  { label: 'design philosophy', href: routes.philosophy },
  { label: 'profile', href: routes.profile },
]

function MenuLink({ href, label, current, onNavigate }) {
  return (
    <li className="relative">
      {current && (
        <span
          aria-hidden="true"
          className="absolute top-1/2 -left-6 size-3 -translate-y-1/2 rounded-full bg-brand"
        />
      )}
      <a
        href={href}
        onClick={onNavigate}
        aria-current={current ? 'page' : undefined}
        className="font-mono text-[16px] font-medium text-ink"
      >
        {label}
      </a>
    </li>
  )
}

const Divider = () => <li aria-hidden="true" className="h-px bg-ink" />

// Right-hand drawer (menu_sp frame); full width on phones.
export default function SiteMenu({ isOpen, onClose, currentHref }) {
  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen, onClose])

  const link = (href, label) => (
    <MenuLink key={href} href={href} label={label} current={href === currentHref} onNavigate={onClose} />
  )

  return (
    <>
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-ink/40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />
      <nav
        aria-label="Site menu"
        aria-hidden={!isOpen}
        inert={!isOpen}
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-[393px] overflow-y-auto border-l border-ink bg-paper transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="absolute top-6 left-6 size-6"
        >
          <img src={closeIcon} alt="" className="size-full" />
        </button>
        <ul className="flex flex-col gap-6 pt-26 pb-16 pl-10">
          {pages.map((page) => link(page.href, page.label))}
          {menuProjects.flatMap((group, index) => [
            <Divider key={`divider-${index}`} />,
            ...group.map((project) => link(routes.work(project.slug), project.label.join(' '))),
          ])}
          <Divider />
        </ul>
      </nav>
    </>
  )
}
