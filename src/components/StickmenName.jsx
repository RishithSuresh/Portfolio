import { useEffect, useState } from 'react'

const DISPLAY_NAME = 'Rishith Suresh'
const BASELINE_Y = 230
const FONT_SIZE = 224
const CENTER_X = 680

// Default anchors verified from Maellen-e9j06.otf contours at 224px (BASELINE_Y = 230)
const DEFAULT_SPOTS = [
  { x: 192, y: 145 },  // 0: R left sweeping curl (waving hello)
  { x: 282, y: 66 },   // 1: R wide upper crown (skateboarding ollie)
  { x: 426, y: 143 },  // 2: i1 slanted dot (weightlifting)
  { x: 466, y: 162 },  // 3: s1 smooth dome (3-ball circular juggle)
  { x: 524, y: 66 },   // 4: h1 narrow tall crown (handstand balance)
  { x: 570, y: 143 },  // 5: i2 slanted dot (cheerful jumper in clear chimney)
  { x: 636, y: 63 },   // 6: t_h twin-loop broad crown (sprinter)
  { x: 681, y: 114 },  // 7: t_h projecting right crossbar tip (rope climber into canyon)
  { x: 820, y: 111 },  // 8: S smooth left plateau (laptop coder)
  { x: 930, y: 67 },   // 9: S towering right hood (fisherman over u valley)
  { x: 1026, y: 141 }, // 10: r sharp crest (paper airplane launcher over e s)
  { x: 1216, y: 66 }   // 11: h2 tall loop crown (victory star cheer)
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
        const totalW = metrics.width || 1095
        const startX = CENTER_X - totalW / 2
        const img = ctx.getImageData(0, 0, canvas.width, canvas.height).data

        const hasInk = (x, y) => {
          const px = Math.round(x)
          const py = Math.round(y)
          if (px < 0 || px >= canvas.width || py < 0 || py >= canvas.height) return false
          return img[(py * canvas.width + px) * 4 + 3] > 85
        }

        const findTopY = (targetX, minY = 20, maxY = BASELINE_Y - 6) => {
          const cx = Math.round(targetX)
          for (let y = minY; y <= maxY; y++) {
            for (let dx = -1; dx <= 1; dx++) {
              if (hasInk(cx + dx, y)) return y
            }
          }
          return null
        }

        // Find the peak crown (lowest y) across a narrow horizontal window [rMin, rMax]
        const findCrownSpot = (rMin, rMax, fallback, minY = 20, maxY = BASELINE_Y - 6) => {
          const xStart = Math.round(startX + totalW * rMin)
          const xEnd = Math.round(startX + totalW * rMax)
          let bestY = Infinity
          const bestXs = []

          for (let x = xStart; x <= xEnd; x += 2) {
            const y = findTopY(x, minY, maxY)
            if (y !== null) {
              if (y < bestY - 1) {
                bestY = y
                bestXs.length = 0
                bestXs.push(x)
              } else if (Math.abs(y - bestY) <= 1) {
                bestXs.push(x)
              }
            }
          }

          if (bestXs.length === 0) return fallback
          const midX = bestXs[Math.floor(bestXs.length / 2)]
          return { x: midX, y: bestY }
        }

        // Find the rightmost pixel of a projecting crossbar (e.g. t_h)
        const findCrossbarTip = (rMin, rMax, yMin, yMax, fallback) => {
          const xStart = Math.round(startX + totalW * rMin)
          const xEnd = Math.round(startX + totalW * rMax)
          for (let x = xEnd; x >= xStart; x--) {
            for (let y = yMin; y <= yMax; y++) {
              if (hasInk(x, y)) return { x: x - 1, y }
            }
          }
          return fallback
        }

        const specs = [
          // 0: R left sweeping curl
          () => {
            const x = Math.round(startX + totalW * 0.054)
            return { x, y: findTopY(x, 120, 175) ?? DEFAULT_SPOTS[0].y }
          },
          // 1: R wide upper crown
          () => findCrownSpot(0.125, 0.148, DEFAULT_SPOTS[1], 45, 95),
          // 2: i1 slanted dot
          () => findCrownSpot(0.258, 0.278, DEFAULT_SPOTS[2], 125, 160),
          // 3: s1 smooth dome
          () => findCrownSpot(0.295, 0.312, DEFAULT_SPOTS[3], 145, 185),
          // 4: h1 tall narrow loop crown
          () => findCrownSpot(0.348, 0.368, DEFAULT_SPOTS[4], 40, 95),
          // 5: i2 slanted dot
          () => findCrownSpot(0.392, 0.410, DEFAULT_SPOTS[5], 125, 160),
          // 6: t_h broad twin-loop top
          () => findCrownSpot(0.452, 0.470, DEFAULT_SPOTS[6], 40, 95),
          // 7: t_h right projecting crossbar tip (rope anchor)
          () => findCrossbarTip(0.488, 0.518, 102, 126, DEFAULT_SPOTS[7]),
          // 8: S smooth left plateau
          () => {
            const x = Math.round(startX + totalW * 0.628)
            return { x, y: findTopY(x, 96, 138) ?? DEFAULT_SPOTS[8].y }
          },
          // 9: S towering right hood crown
          () => findCrownSpot(0.718, 0.742, DEFAULT_SPOTS[9], 40, 95),
          // 10: r crest
          () => findCrownSpot(0.806, 0.826, DEFAULT_SPOTS[10], 125, 165),
          // 11: h2 tall loop crown
          () => findCrownSpot(0.978, 0.996, DEFAULT_SPOTS[11], 40, 95)
        ]

        const computed = specs.map(fn => fn())
        if (!cancelled) setSpots(computed)
      } catch {
        // Keep fontTools-verified fallback coordinates
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
        viewBox="30 8 1300 322"
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

          <Star4 cx={spots[2].x - 16} cy={spots[2].y - 52} size={8} className="ornament-star anim-twinkle" />
          <Star4 cx={spots[9].x - 42} cy={spots[9].y - 24} size={7.5} className="ornament-star anim-twinkle-delay" />
          <Star4 cx={spots[11].x + 20} cy={spots[11].y - 34} size={8.5} className="ornament-star-teal anim-twinkle" />
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

        {/* 12 Slender Colored-Head Stickmen Snapped Cleanly onto Maellen Contours */}
        <g className="stickmen-layer">
          {/* 1. Cheerful greeter waving from R's left swash curl (Tangerine) */}
          <g transform={`translate(${spots[0].x}, ${spots[0].y})`}>
            <g className="anim-bob-soft">
              <circle cx="0" cy="-27" r="3.8" fill="#ff7d00" stroke="#001524" strokeWidth="1.2" />
              <path d="M0 -23 L0 -9 L-5 0 M0 -9 L5 0" className="stick-limb" />
              <path d="M0 -18 L7 -11" className="stick-limb" />
              <path d="M0 -18 L-8 -26" className="stick-limb anim-wave-left" />
            </g>
          </g>

          {/* 2. Skateboarder carving & popping an Ollie on R's wide upper crown (Peach) */}
          <g transform={`translate(${spots[1].x}, ${spots[1].y})`}>
            <g className="anim-skate-tight">
              <circle cx="0" cy="-28" r="3.8" fill="#ffddd2" stroke="#001524" strokeWidth="1.2" />
              <path d="M0 -24 L-1 -11 L-5 -3 M-1 -11 L5 -3" className="stick-limb" />
              <path d="M0 -19 L-8 -15 M0 -19 L8 -16" className="stick-limb" />
              <line x1="-10" y1="-2" x2="10" y2="-2" stroke="#ff7d00" strokeWidth="2.2" strokeLinecap="round" />
              <circle cx="-6" cy="-0.4" r="1.5" fill="#001524" />
              <circle cx="6" cy="-0.4" r="1.5" fill="#001524" />
            </g>
          </g>

          {/* 3. Weightlifter synced knee-squat & overhead press on i1 dot (Seafoam) */}
          <g transform={`translate(${spots[2].x}, ${spots[2].y})`}>
            <path d="M-5 0 L-3 -7 M5 0 L3 -7" className="stick-limb" />
            <g className="anim-squat">
              <circle cx="0" cy="-25" r="3.8" fill="#83c5be" stroke="#001524" strokeWidth="1.2" />
              <path d="M0 -21 L0 -7" className="stick-limb" />
            </g>
            <g className="anim-lift">
              <path d="M0 -17 L-8 -25 M0 -17 L8 -25" className="stick-limb" />
              <line x1="-13" y1="-26" x2="13" y2="-26" className="stick-prop" />
              <rect x="-15" y="-29" width="2.8" height="6" rx="0.8" fill="#ff7d00" />
              <rect x="12.2" y="-29" width="2.8" height="6" rx="0.8" fill="#ff7d00" />
            </g>
          </g>

          {/* 4. 3-ball circular cascade juggler on s1 dome (Deep Teal) */}
          <g transform={`translate(${spots[3].x}, ${spots[3].y})`}>
            <circle cx="0" cy="-25" r="3.8" fill="#006d77" stroke="#001524" strokeWidth="1.2" />
            <path d="M0 -21 L0 -8 L-5 0 M0 -8 L5 0" className="stick-limb" />
            <path d="M0 -17 L-7 -12 M0 -17 L7 -12" className="stick-limb anim-hands" />
            <circle cx="-7" cy="-22" r="2.1" fill="#ff7d00" className="anim-juggle-a" />
            <circle cx="0" cy="-32" r="2.1" fill="#83c5be" className="anim-juggle-b" />
            <circle cx="7" cy="-22" r="2.1" fill="#e29578" className="anim-juggle-c" />
          </g>

          {/* 5. Balancing handstand on h1 tall narrow crown (Deep Teal) */}
          <g transform={`translate(${spots[4].x}, ${spots[4].y})`}>
            <g className="anim-wobble">
              <path d="M-4 0 L-1 -9 M4 0 L1 -9" className="stick-limb" />
              <path d="M0 -9 L0 -23 L-4 -32 M0 -23 L4 -32" className="stick-limb" />
              <circle cx="0" cy="-5" r="3.8" fill="#006d77" stroke="#001524" strokeWidth="1.2" />
            </g>
          </g>

          {/* 6. Joyful jumper inside the open chimney over i2 dot (Tangerine) */}
          <g transform={`translate(${spots[5].x}, ${spots[5].y})`}>
            <g className="anim-jump">
              <circle cx="0" cy="-25" r="3.8" fill="#ff7d00" stroke="#001524" strokeWidth="1.2" />
              <path d="M0 -21 L0 -8 L-5 0 M0 -8 L5 0" className="stick-limb" />
              <path d="M0 -17 L-7 -24 M0 -17 L7 -24" className="stick-limb" />
            </g>
          </g>

          {/* 7. Sprinter racing across t_h's wide twin-loop crown (Terracotta) */}
          <g transform={`translate(${spots[6].x}, ${spots[6].y})`}>
            <g className="anim-sprint-tight">
              <circle cx="2" cy="-26" r="3.8" fill="#e29578" stroke="#001524" strokeWidth="1.2" />
              <path d="M1.5 -22 L-1 -8" className="stick-limb" />
              <path d="M-1 -8 L-6 -3 L-8 0" className="stick-limb anim-stride-a" />
              <path d="M-1 -8 L5 -4 L7 0" className="stick-limb anim-stride-b" />
              <path d="M0.5 -18 L6 -14 L9 -17" className="stick-limb anim-arm-a" />
              <path d="M0.5 -18 L-6 -14 L-9 -12" className="stick-limb anim-arm-b" />
            </g>
          </g>

          {/* 8. Rope climber anchored directly onto t_h's crossbar tip in the canyon (Rust) */}
          <g transform={`translate(${spots[7].x}, ${spots[7].y})`}>
            <circle cx="0" cy="0" r="1.6" fill="#78290f" />
            <line x1="0" y1="0" x2="0" y2={BASELINE_Y - spots[7].y - 4} className="stick-line" />
            <g className="anim-climb">
              <circle cx="5" cy="44" r="3.8" fill="#78290f" stroke="#001524" strokeWidth="1.2" />
              <path d="M5 48 L5 64 L0 72 M5 64 L10 73" className="stick-limb" />
              <path d="M5 52 L0 45 M5 56 L0 61" className="stick-limb" />
            </g>
          </g>

          {/* 9. Laptop coder seated cleanly on S's left upper plateau (Tangerine) */}
          <g transform={`translate(${spots[8].x}, ${spots[8].y})`}>
            <g className="anim-bob-soft">
              <circle cx="0" cy="-21" r="3.8" fill="#ff7d00" stroke="#001524" strokeWidth="1.2" />
              <path d="M0 -17 L0 -2 L6 0 L8 2" className="stick-limb" />
              <path d="M0 -2 L-4 2" className="stick-limb" />
              <path d="M0 -13 L6 -8 L10 -10" className="stick-limb anim-type" />
            </g>
            <path d="M9 -1 L15 -1 L17 -7" className="stick-prop" />
          </g>

          {/* 10. Fisherman perched on S's towering right hood casting over u valley (Gold) */}
          <g transform={`translate(${spots[9].x}, ${spots[9].y})`}>
            <circle cx="0" cy="-22" r="3.8" fill="#ffc300" stroke="#001524" strokeWidth="1.2" />
            <path d="M0 -18 L0 -2 L7 0 L8 5" className="stick-limb" />
            <path d="M0 -2 L4 5" className="stick-limb" />
            <path d="M0 -14 L9 -13" className="stick-limb" />
            <path d="M8 -12 Q19 -24 28 -14" className="stick-prop" fill="none" />
            <line x1="28" y1="-14" x2="28" y2="54" className="stick-line anim-bob" />
            <circle cx="28" cy="54" r="2.3" fill="#ff7d00" className="anim-bob" />
          </g>

          {/* 11. Paper airplane launcher atop r's sharp peak (Rust) */}
          <g transform={`translate(${spots[10].x}, ${spots[10].y})`}>
            <circle cx="0" cy="-25" r="3.7" fill="#78290f" stroke="#001524" strokeWidth="1.2" />
            <path d="M0 -21 L0 -8 L-5 0 M0 -8 L5 0" className="stick-limb" />
            <path d="M0 -17 L-6 -12" className="stick-limb" />
            <path d="M0 -17 L9 -21" className="stick-limb anim-throw" />
            <path
              d="M11 -24 L21 -26 L14 -20 Z"
              fill="#ffddd2"
              stroke="#001524"
              strokeWidth="0.9"
              className="anim-plane"
            />
          </g>

          {/* 12. Victory star-cheerleader atop h2's tall loop crown (Terracotta) */}
          <g transform={`translate(${spots[11].x}, ${spots[11].y})`}>
            <circle cx="0" cy="-27" r="3.9" fill="#e29578" stroke="#001524" strokeWidth="1.2" />
            <path d="M0 -23 L0 -9 L-5 0 M0 -9 L5 0" className="stick-limb" />
            <path d="M0 -19 L-7 -12" className="stick-limb" />
            <path d="M0 -19 L8 -27" className="stick-limb anim-wave" />
          </g>
        </g>
      </svg>
    </div>
  )
}
