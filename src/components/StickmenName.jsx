import { useLayoutEffect, useRef, useState } from 'react'

/**
 * Renders the user's name in large, bold hollow typography with animated
 * colored-head stickmen performing activities directly on the letterforms.
 */
export default function StickmenName() {
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)

  const [anchors, setAnchors] = useState({
    l1Top: 58,
    l1Bottom: 175,
    l1Chars: [215, 315, 405, 515, 610, 700, 810],
    l2Top: 222,
    l2Bottom: 340,
    l2Chars: [240, 355, 475, 590, 705, 825],
    l1Right: 880,
    l2Right: 895
  })

  useLayoutEffect(() => {
    const measureLine = (el, count) => {
      if (!el) return null
      const box = el.getBBox()
      const centers = []
      for (let i = 0; i < count; i++) {
        const start = el.getStartPositionOfChar(i).x
        const end = el.getEndPositionOfChar(i).x
        centers.push((start + end) / 2)
      }
      return {
        top: box.y,
        bottom: box.y + box.height,
        right: box.x + box.width,
        centers
      }
    }

    const update = () => {
      const m1 = measureLine(line1Ref.current, 7)
      const m2 = measureLine(line2Ref.current, 6)
      if (m1 && m2) {
        setAnchors({
          l1Top: m1.top,
          l1Bottom: m1.bottom,
          l1Chars: m1.centers,
          l1Right: m1.right,
          l2Top: m2.top,
          l2Bottom: m2.bottom,
          l2Chars: m2.centers,
          l2Right: m2.right
        })
      }
    }

    update()
    let cancelled = false
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (!cancelled) update()
      })
    }
    window.addEventListener('resize', update)
    return () => {
      cancelled = true
      window.removeEventListener('resize', update)
    }
  }, [])

  const { l1Top, l1Bottom, l1Chars, l1Right, l2Top, l2Bottom, l2Chars, l2Right } = anchors

  return (
    <div className="stickmen-stage">
      <svg
        className="stickmen-svg"
        viewBox="0 0 1100 400"
        role="img"
        aria-label="Rishith Suresh in bold hollow lettering with animated stickmen"
      >
        {/* Giant Bold Hollow Name */}
        <text
          ref={line1Ref}
          x="550"
          y="175"
          textAnchor="middle"
          className="hollow-name-text"
        >
          RISHITH
        </text>

        <text
          ref={line2Ref}
          x="550"
          y="340"
          textAnchor="middle"
          className="hollow-name-text hollow-name-sub"
        >
          SURESH
        </text>

        {/* 1. Sitting & kicking legs on top of 'R' with a tiny laptop (Tangerine head) */}
        <g transform={`translate(${l1Chars[0] - 8}, ${l1Top})`} className="stickman">
          <circle cx="0" cy="-24" r="6.5" fill="#ff7d00" stroke="#001524" strokeWidth="1.6" />
          <path d="M0 -17 L0 -2 L10 0" className="stick-limb" />
          {/* Kicking leg */}
          <path d="M0 -2 L-4 9" className="stick-limb anim-kick" />
          {/* Arms typing on laptop */}
          <path d="M0 -13 L9 -8 L13 -11" className="stick-limb" />
          <path d="M11 -2 L19 -2 L21 -9" className="stick-prop" />
        </g>

        {/* 2. Sprinting across 'S' -> 'H' top edge (Deep Teal head) */}
        <g transform={`translate(${(l1Chars[2] + l1Chars[3]) / 2}, ${l1Top})`}>
          <g className="anim-sprint">
            <circle cx="0" cy="-28" r="6.5" fill="#006d77" stroke="#001524" strokeWidth="1.6" />
            <path d="M2 -21 L-2 -8" className="stick-limb" />
            <path d="M-2 -8 L-10 0 M-2 -8 L9 -2" className="stick-limb anim-run-legs" />
            <path d="M0 -18 L9 -13 M0 -18 L-9 -14" className="stick-limb" />
          </g>
        </g>

        {/* 3. Swinging on a rope between 'I' and 'T' */}
        <g transform={`translate(${(l1Chars[4] + l1Chars[5]) / 2}, ${l1Top + 14})`}>
          <g className="anim-swing">
            <line x1="0" y1="0" x2="0" y2="38" className="stick-prop" />
            <circle cx="0" cy="40" r="6" fill="#e29578" stroke="#001524" strokeWidth="1.6" />
            <path d="M0 46 L0 61 L-5 72 M0 61 L5 72" className="stick-limb" />
            <path d="M0 50 L-4 38 M0 50 L4 38" className="stick-limb" />
          </g>
        </g>

        {/* 4. Weightlifting a barbell on top of 'T' (Seafoam head) */}
        <g transform={`translate(${l1Chars[5]}, ${l1Top})`}>
          <circle cx="0" cy="-26" r="6.5" fill="#83c5be" stroke="#001524" strokeWidth="1.6" />
          <path d="M0 -19 L0 -7 L-6 0 M0 -7 L6 0" className="stick-limb" />
          <g className="anim-lift">
            <path d="M0 -15 L-11 -26 M0 -15 L11 -26" className="stick-limb" />
            <line x1="-18" y1="-27" x2="18" y2="-27" className="stick-prop" />
            <rect x="-21" y="-31" width="4" height="8" rx="1" fill="#ff7d00" />
            <rect x="17" y="-31" width="4" height="8" rx="1" fill="#ff7d00" />
          </g>
        </g>

        {/* 5. Fishing off the right edge of 'H' in RISHITH (Rust head) */}
        <g transform={`translate(${l1Right - 10}, ${l1Top})`}>
          <circle cx="0" cy="-24" r="6.5" fill="#78290f" stroke="#001524" strokeWidth="1.6" />
          <path d="M0 -17 L0 -2 L10 0 M0 -2 L6 8" className="stick-limb" />
          <path d="M0 -13 L10 -12" className="stick-limb" />
          {/* Fishing rod + bobbing line */}
          <path d="M8 -11 Q26 -30 42 -22" className="stick-prop" fill="none" />
          <line x1="42" y1="-22" x2="42" y2="28" className="stick-line anim-bob" />
          <circle cx="42" cy="28" r="3" fill="#ff7d00" className="anim-bob" />
        </g>

        {/* 6. Skateboarding across top of 'S' -> 'U' in SURESH (Peach head) */}
        <g transform={`translate(${(l2Chars[0] + l2Chars[1]) / 2}, ${l2Top})`}>
          <g className="anim-skate">
            <circle cx="0" cy="-31" r="6.5" fill="#ffddd2" stroke="#001524" strokeWidth="1.6" />
            <path d="M0 -24 L-1 -12 L-7 -4 M-1 -12 L6 -4" className="stick-limb" />
            <path d="M0 -21 L-10 -17 M0 -21 L10 -18" className="stick-limb" />
            {/* Skateboard */}
            <line x1="-13" y1="-3" x2="13" y2="-3" stroke="#ff7d00" strokeWidth="2.8" strokeLinecap="round" />
            <circle cx="-8" cy="-0.5" r="2" fill="#001524" />
            <circle cx="8" cy="-0.5" r="2" fill="#001524" />
          </g>
        </g>

        {/* 7. Climbing a rope up the side of 'R' in SURESH (Tangerine head) */}
        <g transform={`translate(${l2Chars[2] + 36}, ${l2Top + 18})`}>
          <line x1="0" y1="-16" x2="0" y2="95" className="stick-line" />
          <g className="anim-climb">
            <circle cx="-6" cy="26" r="6" fill="#ff7d00" stroke="#001524" strokeWidth="1.6" />
            <path d="M-6 32 L-6 48 L-12 58 M-6 48 L0 56" className="stick-limb" />
            <path d="M-6 37 L0 30 M-6 40 L0 44" className="stick-limb" />
          </g>
        </g>

        {/* 8. Jumping joyfully on top of 'E' in SURESH (Gold/Saffron head) */}
        <g transform={`translate(${l2Chars[3]}, ${l2Top})`}>
          <g className="anim-jump">
            <circle cx="0" cy="-27" r="6.5" fill="#ffc300" stroke="#001524" strokeWidth="1.6" />
            <path d="M0 -20 L0 -8 L-7 0 M0 -8 L7 0" className="stick-limb" />
            <path d="M0 -17 L-10 -25 M0 -17 L10 -25" className="stick-limb" />
          </g>
        </g>

        {/* 9. Handstand / balancing on top of 'S' in SURESH (Teal head) */}
        <g transform={`translate(${l2Chars[4]}, ${l2Top})`}>
          <g className="anim-wobble">
            <path d="M-6 0 L-2 -11 M6 0 L2 -11" className="stick-limb" />
            <path d="M0 -11 L0 -23 L-6 -33 M0 -23 L6 -33" className="stick-limb" />
            <circle cx="0" cy="-6" r="6" fill="#006d77" stroke="#001524" strokeWidth="1.6" />
          </g>
        </g>

        {/* 10. Standing at the baseline next to final 'H' & waving hello (Terracotta head) */}
        <g transform={`translate(${l2Right + 24}, ${l2Bottom})`}>
          <circle cx="0" cy="-31" r="6.5" fill="#e29578" stroke="#001524" strokeWidth="1.6" />
          <path d="M0 -24 L0 -10 L-6 0 M0 -10 L6 0" className="stick-limb" />
          <path d="M0 -20 L-9 -12" className="stick-limb" />
          <path d="M0 -20 L10 -29" className="stick-limb anim-wave" />
        </g>
      </svg>
    </div>
  )
}
