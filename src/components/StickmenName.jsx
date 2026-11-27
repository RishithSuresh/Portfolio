import { useEffect, useState } from 'react'

const DISPLAY_NAME = 'Rishith Suresh'
const BASELINE_Y = 230
const FONT_SIZE = 224
const CENTER_X = 680

// Default anchors derived from Maellen-e9j06.otf advance widths (total 4889 UPM)
const DEFAULT_SPOTS = [
  { x: 256, y: 74 },  // 0: R top arch (sitting)
  { x: 432, y: 162 }, // 1: s1 top (juggling)
  { x: 492, y: 68 },  // 2: h1 tall loop (sprinting)
  { x: 545, y: 142 }, // 3: i2 top (lifting)
  { x: 615, y: 66 },  // 4: t_h ascender (swinging)
  { x: 696, y: 92 },  // 5: rope climber between Rishith & Suresh
  { x: 838, y: 72 },  // 6: S2 arch (fishing)
  { x: 970, y: 160 }, // 7: u top (paper plane)
  { x: 1034, y: 140 }, // 8: r top (skateboarding)
  { x: 1094, y: 165 }, // 9: e top (jumping)
  { x: 1204, y: 68 }, // 10: h2 tall loop (handstand)
  { x: 1272, y: 230 } // 11: baseline after h2 (waving)
]

function Star4({ cx, cy, size = 8.5, className = 'ornament-star' }) {
  const s = size
  const i = size * 0.28
  return (
    <path
      d={`M ${cx} ${cy - s} L ${cx + i} ${cy - i} L ${cx + s} ${cy} L ${cx + i} ${cy + i} L ${cx} ${cy + s} L ${cx - i} ${cy + i} L ${cx - s} ${cy} L ${cx - i} ${cy - i} Z`}
      className={className}
    />
  )
}

