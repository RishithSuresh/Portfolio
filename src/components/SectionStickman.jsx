const VARIANTS = {
  // 1. Sitting coder typing on a tiny laptop (e.g., About card rim)
  laptop: {
    headColor: '#ff7d00',
    viewBox: '-22 -34 48 44',
    render: () => (
      <>
        <g className="anim-bob-soft">
          <circle cx="0" cy="-21" r="3.9" fill="#ff7d00" stroke="#001524" strokeWidth="1.25" />
          <path d="M0 -17 L0 -1 L8 0" className="stick-limb" />
          <path d="M0 -1 L-4 7" className="stick-limb anim-kick-soft" />
          <path d="M0 -12 L7 -7 L11 -9" className="stick-limb anim-type" />
          <path d="M0 -12 L6 -5 L10 -6" className="stick-limb" />
        </g>
        <path d="M9 -1 L16 -1 L18 -8" className="stick-prop" />
      </>
    )
  },

  // 2. Curious thinker holding a magnifying glass (e.g., Pillar card corner)
  curious: {
    headColor: '#006d77',
    viewBox: '-18 -36 40 42',
    render: () => (
      <g className="anim-peek">
        <circle cx="0" cy="-24" r="3.8" fill="#006d77" stroke="#001524" strokeWidth="1.25" />
        <path d="M0 -20 L0 -7 L-5 0 M0 -7 L5 0" className="stick-limb" />
        <path d="M0 -16 L-6 -10" className="stick-limb" />
        <path d="M0 -16 L8 -21" className="stick-limb" />
        <circle cx="11" cy="-24" r="3.6" fill="rgba(131,197,190,0.35)" stroke="#78290f" strokeWidth="1.25" />
        <circle cx="-8" cy="-30" r="1.4" fill="#ff7d00" className="anim-twinkle" />
      </g>
    )
  },

  // 3. Kicking observer perched on dark card bezel (e.g., Selected Work stage)
  observer: {
    headColor: '#ffddd2',
    viewBox: '-18 -32 38 44',
    render: () => (
      <>
        <circle cx="0" cy="-20" r="3.9" fill="#ffddd2" stroke="#001524" strokeWidth="1.25" />
        <path d="M0 -16 L0 -1 L-7 1" className="stick-limb" />
        <path d="M0 -1 L3 9" className="stick-limb anim-kick-soft" />
        <path d="M0 -11 L7 -6 L11 -1" className="stick-limb" />
        <path d="M0 -11 L-6 -14" className="stick-limb" />
      </>
    )
  },

  // 4. Tinkerer holding a wrench beside More Experiments
  tinker: {
    headColor: '#83c5be',
    viewBox: '-18 -36 38 40',
    render: () => (
      <>
        <circle cx="0" cy="-25" r="3.7" fill="#83c5be" stroke="#001524" strokeWidth="1.25" />
        <path d="M0 -21 L0 -8 L-5 0 M0 -8 L5 0" className="stick-limb" />
        <path d="M0 -16 L-6 -10" className="stick-limb" />
        <g className="anim-wrench">
          <path d="M0 -16 L8 -21" className="stick-limb" />
          <path d="M7 -20 L13 -26 M11 -28 L15 -24" className="stick-prop" />
        </g>
      </>
    )
  },

  // 5. Astronomer peering through a telescope (e.g., Research panel)
  telescope: {
    headColor: '#ffc300',
    viewBox: '-18 -36 46 42',
    render: () => (
      <>
        <circle cx="0" cy="-24" r="3.8" fill="#ffc300" stroke="#001524" strokeWidth="1.25" />
        <path d="M0 -20 L0 -8 L-5 0 M0 -8 L5 0" className="stick-limb" />
        <path d="M0 -16 L9 -20 M0 -14 L7 -14" className="stick-limb" />
        <g className="anim-bob-soft">
          <path d="M6 -21 L19 -28" stroke="#78290f" strokeWidth="2.4" strokeLinecap="round" />
          <line x1="12" y1="-24" x2="10" y2="0" className="stick-prop" />
          <line x1="12" y1="-24" x2="16" y2="0" className="stick-prop" />
        </g>
      </>
    )
  },

  // 6. Wave surfer balancing (e.g., Research harmonic canvas corner)
  surfer: {
    headColor: '#ff7d00',
    viewBox: '-22 -36 44 42',
    render: () => (
      <g className="anim-surf">
        <circle cx="0" cy="-26" r="3.7" fill="#ff7d00" stroke="#001524" strokeWidth="1.25" />
        <path d="M0 -22 L-1 -10 L-6 -3 M-1 -10 L6 -3" className="stick-limb" />
        <path d="M0 -18 L-9 -22 M0 -18 L9 -14" className="stick-limb" />
        <path d="M-13 -2 Q0 2 13 -3" stroke="#83c5be" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      </g>
    )
  },

  // 7. Rope climber on the Experience timeline
  climber: {
    headColor: '#78290f',
    viewBox: '-18 -10 34 86',
    render: () => (
      <>
        <line x1="0" y1="-6" x2="0" y2="72" className="stick-line" />
        <g className="anim-climb-short">
          <circle cx="-5" cy="24" r="3.7" fill="#78290f" stroke="#001524" strokeWidth="1.25" />
          <path d="M-5 28 L-5 42 L-10 50 M-5 42 L0 49" className="stick-limb" />
          <path d="M-5 32 L0 24 M-5 36 L0 41" className="stick-limb" />
        </g>
      </>
    )
  },

  // 8. Palette juggler perched on Skills panel
  juggler: {
    headColor: '#006d77',
    viewBox: '-20 -42 40 46',
    render: () => (
      <>
        <circle cx="0" cy="-24" r="3.8" fill="#006d77" stroke="#001524" strokeWidth="1.25" />
        <path d="M0 -20 L0 -8 L-5 0 M0 -8 L5 0" className="stick-limb" />
        <path d="M0 -16 L-7 -12 M0 -16 L7 -12" className="stick-limb anim-hands" />
        <circle cx="-7" cy="-21" r="2.2" fill="#ff7d00" className="anim-juggle-a" />
        <circle cx="0" cy="-31" r="2.2" fill="#83c5be" className="anim-juggle-b" />
        <circle cx="7" cy="-21" r="2.2" fill="#e29578" className="anim-juggle-c" />
      </>
    )
  },

  // 9. Star catcher cheering on Open Source header
  starCheer: {
    headColor: '#e29578',
    viewBox: '-18 -40 38 44',
    render: () => (
      <>
        <g className="anim-jump-soft">
          <circle cx="0" cy="-25" r="3.8" fill="#e29578" stroke="#001524" strokeWidth="1.25" />
          <path d="M0 -21 L0 -8 L-5 0 M0 -8 L5 0" className="stick-limb" />
          <path d="M0 -17 L-7 -24 M0 -17 L8 -25" className="stick-limb" />
        </g>
        <path
          d="M11 -34 L12.5 -30.5 L16 -29 L12.5 -27.5 L11 -24 L9.5 -27.5 L6 -29 L9.5 -30.5 Z"
          fill="#ffc300"
          stroke="#001524"
          strokeWidth="0.7"
          className="anim-twinkle"
        />
      </>
    )
  },

  // 10. Paper-airplane courier on dark Contact card
  courier: {
    headColor: '#ff7d00',
    viewBox: '-18 -38 72 44',
    render: () => (
      <>
        <circle cx="0" cy="-25" r="3.8" fill="#ff7d00" stroke="#001524" strokeWidth="1.25" />
        <path d="M0 -21 L0 -8 L-5 0 M0 -8 L5 0" className="stick-limb" />
        <path d="M0 -16 L-6 -11" className="stick-limb" />
        <path d="M0 -16 L9 -21" className="stick-limb anim-throw" />
        <path
          d="M11 -24 L21 -26 L14 -20 Z"
          fill="#ffddd2"
          stroke="#001524"
          strokeWidth="0.9"
          className="anim-plane"
        />
      </>
    )
  },

  // 11. Cheerful waver resting on Footer border
  waver: {
    headColor: '#83c5be',
    viewBox: '-18 -38 36 42',
    render: () => (
      <>
        <circle cx="0" cy="-26" r="3.8" fill="#83c5be" stroke="#001524" strokeWidth="1.25" />
        <path d="M0 -22 L0 -8 L-5 0 M0 -8 L5 0" className="stick-limb" />
        <path d="M0 -18 L-6 -11" className="stick-limb" />
        <path d="M0 -18 L8 -26" className="stick-limb anim-wave-18" />
      </>
    )
  },

  // 12. Scroll guide pointing down near hero CTA
  guide: {
    headColor: '#e29578',
    viewBox: '-16 -36 32 40',
    render: () => (
      <g className="anim-bob-soft">
        <circle cx="0" cy="-24" r="3.5" fill="#e29578" stroke="#001524" strokeWidth="1.2" />
        <path d="M0 -20 L0 -8 L-4 0 M0 -8 L4 0" className="stick-limb" />
        <path d="M0 -16 L-6 -10 M0 -16 L6 -8" className="stick-limb" />
      </g>
    )
  }
}

export default function SectionStickman({
  variant = 'waver',
  className = '',
  width = 44,
  height = 48
}) {
  const cfg = VARIANTS[variant] || VARIANTS.waver

  return (
    <span className={`section-stickman ${className}`} aria-hidden="true">
      <svg
        width={width}
        height={height}
        viewBox={cfg.viewBox}
        overflow="visible"
        shapeRendering="geometricPrecision"
      >
        {cfg.render()}
      </svg>
    </span>
  )
}
