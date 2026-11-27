import { useLayoutEffect, useRef, useState } from 'react'

const FULL_NAME = 'RISHITH SURESH'
const BASELINE_Y = 204

/**
 * Single-line hollow Didone display name ("RISHITH SURESH") with decorative
 * filigree swashes, 4-point star accents, and slender colored-head stickmen.
 */
export default function StickmenName() {
  const textRef = useRef(null)
  const [layout, setLayout] = useState(null)

  useLayoutEffect(() => {
    const el = textRef.current
    if (!el) return

    const measure = () => {
      try {
        const style = getComputedStyle(el)
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        ctx.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`
        const metrics = ctx.measureText('H')
        const ascent = metrics.actualBoundingBoxAscent || parseFloat(style.fontSize) * 0.72
        const strokeHalf = (parseFloat(style.strokeWidth) || 2.2) / 2
        const capTop = BASELINE_Y - ascent - strokeHalf
        const baselineBottom = BASELINE_Y + strokeHalf

        const chars = []
        for (let i = 0; i < FULL_NAME.length; i++) {
          const ext = el.getExtentOfChar(i)
          chars.push({
            left: ext.x,
            right: ext.x + ext.width,
            cx: ext.x + ext.width / 2
          })
        }

        setLayout({
          capTop,
          baseline: baselineBottom,
          chars
        })
      } catch {
        // Fallback if SVG text metrics are temporarily unavailable.
      }
    }

    measure()
    let cancelled = false
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (!cancelled) measure()
      })
    }
    window.addEventListener('resize', measure)
    return () => {
      cancelled = true
      window.removeEventListener('resize', measure)
    }
  }, [])

  const c = layout?.chars
  const topY = layout?.capTop ?? 124
  const baseY = layout?.baseline ?? 205

  return (
    <div className="stickmen-stage">
      <svg
        className="stickmen-svg"
        viewBox="0 0 1320 280"
        role="img"
        aria-label="Rishith Suresh in decorative hollow lettering with animated stickmen"
      >
        {/* Decorative geometric arcs & swirls inspired by editorial Didone specimen art */}
        {c && (
          <g aria-hidden="true">
            <circle cx={c[0].left + 12} cy={(topY + baseY) / 2} r="54" className="ornament-arc" />
            <circle cx={c[4].cx} cy={topY + 18} r="44" className="ornament-arc" />
            <circle cx={c[10].cx} cy={baseY - 20} r="48" className="ornament-arc" />

            {/* Swash curl off top-left of R */}
            <path
              d={`M ${c[0].left + 6} ${topY + 12} C ${c[0].left - 34} ${topY - 22}, ${c[0].left - 44} ${topY + 42}, ${c[0].left - 6} ${topY + 48}`}
              className="ornament-curl"
            />
            {/* Swash curl off bottom-right of S */}
            <path
              d={`M ${c[12].right - 4} ${baseY - 8} C ${c[12].right + 28} ${baseY + 26}, ${c[12].right + 38} ${baseY - 12}, ${c[12].right + 16} ${baseY - 18}`}
              className="ornament-curl"
            />

            {/* 4-point star sparkles above the I's */}
            <path
              d={`M ${c[1].cx} ${topY - 22} L ${c[1].cx + 2.5} ${topY - 15.5} L ${c[1].cx + 9} ${topY - 13} L ${c[1].cx + 2.5} ${topY - 10.5} L ${c[1].cx} ${topY - 4} L ${c[1].cx - 2.5} ${topY - 10.5} L ${c[1].cx - 9} ${topY - 13} L ${c[1].cx - 2.5} ${topY - 15.5} Z`}
              className="ornament-star"
            />
            <path
              d={`M ${c[4].cx} ${topY - 24} L ${c[4].cx + 2.5} ${topY - 17.5} L ${c[4].cx + 9} ${topY - 15} L ${c[4].cx + 2.5} ${topY - 12.5} L ${c[4].cx} ${topY - 6} L ${c[4].cx - 2.5} ${topY - 12.5} L ${c[4].cx - 9} ${topY - 15} L ${c[4].cx - 2.5} ${topY - 17.5} Z`}
              className="ornament-star"
            />
          </g>
        )}

        <text
          ref={textRef}
          x="660"
          y={BASELINE_Y}
          textAnchor="middle"
          className="hollow-name-text"
        >
          {FULL_NAME}
        </text>

        {c && (
          <g className="stickmen-layer">
            {/* 1. Sitting & dangling leg on top of first 'R' (Tangerine head) */}
            <g transform={`translate(${c[0].cx - 4}, ${topY})`}>
              <circle cx="0" cy="-23" r="4.2" fill="#ff7d00" stroke="#001524" strokeWidth="1.2" />
              <path d="M0 -18.5 L0 -1 L8 0" className="stick-limb" />
              <path d="M0 -1 L-3 9" className="stick-limb anim-kick" />
              <path d="M0 -14 L7 -9 L11 -11" className="stick-limb" />
              <path d="M9 -1 L16 -1 L18 -8" className="stick-prop" />
            </g>

            {/* 2. Sprinting across 'S' -> 'H' top edge (Deep Teal head) */}
            <g transform={`translate(${(c[2].cx + c[3].cx) / 2}, ${topY})`}>
              <g className="anim-sprint">
                <circle cx="2" cy="-27" r="4.1" fill="#006d77" stroke="#001524" strokeWidth="1.2" />
                <path d="M1.5 -22.5 L-1 -8" className="stick-limb" />
                <path d="M-1 -8 L-8 0 M-1 -8 L7 -1" className="stick-limb anim-run-legs" />
                <path d="M0.5 -19 L8 -14 M0.5 -19 L-7 -15" className="stick-limb" />
              </g>
            </g>

            {/* 3. Swinging between 'I' and 'T' (Terracotta head) */}
            <g transform={`translate(${(c[4].right + c[5].left) / 2}, ${topY + 2})`}>
              <g className="anim-swing">
                <line x1="0" y1="0" x2="0" y2="26" className="stick-prop" />
                <circle cx="0" cy="28" r="3.9" fill="#e29578" stroke="#001524" strokeWidth="1.2" />
                <path d="M0 32 L0 47 L-4 57 M0 47 L4 57" className="stick-limb" />
                <path d="M0 36 L-3 25 M0 36 L3 25" className="stick-limb" />
              </g>
            </g>

            {/* 4. Weightlifting on top of 'T' (Seafoam head) */}
            <g transform={`translate(${c[5].cx}, ${topY})`}>
              <circle cx="0" cy="-26" r="4.1" fill="#83c5be" stroke="#001524" strokeWidth="1.2" />
              <path d="M0 -21.5 L0 -8 L-5 0 M0 -8 L5 0" className="stick-limb" />
              <g className="anim-lift">
                <path d="M0 -18 L-9 -27 M0 -18 L9 -27" className="stick-limb" />
                <line x1="-15" y1="-28" x2="15" y2="-28" className="stick-prop" />
                <rect x="-17" y="-31" width="3" height="6" rx="0.8" fill="#ff7d00" />
                <rect x="14" y="-31" width="3" height="6" rx="0.8" fill="#ff7d00" />
              </g>
            </g>

            {/* 5. Climbing rope down the side of first 'H' (Rust head) */}
            <g transform={`translate(${c[6].right + 5}, ${topY})`}>
              <line x1="0" y1="0" x2="0" y2={baseY - topY} className="stick-line" />
              <g className="anim-climb">
                <circle cx="-5" cy="24" r="3.9" fill="#78290f" stroke="#001524" strokeWidth="1.2" />
                <path d="M-5 28 L-5 43 L-10 52 M-5 43 L0 51" className="stick-limb" />
                <path d="M-5 32 L0 26 M-5 35 L0 39" className="stick-limb" />
              </g>
            </g>

            {/* 6. Fishing off the top lip of 'U' into the curve (Gold head) */}
            <g transform={`translate(${c[9].left + 6}, ${topY})`}>
              <circle cx="0" cy="-23" r="4.1" fill="#ffc300" stroke="#001524" strokeWidth="1.2" />
              <path d="M0 -18.5 L0 -1 L8 0 M0 -1 L4 8" className="stick-limb" />
              <path d="M0 -14 L9 -13" className="stick-limb" />
              <path d="M8 -12 Q20 -26 30 -18" className="stick-prop" fill="none" />
              <line x1="30" y1="-18" x2="30" y2="26" className="stick-line anim-bob" />
              <circle cx="30" cy="26" r="2.2" fill="#ff7d00" className="anim-bob" />
            </g>

            {/* 7. Skateboarding across top of 'R' -> 'E' (Peach head) */}
            <g transform={`translate(${(c[10].cx + c[11].cx) / 2}, ${topY})`}>
              <g className="anim-skate">
                <circle cx="0" cy="-29" r="4.1" fill="#ffddd2" stroke="#001524" strokeWidth="1.2" />
                <path d="M0 -24.5 L-1 -11 L-5 -3 M-1 -11 L5 -3" className="stick-limb" />
                <path d="M0 -20 L-8 -16 M0 -20 L8 -17" className="stick-limb" />
                <line x1="-10" y1="-2" x2="10" y2="-2" stroke="#ff7d00" strokeWidth="2.2" strokeLinecap="round" />
                <circle cx="-6" cy="-0.4" r="1.5" fill="#001524" />
                <circle cx="6" cy="-0.4" r="1.5" fill="#001524" />
              </g>
            </g>

            {/* 8. Jumping on top of 'E' (Tangerine head) */}
            <g transform={`translate(${c[11].cx + 8}, ${topY})`}>
              <g className="anim-jump">
                <circle cx="0" cy="-26" r="4.1" fill="#ff7d00" stroke="#001524" strokeWidth="1.2" />
                <path d="M0 -21.5 L0 -8 L-5 0 M0 -8 L5 0" className="stick-limb" />
                <path d="M0 -17 L-8 -24 M0 -17 L8 -24" className="stick-limb" />
              </g>
            </g>

            {/* 9. Handstand balancing on final 'H' left pillar (Teal head) */}
            <g transform={`translate(${c[13].left + 8}, ${topY})`}>
              <g className="anim-wobble">
                <path d="M-4 0 L-1 -9 M4 0 L1 -9" className="stick-limb" />
                <path d="M0 -9 L0 -23 L-4 -32 M0 -23 L4 -32" className="stick-limb" />
                <circle cx="0" cy="-5" r="3.9" fill="#006d77" stroke="#001524" strokeWidth="1.2" />
              </g>
            </g>

            {/* 10. Standing tall on the baseline after final 'H' & waving (Terracotta head) */}
            <g transform={`translate(${c[13].right + 18}, ${baseY})`}>
              <circle cx="0" cy="-30" r="4.2" fill="#e29578" stroke="#001524" strokeWidth="1.2" />
              <path d="M0 -25.5 L0 -10 L-5 0 M0 -10 L5 0" className="stick-limb" />
              <path d="M0 -21 L-7 -13" className="stick-limb" />
              <path d="M0 -21 L8 -29" className="stick-limb anim-wave" />
            </g>
          </g>
        )}
      </svg>
    </div>
  )
}
