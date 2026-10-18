import wordmark from '../assets/images/v2/ui/wordmark.svg'
import wordmarkSp from '../assets/images/v2/ui/wordmark-sp.svg'
import hamburger from '../assets/images/v2/ui/hamburger.svg'
import menuButton from '../assets/images/v2/ui/menu.svg'
import { routes } from '../hooks/useHashRoute'

// Wordmark + menu trigger shared by every page. `children` renders under the
// wordmark (the top page's filter chips); the full-bleed rule closes the header.
export default function SiteHeader({ onOpenMenu, children }) {
  return (
    <header className="border-b border-ink">
      {/* sp: hamburger and wordmark share one row; the wordmark stays centred
          (an empty column balances the hamburger) and shrinks on narrow screens. */}
      <div className="grid h-[78px] grid-cols-[48px_minmax(0,1fr)_48px] items-center px-[15px] md:hidden">
        <button type="button" onClick={onOpenMenu} aria-label="Open menu" className="size-12">
          <img src={hamburger} alt="" className="size-full" />
        </button>
        <a href={routes.top} aria-label="rei kuremoto. — top" className="flex justify-center">
          <img src={wordmarkSp} alt="rei kuremoto." width={263} height={31} className="h-auto w-[263px] max-w-full" />
        </a>
      </div>

      {/* pc: large wordmark, "menu" link top-right */}
      <div className="relative mx-auto hidden max-w-[1440px] px-[63px] pt-[50px] md:block">
        <a href={routes.top} className="block w-fit">
          <img src={wordmark} alt="rei kuremoto." className="h-auto w-[min(916px,64vw)]" />
        </a>
        <button type="button" onClick={onOpenMenu} className="absolute top-[32px] right-[42px]">
          {/* "menu" set in Swiza, exported from Figma as outlines */}
          <img src={menuButton} alt="menu" className="h-[36px] w-[55px]" />
        </button>
      </div>

      {children ?? <div className="hidden h-[107px] md:block" />}
    </header>
  )
}
