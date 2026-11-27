/**
 * Clean, high-precision Art-Deco / Didone typography for "RISHITH SURESH"
 * modeled directly on the reference specimens ("MOONSHINE", "BE STRONG", "UNIQUE"):
 * - Clean, non-intersecting vector paths with uniform 17px stems & 2.4px hairlines
 * - Matte solid deep-petrol ink with crisp 1px warm terracotta bevel trace
 * - Seamless integrated ball terminals on R & S (no floating/misaligned dots)
 * - Refined gossamer compass circles & curls without stray visual clutter
 * - 13 slender colored-head stickmen cleanly spaced along the letterforms
 */

const GLYPHS = [
  // 1. R (RISHITH) — Clean bold stem, smooth full bowl, sweeping curved leg
  'M 96 86 L 140 86 C 166 86, 176 104, 176 128 C 176 154, 162 170, 138 170 L 121 170 L 121 252 L 131 254 L 131 256 L 96 256 L 96 254 L 104 252 L 104 90 L 96 88 Z M 121 89 L 121 167 L 137 167 C 153 167, 159 152, 159 128 C 159 104, 152 89, 136 89 Z M 136 170 L 154 170 L 176 238 C 180 249, 186 256, 192 258 C 178 260, 166 252, 160 238 L 136 170 Z',

  // 2. I
  'M 199 86 L 231 86 L 231 89 L 223 91 L 223 251 L 231 253 L 231 256 L 199 256 L 199 253 L 207 251 L 207 91 L 199 89 Z',

  // 3. S — Smooth balanced S-curve with integrated upper ball terminal & sharp bottom spur
  'M 294 114 C 294 121, 289 126, 283 126 C 277 126, 273 121, 273 115 C 273 110, 276 106, 281 104 C 278 93, 272 88, 263 88 C 250 88, 244 99, 244 116 C 244 160, 304 172, 304 224 C 304 246, 288 258, 266 258 C 254 258, 245 254, 240 248 L 240 218 L 243 218 C 246 243, 255 254, 267 254 C 281 254, 287 243, 287 225 C 287 183, 240 172, 240 118 C 240 96, 252 84, 269 84 C 284 84, 294 96, 294 114 Z',

  // 4. H
  'M 320 86 L 350 86 L 350 89 L 343 91 L 343 168 L 383 168 L 383 91 L 376 89 L 376 86 L 406 86 L 406 89 L 399 91 L 399 251 L 406 253 L 406 256 L 376 256 L 376 253 L 383 251 L 383 171 L 343 171 L 343 251 L 350 253 L 350 256 L 320 256 L 320 253 L 327 251 L 327 91 L 320 89 Z',

  // 5. I
  'M 422 86 L 454 86 L 454 89 L 446 91 L 446 251 L 454 253 L 454 256 L 422 256 L 422 253 L 430 251 L 430 91 L 422 89 Z',

  // 6. T
  'M 468 86 L 544 86 L 544 118 L 541 118 C 537 96, 529 89, 514 89 L 514 251 L 523 253 L 523 256 L 489 256 L 489 253 L 498 251 L 498 89 C 483 89, 475 96, 471 118 L 468 118 Z',

  // 7. H
  'M 558 86 L 588 86 L 588 89 L 581 91 L 581 168 L 621 168 L 621 91 L 614 89 L 614 86 L 644 86 L 644 89 L 637 91 L 637 251 L 644 253 L 644 256 L 614 256 L 614 253 L 621 251 L 621 171 L 581 171 L 581 251 L 588 253 L 588 256 L 558 256 L 558 253 L 565 251 L 565 91 L 558 89 Z',

  // 8. Oversized Decorative S (SURESH) — Tall curve with integrated ball terminal
  'M 756 108 C 756 116, 750 122, 743 122 C 736 122, 731 116, 731 109 C 731 103, 735 98, 741 96 C 737 84, 730 78, 719 78 C 705 78, 697 91, 697 112 C 697 164, 766 176, 766 228 C 766 252, 747 265, 722 265 C 708 265, 698 260, 692 253 L 692 218 L 695 218 C 698 247, 709 261, 724 261 C 741 261, 748 248, 748 228 C 748 184, 692 174, 692 114 C 692 88, 706 74, 726 74 C 744 74, 756 88, 756 108 Z',

  // 9. U
  'M 782 86 L 814 86 L 814 89 L 806 91 L 806 216 C 806 243, 816 253, 833 253 C 850 253, 858 241, 858 216 L 858 91 L 850 89 L 850 86 L 870 86 L 870 89 L 861 91 L 861 216 C 861 244, 848 258, 827 258 C 801 258, 790 242, 790 216 L 790 91 L 782 89 Z',

  // 10. R (SURESH)
  'M 886 86 L 930 86 C 956 86, 966 104, 966 128 C 966 154, 952 170, 928 170 L 911 170 L 911 252 L 921 254 L 921 256 L 886 256 L 886 254 L 894 252 L 894 90 L 886 88 Z M 911 89 L 911 167 L 927 167 C 943 167, 949 152, 949 128 C 949 104, 942 89, 926 89 Z M 926 170 L 944 170 L 966 238 C 970 249, 976 256, 982 258 C 968 260, 956 252, 950 238 L 926 170 Z',

  // 11. E
  'M 992 86 L 1054 86 L 1054 118 L 1051 118 C 1047 95, 1039 89, 1016 89 L 1016 168 L 1034 168 C 1040 168, 1043 163, 1045 155 L 1047 155 L 1047 186 L 1045 186 C 1043 178, 1040 171, 1034 171 L 1016 171 L 1016 253 C 1041 253, 1049 247, 1053 224 L 1055 224 L 1055 256 L 992 256 L 992 253 L 1000 251 L 1000 91 L 992 89 Z',

  // 12. S — Smooth balanced S-curve with integrated upper ball terminal
  'M 1124 114 C 1124 121, 1119 126, 1113 126 C 1107 126, 1103 121, 1103 115 C 1103 110, 1106 106, 1111 104 C 1108 93, 1102 88, 1093 88 C 1080 88, 1074 99, 1074 116 C 1074 160, 1134 172, 1134 224 C 1134 246, 1118 258, 1096 258 C 1084 258, 1075 254, 1070 248 L 1070 218 L 1073 218 C 1076 243, 1085 254, 1097 254 C 1111 254, 1117 243, 1117 225 C 1117 183, 1070 172, 1070 118 C 1070 96, 1082 84, 1099 84 C 1114 84, 1124 96, 1124 114 Z',

  // 13. H
  'M 1152 86 L 1182 86 L 1182 89 L 1175 91 L 1175 168 L 1215 168 L 1215 91 L 1208 89 L 1208 86 L 1238 86 L 1238 89 L 1231 91 L 1231 251 L 1238 253 L 1238 256 L 1208 256 L 1208 253 L 1215 251 L 1215 171 L 1175 171 L 1175 251 L 1182 253 L 1182 256 L 1152 256 L 1152 253 L 1159 251 L 1159 91 L 1152 89 Z'
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
        viewBox="40 14 1250 292"
        shapeRendering="geometricPrecision"
        role="img"
        aria-label="Rishith Suresh in bespoke decorative Art-Deco lettering with animated stickmen"
      >
        <defs>
          {/* Clean, uniform matte deep-ocean ink (no distracting diagonal stripe) */}
          <linearGradient id="glyphGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#001524" />
            <stop offset="55%" stopColor="#052f3d" />
            <stop offset="100%" stopColor="#001524" />
          </linearGradient>
        </defs>

        {/* Refined Gossamer Concentric Compass Circles & Delicate Initial Crest */}
        <g aria-hidden="true">
          <g className="anim-orbit-cw" style={{ transformOrigin: '132px 146px' }}>
            <circle cx="132" cy="146" r="82" className="ornament-arc" />
            <circle cx="132" cy="146" r="56" className="ornament-arc-dashed" />
          </g>
          <g className="anim-orbit-ccw" style={{ transformOrigin: '270px 176px' }}>
            <circle cx="270" cy="176" r="70" className="ornament-arc" />
          </g>
          <g className="anim-orbit-cw" style={{ transformOrigin: '436px 132px' }}>
            <circle cx="436" cy="132" r="66" className="ornament-arc" />
            <circle cx="436" cy="132" r="42" className="ornament-arc-accent" />
          </g>
          <g className="anim-orbit-cw" style={{ transformOrigin: '732px 172px' }}>
            <circle cx="732" cy="172" r="88" className="ornament-arc" />
            <circle cx="732" cy="172" r="60" className="ornament-arc-dashed" />
          </g>
          <g className="anim-orbit-ccw" style={{ transformOrigin: '930px 172px' }}>
            <circle cx="930" cy="172" r="68" className="ornament-arc" />
          </g>
          <circle cx="1102" cy="176" r="70" className="ornament-arc" />

          {/* Sweeping delicate crest flourish off initial R (MOONSHINE M style) */}
          <path
            d="M 104 88 C 68 58, 56 126, 98 138 C 118 144, 122 118, 104 118"
            className="ornament-curl"
          />
          <path
            d="M 96 86 C 84 48, 130 42, 144 64"
            className="ornament-curl-warm"
          />
          <circle cx="146" cy="66" r="3.6" fill="#ff7d00" stroke="#001524" strokeWidth="1" />

          {/* Minimal, intentional filigree curls hugging S, H, E */}
          <path d="M 376 86 C 408 64, 434 72, 424 102" className="ornament-curl-warm" />
          <path d="M 756 104 C 788 78, 808 112, 780 134" className="ornament-curl" />
          <path d="M 692 253 C 662 272, 678 296, 708 280" className="ornament-curl-warm" />
          <path d="M 1054 118 C 1076 102, 1086 132, 1066 142" className="ornament-curl" />
          <path d="M 1231 206 C 1262 190, 1272 232, 1246 244" className="ornament-curl-warm" />

          {/* 4-point diamond stars above both I's & S */}
          <Star4 cx={215} cy={68} size={8.5} className="ornament-star anim-twinkle" />
          <Star4 cx={438} cy={68} size={9} className="ornament-star anim-twinkle-delay" />
          <Star4 cx={756} cy={262} size={6.5} className="ornament-star anim-twinkle" />
        </g>

        {/* Crisp 1px Warm Gold/Terracotta Bottom-Right Hairline Trace (BE STRONG style) */}
        <g transform="translate(1.8, 2)" aria-hidden="true">
          {GLYPHS.map((d, idx) => (
            <path key={`trace-${idx}`} d={d} className="glyph-hairline-trace" fillRule="evenodd" />
          ))}
        </g>

        {/* Main Razor-Sharp Solid Sculpted Glyphs */}
        <g>
          {GLYPHS.map((d, idx) => (
            <path key={`main-${idx}`} d={d} fill="url(#glyphGrad)" className="glyph-crisp" fillRule="evenodd" />
          ))}
        </g>

        {/* 13 Well-Spaced, Slender, Colored-Head Stickmen */}
        <g className="stickmen-layer">
          {/* 1. Sitting on R1's top bar (x=140, y=86) kicking leg & typing on laptop (Tangerine) */}
          <g transform="translate(140, 86)">
            <circle cx="0" cy="-22" r="3.8" fill="#ff7d00" stroke="#001524" strokeWidth="1.2" />
            <path d="M0 -18 L0 -1 L8 0" className="stick-limb" />
            <path d="M0 -1 L-3 9" className="stick-limb anim-kick" />
            <path d="M0 -13 L7 -8 L11 -10" className="stick-limb" />
            <path d="M9 -1 L15 -1 L17 -7" className="stick-prop" />
          </g>

          {/* 2. Juggling 3 colored balls on top of S1 (x=268, y=84) (Deep Teal) */}
          <g transform="translate(268, 84)">
            <circle cx="0" cy="-25" r="3.8" fill="#006d77" stroke="#001524" strokeWidth="1.2" />
            <path d="M0 -21 L0 -8 L-5 0 M0 -8 L5 0" className="stick-limb" />
            <path d="M0 -17 L-8 -13 M0 -17 L8 -13" className="stick-limb" />
            <circle cx="-7" cy="-22" r="2.1" fill="#ff7d00" className="anim-juggle-a" />
            <circle cx="0" cy="-31" r="2.1" fill="#83c5be" className="anim-juggle-b" />
            <circle cx="7" cy="-22" r="2.1" fill="#e29578" className="anim-juggle-c" />
          </g>

          {/* 3. Sprinting across H1's roof (x=363, y=86) (Teal) */}
          <g transform="translate(363, 86)">
            <g className="anim-sprint">
              <circle cx="2" cy="-26" r="3.8" fill="#006d77" stroke="#001524" strokeWidth="1.2" />
              <path d="M1.5 -22 L-1 -8" className="stick-limb" />
              <path d="M-1 -8 L-7 -3 L-9 0" className="stick-limb anim-stride-a" />
              <path d="M-1 -8 L5 -4 L7 0" className="stick-limb anim-stride-b" />
              <path d="M0.5 -18 L7 -14 L10 -17" className="stick-limb anim-arm-a" />
              <path d="M0.5 -18 L-6 -14 L-9 -12" className="stick-limb anim-arm-b" />
            </g>
          </g>

          {/* 4. Doing push-ups on H1's crossbar inside H! (x=363, y=168) (Gold) */}
          <g transform="translate(363, 168)">
            <g className="anim-pushup">
              <circle cx="-11" cy="-9" r="3.5" fill="#ffc300" stroke="#001524" strokeWidth="1.2" />
              <path d="M-7 -7 L9 -2 L14 0" className="stick-limb" />
              <path d="M-6 -6 L-6 0" className="stick-limb" />
            </g>
          </g>

          {/* 5. Swinging on rope from T's open RIGHT overhang (x=534, y=89) (Terracotta) */}
          <g transform="translate(534, 89)">
            <g className="anim-swing">
              <line x1="0" y1="0" x2="0" y2="28" className="stick-prop" />
              <circle cx="0" cy="30" r="3.7" fill="#e29578" stroke="#001524" strokeWidth="1.2" />
              <path d="M0 34 L0 48 L-4 58 M0 48 L4 58" className="stick-limb" />
              <path d="M0 38 L-3 27 M0 38 L3 27" className="stick-limb" />
            </g>
          </g>

          {/* 6. Weightlifting barbell on top of T's center (x=506, y=86) (Seafoam) */}
          <g transform="translate(506, 86)">
            <circle cx="0" cy="-25" r="3.8" fill="#83c5be" stroke="#001524" strokeWidth="1.2" />
            <path d="M0 -21 L0 -8 L-5 0 M0 -8 L5 0" className="stick-limb" />
            <g className="anim-lift">
              <path d="M0 -17 L-9 -26 M0 -17 L9 -26" className="stick-limb" />
              <line x1="-15" y1="-27" x2="15" y2="-27" className="stick-prop" />
              <rect x="-17" y="-30" width="3" height="6" rx="0.8" fill="#ff7d00" />
              <rect x="14" y="-30" width="3" height="6" rx="0.8" fill="#ff7d00" />
            </g>
          </g>

          {/* 7. Climbing rope between H1 and S2 (x=666, y=86..256) (Rust) */}
          <g transform="translate(666, 86)">
            <line x1="0" y1="0" x2="0" y2="170" className="stick-line" />
            <g className="anim-climb">
              <circle cx="-5" cy="60" r="3.8" fill="#78290f" stroke="#001524" strokeWidth="1.2" />
              <path d="M-5 64 L-5 80 L-10 89 M-5 80 L0 88" className="stick-limb" />
              <path d="M-5 68 L0 61 M-5 72 L0 77" className="stick-limb" />
            </g>
          </g>

          {/* 8. Fishing off U's left top pillar into the U bowl (x=798, y=86) (Gold) */}
          <g transform="translate(798, 86)">
            <circle cx="0" cy="-22" r="3.8" fill="#ffc300" stroke="#001524" strokeWidth="1.2" />
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

          {/* 10. Skateboarding with mid-air Ollie strictly across R2 (x=926, y=86) (Peach) */}
          <g transform="translate(926, 86)">
            <g className="anim-skate-tight">
              <circle cx="0" cy="-28" r="3.8" fill="#ffddd2" stroke="#001524" strokeWidth="1.2" />
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
              <circle cx="0" cy="-25" r="3.8" fill="#ff7d00" stroke="#001524" strokeWidth="1.2" />
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
