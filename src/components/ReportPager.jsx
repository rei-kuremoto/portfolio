import { useEffect, useState } from 'react'

function ChevronIcon({ flip }) {
  return (
    <svg width="10" height="14" viewBox="0 0 10 14" fill="none" className={flip ? 'rotate-180' : ''} aria-hidden="true">
      <path d="M9 1L3 7L9 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// One page at a time with prev/next and a page counter — the report slider from
// the previous site's detail modal.
export default function ReportPager({ pages }) {
  const [page, setPage] = useState(0)

  // Warm the cache for the neighbouring pages so prev/next feels instant; only
  // the current page is rendered.
  useEffect(() => {
    ;[page - 1, page + 1].forEach((index) => {
      if (index < 0 || index >= pages.length) return
      const preload = new Image()
      preload.src = pages[index].src
    })
  }, [page, pages])

  const current = pages[page]
  return (
    <div className="flex flex-col gap-4">
      <div className="w-full border-[1.5px] border-ink">
        <img src={current.src} width={current.width} height={current.height} alt="" className="h-auto w-full" />
      </div>
      <div className="flex items-center gap-4 text-sm font-medium">
        <button
          type="button"
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          disabled={page === 0}
          aria-label="Previous page"
          className="disabled:opacity-30"
        >
          <ChevronIcon />
        </button>
        <span className="font-mono" aria-live="polite">
          {page + 1}/{pages.length}
        </span>
        <button
          type="button"
          onClick={() => setPage((p) => Math.min(pages.length - 1, p + 1))}
          disabled={page === pages.length - 1}
          aria-label="Next page"
          className="disabled:opacity-30"
        >
          <ChevronIcon flip />
        </button>
      </div>
    </div>
  )
}
