import { useEffect, useState } from 'react'

const DISPLAY_NAME = 'Rishith Suresh'
const BASELINE_Y = 230
const FONT_SIZE = 224
const CENTER_X = 680

// Default anchors verified from Maellen-e9j06.otf contours at 224px (BASELINE_Y = 230)
const DEFAULT_SPOTS = [
  { x: 192, y: 145 },  // 0: R left sweeping curl (elbow-hinged greeting wave)
  { x: 282, y: 66 },   // 1: R wide upper crown (crouch-pop-absorb skateboard ollie)
  { x: 426, y: 143 },  // 2: i1 slanted dot (power-clean & jerk weightlifter)
  { x: 466, y: 162 },  // 3: s1 smooth dome (parabolic 3-ball cascade juggler)
  { x: 524, y: 66 },   // 4: h1 narrow tall crown (one-leg scissor handstand)
  { x: 570, y: 143 },  // 5: i2 slanted dot (jump-rope skipper in clear chimney)
  { x: 636, y: 63 },   // 6: t_h twin-loop broad crown (turn-around sprinter)
  { x: 681, y: 114 },  // 7: t_h projecting crossbar tip (hand-over-hand rope climber)
  { x: 820, y: 111 },  // 8: S smooth left plateau (music-grooving laptop coder)
  { x: 930, y: 67 },   // 9: S towering right hood (fisherman with bite yank)
  { x: 1026, y: 141 }, // 10: r sharp crest (wind-up paper airplane thrower)
  { x: 1216, y: 66 }   // 11: h2 tall loop crown (summiteer planting & waving flag)
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
          () => {
            const x = Math.round(startX + totalW * 0.054)
            return { x, y: findTopY(x, 120, 175) ?? DEFAULT_SPOTS[0].y }
          },
          () => findCrownSpot(0.125, 0.148, DEFAULT_SPOTS[1], 45, 95),
          () => findCrownSpot(0.258, 0.278, DEFAULT_SPOTS[2], 125, 160),
          () => findCrownSpot(0.295, 0.312, DEFAULT_SPOTS[3], 145, 185),
          () => findCrownSpot(0.348, 0.368, DEFAULT_SPOTS[4], 40, 95),
          () => findCrownSpot(0.392, 0.410, DEFAULT_SPOTS[5], 125, 160),
          () => findCrownSpot(0.452, 0.470, DEFAULT_SPOTS[6], 40, 95),
          () => findCrossbarTip(0.488, 0.518, 102, 126, DEFAULT_SPOTS[7]),
          () => {
            const x = Math.round(startX + totalW * 0.628)
            return { x, y: findTopY(x, 96, 138) ?? DEFAULT_SPOTS[8].y }
          },
          () => findCrownSpot(0.718, 0.742, DEFAULT_SPOTS[9], 40, 95),
          () => findCrownSpot(0.806, 0.826, DEFAULT_SPOTS[10], 125, 165),
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
          <Star4 cx={spots[11].x + 22} cy={spots[11].y - 38} size={8.5} className="ornament-star-teal anim-twinkle" />
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

        {/* 12 Articulated Colored-Head Stickmen Performing Diverse Activities */}
        <g className="stickmen-layer">
          {/* 1. Greeter on R's left curl with natural hip sway & elbow-hinged forearm wave (Tangerine) */}
          <g transform={`translate(${spots[0].x}, ${spots[0].y})`}>
            <path d="M-5 0 L-3 -9 M5 0 L3 -9" className="stick-limb" />
            <g transform="translate(0, -9)">
              <g className="anim-sway-torso">
                <path d="M0 0 L0 -14" className="stick-limb" />
                <circle cx="0" cy="-18" r="3.8" fill="#ff7d00" stroke="#001524" strokeWidth="1.2" />
                <path d="M0 -10 L6 -3" className="stick-limb" />
                {/* Upper arm raised, forearm pivots at elbow */}
                <path d="M0 -10 L-6 -14" className="stick-limb" />
                <g transform="translate(-6, -14)">
                  <path d="M0 0 L-4 -6" className="stick-limb anim-elbow-wave-left" />
                </g>
              </g>
            </g>
          </g>

          {/* 2. Skateboarder carving with crouch anticipation -> Ollie pop -> knee absorption (Peach) */}
          <g transform={`translate(${spots[1].x}, ${spots[1].y})`}>
            <g className="anim-skate-real">
              <g className="anim-skate-crouch">
                <circle cx="0" cy="-27" r="3.8" fill="#ffddd2" stroke="#001524" strokeWidth="1.2" />
                <path d="M0 -23 L-1 -11" className="stick-limb" />
                <path d="M-1 -11 L-5 -6 L-4 -3 M-1 -11 L5 -6 L4 -3" className="stick-limb" />
                <path d="M0 -19 L-8 -15 L-11 -18 M0 -19 L8 -16 L10 -20" className="stick-limb" />
              </g>
              <line x1="-10" y1="-2" x2="10" y2="-2" stroke="#ff7d00" strokeWidth="2.2" strokeLinecap="round" />
              <circle cx="-6" cy="-0.4" r="1.5" fill="#001524" />
              <circle cx="6" cy="-0.4" r="1.5" fill="#001524" />
            </g>
          </g>

          {/* 3. Weightlifter doing clean-and-jerk on i1 dot with hip drive & lockout (Seafoam) */}
          <g transform={`translate(${spots[2].x}, ${spots[2].y})`}>
            <path d="M-5 0 L-3 -7 M5 0 L3 -7" className="stick-limb" />
            <g transform="translate(0, -7)">
              <g className="anim-clean-body">
                <path d="M0 0 L0 -14" className="stick-limb" />
                <circle cx="0" cy="-18" r="3.8" fill="#83c5be" stroke="#001524" strokeWidth="1.2" />
              </g>
              <g className="anim-clean-bar">
                <path d="M0 -10 L-8 -17 M0 -10 L8 -17" className="stick-limb" />
                <line x1="-13" y1="-18" x2="13" y2="-18" className="stick-prop" />
                <rect x="-15" y="-21" width="2.8" height="6" rx="0.8" fill="#ff7d00" />
                <rect x="12.2" y="-21" width="2.8" height="6" rx="0.8" fill="#ff7d00" />
              </g>
            </g>
          </g>

          {/* 4. Parabolic 3-ball juggler on s1 dome with alternating wrist tosses (Deep Teal) */}
          <g transform={`translate(${spots[3].x}, ${spots[3].y})`}>
            <circle cx="0" cy="-25" r="3.8" fill="#006d77" stroke="#001524" strokeWidth="1.2" />
            <path d="M0 -21 L0 -8 L-5 0 M0 -8 L5 0" className="stick-limb" />
            <path d="M0 -17 L-5 -14" className="stick-limb" />
            <g transform="translate(-5, -14)">
              <path d="M0 0 L-4 2" className="stick-limb anim-toss-l" />
            </g>
            <path d="M0 -17 L5 -14" className="stick-limb" />
            <g transform="translate(5, -14)">
              <path d="M0 0 L4 2" className="stick-limb anim-toss-r" />
            </g>
            <circle cx="-8" cy="-19" r="2.1" fill="#ff7d00" className="anim-parabola-a" />
            <circle cx="0" cy="-34" r="2.1" fill="#83c5be" className="anim-parabola-b" />
            <circle cx="8" cy="-19" r="2.1" fill="#e29578" className="anim-parabola-c" />
          </g>

          {/* 5. One-arm scissor-leg handstand balancer on h1 narrow crown (Deep Teal) */}
          <g transform={`translate(${spots[4].x}, ${spots[4].y})`}>
            <g className="anim-handstand">
              <path d="M-3 0 L-1 -9 M3 0 L1 -9" className="stick-limb" />
              <path d="M0 -9 L0 -22" className="stick-limb" />
              <circle cx="0" cy="-5" r="3.8" fill="#006d77" stroke="#001524" strokeWidth="1.2" />
              <g transform="translate(0, -22)">
                <path d="M0 0 L-5 -9" className="stick-limb anim-scissor-a" />
                <path d="M0 0 L5 -8" className="stick-limb anim-scissor-b" />
              </g>
            </g>
          </g>

          {/* 6. Jump-rope skipper inside i2 chimney with realistic knee hop & spinning rope (Tangerine) */}
          <g transform={`translate(${spots[5].x}, ${spots[5].y})`}>
            <g className="anim-skip-hop">
              <circle cx="0" cy="-25" r="3.8" fill="#ff7d00" stroke="#001524" strokeWidth="1.2" />
              <path d="M0 -21 L0 -9 L-4 -4 L-4 0 M0 -9 L4 -4 L4 0" className="stick-limb" />
              <path d="M0 -16 L-8 -13 M0 -16 L8 -13" className="stick-limb" />
            </g>
            <path d="M-8 -13 Q0 -34 8 -13" className="stick-prop anim-rope-spin" fill="none" />
          </g>

          {/* 7. Turn-around articulated sprinter racing across t_h twin-loop crown (Terracotta) */}
          <g transform={`translate(${spots[6].x}, ${spots[6].y})`}>
            <g className="anim-sprint-turn">
              <g className="anim-run-bounce">
                <g transform="rotate(10 0 -12)">
                  <circle cx="1" cy="-26" r="3.8" fill="#e29578" stroke="#001524" strokeWidth="1.2" />
                  <path d="M0 -22 L0 -8" className="stick-limb" />
                  {/* Hip joint with articulated knee legs */}
                  <g transform="translate(0, -8)">
                    <g className="anim-stride-a">
                      <path d="M0 0 L3 5 L-1 8" className="stick-limb" />
                    </g>
                    <g className="anim-stride-b">
                      <path d="M0 0 L-3 5 L-6 7" className="stick-limb" />
                    </g>
                  </g>
                  {/* Shoulder joint with bent pumping elbows */}
                  <g transform="translate(0, -18)">
                    <g className="anim-arm-a">
                      <path d="M0 0 L4 4 L8 1" className="stick-limb" />
                    </g>
                    <g className="anim-arm-b">
                      <path d="M0 0 L-4 4 L-1 7" className="stick-limb" />
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>

          {/* 8. Hand-over-hand alternating rope climber tied to t_h crossbar tip (Rust) */}
          <g transform={`translate(${spots[7].x}, ${spots[7].y})`}>
            <circle cx="0" cy="0" r="1.6" fill="#78290f" />
            <line x1="0" y1="0" x2="0" y2={BASELINE_Y - spots[7].y - 4} className="stick-line" />
            <g className="anim-climb-pull">
              <circle cx="5" cy="44" r="3.8" fill="#78290f" stroke="#001524" strokeWidth="1.2" />
              <path d="M5 48 L5 64" className="stick-limb" />
              {/* Alternating knee-tuck legs */}
              <g transform="translate(5, 64)">
                <path d="M0 0 L-5 4 L-2 9" className="stick-limb anim-knee-a" />
                <path d="M0 0 L4 5 L2 10" className="stick-limb anim-knee-b" />
              </g>
              {/* Alternating hand-over-hand arm pulls */}
              <g transform="translate(5, 53)">
                <path d="M0 0 L-5 -7" className="stick-limb anim-reach-a" />
                <path d="M0 0 L-5 5" className="stick-limb anim-reach-b" />
              </g>
            </g>
          </g>

          {/* 9. Music-grooving laptop coder with dual typing & floating eighth note on S (Tangerine) */}
          <g transform={`translate(${spots[8].x}, ${spots[8].y})`}>
            <g className="anim-music-groove">
              <circle cx="0" cy="-21" r="3.8" fill="#ff7d00" stroke="#001524" strokeWidth="1.2" />
              <path d="M0 -17 L0 -2 L6 0 L8 2" className="stick-limb" />
              <path d="M0 -2 L-4 2" className="stick-limb" />
              <g transform="translate(0, -13)">
                <path d="M0 0 L6 5 L10 3" className="stick-limb anim-type" />
                <path d="M0 1 L5 6 L9 5" className="stick-limb anim-type-alt" />
              </g>
            </g>
            <path d="M9 -1 L15 -1 L17 -7" className="stick-prop" />
            <text x="-8" y="-30" className="stick-note anim-note-float">♪</text>
          </g>

          {/* 10. Fisherman on S's towering right hood with sudden bite tug & water ripple (Gold) */}
          <g transform={`translate(${spots[9].x}, ${spots[9].y})`}>
            <path d="M0 -2 L7 0 L8 5 M0 -2 L4 5" className="stick-limb" />
            <g transform="translate(0, -2)">
              <g className="anim-fish-lean">
                <circle cx="0" cy="-20" r="3.8" fill="#ffc300" stroke="#001524" strokeWidth="1.2" />
                <path d="M0 -16 L0 0" className="stick-limb" />
                <path d="M0 -12 L9 -11" className="stick-limb" />
                <path d="M8 -10 Q19 -22 28 -12" className="stick-prop" fill="none" />
              </g>
            </g>
            <line x1="28" y1="-14" x2="28" y2="54" className="stick-line anim-bite-bob" />
            <circle cx="28" cy="54" r="2.3" fill="#ff7d00" className="anim-bite-bob" />
            <ellipse cx="28" cy="54" rx="5" ry="1.8" className="stick-ripple anim-ripple" />
          </g>

          {/* 11. Wind-up paper airplane thrower on r's peak with articulated follow-through (Rust) */}
          <g transform={`translate(${spots[10].x}, ${spots[10].y})`}>
            <g className="anim-throw-lean">
              <circle cx="0" cy="-25" r="3.7" fill="#78290f" stroke="#001524" strokeWidth="1.2" />
              <path d="M0 -21 L0 -8 L-5 0 M0 -8 L5 0" className="stick-limb" />
              <path d="M0 -17 L-6 -12" className="stick-limb" />
              <g transform="translate(0, -17)">
                <path d="M0 0 L8 -4" className="stick-limb anim-throw" />
              </g>
            </g>
            <path
              d="M11 -24 L21 -26 L14 -20 Z"
              fill="#ffddd2"
              stroke="#001524"
              strokeWidth="0.9"
              className="anim-plane"
            />
          </g>

          {/* 12. Summiteer planting & waving a fluttering pennant flag atop h2's crown (Terracotta) */}
          <g transform={`translate(${spots[11].x}, ${spots[11].y})`}>
            <path d="M-5 0 L-3 -9 M5 0 L3 -9" className="stick-limb" />
            <g transform="translate(0, -9)">
              <g className="anim-sway-torso">
                <path d="M0 0 L0 -14" className="stick-limb" />
                <circle cx="0" cy="-18" r="3.9" fill="#e29578" stroke="#001524" strokeWidth="1.2" />
                {/* Left elbow wave */}
                <path d="M0 -10 L-6 -14" className="stick-limb" />
                <g transform="translate(-6, -14)">
                  <path d="M0 0 L-3 -6" className="stick-limb anim-elbow-wave-left" />
                </g>
                {/* Right hand planting & swaying summit flag */}
                <path d="M0 -10 L7 -14" className="stick-limb" />
                <g transform="translate(7, 9)">
                  <line x1="0" y1="0" x2="0" y2="-36" className="stick-prop" />
                  <path d="M0 -36 L11 -32 L0 -28 Z" fill="#ff7d00" stroke="#001524" strokeWidth="0.8" className="anim-flag-flutter" />
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
  )
}