export default function StickmenName() {
  const [spots, setSpots] = useState(DEFAULT_SPOTS)

  useEffect(() => {
    let cancelled = false

    const measureInk = () => {
      try {
        const canvas = document.createElement('canvas')
        canvas.width = 1360
        canvas.height = 340
        const ctx = canvas.getContext('2d', { willReadFrequently: true })
        if (!ctx) return

        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.font = `${FONT_SIZE}px 'Maellen'`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'alphabetic'
        ctx.fillStyle = '#000'
        ctx.fillText(DISPLAY_NAME, CENTER_X, BASELINE_Y)

        const metrics = ctx.measureText(DISPLAY_NAME)
        const totalW = metrics.width || 1100
        const startX = CENTER_X - totalW / 2
        const img = ctx.getImageData(0, 0, canvas.width, canvas.height).data

        // Scan vertically around target x to locate exact topmost ink pixel
        const findTopY = (targetX, minY = 20, maxY = BASELINE_Y - 6) => {
          const cx = Math.round(targetX)
          for (let y = minY; y <= maxY; y++) {
            for (let dx = -2; dx <= 2; dx++) {
              const px = cx + dx
              if (px < 0 || px >= canvas.width) continue
              const alpha = img[(y * canvas.width + px) * 4 + 3]
              if (alpha > 80) return y
            }
          }
          return null
        }

        // Exact fractional horizontal positions across the 4889-unit Maellen string
        const ratios = [
          0.145, // 0: R arch
          0.288, // 1: s1
          0.342, // 2: h1
          0.384, // 3: i2
          0.445, // 4: t_h
          0.514, // 5: gap between words
          0.635, // 6: S2 arch
          0.76,  // 7: u
          0.816, // 8: r
          0.868, // 9: e
          0.968, // 10: h2
          1.028  // 11: baseline wave
        ]

        const computed = ratios.map((r, idx) => {
          const x = startX + totalW * r
          if (idx === 5) {
            return { x, y: findTopY(startX + totalW * 0.45, 25, 160) ?? 72 }
          }
          if (idx === 11) {
            return { x: startX + totalW + 22, y: BASELINE_Y }
          }
          const y = findTopY(x)
          return { x, y: y ?? DEFAULT_SPOTS[idx].y }
        })

        if (!cancelled) setSpots(computed)
      } catch {
        // Keep exact fontTools-derived fallback coordinates
      }
    }

    const loadFont = async () => {
      try {
        if (document.fonts?.load) {
          await document.fonts.load(`${FONT_SIZE}px 'Maellen'`)
          await document.fonts.ready
        }
      } catch {
        // Ignore font loading errors
      }
      if (!cancelled) measureInk()
    }

    loadFont()
    window.addEventListener('resize', measureInk)
    return () => {
      cancelled = true
      window.removeEventListener('resize', measureInk)
    }
  }, [])

  return (
    <div className="stickmen-stage">
      <svg
        className="stickmen-svg"
        viewBox="30 10 1300 320"
        shapeRendering="geometricPrecision"
        role="img"
        aria-label="Rishith Suresh in Maellen decorative font with animated stickmen"
      >
        <defs>
          <linearGradient id="glyphGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#001524" />
            <stop offset="55%" stopColor="#063744" />
            <stop offset="100%" stopColor="#001524" />
          </linearGradient>

          <filter id="textGlow" x="-16%" y="-24%" width="132%" height="148%">
            <feGaussianBlur stdDeviation="6.5" result="blurA" />
            <feColorMatrix
              in="blurA"
              type="matrix"
              values="0 0 0 0 1   0 0 0 0 0.8   0 0 0 0 0.56  0 0 0 0.72 0"
              result="warmGlow"
            />
            <feMerge>
              <feMergeNode in="warmGlow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Gossamer Compass Circles & Twinkling Stars framing Maellen script */}
        <g aria-hidden="true">
          <g className="anim-orbit-cw" style={{ transformOrigin: '240px 160px' }}>
            <circle cx="240" cy="160" r="96" className="ornament-arc" />
            <circle cx="240" cy="160" r="68" className="ornament-arc-dashed" />
          </g>
          <g className="anim-orbit-ccw" style={{ transformOrigin: '545px 150px' }}>
            <circle cx="545" cy="150" r="78" className="ornament-arc" />
            <circle cx="545" cy="150" r="52" className="ornament-arc-accent" />
          </g>
          <g className="anim-orbit-cw" style={{ transformOrigin: '840px 165px' }}>
            <circle cx="840" cy="165" r="94" className="ornament-arc" />
            <circle cx="840" cy="165" r="64" className="ornament-arc-dashed" />
          </g>
          <circle cx="1110" cy="165" r="76" className="ornament-arc" />
          <ellipse cx="680" cy="175" rx="575" ry="122" className="ornament-orbit" />

          <Star4 cx={spots[3].x} cy={spots[3].y - 38} size={8.5} className="ornament-star anim-twinkle" />
          <Star4 cx={spots[6].x + 26} cy={spots[6].y - 18} size={7.5} className="ornament-star anim-twinkle-delay" />
          <Star4 cx={spots[9].x} cy={spots[9].y - 44} size={6.5} className="ornament-star-teal anim-twinkle" />
        </g>

        {/* Soft luminous light glow behind Maellen lettering */}
        <text
          x={CENTER_X}
          y={BASELINE_Y}
          textAnchor="middle"
          className="maellen-name-glow"
          filter="url(#textGlow)"
          aria-hidden="true"
        >
          {DISPLAY_NAME}
        </text>

        {/* Crisp 1px warm terracotta bottom-right hairline trace */}
        <text
          x={CENTER_X + 1.8}
          y={BASELINE_Y + 2}
          textAnchor="middle"
          className="maellen-name-trace"
          aria-hidden="true"
        >
          {DISPLAY_NAME}
        </text>

        {/* Main Maellen Font Text */}
        <text
          x={CENTER_X}
          y={BASELINE_Y}
          textAnchor="middle"
          className="maellen-name-text"
        >
          {DISPLAY_NAME}
        </text>

        {/* 12 Slender, Long-Bodied Colored-Head Stickmen Snapped to Maellen Ink Contours */}
        <g className="stickmen-layer">
          {/* 1. Sitting on R's top arch (Tangerine) */}
          <g transform={`translate(${spots[0].x}, ${spots[0].y})`}>
            <circle cx="0" cy="-22" r="3.8" fill="#ff7d00" stroke="#001524" strokeWidth="1.2" />
            <path d="M0 -18 L0 -1 L8 0" className="stick-limb" />
            <path d="M0 -1 L-3 9" className="stick-limb anim-kick" />
            <path d="M0 -13 L7 -8 L11 -10" className="stick-limb" />
            <path d="M9 -1 L15 -1 L17 -7" className="stick-prop" />
          </g>

          {/* 2. Juggling 3 colored balls on s1 (Deep Teal) */}
          <g transform={`translate(${spots[1].x}, ${spots[1].y})`}>
            <circle cx="0" cy="-25" r="3.8" fill="#006d77" stroke="#001524" strokeWidth="1.2" />
            <path d="M0 -21 L0 -8 L-5 0 M0 -8 L5 0" className="stick-limb" />
            <path d="M0 -17 L-8 -13 M0 -17 L8 -13" className="stick-limb" />
            <circle cx="-7" cy="-22" r="2.1" fill="#ff7d00" className="anim-juggle-a" />
            <circle cx="0" cy="-31" r="2.1" fill="#83c5be" className="anim-juggle-b" />
            <circle cx="7" cy="-22" r="2.1" fill="#e29578" className="anim-juggle-c" />
          </g>

          {/* 3. Sprinting across h1 loop (Teal) */}
          <g transform={`translate(${spots[2].x}, ${spots[2].y})`}>
            <g className="anim-sprint">
              <circle cx="2" cy="-26" r="3.8" fill="#006d77" stroke="#001524" strokeWidth="1.2" />
              <path d="M1.5 -22 L-1 -8" className="stick-limb" />
              <path d="M-1 -8 L-7 -3 L-9 0" className="stick-limb anim-stride-a" />
              <path d="M-1 -8 L5 -4 L7 0" className="stick-limb anim-stride-b" />
              <path d="M0.5 -18 L7 -14 L10 -17" className="stick-limb anim-arm-a" />
              <path d="M0.5 -18 L-6 -14 L-9 -12" className="stick-limb anim-arm-b" />
            </g>
          </g>

          {/* 4. Weightlifting on i2 (Seafoam) */}
          <g transform={`translate(${spots[3].x}, ${spots[3].y})`}>
            <circle cx="0" cy="-25" r="3.8" fill="#83c5be" stroke="#001524" strokeWidth="1.2" />
            <path d="M0 -21 L0 -8 L-5 0 M0 -8 L5 0" className="stick-limb" />
            <g className="anim-lift">
              <path d="M0 -17 L-9 -26 M0 -17 L9 -26" className="stick-limb" />
              <line x1="-15" y1="-27" x2="15" y2="-27" className="stick-prop" />
              <rect x="-17" y="-30" width="3" height="6" rx="0.8" fill="#ff7d00" />
              <rect x="14" y="-30" width="3" height="6" rx="0.8" fill="#ff7d00" />
            </g>
          </g>

          {/* 5. Swinging from t_h ascender (Terracotta) */}
          <g transform={`translate(${spots[4].x}, ${spots[4].y + 4})`}>
            <g className="anim-swing">
              <line x1="0" y1="0" x2="0" y2="26" className="stick-prop" />
              <circle cx="0" cy="28" r="3.7" fill="#e29578" stroke="#001524" strokeWidth="1.2" />
              <path d="M0 32 L0 46 L-4 56 M0 46 L4 56" className="stick-limb" />
              <path d="M0 36 L-3 25 M0 36 L3 25" className="stick-limb" />
            </g>
          </g>

          {/* 6. Climbing rope in the gap between Rishith & Suresh (Rust) */}
          <g transform={`translate(${spots[5].x}, ${spots[5].y})`}>
            <line x1="0" y1="0" x2="0" y2={BASELINE_Y - spots[5].y} className="stick-line" />
            <g className="anim-climb">
              <circle cx="-5" cy="48" r="3.8" fill="#78290f" stroke="#001524" strokeWidth="1.2" />
              <path d="M-5 52 L-5 68 L-10 77 M-5 68 L0 76" className="stick-limb" />
              <path d="M-5 56 L0 49 M-5 60 L0 65" className="stick-limb" />
            </g>
          </g>

          {/* 7. Fishing off S2's arch (Gold) */}
          <g transform={`translate(${spots[6].x}, ${spots[6].y})`}>
            <circle cx="0" cy="-22" r="3.8" fill="#ffc300" stroke="#001524" strokeWidth="1.2" />
            <path d="M0 -18 L0 -1 L8 0 M0 -1 L4 8" className="stick-limb" />
            <path d="M0 -14 L9 -13" className="stick-limb" />
            <path d="M8 -12 Q22 -24 34 -14" className="stick-prop" fill="none" />
            <line x1="34" y1="-14" x2="34" y2="62" className="stick-line anim-bob" />
            <circle cx="34" cy="62" r="2.4" fill="#ff7d00" className="anim-bob" />
          </g>

          {/* 8. Launching gliding paper airplane from u (Rust) */}
          <g transform={`translate(${spots[7].x}, ${spots[7].y})`}>
            <circle cx="0" cy="-25" r="3.7" fill="#78290f" stroke="#001524" strokeWidth="1.2" />
            <path d="M0 -21 L0 -8 L-5 0 M0 -8 L5 0" className="stick-limb" />
            <path d="M0 -17 L-6 -12 M0 -17 L9 -21" className="stick-limb" />
            <path d="M10 -24 L20 -26 L13 -20 Z" fill="#ffddd2" stroke="#001524" strokeWidth="0.9" className="anim-plane" />
          </g>

          {/* 9. Skateboarding with mid-air Ollie over r (Peach) */}
          <g transform={`translate(${spots[8].x}, ${spots[8].y})`}>
            <g className="anim-skate-tight">
              <circle cx="0" cy="-28" r="3.8" fill="#ffddd2" stroke="#001524" strokeWidth="1.2" />
              <path d="M0 -24 L-1 -11 L-5 -3 M-1 -11 L5 -3" className="stick-limb" />
              <path d="M0 -19 L-8 -15 M0 -19 L8 -16" className="stick-limb" />
              <line x1="-10" y1="-2" x2="10" y2="-2" stroke="#ff7d00" strokeWidth="2.2" strokeLinecap="round" />
              <circle cx="-6" cy="-0.4" r="1.5" fill="#001524" />
              <circle cx="6" cy="-0.4" r="1.5" fill="#001524" />
            </g>
          </g>

          {/* 10. Jumping cheerfully on top of e (Tangerine) */}
          <g transform={`translate(${spots[9].x}, ${spots[9].y})`}>
            <g className="anim-jump">
              <circle cx="0" cy="-25" r="3.8" fill="#ff7d00" stroke="#001524" strokeWidth="1.2" />
              <path d="M0 -21 L0 -8 L-5 0 M0 -8 L5 0" className="stick-limb" />
              <path d="M0 -17 L-8 -24 M0 -17 L8 -24" className="stick-limb" />
            </g>
          </g>

          {/* 11. Balancing handstand on final h2 tall loop (Teal) */}
          <g transform={`translate(${spots[10].x}, ${spots[10].y})`}>
            <g className="anim-wobble">
              <path d="M-4 0 L-1 -9 M4 0 L1 -9" className="stick-limb" />
              <path d="M0 -9 L0 -23 L-4 -32 M0 -23 L4 -32" className="stick-limb" />
              <circle cx="0" cy="-5" r="3.8" fill="#006d77" stroke="#001524" strokeWidth="1.2" />
            </g>
          </g>

          {/* 12. Standing tall on the baseline after final h2 & waving hello (Terracotta) */}
          <g transform={`translate(${spots[11].x}, ${spots[11].y})`}>
            <circle cx="0" cy="-29" r="3.9" fill="#e29578" stroke="#001524" strokeWidth="1.2" />
            <path d="M0 -25 L0 -10 L-5 0 M0 -10 L5 0" className="stick-limb" />
            <path d="M0 -20 L-7 -12" className="stick-limb" />
            <path d="M0 -20 L8 -28" className="stick-limb anim-wave" />
          </g>
        </g>
      </svg>
    </div>
  )
}
