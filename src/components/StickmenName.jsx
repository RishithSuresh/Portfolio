/**
 * Exact bespoke Art-Deco / Didone typography for "RISHITH SURESH"
 * matching the uploaded reference specimens ("UNIQUE", "HERE COMES THE SUN",
 * "COFFEE ADDICT", "BE STRONG", "MOONSHINE"):
 * - Tall, tight, condensed proportions (yTop = 86, yBot = 256 -> 170px height)
 * - Open-bowl R with inward-curled ball terminal & dipping curved leg
 * - Oversized sweeping S with upper ball terminal & bottom vertical spur
 * - Razor-thin crossbars on H, T, E, U with pointed triangular spurs
 * - Clean crisp solid fill + 1px warm offset trace + gossamer spiral curls
 * - 13 slender colored-head stickmen anchored cleanly to the letters
 */

// Standard caps: yTop = 86, yMid = 171, yBot = 256 (170px tall)
const GLYPHS = [
  // 1. R (RISHITH) — Exact STRONG / HERE R: thick left stem, open spiral bowl ending in ball (156,118), dipping curved leg
  'M 94 86 L 138 86 C 164 86, 174 102, 172 120 C 170 132, 158 138, 150 130 C 144 124, 148 112, 158 114 C 164 115, 166 105, 160 97 C 154 90, 142 89, 120 89 L 120 168 L 134 168 C 144 168, 150 174, 154 186 L 172 246 C 176 258, 182 264, 188 266 C 174 268, 162 260, 156 244 L 136 180 C 134 174, 130 171, 120 171 L 120 252 L 130 254 L 130 256 L 94 256 L 94 254 L 103 252 L 103 90 L 94 88 Z',

  // 2. I — Tall condensed pillar + sharp minimal horizontal serifs
  'M 198 86 L 230 86 L 230 88 L 222 90 L 222 252 L 230 254 L 230 256 L 198 256 L 198 254 L 206 252 L 206 90 L 198 88 Z',

  // 3. S — Exact STRONG / MOONSHINE S: tall curve + inward upper ball terminal + bottom vertical spur
  'M 294 108 C 292 92, 282 86, 268 86 C 251 86, 242 98, 242 116 C 242 162, 302 172, 302 224 C 302 246, 286 258, 264 258 C 252 258, 244 254, 240 248 L 240 218 L 242 218 C 245 243, 254 255, 266 255 C 280 255, 286 244, 286 226 C 286 184, 240 174, 240 118 C 240 96, 253 83, 270 83 C 286 83, 297 93, 298 108 Z',

  // 4. H — Bold condensed vertical pillars + razor-thin crossbar
  'M 318 86 L 348 86 L 348 88 L 341 90 L 341 169 L 381 169 L 381 90 L 374 88 L 374 86 L 404 86 L 404 88 L 397 90 L 397 252 L 404 254 L 404 256 L 374 256 L 374 254 L 381 252 L 381 171 L 341 171 L 341 252 L 348 254 L 348 256 L 318 256 L 318 254 L 325 252 L 325 90 L 318 88 Z',

  // 5. I
  'M 420 86 L 452 86 L 452 88 L 444 90 L 444 252 L 452 254 L 452 256 L 420 256 L 420 254 L 428 252 L 428 90 L 420 88 Z',

  // 6. T — Razor-thin top bar + sleek pointed hanging fangs + central pillar
  'M 466 86 L 542 86 L 542 118 L 540 118 C 536 96, 528 89, 512 89 L 512 252 L 521 254 L 521 256 L 487 256 L 487 254 L 496 252 L 496 89 C 480 89, 472 96, 468 118 L 466 118 Z',

  // 7. H
  'M 556 86 L 586 86 L 586 88 L 579 90 L 579 169 L 619 169 L 619 90 L 612 88 L 612 86 L 642 86 L 642 88 L 635 90 L 635 252 L 642 254 L 642 256 L 612 256 L 612 254 L 619 252 L 619 171 L 579 171 L 579 252 L 586 254 L 586 256 L 556 256 L 556 254 L 563 252 L 563 90 L 556 88 Z',

  // 8. Oversized S (SURESH) — Exact MOONSHINE / SUN tall S rising above & dipping below
  'M 756 102 C 753 84, 742 76, 725 76 C 705 76, 694 90, 694 112 C 694 166, 766 176, 766 228 C 766 252, 747 265, 722 265 C 708 265, 698 260, 692 253 L 692 218 L 694 218 C 698 247, 709 262, 724 262 C 741 262, 748 248, 748 228 C 748 184, 692 174, 692 114 C 692 88, 707 73, 728 73 C 747 73, 760 85, 761 102 Z',

  // 9. U — Exact UNIQUE / SUN U: thick left pillar curving into razor-thin U bottom & razor-thin right stem
  'M 782 86 L 814 86 L 814 88 L 806 90 L 806 216 C 806 243, 816 253, 833 253 C 850 253, 858 241, 858 216 L 858 90 L 850 88 L 850 86 L 870 86 L 870 88 L 861 90 L 861 216 C 861 244, 848 258, 827 258 C 801 258, 790 242, 790 216 L 790 90 L 782 88 Z',

  // 10. R (SURESH) — Exact STRONG / HERE R
  'M 886 86 L 930 86 C 956 86, 966 102, 964 120 C 962 132, 950 138, 942 130 C 936 124, 940 112, 950 114 C 956 115, 958 105, 952 97 C 946 90, 934 89, 912 89 L 912 168 L 926 168 C 936 168, 942 174, 946 186 L 964 246 C 968 258, 974 264, 980 266 C 966 268, 954 260, 948 244 L 928 180 C 926 174, 922 171, 912 171 L 912 252 L 922 254 L 922 256 L 886 256 L 886 254 L 895 252 L 895 90 L 886 88 Z',

  // 11. E — Exact MOONSHINE / UNIQUE / COFFEE E with pointed spurs & flared trumpet middle arm
  'M 992 86 L 1054 86 L 1054 118 L 1052 118 C 1048 95, 1040 89, 1016 89 L 1016 169 L 1034 169 C 1040 169, 1043 163, 1045 155 L 1047 155 L 1047 186 L 1045 186 C 1043 178, 1040 172, 1034 172 L 1016 172 L 1016 253 C 1041 253, 1049 247, 1053 224 L 1055 224 L 1055 256 L 992 256 L 992 254 L 1000 252 L 1000 90 L 992 88 Z',

  // 12. S
  'M 1126 108 C 1124 92, 1114 86, 1100 86 C 1083 86, 1074 98, 1074 116 C 1074 162, 1134 172, 1134 224 C 1134 246, 1118 258, 1096 258 C 1084 258, 1076 254, 1072 248 L 1072 218 L 1074 218 C 1077 243, 1086 255, 1098 255 C 1112 255, 1118 244, 1118 226 C 1118 184, 1072 174, 1072 118 C 1072 96, 1085 83, 1102 83 C 1118 83, 1129 93, 1130 108 Z',

  // 13. H
  'M 1152 86 L 1182 86 L 1182 88 L 1175 90 L 1175 169 L 1215 169 L 1215 90 L 1208 88 L 1208 86 L 1238 86 L 1238 88 L 1231 90 L 1231 252 L 1238 254 L 1238 256 L 1208 256 L 1208 254 L 1215 252 L 1215 171 L 1175 171 L 1175 252 L 1182 254 L 1182 256 L 1152 256 L 1152 254 L 1159 252 L 1159 90 L 1152 88 Z'
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
  return (
    <div className="stickmen-stage">
      <svg
        className="stickmen-svg"
        viewBox="40 16 1250 288"
        shapeRendering="geometricPrecision"
        role="img"
        aria-label="Rishith Suresh in bespoke decorative Art-Deco lettering with animated stickmen"
      >
        <defs>
          <linearGradient id="glyphGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#001524" />
            <stop offset="50%" stopColor="#00444e" />
            <stop offset="100%" stopColor="#001524" />
          </linearGradient>

          <linearGradient id="shimmerGrad" x1="-60%" y1="0%" x2="40%" y2="100%">
            <stop offset="0%" stopColor="#83c5be" stopOpacity="0" />
            <stop offset="44%" stopColor="#ffecd1" stopOpacity="0.34" />
            <stop offset="50%" stopColor="#ff7d00" stopOpacity="0.38" />
            <stop offset="56%" stopColor="#edf6f9" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#83c5be" stopOpacity="0" />
            <animateTransform
              attributeName="gradientTransform"
              type="translate"
              from="-1.2 0"
              to="2.2 0"
              dur="5.8s"
              repeatCount="indefinite"
            />
          </linearGradient>
        </defs>

        {/* Gossamer Concentric Compass Circles & Fine Spiral Filigree Loops */}
        <g aria-hidden="true">
          <g className="anim-orbit-cw" style={{ transformOrigin: '132px 146px' }}>
            <circle cx="132" cy="146" r="84" className="ornament-arc" />
            <circle cx="132" cy="146" r="56" className="ornament-arc-dashed" />
          </g>
          <g className="anim-orbit-ccw" style={{ transformOrigin: '270px 176px' }}>
            <circle cx="270" cy="176" r="72" className="ornament-arc" />
          </g>
          <g className="anim-orbit-cw" style={{ transformOrigin: '436px 132px' }}>
            <circle cx="436" cy="132" r="68" className="ornament-arc" />
            <circle cx="436" cy="132" r="44" className="ornament-arc-accent" />
          </g>
          <g className="anim-orbit-cw" style={{ transformOrigin: '732px 172px' }}>
            <circle cx="732" cy="172" r="90" className="ornament-arc" />
            <circle cx="732" cy="172" r="62" className="ornament-arc-dashed" />
          </g>
          <g className="anim-orbit-ccw" style={{ transformOrigin: '930px 172px' }}>
            <circle cx="930" cy="172" r="70" className="ornament-arc" />
          </g>
          <circle cx="1102" cy="176" r="72" className="ornament-arc" />

          {/* Fine spiral filigree curls ending in tiny o-loops (exact MOONSHINE / BE STRONG detail) */}
          <path d="M 103 116 C 68 106, 62 158, 92 172 C 110 180, 114 156, 98 156" className="ornament-curl" />
          <circle cx="97" cy="157" r="2.2" className="ornament-loop" />
          <path d="M 172 114 C 198 110, 206 138, 188 148" className="ornament-curl-warm" />
          <circle cx="188" cy="148" r="2.1" className="ornament-loop" />

          <path d="M 294 108 C 322 86, 342 114, 320 128" className="ornament-curl" />
          <circle cx="320" cy="128" r="2.2" className="ornament-loop" />
          <path d="M 374 86 C 406 64, 434 72, 424 102" className="ornament-curl-warm" />
          <path d="M 542 118 C 566 134, 554 160, 534 150" className="ornament-curl" />
          <circle cx="534" cy="150" r="2.1" className="ornament-loop" />

          <path d="M 756 102 C 790 76, 810 112, 782 134" className="ornament-curl" />
          <circle cx="782" cy="134" r="2.4" className="ornament-loop" />
          <path d="M 692 253 C 660 274, 676 300, 708 282" className="ornament-curl-warm" />
          <circle cx="708" cy="282" r="2.2" className="ornament-loop" />
          <path d="M 861 136 C 888 120, 898 148, 878 158" className="ornament-curl" />
          <circle cx="878" cy="158" r="2.1" className="ornament-loop" />

          <path d="M 964 114 C 990 106, 998 136, 978 146" className="ornament-curl-warm" />
          <circle cx="978" cy="146" r="2.1" className="ornament-loop" />
          <path d="M 1054 118 C 1078 102, 1090 132, 1068 142" className="ornament-curl" />
          <circle cx="1068" cy="142" r="2.2" className="ornament-loop" />
          <path d="M 1231 206 C 1262 190, 1272 232, 1246 244" className="ornament-curl-warm" />
          <circle cx="1260" cy="214" r="2.2" className="ornament-loop" />

          {/* Signature solid ball terminals inside R and S curves */}
          <circle cx="152" cy="120" r="7" fill="#001524" />
          <circle cx="288" cy="112" r="6" fill="#001524" />
          <circle cx="748" cy="108" r="7.2" fill="#001524" />
          <circle cx="944" cy="120" r="7" fill="#001524" />
          <circle cx="1120" cy="112" r="6" fill="#001524" />

          {/* 4-point diamond stars above both I's & S */}
          <Star4 cx={214} cy={68} size={8.5} className="ornament-star anim-twinkle" />
          <Star4 cx={436} cy={68} size={9} className="ornament-star anim-twinkle-delay" />
          <Star4 cx={756} cy={262} size={6.5} className="ornament-star anim-twinkle" />
        </g>

        {/* Crisp 1px Warm Gold/Terracotta Bottom-Right Hairline Trace (exact BE STRONG effect) */}
        <g transform="translate(1.8, 2)" aria-hidden="true">
          {GLYPHS.map((d, idx) => (
            <path key={`trace-${idx}`} d={d} className="glyph-hairline-trace" fillRule="evenodd" />
          ))}
        </g>

        {/* Main Razor-Sharp Solid Sculpted Glyphs + Subtle Specular Sheen */}
        <g>
          {GLYPHS.map((d, idx) => (
            <g key={`main-${idx}`}>
              <path d={d} fill="url(#glyphGrad)" className="glyph-crisp" fillRule="evenodd" />
              <path d={d} fill="url(#shimmerGrad)" fillRule="evenodd" pointerEvents="none" />
            </g>
          ))}
        </g>

        {/* 13 Slender, Elongated, Colored-Head Stickmen Anchored to Exact Glyph Coordinates */}
        <g className="stickmen-layer">
          {/* 1. Sitting on R1's top bar (x=134, y=86) kicking leg & typing on laptop (Tangerine) */}
          <g transform="translate(134, 86)">
            <circle cx="0" cy="-22" r="3.9" fill="#ff7d00" stroke="#001524" strokeWidth="1.2" />
            <path d="M0 -18 L0 -1 L8 0" className="stick-limb" />
            <path d="M0 -1 L-3 9" className="stick-limb anim-kick" />
            <path d="M0 -13 L7 -8 L11 -10" className="stick-limb" />
            <path d="M9 -1 L15 -1 L17 -7" className="stick-prop" />
          </g>

          {/* 2. Juggling 3 colored balls on top of S1 (x=270, y=83) (Deep Teal) */}
          <g transform="translate(270, 83)">
            <circle cx="0" cy="-25" r="3.8" fill="#006d77" stroke="#001524" strokeWidth="1.2" />
            <path d="M0 -21 L0 -8 L-5 0 M0 -8 L5 0" className="stick-limb" />
            <path d="M0 -17 L-8 -13 M0 -17 L8 -13" className="stick-limb" />
            <circle cx="-7" cy="-22" r="2.1" fill="#ff7d00" className="anim-juggle-a" />
            <circle cx="0" cy="-31" r="2.1" fill="#83c5be" className="anim-juggle-b" />
            <circle cx="7" cy="-22" r="2.1" fill="#e29578" className="anim-juggle-c" />
          </g>

          {/* 3. Sprinting across H1's roof (x=361, y=86) (Teal) */}
          <g transform="translate(361, 86)">
            <g className="anim-sprint">
              <circle cx="2" cy="-26" r="3.8" fill="#006d77" stroke="#001524" strokeWidth="1.2" />
              <path d="M1.5 -22 L-1 -8" className="stick-limb" />
              <path d="M-1 -8 L-7 -3 L-9 0" className="stick-limb anim-stride-a" />
              <path d="M-1 -8 L5 -4 L7 0" className="stick-limb anim-stride-b" />
              <path d="M0.5 -18 L7 -14 L10 -17" className="stick-limb anim-arm-a" />
              <path d="M0.5 -18 L-6 -14 L-9 -12" className="stick-limb anim-arm-b" />
            </g>
          </g>

          {/* 4. Doing push-ups on H1's crossbar inside H! (x=361, y=169) (Gold) */}
          <g transform="translate(361, 169)">
            <g className="anim-pushup">
              <circle cx="-11" cy="-9" r="3.5" fill="#ffc300" stroke="#001524" strokeWidth="1.2" />
              <path d="M-7 -7 L9 -2 L14 0" className="stick-limb" />
              <path d="M-6 -6 L-6 0" className="stick-limb" />
            </g>
          </g>

          {/* 5. Swinging on rope from T's left bracket (x=475, y=89) (Terracotta) */}
          <g transform="translate(475, 89)">
            <g className="anim-swing">
              <line x1="0" y1="0" x2="0" y2="28" className="stick-prop" />
              <circle cx="0" cy="30" r="3.7" fill="#e29578" stroke="#001524" strokeWidth="1.2" />
              <path d="M0 34 L0 48 L-4 58 M0 48 L4 58" className="stick-limb" />
              <path d="M0 38 L-3 27 M0 38 L3 27" className="stick-limb" />
            </g>
          </g>

          {/* 6. Weightlifting barbell on top of T's center (x=504, y=86) (Seafoam) */}
          <g transform="translate(504, 86)">
            <circle cx="0" cy="-25" r="3.9" fill="#83c5be" stroke="#001524" strokeWidth="1.2" />
            <path d="M0 -21 L0 -8 L-5 0 M0 -8 L5 0" className="stick-limb" />
            <g className="anim-lift">
              <path d="M0 -17 L-9 -26 M0 -17 L9 -26" className="stick-limb" />
              <line x1="-15" y1="-27" x2="15" y2="-27" className="stick-prop" />
              <rect x="-17" y="-30" width="3" height="6" rx="0.8" fill="#ff7d00" />
              <rect x="14" y="-30" width="3" height="6" rx="0.8" fill="#ff7d00" />
            </g>
          </g>

          {/* 7. Climbing rope between H1 and S2 (x=664, y=86..256) (Rust) */}
          <g transform="translate(664, 86)">
            <line x1="0" y1="0" x2="0" y2="170" className="stick-line" />
            <g className="anim-climb">
              <circle cx="-5" cy="60" r="3.8" fill="#78290f" stroke="#001524" strokeWidth="1.2" />
              <path d="M-5 64 L-5 80 L-10 89 M-5 80 L0 88" className="stick-limb" />
              <path d="M-5 68 L0 61 M-5 72 L0 77" className="stick-limb" />
            </g>
          </g>

          {/* 8. Fishing off U's left top pillar into the U bowl (x=798, y=86) (Gold) */}
          <g transform="translate(798, 86)">
            <circle cx="0" cy="-22" r="3.9" fill="#ffc300" stroke="#001524" strokeWidth="1.2" />
            <path d="M0 -18 L0 -1 L8 0 M0 -1 L4 8" className="stick-limb" />
            <path d="M0 -14 L9 -13" className="stick-limb" />
            <path d="M8 -12 Q22 -24 34 -14" className="stick-prop" fill="none" />
            <line x1="34" y1="-14" x2="34" y2="70" className="stick-line anim-bob" />
            <circle cx="34" cy="70" r="2.4" fill="#ff7d00" className="anim-bob" />
          </g>

          {/* 9. Launching gliding paper airplane from U's right spire (x=860, y=86) (Rust) */}
          <g transform="translate(860, 86)">
            <circle cx="0" cy="-25" r="3.7" fill="#78290f" stroke="#001524" strokeWidth="1.2" />
            <path d="M0 -21 L0 -8 L-5 0 M0 -8 L5 0" className="stick-limb" />
            <path d="M0 -17 L-6 -12 M0 -17 L9 -21" className="stick-limb" />
            <path d="M10 -24 L20 -26 L13 -20 Z" fill="#ffddd2" stroke="#001524" strokeWidth="0.9" className="anim-plane" />
          </g>

          {/* 10. Skateboarding with mid-air Ollie over R2->E (x=974, y=86) (Peach) */}
          <g transform="translate(974, 86)">
            <g className="anim-skate-ollie">
              <circle cx="0" cy="-28" r="3.9" fill="#ffddd2" stroke="#001524" strokeWidth="1.2" />
              <path d="M0 -24 L-1 -11 L-5 -3 M-1 -11 L5 -3" className="stick-limb" />
              <path d="M0 -19 L-8 -15 M0 -19 L8 -16" className="stick-limb" />
              <line x1="-10" y1="-2" x2="10" y2="-2" stroke="#ff7d00" strokeWidth="2.2" strokeLinecap="round" />
              <circle cx="-6" cy="-0.4" r="1.5" fill="#001524" />
              <circle cx="6" cy="-0.4" r="1.5" fill="#001524" />
            </g>
          </g>

          {/* 11. Jumping cheerfully on top of E (x=1024, y=86) (Tangerine) */}
          <g transform="translate(1024, 86)">
            <g className="anim-jump">
              <circle cx="0" cy="-25" r="3.9" fill="#ff7d00" stroke="#001524" strokeWidth="1.2" />
              <path d="M0 -21 L0 -8 L-5 0 M0 -8 L5 0" className="stick-limb" />
              <path d="M0 -17 L-8 -24 M0 -17 L8 -24" className="stick-limb" />
            </g>
          </g>

          {/* 12. Balancing handstand on final H2's left pillar (x=1167, y=86) (Teal) */}
          <g transform="translate(1167, 86)">
            <g className="anim-wobble">
              <path d="M-4 0 L-1 -9 M4 0 L1 -9" className="stick-limb" />
              <path d="M0 -9 L0 -23 L-4 -32 M0 -23 L4 -32" className="stick-limb" />
              <circle cx="0" cy="-5" r="3.8" fill="#006d77" stroke="#001524" strokeWidth="1.2" />
            </g>
          </g>

          {/* 13. Standing tall on the baseline after final H2 & waving hello (Terracotta) */}
          <g transform="translate(1258, 256)">
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
