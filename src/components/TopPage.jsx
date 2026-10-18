import { useState } from 'react'
import rings from '../assets/images/v2/ui/rings.svg'
import { projects, projectGroups } from './portfolioContent'
import { routes } from '../hooks/useHashRoute'
import SiteHeader from './SiteHeader'

function FilterChips({ value, onChange }) {
  return (
    <div className="flex gap-1" role="group" aria-label="Filter works">
      {projectGroups.map((group) => {
        const selected = group.key === value
        return (
          <button
            key={group.key}
            type="button"
            onClick={() => onChange(group.key)}
            aria-pressed={selected}
            className={`rounded-full border border-ink px-[10px] py-[2px] font-mono text-[16px] tracking-[-0.16px] ${
              selected ? 'bg-ink text-white' : 'text-ink'
            }`}
          >
            {group.label}
          </button>
        )
      })}
    </div>
  )
}

function ProjectLabel({ lines, className }) {
  return (
    <p className={`palt font-display leading-[1.3] font-semibold text-ink ${className}`}>
      {lines.map((line) => (
        <span key={line} className="block">
          {line}
        </span>
      ))}
    </p>
  )
}

// Card images run edge to edge in their cell; the label keeps its inset.
function ProjectCard({ project }) {
  const image = project.gridImage
  return (
    <a href={routes.work(project.slug)} className="group relative block">
      <img
        src={image.src}
        width={image.width}
        height={image.height}
        alt=""
        className="h-auto w-full transition-opacity duration-200 group-hover:opacity-80"
      />
      <ProjectLabel
        lines={project.label}
        className="absolute top-[10px] left-[15px] text-[11px] tracking-[0.11px] md:-top-[7px] md:left-[25px] md:text-[14px] md:tracking-[0.14px]"
      />
      <span className="sr-only">{project.label.join(' ')}</span>
    </a>
  )
}

// Column rules are drawn on each cell's left edge, so a last item that doesn't
// end its row needs a closing rule (2 columns on md, 3 on lg). It's drawn just
// outside the cell, where the next cell's left border would sit, so it lines up
// with the rules above.
function closingRule(index, count) {
  if (index !== count - 1) return ''
  const md = index % 2 === 0
  const lg = index % 3 !== 2
  if (!md && !lg) return ''
  return [
    'relative after:absolute after:top-0 after:-right-px after:-bottom-px after:hidden after:w-px after:bg-ink',
    md && 'md:after:block',
    md && !lg && 'lg:after:hidden',
    !md && lg && 'lg:after:block',
  ]
    .filter(Boolean)
    .join(' ')
}

export default function TopPage({ onOpenMenu }) {
  const [group, setGroup] = useState('all')
  const visible =
    group === 'all'
      ? projects
      : [
          ...projects.filter((project) => project.group === group),
          ...projects.filter((project) => project.alsoIn?.includes(group)),
        ]

  return (
    <>
      <SiteHeader onOpenMenu={onOpenMenu}>
        <div className="mx-auto flex max-w-[1440px] items-end justify-between px-6 pt-[33px] pb-[24px] md:px-[60px] md:pt-[162px] md:pb-[30px]">
          <FilterChips value={group} onChange={setGroup} />
          <img src={rings} alt="" className="hidden h-[109px] w-[62px] md:mr-[-22px] md:mb-[8px] md:block" />
        </div>
      </SiteHeader>

      <main>
        {/* Full-width grid so the row rules run edge to edge, as in the design. */}
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((project, index) => (
            <li
              key={project.slug}
              className={`border-b border-ink py-[46px] md:border-l md:pt-[30px] md:pb-[23px] md:[&:nth-child(2n+1)]:border-l-0 lg:[&:nth-child(2n+1)]:border-l lg:[&:nth-child(3n+1)]:border-l-0 ${closingRule(index, visible.length)}`}
            >
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </main>
    </>
  )
}
