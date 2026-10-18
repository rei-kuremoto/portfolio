import { useCallback, useState } from 'react'
import useHashRoute, { routes } from './hooks/useHashRoute'
import { projectBySlug } from './components/portfolioContent'
import SiteHeader from './components/SiteHeader'
import SiteMenu from './components/SiteMenu'
import TopPage from './components/TopPage'
import PhilosophyPage from './components/PhilosophyPage'
import WorkDetailPage from './components/WorkDetailPage'
import ProfileSection from './components/ProfileSection'
import BackLink from './components/BackLink'

function resolve(path) {
  if (path === '/philosophy') return { page: 'philosophy', href: routes.philosophy }
  if (path === '/profile') return { page: 'profile', href: routes.profile }
  const slug = path.match(/^\/works\/([\w-]+)$/)?.[1]
  if (slug && projectBySlug[slug]) return { page: 'work', href: routes.work(slug), project: projectBySlug[slug] }
  return { page: 'top', href: routes.top }
}

function App() {
  const path = useHashRoute()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const openMenu = useCallback(() => setIsMenuOpen(true), [])
  const closeMenu = useCallback(() => setIsMenuOpen(false), [])
  const route = resolve(path)

  return (
    <div className="min-h-screen bg-paper text-ink">
      {route.page === 'top' && <TopPage onOpenMenu={openMenu} />}
      {/* Profile: the previous site's profile content as its own page. */}
      {route.page === 'profile' && (
        <>
          <SiteHeader onOpenMenu={openMenu} />
          {/* Same frame as the design philosophy page: back link, then a centred ~660px column. */}
          <main className="mx-auto max-w-[1440px] px-6 pt-8 pb-24 md:px-[63px] md:pt-[34px] md:pb-[120px]">
            <BackLink />
            <div className="mx-auto mt-8 max-w-[659px] md:mt-[71px]">
              <ProfileSection />
            </div>
          </main>
        </>
      )}
      {route.page === 'philosophy' && <PhilosophyPage onOpenMenu={openMenu} />}
      {route.page === 'work' && <WorkDetailPage key={route.project.slug} project={route.project} onOpenMenu={openMenu} />}
      <SiteMenu isOpen={isMenuOpen} onClose={closeMenu} currentHref={route.href} />
    </div>
  )
}

export default App
