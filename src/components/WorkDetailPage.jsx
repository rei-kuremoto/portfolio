import { metaLabels } from './portfolioContent'
import SiteHeader from './SiteHeader'
import BackLink from './BackLink'
import ProcessIndicator from './ProcessIndicator'
import ReportPager from './ReportPager'
import useStickyTop from '../hooks/useStickyTop'

// Gaps between images in a row and between rows; a section can override them.
const IMAGE_GAP = 12
const ROW_GAP = 24

// A row item is one image, or an array of images stacked vertically.
const aspect = (item) =>
  Array.isArray(item) ? 1 / item.reduce((sum, image) => sum + image.height / image.width, 0) : item.width / item.height

const naturalWidth = (item) => (Array.isArray(item) ? Math.max(...item.map((image) => image.width)) : item.width)

function Image({ image }) {
  return <img src={image.src} width={image.width} height={image.height} alt="" loading="lazy" className="h-auto w-full" />
}

// Items share one height (flex-grow by aspect ratio) and the row never grows past
// the images' Figma size.
function ImageRow({ items, gap }) {
  const maxWidth = items.reduce((sum, item) => sum + naturalWidth(item), 0) + gap * (items.length - 1)
  return (
    <div className="flex w-full" style={{ gap, maxWidth }}>
      {items.map((item, index) => (
        <div key={index} className="flex min-w-0 flex-col" style={{ flex: `${aspect(item)} 1 0%`, gap }}>
          {Array.isArray(item) ? item.map((image) => <Image key={image.src} image={image} />) : <Image image={item} />}
        </div>
      ))}
    </div>
  )
}

function Section({ section }) {
  return (
    <section className="flex flex-col gap-5">
      {section.caption && <p className="text-[14px] leading-[1.4] text-muted">{section.caption}</p>}
      <div className="flex flex-col" style={{ gap: section.rowGap ?? ROW_GAP }}>
        {section.rows.map((items, index) => (
          <ImageRow key={index} items={items} gap={section.imageGap ?? IMAGE_GAP} />
        ))}
      </div>
    </section>
  )
}

// Service Site: full-length page captures side by side, scrolled horizontally.
// Spacing and shadow follow the capture columns on the Figma page (j-2).
function CaptureStrip({ captures }) {
  return (
    <div className="overflow-x-auto overscroll-x-contain" tabIndex={0} aria-label="Page captures (scroll horizontally)">
      <div className="flex w-max items-start gap-[18px] px-6 pt-10 pb-24 md:px-12 md:pt-[59px]">
        {captures.map((capture) => (
          <img
            key={capture.src}
            src={capture.src}
            width={capture.width}
            height={capture.height}
            alt=""
            loading="lazy"
            className="w-[280px] shrink-0 shadow-[0_2px_12px_rgba(0,0,0,0.1)]"
          />
        ))}
      </div>
    </div>
  )
}

function Overview({ project }) {
  const meta = Object.entries(metaLabels).filter(([key]) => project[key])
  return (
    <div className="flex flex-col">
      <p className="palt font-display text-[14px] leading-[1.4] font-semibold tracking-[0.28px] text-muted">
        {project.category}
      </p>
      <h1 className="palt mt-[10px] max-w-[502px] font-display text-[28px] leading-[1.3] font-semibold tracking-[0.4px] md:text-[40px]">
        {project.title.replace('\n', '')}
      </h1>
      {project.lead && <p className="mt-10 max-w-[590px] font-display text-[16px] leading-[1.6]">{project.lead}</p>}
      {project.note && (
        <p className="mt-5 text-[14px] leading-[1.4] text-muted">
          {project.note.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
      )}
      {/* Projects carried over from the previous site leave out some of these. */}
      {project.description && (
        <ul className="mt-10 max-w-[590px] list-disc font-display text-[16px] leading-[1.6]">
          {project.description.map((item) => (
            <li key={item} className="ms-6 mb-4 last:mb-0">
              {item}
            </li>
          ))}
        </ul>
      )}
      {meta.length > 0 && (
        <dl className="mt-16 grid grid-cols-[89px_1fr] gap-x-10 gap-y-5 font-display text-[14px] leading-[1.6] font-semibold">
          {meta.map(([key, label]) => (
            <div key={key} className="contents">
              <dt className="text-muted">{label}</dt>
              <dd className="m-0">{project[key]}</dd>
            </div>
          ))}
        </dl>
      )}
      {project.process && (
        <div className="mt-[52px] flex flex-wrap items-center gap-4">
          <ProcessIndicator states={project.processIndicator} />
          <p className="font-helvetica text-[14px] leading-[1.8] font-medium text-brand">{project.process.join(', ')}</p>
        </div>
      )}
    </div>
  )
}

export default function WorkDetailPage({ project, onOpenMenu }) {
  const [overviewRef, stickyTop] = useStickyTop()
  return (
    <>
      <SiteHeader onOpenMenu={onOpenMenu} />
      <main
        className={`mx-auto grid max-w-[1440px] grid-cols-1 ${project.wideImages ? 'md:grid-cols-[1fr_2fr]' : 'md:grid-cols-2'}`}
      >
        {/* pc: sticks to the viewport while the right column scrolls */}
        <div
          ref={overviewRef}
          style={{ '--sticky-top': `${stickyTop}px` }}
          className="px-6 pt-8 pb-16 md:sticky md:top-(--sticky-top) md:self-start md:pt-[41px] md:pr-10 md:pb-[41px] md:pl-[63px]"
        >
          <BackLink />
          <div className="mt-[41px]">
            <Overview project={project} />
          </div>
        </div>

        {/* Bleeds past the 1440px container so its rules and the capture strip reach the viewport edge. */}
        <div className="min-w-0 border-t border-ink md:mr-[min(0px,calc((1440px-100vw)/2))] md:border-t-0 md:border-l">
          {project.summary && (
            <p className="border-b border-ink px-6 py-7 text-[14px] leading-[1.6] text-muted md:px-12">
              {project.summary}
            </p>
          )}
          {project.captures ? (
            <CaptureStrip captures={project.captures} />
          ) : (
            <div className="flex flex-col gap-[74px] px-6 pt-10 pb-24 md:px-12 md:pt-[59px]">
              {project.pager && <ReportPager pages={project.pager} />}
              {project.sections.map((section, index) => (
                <Section key={index} section={section} />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  )
}
