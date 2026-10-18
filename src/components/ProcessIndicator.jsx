// Five overlapping circles marking which design-process steps a project covered,
// drawn to the dimensions of the Figma indicator (Group 1000006519).
const RADIUS = 19.03
const STEP = 28.907
const STROKE = 0.903
const SIZE = 38.96

export default function ProcessIndicator({ states }) {
  const width = SIZE + STEP * (states.length - 1)
  return (
    <svg
      width={width}
      height={SIZE}
      viewBox={`0 0 ${width} ${SIZE}`}
      fill="none"
      aria-hidden="true"
      className="shrink-0 text-brand"
    >
      <defs>
        {states.map((state, index) =>
          state === 'half' ? (
            <clipPath key={index} id={`process-half-${index}`}>
              <rect x={SIZE / 2 + STEP * index} y="0" width={SIZE / 2} height={SIZE} />
            </clipPath>
          ) : null,
        )}
      </defs>
      {states.map((state, index) => {
        const cx = SIZE / 2 + STEP * index
        return (
          <g key={index}>
            {state !== 'empty' && (
              <circle
                cx={cx}
                cy={SIZE / 2}
                r={RADIUS}
                fill="currentColor"
                clipPath={state === 'half' ? `url(#process-half-${index})` : undefined}
              />
            )}
            <circle cx={cx} cy={SIZE / 2} r={RADIUS} stroke="currentColor" strokeWidth={STROKE} />
          </g>
        )
      })}
    </svg>
  )
}
