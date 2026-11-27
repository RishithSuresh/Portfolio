/**
 * Bespoke decorative Art-Deco / Didone typography for "RISHITH SURESH"
 * modeled directly on the reference specimens:
 * - Oversized drop-cap R & S with sweeping spirals and ball terminals
 * - High-contrast thick vertical pillars + razor-thin crossbars & curves
 * - Concave flared serifs, trumpet-arm E, thick-to-thin U, curved-leg R
 * - Delicate concentric compass circles, tiny spiral curls, and gold rim trace
 * - 13 slender colored-head stickmen anchored to exact letter coordinates
 */

const GLYPHS = [
  // 1. Drop-Cap R (Sweeping left spiral loop + thick stem + curled-ball bowl + dipping leg)
  'M 106 106 C 106 72, 152 68, 162 94 C 166 106, 150 118, 134 112 L 136 108 C 148 112, 158 103, 155 94 C 148 76, 112 78, 112 106 L 125 106 L 125 244 L 136 246 L 136 250 L 96 250 L 96 246 L 106 244 Z',
  'M 125 112 L 146 112 C 166 112, 174 126, 174 144 C 174 164, 160 176, 136 176 L 125 176 L 125 172 L 136 172 C 150 172, 156 161, 156 144 C 156 126, 150 115, 136 115 L 125 115 Z M 136 176 L 154 176 L 174 238 C 178 248, 184 254, 190 256 C 178 258, 166 252, 160 238 L 136 176 Z',

  // 2. I
  'M 196 112 L 228 112 L 228 115 L 220 117 L 220 245 L 228 247 L 228 250 L 196 250 L 196 247 L 204 245 L 204 117 L 196 115 Z',

  // 3. S (Thick diagonal spine + razor-thin loops + hooked ball terminal + bottom spur)
  'M 294 126 C 290 115, 282 112, 272 112 C 254 112, 244 124, 244 140 C 244 178, 306 184, 306 220 C 306 238, 290 251, 270 251 C 258 251, 248 248, 244 244 L 244 216 L 247 216 C 250 237, 258 248, 270 248 C 284 248, 290 237, 290 223 C 290 192, 244 182, 244 142 C 244 121, 257 109, 274 109 C 287 109, 296 114, 298 126 Z',

  // 4. H (Bold pillars + razor-thin crossbar + sharp horizontal serifs)
  'M 326 112 L 358 112 L 358 115 L 350 117 L 350 178 L 388 178 L 388 117 L 380 115 L 380 112 L 412 112 L 412 115 L 404 117 L 404 245 L 412 247 L 412 250 L 380 250 L 380 247 L 388 245 L 388 181 L 350 181 L 350 245 L 358 247 L 358 250 L 326 250 L 326 247 L 334 245 L 334 117 L 326 115 Z',

  // 5. I
  'M 428 112 L 460 112 L 460 115 L 452 117 L 452 245 L 460 247 L 460 250 L 428 250 L 428 247 L 436 245 L 436 117 L 428 115 Z',

  // 6. T (Razor-thin top bar + hanging curved brackets + thick central pillar)
  'M 476 112 L 556 112 L 556 138 L 553 138 C 549 120, 541 115, 524 115 L 524 245 L 534 247 L 534 250 L 498 250 L 498 247 L 508 245 L 508 115 C 491 115, 483 120, 479 138 L 476 138 Z',

  // 7. H
  'M 572 112 L 604 112 L 604 115 L 596 117 L 596 178 L 634 178 L 634 117 L 626 115 L 626 112 L 658 112 L 658 115 L 650 117 L 650 245 L 658 247 L 658 250 L 626 250 L 626 247 L 634 245 L 634 181 L 596 181 L 596 245 L 604 247 L 604 250 L 572 250 L 572 247 L 580 245 L 580 117 L 572 115 Z',

  // 8. Oversized Decorative S (SURESH drop-cap modeled directly on STRONG & MOONSHINE S)
  'M 772 118 C 768 104, 758 100, 744 100 C 722 100, 710 114, 710 134 C 710 180, 786 188, 786 226 C 786 246, 766 259, 742 259 C 726 259, 714 254, 706 248 L 706 216 L 709 216 C 713 242, 726 255, 744 255 C 762 255, 769 242, 769 226 C 769 190, 710 180, 710 134 C 710 111, 725 96, 747 96 C 763 96, 774 104, 777 118 Z',

  // 9. U (Thick left pillar + razor-thin U curve + razor-thin right stem)
  'M 804 112 L 838 112 L 838 115 L 830 117 L 830 218 C 830 239, 840 247, 855 247 C 870 247, 876 237, 876 218 L 876 117 L 868 115 L 868 112 L 888 112 L 888 115 L 880 117 L 880 218 C 880 241, 868 252, 848 252 C 824 252, 814 239, 814 218 L 814 117 L 804 115 Z',

  // 10. R (STRONG / HERE R with curved leg & crisp bowl)
  'M 904 112 L 948 112 C 970 112, 978 126, 978 144 C 978 164, 966 176, 944 178 L 972 238 C 976 248, 982 254, 988 256 C 976 258, 964 252, 958 238 L 932 179 L 928 179 L 928 245 L 936 247 L 936 250 L 904 250 L 904 247 L 912 245 L 912 117 L 904 115 Z M 928 115 L 928 175 L 944 175 C 958 175, 963 162, 963 144 C 963 126, 958 115, 944 115 Z',

  // 11. E (MOONSHINE / UNIQUE E with pointed spurs & flared trumpet middle arm)
  'M 1002 112 L 1070 112 L 1070 136 L 1067 136 C 1063 119, 1054 115, 1028 115 L 1028 178 L 1048 178 C 1054 178, 1057 173, 1059 166 L 1061 166 L 1061 193 L 1059 193 C 1057 186, 1054 181, 1048 181 L 1028 181 L 1028 247 C 1055 247, 1064 242, 1068 223 L 1071 223 L 1071 250 L 1002 250 L 1002 247 L 1012 245 L 1012 117 L 1002 115 Z',

  // 12. S
  'M 1146 126 C 1142 115, 1134 112, 1124 112 C 1106 112, 1096 124, 1096 140 C 1096 178, 1158 184, 1158 220 C 1158 238, 1142 251, 1122 251 C 1110 251, 1100 248, 1096 244 L 1096 216 L 1099 216 C 1102 237, 1110 248, 1122 248 C 1136 248, 1142 237, 1142 223 C 1142 192, 1096 182, 1096 142 C 1096 121, 1109 109, 1126 109 C 1139 109, 1148 114, 1150 126 Z',

  // 13. H
  'M 1174 112 L 1206 112 L 1206 115 L 1198 117 L 1198 178 L 1236 178 L 1236 117 L 1228 115 L 1228 112 L 1260 112 L 1260 115 L 1252 117 L 1252 245 L 1260 247 L 1260 250 L 1228 250 L 1228 247 L 1236 245 L 1236 181 L 1198 181 L 1198 245 L 1206 247 L 1206 250 L 1174 250 L 1174 247 L 1182 245 L 1182 117 L 1174 115 Z'
]

