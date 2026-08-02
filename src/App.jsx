import { useState } from 'react'
import Hero from './components/Hero'
import ProfileSection from './components/ProfileSection'
import ProfileDrawer from './components/ProfileDrawer'

function App() {
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  return (
    <div className="bg-[#f8f8f8] text-[#1f1c1c]">
      <div className="relative mx-auto max-w-[1440px]">
        <Hero onOpenProfile={() => setIsProfileOpen(true)} />
      </div>
      <ProfileSection />
      <ProfileDrawer isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </div>
  )
}

export default App
