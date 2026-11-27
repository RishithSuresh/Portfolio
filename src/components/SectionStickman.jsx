const VARIANTS = {
  // 1. Music-grooving dual-hand coder with floating eighth note (About card rim)
  laptop: {
    viewBox: '-22 -38 48 48',
    render: () => (
      <>
        <g className="anim-music-groove">
          <circle cx="0" cy="-21" r="3.9" fill="#ff7d00" stroke="#001524" strokeWidth="1.25" />
          <path d="M0 -17 L0 -1 L8 0" className="stick-limb" />
          <path d="M0 -1 L-4 7" className="stick-limb anim-kick-soft" />
          <g transform="translate(0, -12)">
            <path d="M0 0 L7 5 L11 3" className="stick-limb anim-type" />
            <path d="M0 0 L6 6 L10 5" className="stick-limb anim-type-alt" />
          </g>
        </g>
        <path d="M9 -1 L16 -1 L18 -8" className="stick-prop" />
        <text x="-11" y="-29" className="stick-note anim-note-float">♪</text>
      </>
    )
  },

  // 2. Levitating lotus meditator with orbiting neural dots (About AI pillar)
  meditator: {
    viewBox: '-20 -34 40 38',
    render: () => (
      <g className="anim-levitate">
        <circle cx="0" cy="-22" r="3.8" fill="#83c5be" stroke="#001524" strokeWidth="1.25" />
        <path d="M0 -18 L0 -6" className="stick-limb" />
        <path d="M0 -6 L-8 -2 L0 0 L8 -2 L0 -6" className="stick-limb" />
        <path d="M0 -14 L-7 -9 L-4 -5 M0 -14 L7 -9 L4 -5" className="stick-limb" />
        <circle cx="-11" cy="-22" r="1.5" fill="#ff7d00" className="anim-twinkle" />
        <circle cx="11" cy="-24" r="1.5" fill="#006d77" className="anim-twinkle-delay" />
      </g>
    )
  },

  // 3. Stepping detective sweeping magnifying glass (About Research pillar)
  curious: {
    viewBox: '-18 -36 42 42',
    render: () => (
      <g className="anim-peek">
        <circle cx="0" cy="-24" r="3.8" fill="#006d77" stroke="#001524" strokeWidth="1.25" />
        <path d="M0 -20 L0 -8 L-5 0 M0 -8 L5 0" className="stick-limb" />
        <path d="M0 -16 L-6 -10" className="stick-limb" />
        <g transform="translate(0, -16)">
          <g className="anim-sweep-glass">
            <path d="M0 0 L9 -5" className="stick-limb" />
            <circle cx="12" cy="-7" r="3.6" fill="rgba(131,197,190,0.35)" stroke="#78290f" strokeWidth="1.25" />
          </g>
        </g>
        <circle cx="-8" cy="-30" r="1.4" fill="#ff7d00" className="anim-twinkle" />
      </g>
    )
  },

  // 4. Yo-yo trick player bouncing spinning disc off corner (About Systems pillar)
  yoyo: {
    viewBox: '-18 -36 38 52',
    render: () => (
      <>
        <circle cx="0" cy="-24" r="3.7" fill="#e29578" stroke="#001524" strokeWidth="1.25" />
        <path d="M0 -20 L0 -8 L-5 0 M0 -8 L5 0" className="stick-limb" />
        <path d="M0 -16 L-6 -11" className="stick-limb" />
        <g transform="translate(0, -16)">
          <path d="M0 0 L8 2" className="stick-limb anim-yoyo-wrist" />
        </g>
        <line x1="8" y1="-13" x2="8" y2="6" className="stick-line anim-yoyo-line" />
        <circle cx="8" cy="6" r="2.7" fill="#ff7d00" stroke="#001524" strokeWidth="1" className="anim-yoyo-disc" />
      </>
    )
  },

  // 5. Kicking observer seated playfully over dark showcase bezel (Projects)
  observer: {
    viewBox: '-18 -32 38 44',
    render: () => (
      <>
        <g className="anim-sway-torso">
          <circle cx="0" cy="-20" r="3.9" fill="#ffddd2" stroke="#001524" strokeWidth="1.25" />
          <path d="M0 -16 L0 0" className="stick-limb" />
          <path d="M0 -11 L7 -6 L11 -1 M0 -11 L-6 -14" className="stick-limb" />
        </g>
        <path d="M0 0 L-7 2" className="stick-limb" />
        <path d="M0 0 L3 9" className="stick-limb anim-kick-seated" />
      </>
    )
  },

  // 6. Articulated wrench mechanic tightening gears (Projects More Experiments)
  tinker: {
    viewBox: '-18 -36 38 40',
    render: () => (
      <>
        <circle cx="0" cy="-25" r="3.7" fill="#83c5be" stroke="#001524" strokeWidth="1.25" />
        <path d="M0 -21 L0 -8 L-5 0 M0 -8 L5 0" className="stick-limb" />
        <path d="M0 -16 L-6 -10" className="stick-limb" />
        <g transform="translate(0, -16)">
          <g className="anim-wrench">
            <path d="M0 0 L8 -5" className="stick-limb" />
            <path d="M7 -4 L13 -10 M11 -12 L15 -8" className="stick-prop" />
          </g>
        </g>
      </>
    )
  },

  // 7. Astronomer adjusting telescope focus lens (Research card rim)
  telescope: {
    viewBox: '-18 -36 46 42',
    render: () => (
      <>
        <circle cx="0" cy="-24" r="3.8" fill="#ffc300" stroke="#001524" strokeWidth="1.25" />
        <path d="M0 -20 L0 -8 L-5 0 M0 -8 L5 0" className="stick-limb" />
        <path d="M0 -16 L9 -20 M0 -14 L7 -14" className="stick-limb anim-focus-hand" />
        <g className="anim-bob-soft">
          <path d="M6 -21 L19 -28" stroke="#78290f" strokeWidth="2.4" strokeLinecap="round" />
          <line x1="12" y1="-24" x2="10" y2="0" className="stick-prop" />
          <line x1="12" y1="-24" x2="16" y2="0" className="stick-prop" />
        </g>
      </>
    )
  },

  // 8. Knee-flexing harmonic wave surfer (Research dark canvas)
  surfer: {
    viewBox: '-22 -36 44 42',
    render: () => (
      <g className="anim-surf">
        <g className="anim-skate-crouch">
          <circle cx="0" cy="-26" r="3.7" fill="#ff7d00" stroke="#001524" strokeWidth="1.25" />
          <path d="M0 -22 L-1 -10 L-6 -5 L-6 -3 M-1 -10 L6 -5 L6 -3" className="stick-limb" />
          <path d="M0 -18 L-9 -22 M0 -18 L9 -14" className="stick-limb" />
        </g>
        <path d="M-13 -2 Q0 2 13 -3" stroke="#83c5be" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      </g>
    )
  },

  // 9. Hand-over-hand alternating climber (Experience timeline)
  climber: {
    viewBox: '-18 -10 34 86',
    render: () => (
      <>
        <line x1="0" y1="-6" x2="0" y2="72" className="stick-line" />
        <g className="anim-climb-short">
          <circle cx="5" cy="24" r="3.7" fill="#78290f" stroke="#001524" strokeWidth="1.25" />
          <path d="M5 28 L5 43" className="stick-limb" />
          <g transform="translate(5, 43)">
            <path d="M0 0 L-5 4 L-2 9" className="stick-limb anim-knee-a" />
            <path d="M0 0 L4 5 L2 9" className="stick-limb anim-knee-b" />
          </g>
          <g transform="translate(5, 32)">
            <path d="M0 0 L-5 -7" className="stick-limb anim-reach-a" />
            <path d="M0 0 L-5 5" className="stick-limb anim-reach-b" />
          </g>
        </g>
      </>
    )
  },

  // 10. Push-up / Plank athlete
  pushup: {
    viewBox: '-22 -24 44 28',
    render: () => (
      <g className="anim-pushup-body">
        <circle cx="-11" cy="-12" r="3.6" fill="#e29578" stroke="#001524" strokeWidth="1.2" />
        <path d="M-9 -9 L13 -1 L16 0" className="stick-limb" />
        <path d="M-7 -8 L-9 -4 L-8 0" className="stick-limb" />
      </g>
    )
  },

  // 11. Parabolic 3-ball juggler (Experience skills panel right)
  juggler: {
    viewBox: '-20 -42 40 46',
    render: () => (
      <>
        <circle cx="0" cy="-24" r="3.8" fill="#006d77" stroke="#001524" strokeWidth="1.25" />
        <path d="M0 -20 L0 -8 L-5 0 M0 -8 L5 0" className="stick-limb" />
        <path d="M0 -16 L-5 -13" className="stick-limb" />
        <g transform="translate(-5, -13)">
          <path d="M0 0 L-4 2" className="stick-limb anim-toss-l" />
        </g>
        <path d="M0 -16 L5 -13" className="stick-limb" />
        <g transform="translate(5, -13)">
          <path d="M0 0 L4 2" className="stick-limb anim-toss-r" />
        </g>
        <circle cx="-8" cy="-19" r="2.2" fill="#ff7d00" className="anim-parabola-a" />
        <circle cx="0" cy="-34" r="2.2" fill="#83c5be" className="anim-parabola-b" />
        <circle cx="8" cy="-19" r="2.2" fill="#e29578" className="anim-parabola-c" />
      </>
    )
  },

  // 12. Jumping star-catcher (GitHub header)
  starCheer: {
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

  // 13. Springy pogo-stick hopper (GitHub repo card)
  pogo: {
    viewBox: '-16 -42 32 46',
    render: () => (
      <g className="anim-pogo">
        <circle cx="0" cy="-32" r="3.6" fill="#ff7d00" stroke="#001524" strokeWidth="1.2" />
        <path d="M0 -28 L0 -15" className="stick-limb" />
        <path d="M0 -24 L-5 -20 M0 -24 L5 -20" className="stick-limb" />
        <path d="M0 -15 L-4 -9 L-1 -5 M0 -15 L4 -9 L1 -5" className="stick-limb" />
        <line x1="0" y1="-21" x2="0" y2="0" stroke="#78290f" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="-4" y1="-5" x2="4" y2="-5" stroke="#001524" strokeWidth="1.5" strokeLinecap="round" />
      </g>
    )
  },

  // 14. Peaceful napper with drifting Zzz (GitHub repo card 2)
  napper: {
    viewBox: '-24 -26 48 30',
    render: () => (
      <>
        <g className="anim-breathe">
          <circle cx="-12" cy="-5" r="3.6" fill="#ffddd2" stroke="#001524" strokeWidth="1.2" />
          <path d="M-8 -4 L5 -3 L12 0 M5 -3 L10 -8 L15 0" className="stick-limb" />
          <path d="M-5 -4 L-8 -9 L-3 -9" className="stick-limb" />
        </g>
        <text x="-4" y="-13" className="stick-zzz anim-zzz-a">z</text>
        <text x="2" y="-20" className="stick-zzz anim-zzz-b">Z</text>
      </>
    )
  },

  // 15. Wind-up paper-airplane courier (Contact dark card)
  courier: {
    viewBox: '-18 -38 74 44',
    render: () => (
      <>
        <g className="anim-throw-lean">
          <circle cx="0" cy="-25" r="3.8" fill="#ff7d00" stroke="#001524" strokeWidth="1.25" />
          <path d="M0 -21 L0 -8 L-5 0 M0 -8 L5 0" className="stick-limb" />
          <path d="M0 -16 L-6 -11" className="stick-limb" />
          <g transform="translate(0, -16)">
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
      </>
    )
  },

  // 16. Stargazing lounger leaning on elbows with tiny coffee cup (Contact left / Footer)
  lounger: {
    viewBox: '-22 -24 46 28',
    render: () => (
      <>
        <circle cx="-11" cy="-12" r="3.7" fill="#ffc300" stroke="#001524" strokeWidth="1.2" />
        <path d="M-8 -9 L4 -2 L13 0 M4 -2 L9 -6 L16 0" className="stick-limb" />
        <path d="M-6 -8 L-10 -2 L-13 0" className="stick-limb" />
        <rect x="13" y="-6" width="4.5" height="5.5" rx="1" fill="#ffddd2" stroke="#78290f" strokeWidth="1" />
        <path d="M15 -8 Q16 -11 15 -13" className="stick-line anim-steam" />
      </>
    )
  },

  // 17. Elbow-hinged goodbye waver (Footer right)
  waver: {
    viewBox: '-18 -38 36 42',
    render: () => (
      <>
        <path d="M-5 0 L0 -9 M5 0 L0 -9" className="stick-limb" />
        <g transform="translate(0, -9)">
          <g className="anim-sway-torso">
            <path d="M0 0 L0 -14" className="stick-limb" />
            <circle cx="0" cy="-18" r="3.8" fill="#83c5be" stroke="#001524" strokeWidth="1.25" />
            <path d="M0 -10 L-6 -3" className="stick-limb" />
            <path d="M0 -10 L6 -14" className="stick-limb" />
            <g transform="translate(6, -14)">
              <path d="M0 0 L3 -6" className="stick-limb anim-elbow-wave" />
            </g>
          </g>
        </g>
      </>
    )
  },

  // 18. Hopping scroll guide pointing downward (Hero scroll cue)
  guide: {
    viewBox: '-16 -36 32 40',
    render: () => (
      <g className="anim-bob-soft">
        <circle cx="0" cy="-24" r="3.5" fill="#e29578" stroke="#001524" strokeWidth="1.2" />
        <path d="M0 -20 L0 -8 L-4 0 M0 -8 L4 0" className="stick-limb" />
        <path d="M0 -16 L-6 -10 M0 -16 L6 -7" className="stick-limb" />
      </g>
    )
  },

  // 19. Playful peeker waving from Navbar CTA pill
  peeker: {
    viewBox: '-14 -26 28 28',
    render: () => (
      <g className="anim-peek-up">
        <circle cx="0" cy="-16" r="3.5" fill="#ff7d00" stroke="#001524" strokeWidth="1.2" />
        <path d="M0 -12 L0 -2" className="stick-limb" />
        <path d="M0 -9 L-6 -5" className="stick-limb" />
        <g transform="translate(0, -9)">
          <path d="M0 0 L6 -6" className="stick-limb anim-elbow-wave" />
        </g>
      </g>
    )
  },

  // 20. Sketching case-study reader (ProjectDetail cover rim)
  sketcher: {
    viewBox: '-22 -34 46 40',
    render: () => (
      <>
        <circle cx="0" cy="-21" r="3.8" fill="#006d77" stroke="#001524" strokeWidth="1.25" />
        <path d="M0 -17 L0 -2 L8 0 M0 -2 L-4 5" className="stick-limb" />
        <g transform="translate(0, -12)">
          <path d="M0 0 L7 4 L12 0" className="stick-limb anim-type" />
          <path d="M0 2 L5 6" className="stick-limb" />
        </g>
        <path d="M8 -3 L17 -6 L17 -1 L8 1 Z" fill="#ffecd1" stroke="#78290f" strokeWidth="1" />
      </>
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