function Star4({ cx, cy, size = 9, className = 'ornament-star' }) {
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
        viewBox="20 20 1320 286"
        shapeRendering="geometricPrecision"
        role="img"
        aria-label="Rishith Suresh in decorative Art-Deco lettering with animated stickmen"
      >
        <defs>
          <linearGradient id="glyphGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#001524" />
            <stop offset="48%" stopColor="#00555f" />
            <stop offset="100%" stopColor="#001524" />
          </linearGradient>

          <linearGradient id="shimmerGrad" x1="-60%" y1="0%" x2="40%" y2="100%">
            <stop offset="0%" stopColor="#83c5be" stopOpacity="0" />
            <stop offset="42%" stopColor="#ffecd1" stopOpacity="0.52" />
            <stop offset="50%" stopColor="#ff7d00" stopOpacity="0.55" />
            <stop offset="58%" stopColor="#edf6f9" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#83c5be" stopOpacity="0" />
            <animateTransform
              attributeName="gradientTransform"
              type="translate"
              from="-1.2 0"
              to="2.2 0"
              dur="5.4s"
              repeatCount="indefinite"
            />
          </linearGradient>

          <filter id="textGlow" x="-18%" y="-25%" width="136%" height="150%">
            <feGaussianBlur stdDeviation="7.5" result="blurA" />
            <feColorMatrix
              in="blurA"
              type="matrix"
              values="0 0 0 0 1   0 0 0 0 0.78   0 0 0 0 0.54  0 0 0 0.72 0"
              result="warmGlow"
            />
            <feMerge>
              <feMergeNode in="warmGlow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Gossamer Concentric Compass Circles & Spiral Filigree (modeled on MOONSHINE / UNIQUE / BE STRONG) */}
        <g aria-hidden="true">
          {/* Sweeping fine compass circles interlocking behind the letters */}
          <g className="anim-orbit-cw" style={{ transformOrigin: '122px 146px' }}>
            <circle cx="122" cy="146" r="82" className="ornament-arc" />
            <circle cx="122" cy="146" r="56" className="ornament-arc-dashed" />
          </g>
          <g className="anim-orbit-ccw" style={{ transformOrigin: '274px 176px' }}>
            <circle cx="274" cy="176" r="68" className="ornament-arc" />
          </g>
          <g className="anim-orbit-cw" style={{ transformOrigin: '444px 136px' }}>
            <circle cx="444" cy="136" r="64" className="ornament-arc" />
            <circle cx="444" cy="136" r="42" className="ornament-arc-accent" />
          </g>
          <g className="anim-orbit-cw" style={{ transformOrigin: '744px 180px' }}>
            <circle cx="744" cy="180" r="86" className="ornament-arc" />
            <circle cx="744" cy="180" r="58" className="ornament-arc-dashed" />
          </g>
          <g className="anim-orbit-ccw" style={{ transformOrigin: '944px 174px' }}>
            <circle cx="944" cy="174" r="66" className="ornament-arc" />
          </g>
          <circle cx="1124" cy="178" r="68" className="ornament-arc" />
          <ellipse cx="680" cy="180" rx="575" ry="118" className="ornament-orbit" />

          {/* Delicate spiral filigree curls ending in tiny o-loops (exact reference detail!) */}
          {/* Around drop-cap R */}
          <path d="M 110 106 C 68 74, 52 138, 92 152 C 114 158, 114 132, 98 134" className="ornament-curl" />
          <circle cx="97" cy="135" r="2.6" className="ornament-loop" />
          <path d="M 106 196 C 72 204, 70 242, 96 246" className="ornament-curl-warm" />
          <circle cx="78" cy="212" r="2.2" className="ornament-loop" />
          <path d="M 174 144 C 194 148, 198 172, 182 178" className="ornament-curl" />
          <circle cx="182" cy="178" r="2.2" className="ornament-loop" />

          {/* Around S1 & H1 & I2 */}
          <path d="M 294 126 C 318 106, 336 132, 316 144" className="ornament-curl" />
          <circle cx="316" cy="144" r="2.3" className="ornament-loop" />
          <path d="M 380 112 C 414 88, 444 98, 434 126" className="ornament-curl-warm" />
          <path d="M 556 138 C 580 154, 568 178, 548 168" className="ornament-curl" />
          <circle cx="548" cy="168" r="2.2" className="ornament-loop" />

          {/* Around drop-cap S2 & U & R2 & E & S3 */}
          <path d="M 772 118 C 804 92, 824 126, 796 146" className="ornament-curl" />
          <circle cx="796" cy="146" r="2.5" className="ornament-loop" />
          <path d="M 706 248 C 674 268, 690 294, 722 276" className="ornament-curl-warm" />
          <circle cx="722" cy="276" r="2.3" className="ornament-loop" />
          <path d="M 880 156 C 906 140, 916 168, 896 178" className="ornament-curl" />
          <circle cx="896" cy="178" r="2.1" className="ornament-loop" />
          <path d="M 1070 136 C 1094 120, 1106 148, 1084 158" className="ornament-curl-warm" />
          <circle cx="1084" cy="158" r="2.3" className="ornament-loop" />
          <path d="M 1252 214 C 1284 198, 1294 238, 1268 248" className="ornament-curl" />
          <circle cx="1282" cy="222" r="2.3" className="ornament-loop" />

          {/* Signature solid ball terminals inside the curls (just like UNIQUE, MOONSHINE, STRONG) */}
          <circle cx="164" cy="96" r="5.5" fill="#ff7d00" stroke="#001524" strokeWidth="1.2" />
          <circle cx="290" cy="128" r="4.5" fill="#001524" />
          <circle cx="766" cy="120" r="5.8" fill="#001524" />
          <circle cx="1142" cy="128" r="4.5" fill="#001524" />

          {/* Twinkling 4-point diamond stars above both I's & S2 */}
          <Star4 cx={212} cy={86} size={9.5} className="ornament-star anim-twinkle" />
          <Star4 cx={444} cy={86} size={10} className="ornament-star anim-twinkle-delay" />
          <Star4 cx={776} cy={258} size={7.5} className="ornament-star anim-twinkle" />
        </g>

        {/* LAYER 1: Luminous Soft Light Glow */}
        <g filter="url(#textGlow)" aria-hidden="true">
          {GLYPHS.map((d, idx) => (
            <path key={`glow-${idx}`} d={d} className="glyph-glow-base" fillRule="evenodd" />
          ))}
        </g>

        {/* LAYER 2: Warm Gold/Terracotta Bottom-Right Offset Bevel Trace (like BE STRONG) */}
        <g transform="translate(2.5, 3)" aria-hidden="true">
          {GLYPHS.map((d, idx) => (
            <path key={`ext-${idx}`} d={d} className="glyph-extrude" fillRule="evenodd" />
          ))}
        </g>

        {/* LAYER 3: Fine Cream Upper Keyline Echo */}
        <g transform="translate(-1.5, -1.5)" aria-hidden="true">
          {GLYPHS.map((d, idx) => (
            <path key={`key-${idx}`} d={d} className="glyph-keyline" fillRule="evenodd" />
          ))}
        </g>

        {/* LAYER 4: Main Sculpted Glyphs + Specular Shimmer + Crisp Thin Outline */}
        <g>
          {GLYPHS.map((d, idx) => (
            <g key={`main-${idx}`}>
              <path d={d} fill="url(#glyphGrad)" className="glyph-main" fillRule="evenodd" />
              <path d={d} fill="url(#shimmerGrad)" fillRule="evenodd" pointerEvents="none" />
              <path d={d} className="glyph-thin-outline" fillRule="evenodd" pointerEvents="none" />
            </g>
          ))}
        </g>

        {/* 13 Slender, Elongated, Colored-Head Stickmen Anchored to Exact Glyph Coordinates */}
        <g className="stickmen-layer">
          {/* 1. Sitting on R1's top bar (x=140, y=112) kicking leg & typing on laptop (Tangerine) */}
          <g transform="translate(140, 112)">
            <circle cx="0" cy="-22" r="3.9" fill="#ff7d00" stroke="#001524" strokeWidth="1.2" />
            <path d="M0 -18 L0 -1 L8 0" className="stick-limb" />
            <path d="M0 -1 L-3 9" className="stick-limb anim-kick" />
            <path d="M0 -13 L7 -8 L11 -10" className="stick-limb" />
            <path d="M9 -1 L15 -1 L17 -7" className="stick-prop" />
          </g>

          {/* 2. Juggling 3 colored balls on top of S1 (x=274, y=110) (Deep Teal) */}
          <g transform="translate(274, 110)">
            <circle cx="0" cy="-25" r="3.8" fill="#006d77" stroke="#001524" strokeWidth="1.2" />
            <path d="M0 -21 L0 -8 L-5 0 M0 -8 L5 0" className="stick-limb" />
            <path d="M0 -17 L-8 -13 M0 -17 L8 -13" className="stick-limb" />
            <circle cx="-7" cy="-22" r="2.1" fill="#ff7d00" className="anim-juggle-a" />
            <circle cx="0" cy="-31" r="2.1" fill="#83c5be" className="anim-juggle-b" />
            <circle cx="7" cy="-22" r="2.1" fill="#e29578" className="anim-juggle-c" />
          </g>

          {/* 3. Sprinting across H1's roof (x=370, y=112) (Teal) */}
          <g transform="translate(370, 112)">
            <g className="anim-sprint">
              <circle cx="2" cy="-26" r="3.8" fill="#006d77" stroke="#001524" strokeWidth="1.2" />
              <path d="M1.5 -22 L-1 -8" className="stick-limb" />
              <path d="M-1 -8 L-7 -3 L-9 0" className="stick-limb anim-stride-a" />
              <path d="M-1 -8 L5 -4 L7 0" className="stick-limb anim-stride-b" />
              <path d="M0.5 -18 L7 -14 L10 -17" className="stick-limb anim-arm-a" />
              <path d="M0.5 -18 L-6 -14 L-9 -12" className="stick-limb anim-arm-b" />
            </g>
          </g>

          {/* 4. Doing push-ups on H1's crossbar inside H! (x=370, y=178) (Gold) */}
          <g transform="translate(370, 178)">
            <g className="anim-pushup">
              <circle cx="-11" cy="-9" r="3.5" fill="#ffc300" stroke="#001524" strokeWidth="1.2" />
              <path d="M-7 -7 L9 -2 L14 0" className="stick-limb" />
              <path d="M-6 -6 L-6 0" className="stick-limb" />
            </g>
          </g>

          {/* 5. Swinging on rope from T's left bracket (x=484, y=115) (Terracotta) */}
          <g transform="translate(484, 115)">
            <g className="anim-swing">
              <line x1="0" y1="0" x2="0" y2="28" className="stick-prop" />
              <circle cx="0" cy="30" r="3.7" fill="#e29578" stroke="#001524" strokeWidth="1.2" />
              <path d="M0 34 L0 48 L-4 58 M0 48 L4 58" className="stick-limb" />
              <path d="M0 38 L-3 27 M0 38 L3 27" className="stick-limb" />
            </g>
          </g>

          {/* 6. Weightlifting barbell on top of T's center (x=516, y=112) (Seafoam) */}
          <g transform="translate(516, 112)">
            <circle cx="0" cy="-25" r="3.9" fill="#83c5be" stroke="#001524" strokeWidth="1.2" />
            <path d="M0 -21 L0 -8 L-5 0 M0 -8 L5 0" className="stick-limb" />
            <g className="anim-lift">
              <path d="M0 -17 L-9 -26 M0 -17 L9 -26" className="stick-limb" />
              <line x1="-15" y1="-27" x2="15" y2="-27" className="stick-prop" />
              <rect x="-17" y="-30" width="3" height="6" rx="0.8" fill="#ff7d00" />
              <rect x="14" y="-30" width="3" height="6" rx="0.8" fill="#ff7d00" />
            </g>
          </g>

          {/* 7. Climbing rope between H1 and S2 (x=678, y=112..250) (Rust) */}
          <g transform="translate(678, 112)">
            <line x1="0" y1="0" x2="0" y2="138" className="stick-line" />
            <g className="anim-climb">
              <circle cx="-5" cy="48" r="3.8" fill="#78290f" stroke="#001524" strokeWidth="1.2" />
              <path d="M-5 52 L-5 68 L-10 77 M-5 68 L0 76" className="stick-limb" />
              <path d="M-5 56 L0 49 M-5 60 L0 65" className="stick-limb" />
            </g>
          </g>

          {/* 8. Fishing off U's left top pillar into the U bowl (x=822, y=112) (Gold) */}
          <g transform="translate(822, 112)">
            <circle cx="0" cy="-22" r="3.9" fill="#ffc300" stroke="#001524" strokeWidth="1.2" />
            <path d="M0 -18 L0 -1 L8 0 M0 -1 L4 8" className="stick-limb" />
            <path d="M0 -14 L9 -13" className="stick-limb" />
            <path d="M8 -12 Q22 -24 34 -14" className="stick-prop" fill="none" />
            <line x1="34" y1="-14" x2="34" y2="54" className="stick-line anim-bob" />
            <circle cx="34" cy="54" r="2.4" fill="#ff7d00" className="anim-bob" />
          </g>

          {/* 9. Launching gliding paper airplane from U's right spire (x=878, y=112) (Rust) */}
          <g transform="translate(878, 112)">
            <circle cx="0" cy="-25" r="3.7" fill="#78290f" stroke="#001524" strokeWidth="1.2" />
            <path d="M0 -21 L0 -8 L-5 0 M0 -8 L5 0" className="stick-limb" />
            <path d="M0 -17 L-6 -12 M0 -17 L9 -21" className="stick-limb" />
            <path d="M10 -24 L20 -26 L13 -20 Z" fill="#ffddd2" stroke="#001524" strokeWidth="0.9" className="anim-plane" />
          </g>

          {/* 10. Skateboarding with mid-air Ollie over R2->E (x=990, y=112) (Peach) */}
          <g transform="translate(990, 112)">
            <g className="anim-skate-ollie">
              <circle cx="0" cy="-28" r="3.9" fill="#ffddd2" stroke="#001524" strokeWidth="1.2" />
              <path d="M0 -24 L-1 -11 L-5 -3 M-1 -11 L5 -3" className="stick-limb" />
              <path d="M0 -19 L-8 -15 M0 -19 L8 -16" className="stick-limb" />
              <line x1="-10" y1="-2" x2="10" y2="-2" stroke="#ff7d00" strokeWidth="2.2" strokeLinecap="round" />
              <circle cx="-6" cy="-0.4" r="1.5" fill="#001524" />
              <circle cx="6" cy="-0.4" r="1.5" fill="#001524" />
            </g>
          </g>

          {/* 11. Jumping cheerfully on top of E (x=1042, y=112) (Tangerine) */}
          <g transform="translate(1042, 112)">
            <g className="anim-jump">
              <circle cx="0" cy="-25" r="3.9" fill="#ff7d00" stroke="#001524" strokeWidth="1.2" />
              <path d="M0 -21 L0 -8 L-5 0 M0 -8 L5 0" className="stick-limb" />
              <path d="M0 -17 L-8 -24 M0 -17 L8 -24" className="stick-limb" />
            </g>
          </g>

          {/* 12. Balancing handstand on final H2's left pillar (x=1190, y=112) (Teal) */}
          <g transform="translate(1190, 112)">
            <g className="anim-wobble">
              <path d="M-4 0 L-1 -9 M4 0 L1 -9" className="stick-limb" />
              <path d="M0 -9 L0 -23 L-4 -32 M0 -23 L4 -32" className="stick-limb" />
              <circle cx="0" cy="-5" r="3.8" fill="#006d77" stroke="#001524" strokeWidth="1.2" />
            </g>
          </g>

          {/* 13. Standing tall on the baseline after final H2 & waving hello (Terracotta) */}
          <g transform="translate(1284, 250)">
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
