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
      {/* sp: hamburger left, small wordmark centred */}
      <div className="relative flex h-[78px] items-center justify-center md:hidden">
        <button
          type="button"
          onClick={onOpenMenu}
          aria-label="Open menu"
          className="absolute top-[15px] left-[15px] size-12"
        >
          <img src={hamburger} alt="" className="size-full" />
        </button>
        <a href={routes.top} aria-label="rei kuremoto. — top">
          <img src={wordmarkSp} alt="rei kuremoto." className="h-[31px] w-auto" />
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
