import { useEffect, useState } from 'react'

// Minimal hash router: GitHub Pages serves a single index.html, so routes live
// in the hash (#/philosophy, #/works/hakko, ...). Returns the path without "#".
const readPath = () => window.location.hash.replace(/^#/, '') || '/'

export default function useHashRoute() {
  const [path, setPath] = useState(readPath)

  useEffect(() => {
    const onHashChange = () => {
      setPath(readPath())
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  return path
}

export const routes = {
  top: '#/',
  philosophy: '#/philosophy',
  profile: '#/profile',
  work: (slug) => `#/works/${slug}`,
}
