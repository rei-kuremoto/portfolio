import backIcon from '../assets/images/v2/ui/back.svg'
import { routes } from '../hooks/useHashRoute'

export default function BackLink({ className = '' }) {
  return (
    <a
      href={routes.top}
      className={`flex w-fit items-center gap-1 font-display text-[16px] leading-[1.8] font-semibold tracking-[0.32px] text-ink ${className}`}
    >
      <span className="flex size-[13.2px] items-center justify-center">
        <img src={backIcon} alt="" className="h-[11px] w-auto" />
      </span>
      back
    </a>
  )
}
