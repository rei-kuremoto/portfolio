import philosophyDiagram from '../assets/images/v2/ui/philosophy-diagram.svg'
import processArrow from '../assets/images/v2/ui/process-arrow.svg'
import headingDesignPhilosophy from '../assets/images/v2/ui/heading-design-philosophy.svg'
import { designPhilosophy, designProcess } from './portfolioContent'
import SiteHeader from './SiteHeader'
import BackLink from './BackLink'

// Labels sit over the exported diagram artwork, centred on the centre point of
// their Figma text box (so differences in font metrics can't push them off-centre).
// Sizes are in container-query units so they scale with the diagram.
function Labelled({ src, width, height, displayWidth = width, labels, fontSize, className = '' }) {
  return (
    <div className={`relative w-full [container-type:inline-size] ${className}`} style={{ maxWidth: displayWidth }}>
      <img src={src} alt="" width={width} height={height} className="h-auto w-full" />
      {labels.map((label) => (
        <span
          key={label.text}
          className="absolute -translate-x-1/2 -translate-y-1/2 leading-[1.6] whitespace-nowrap"
          style={{
            left: `${(label.cx / width) * 100}%`,
            top: `${(label.cy / height) * 100}%`,
            fontSize: `${(fontSize / width) * 100}cqw`,
          }}
        >
          {label.text}
        </span>
      ))}
    </div>
  )
}

function Heading({ number, text }) {
  return (
    <h2 className="font-display text-[24px] leading-[1.4] font-semibold tracking-[0.64px] md:text-[32px]">
      <span className="text-brand">{number}</span>
      {`　${text}`}
    </h2>
  )
}

function Paragraphs({ paragraphs }) {
  return (
    <div className="flex flex-col gap-[1.6em] font-display text-[15px] leading-[1.6] font-medium md:text-[16px]">
      {paragraphs.map((lines, index) => (
        <p key={index}>
          {lines.map((line, lineIndex) => (
            <span key={lineIndex} className="md:block">
              {Array.isArray(line)
                ? line.map((run) => (
                    <span key={run.text} className={run.highlight ? 'font-semibold text-brand' : undefined}>
                      {run.text}
                    </span>
                  ))
                : line}
            </span>
          ))}
        </p>
      ))}
    </div>
  )
}

// The five overlapping process circles (Group 1000006517).
const CIRCLE_R = 101.32
const CIRCLE_STEP = 166.414

function ProcessCircles({ steps }) {
  const width = CIRCLE_R * 2 + CIRCLE_STEP * (steps.length - 1)
  const centers = steps.map((_, index) => CIRCLE_R + CIRCLE_STEP * index)
  return (
    <svg
      viewBox={`-1 -1 ${width + 2} ${CIRCLE_R * 2 + 2}`}
      className="h-auto w-full max-w-[870px] text-brand"
      role="img"
      aria-label={steps.map((lines) => lines.join('')).join(' → ')}
    >
      {centers.map((cx) => (
        <circle key={`fill-${cx}`} cx={cx} cy={CIRCLE_R} r={CIRCLE_R} fill="white" />
      ))}
      {centers.map((cx) => (
        <circle key={`stroke-${cx}`} cx={cx} cy={CIRCLE_R} r={CIRCLE_R} fill="none" stroke="currentColor" strokeWidth="0.566" />
      ))}
      {steps.map((lines, index) => (
        <text
          key={lines.join('')}
          x={centers[index]}
          y={CIRCLE_R - ((lines.length - 1) * 13.585 * 1.6) / 2}
          textAnchor="middle"
          dominantBaseline="central"
          fill="currentColor"
          className="font-helvetica"
          fontSize="13.585"
        >
          {lines.map((line, lineIndex) => (
            <tspan key={line} x={centers[index]} dy={lineIndex === 0 ? 0 : 13.585 * 1.6}>
              {line}
            </tspan>
          ))}
        </text>
      ))}
    </svg>
  )
}

export default function PhilosophyPage({ onOpenMenu }) {
  const { diagramLabels } = designPhilosophy
  return (
    <>
      <SiteHeader onOpenMenu={onOpenMenu} />
      <main className="mx-auto max-w-[1440px] px-6 pt-8 pb-24 md:px-[63px] md:pt-[34px] md:pb-[120px]">
        <BackLink />
        {/* Page title, scaled like the profile page's heading (245px art shown at 136px / 208px), centred. */}
        <h1 className="mx-auto mt-8 max-w-[659px] py-10 md:mt-[71px] md:pt-0 md:pb-16">
          <img
            src={headingDesignPhilosophy}
            alt="design philosophy"
            className="mx-auto h-auto w-[365px] max-w-full md:w-[558px]"
          />
        </h1>
        <div className="flex flex-col items-center gap-[120px] text-center">
          <section className="flex w-full max-w-[659px] flex-col items-center gap-16">
            <div className="flex flex-col gap-5">
              <Heading number={designPhilosophy.number} text={designPhilosophy.heading} />
              <Paragraphs paragraphs={designPhilosophy.paragraphs} />
            </div>
            <Labelled
              src={philosophyDiagram}
              width={696}
              height={669}
              displayWidth={534}
              fontSize={18.151}
              className="font-display font-medium text-brand"
              labels={[
                { text: diagramLabels.journey, cx: 347.5, cy: 14.5 },
                { text: diagramLabels.before, cx: 127.93, cy: 226.5 },
                { text: diagramLabels.during, cx: 348, cy: 226.5 },
                { text: diagramLabels.after, cx: 568, cy: 227 },
              ]}
            />
          </section>

          <section className="flex w-full max-w-[996px] flex-col items-center gap-16">
            <div className="flex flex-col gap-5">
              <Heading number={designProcess.number} text={designProcess.heading} />
              <Paragraphs paragraphs={designProcess.paragraphs} />
            </div>
            <div className="flex w-full flex-col items-center gap-[36px]">
              <Labelled
                src={processArrow}
                width={457}
                height={44}
                fontSize={11.801}
                className="font-display font-semibold text-ink"
                labels={designProcess.arrowLabels.map((text, index) => ({ text, cx: [45.43, 228.45, 414.55][index], cy: 9.5 }))}
              />
              <ProcessCircles steps={designProcess.steps} />
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
