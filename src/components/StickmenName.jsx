/**
 * Bespoke tall Art-Deco / Didone hollow vector glyphs for "RISHITH SURESH"
 * paired with filigree construction arcs, 4-point stars, and articulated
 * slender colored-head stickmen anchored directly to the letter strokes.
 */

const GLYPHS = [
  // 1. R (Tall decorative drop-cap with upper swash curl & ball terminal)
  'M 96 106 C 96 76, 134 72, 146 92 C 154 106, 134 122, 120 112 C 110 105, 114 90, 126 90 M 102 106 L 118 106 L 118 250 L 94 250 L 94 246 L 102 246 Z',
  // R bowl & leg
  'M 118 110 L 144 110 C 166 110, 174 128, 174 144 C 174 164, 162 178, 138 178 L 118 178 L 118 174 L 136 174 C 150 174, 156 162, 156 144 C 156 126, 150 114, 136 114 L 118 114 Z M 132 178 L 150 178 L 176 246 L 184 246 L 184 250 L 158 250 L 132 178 Z',

  // 2. I (Tall Didone stem + flared serifs)
  'M 194 110 L 230 110 L 230 114 L 220 116 L 220 244 L 230 246 L 230 250 L 194 250 L 194 246 L 204 244 L 204 116 L 194 114 Z',

  // 3. S (High-contrast Didone S with tapering curves)
  'M 304 112 L 304 140 L 300 140 C 296 120, 286 113, 274 113 C 262 113, 256 122, 256 132 C 256 154, 310 166, 310 212 C 310 236, 294 252, 272 252 C 260 252, 250 248, 244 243 L 244 214 L 248 214 C 252 236, 262 248, 274 248 C 288 248, 294 236, 294 222 C 294 194, 244 182, 244 138 C 244 118, 258 108, 276 108 C 288 108, 297 110, 304 112 Z',

  // 4. H (Thick vertical pillars + hairline crossbar + crisp serifs)
  'M 326 110 L 362 110 L 362 114 L 352 116 L 352 178 L 392 178 L 392 116 L 382 114 L 382 110 L 418 110 L 418 114 L 408 116 L 408 244 L 418 246 L 418 250 L 382 250 L 382 246 L 392 244 L 392 182 L 352 182 L 352 244 L 362 246 L 362 250 L 326 250 L 326 246 L 336 244 L 336 116 L 326 114 Z',

  // 5. I
  'M 434 110 L 470 110 L 470 114 L 460 116 L 460 244 L 470 246 L 470 250 L 434 250 L 434 246 L 444 244 L 444 116 L 434 114 Z',

  // 6. T (Hairline top bar with hanging wedge brackets + thick central stem)
  'M 484 110 L 566 110 L 566 136 L 562 136 C 558 118, 550 114, 533 114 L 533 244 L 544 246 L 544 250 L 506 250 L 506 246 L 517 244 L 517 114 C 500 114, 492 118, 488 136 L 484 136 Z',

  // 7. H
  'M 580 110 L 616 110 L 616 114 L 606 116 L 606 178 L 646 178 L 646 116 L 636 114 L 636 110 L 672 110 L 672 114 L 662 116 L 662 244 L 672 246 L 672 250 L 636 250 L 636 246 L 646 244 L 646 182 L 606 182 L 606 244 L 616 246 L 616 250 L 580 250 L 580 246 L 590 244 L 590 116 L 580 114 Z',

  // 8. S (Tall decorative drop-cap for SURESH)
  'M 786 106 L 786 138 L 782 138 C 778 114, 766 106, 752 106 C 738 106, 732 116, 732 128 C 732 154, 794 166, 794 214 C 794 240, 774 256, 748 256 C 734 256, 722 250, 714 244 L 714 212 L 718 212 C 722 238, 734 251, 750 251 C 766 251, 774 238, 774 222 C 774 192, 716 180, 716 134 C 716 112, 732 100, 754 100 C 766 100, 777 102, 786 106 Z',

  // 9. U (Thick left pillar curving into hairline right stem with top serifs)
  'M 808 110 L 844 110 L 844 114 L 834 116 L 834 218 C 834 238, 844 246, 858 246 C 874 246, 882 236, 882 216 L 882 116 L 872 114 L 872 110 L 898 110 L 898 114 L 888 116 L 888 216 C 888 240, 874 252, 852 252 C 828 252, 818 238, 818 216 L 818 116 L 808 114 Z',

  // 10. R
  'M 914 110 L 958 110 C 980 110, 988 126, 988 144 C 988 164, 976 177, 954 178 L 984 246 L 994 246 L 994 250 L 966 250 L 938 180 L 934 180 L 934 244 L 944 246 L 944 250 L 914 250 L 914 246 L 922 244 L 922 116 L 914 114 Z M 934 114 L 934 175 L 952 175 C 966 175, 972 162, 972 144 C 972 126, 966 114, 952 114 Z',

  // 11. E (Thick left stem + hairline top/bottom arms + trumpet-flared middle arm)
  'M 1008 110 L 1076 110 L 1076 136 L 1072 136 C 1068 118, 1058 114, 1034 114 L 1034 177 L 1054 177 C 1060 177, 1063 172, 1065 166 L 1067 166 L 1067 192 L 1065 192 C 1063 186, 1060 181, 1054 181 L 1034 181 L 1034 246 C 1060 246, 1070 242, 1074 222 L 1078 222 L 1078 250 L 1008 250 L 1008 246 L 1018 244 L 1018 116 L 1008 114 Z',

  // 12. S
  'M 1158 112 L 1158 140 L 1154 140 C 1150 120, 1140 113, 1128 113 C 1116 113, 1110 122, 1110 132 C 1110 154, 1164 166, 1164 212 C 1164 236, 1148 252, 1126 252 C 1114 252, 1104 248, 1098 243 L 1098 214 L 1102 214 C 1106 236, 1116 248, 1128 248 C 1142 248, 1148 236, 1148 222 C 1148 194, 1098 182, 1098 138 C 1098 118, 1112 108, 1130 108 C 1142 108, 1151 110, 1158 112 Z',

  // 13. H
  'M 1180 110 L 1216 110 L 1216 114 L 1206 116 L 1206 178 L 1246 178 L 1246 116 L 1236 114 L 1236 110 L 1272 110 L 1272 114 L 1262 116 L 1262 244 L 1272 246 L 1272 250 L 1236 250 L 1236 246 L 1246 244 L 1246 182 L 1206 182 L 1206 244 L 1216 246 L 1216 250 L 1180 250 L 1180 246 L 1190 244 L 1190 116 L 1180 114 Z'
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
        viewBox="0 0 1360 320"
        role="img"
        aria-label="Rishith Suresh in bespoke decorative hollow lettering with animated stickmen"
      >
        <defs>
          <filter id="glyphShadow" x="-10%" y="-10%" width="125%" height="125%">
            <feDropShadow dx="4" dy="5" stdDeviation="3.5" floodColor="#006d77" floodOpacity="0.22" />
          </filter>
        </defs>

        {/* Fine geometric construction arcs, swirls & 4-point sparkles */}
        <g aria-hidden="true">
          <circle cx="118" cy="144" r="68" className="ornament-arc" />
          <circle cx="452" cy="130" r="56" className="ornament-arc" />
          <circle cx="754" cy="196" r="64" className="ornament-arc" />
          <circle cx="1042" cy="180" r="60" className="ornament-arc" />

          <line x1="60" y1="110" x2="1300" y2="110" className="ornament-guide" />
          <line x1="60" y1="250" x2="1300" y2="250" className="ornament-guide" />

          {/* Delicate spiral flourishes */}
          <path d="M 102 106 C 64 76, 48 136, 92 150 C 122 158, 118 124, 96 128" className="ornament-curl" />
          <path d="M 146 92 C 176 74, 198 118, 174 144" className="ornament-curl" />
          <path d="M 786 106 C 818 88, 826 132, 796 144" className="ornament-curl" />
          <path d="M 714 244 C 684 268, 698 290, 728 276" className="ornament-curl" />
          <path d="M 1072 136 C 1094 122, 1106 148, 1084 156" className="ornament-curl" />

          {/* Ball terminals matching the decorative reference */}
          <circle cx="164" cy="94" r="5.5" fill="#ffddd2" stroke="#001524" strokeWidth="1.5" />
          <circle cx="722" cy="252" r="4" fill="#83c5be" stroke="#001524" strokeWidth="1.3" />

          {/* 4-point diamond stars */}
          <Star4 cx={212} cy={88} size={9.5} />
          <Star4 cx={452} cy={86} size={9.5} />
          <Star4 cx={776} cy={258} size={7.5} />
        </g>

        {/* Shadow & Hollow Double-Contour Bespoke Glyphs */}
        <g filter="url(#glyphShadow)">
          {GLYPHS.map((d, idx) => (
            <g key={idx}>
              {/* Outer crisp hollow stroke + translucent hollow fill */}
              <path d={d} className="bespoke-glyph" fillRule="evenodd" />
            </g>
          ))}
        </g>

        {/* Slender, elongated, animated colored-head stickmen anchored to exact letter coordinates */}
        <g className="stickmen-layer">
          {/* 1. Sitting on R's top bar (x=140, y=110) kicking leg & typing on laptop (Tangerine) */}
          <g transform="translate(138, 110)">
            <circle cx="0" cy="-22" r="3.9" fill="#ff7d00" stroke="#001524" strokeWidth="1.2" />
            <path d="M0 -18 L0 -1 L8 0" className="stick-limb" />
            <path d="M0 -1 L-3 9" className="stick-limb anim-kick" />
            <path d="M0 -13 L7 -8 L11 -10" className="stick-limb" />
            <path d="M9 -1 L15 -1 L17 -7" className="stick-prop" />
          </g>

          {/* 2. Sprinting across H's roof (x=340..405, y=110) with articulated pumping knees (Teal) */}
          <g transform="translate(372, 110)">
            <g className="anim-sprint">
              <circle cx="2" cy="-26" r="3.8" fill="#006d77" stroke="#001524" strokeWidth="1.2" />
              <path d="M1.5 -22 L-1 -8" className="stick-limb" />
              <path d="M-1 -8 L-7 -3 L-9 0" className="stick-limb anim-stride-a" />
              <path d="M-1 -8 L5 -4 L7 0" className="stick-limb anim-stride-b" />
              <path d="M0.5 -18 L7 -14 L10 -17" className="stick-limb anim-arm-a" />
              <path d="M0.5 -18 L-6 -14 L-9 -12" className="stick-limb anim-arm-b" />
            </g>
          </g>

          {/* 3. Doing push-ups on the H crossbar inside H! (x=372, y=178) (Gold) */}
          <g transform="translate(372, 178)">
            <g className="anim-pushup">
              <circle cx="-11" cy="-9" r="3.5" fill="#ffc300" stroke="#001524" strokeWidth="1.2" />
              <path d="M-7 -7 L9 -2 L14 0" className="stick-limb" />
              <path d="M-6 -6 L-6 0" className="stick-limb" />
            </g>
          </g>

          {/* 4. Swinging on a rope from T's left overhang (x=492, y=114) (Terracotta) */}
          <g transform="translate(492, 114)">
            <g className="anim-swing">
              <line x1="0" y1="0" x2="0" y2="28" className="stick-prop" />
              <circle cx="0" cy="30" r="3.7" fill="#e29578" stroke="#001524" strokeWidth="1.2" />
              <path d="M0 34 L0 48 L-4 58 M0 48 L4 58" className="stick-limb" />
              <path d="M0 38 L-3 27 M0 38 L3 27" className="stick-limb" />
            </g>
          </g>

          {/* 5. Weightlifting barbell on top of T's center (x=525, y=110) (Seafoam) */}
          <g transform="translate(525, 110)">
            <circle cx="0" cy="-25" r="3.9" fill="#83c5be" stroke="#001524" strokeWidth="1.2" />
            <path d="M0 -21 L0 -8 L-5 0 M0 -8 L5 0" className="stick-limb" />
            <g className="anim-lift">
              <path d="M0 -17 L-9 -26 M0 -17 L9 -26" className="stick-limb" />
              <line x1="-15" y1="-27" x2="15" y2="-27" className="stick-prop" />
              <rect x="-17" y="-30" width="3" height="6" rx="0.8" fill="#ff7d00" />
              <rect x="14" y="-30" width="3" height="6" rx="0.8" fill="#ff7d00" />
            </g>
          </g>

          {/* 6. Climbing rope between H and S (x=676, y=110..250) (Rust) */}
          <g transform="translate(684, 110)">
            <line x1="0" y1="0" x2="0" y2="140" className="stick-line" />
            <g className="anim-climb">
              <circle cx="-5" cy="48" r="3.8" fill="#78290f" stroke="#001524" strokeWidth="1.2" />
              <path d="M-5 52 L-5 68 L-10 77 M-5 68 L0 76" className="stick-limb" />
              <path d="M-5 56 L0 49 M-5 60 L0 65" className="stick-limb" />
            </g>
          </g>

          {/* 7. Fishing off U's left top pillar into the U bowl (x=826, y=110) (Gold) */}
          <g transform="translate(826, 110)">
            <circle cx="0" cy="-22" r="3.9" fill="#ffc300" stroke="#001524" strokeWidth="1.2" />
            <path d="M0 -18 L0 -1 L8 0 M0 -1 L4 8" className="stick-limb" />
            <path d="M0 -14 L9 -13" className="stick-limb" />
            <path d="M8 -12 Q22 -24 34 -14" className="stick-prop" fill="none" />
            <line x1="34" y1="-14" x2="34" y2="54" className="stick-line anim-bob" />
            <circle cx="34" cy="54" r="2.4" fill="#ff7d00" className="anim-bob" />
          </g>

          {/* 8. Skateboarding with mid-air Ollie over R->E (x=950..1030, y=110) (Peach) */}
          <g transform="translate(996, 110)">
            <g className="anim-skate-ollie">
              <circle cx="0" cy="-28" r="3.9" fill="#ffddd2" stroke="#001524" strokeWidth="1.2" />
              <path d="M0 -24 L-1 -11 L-5 -3 M-1 -11 L5 -3" className="stick-limb" />
              <path d="M0 -19 L-8 -15 M0 -19 L8 -16" className="stick-limb" />
              <line x1="-10" y1="-2" x2="10" y2="-2" stroke="#ff7d00" strokeWidth="2.2" strokeLinecap="round" />
              <circle cx="-6" cy="-0.4" r="1.5" fill="#001524" />
              <circle cx="6" cy="-0.4" r="1.5" fill="#001524" />
            </g>
          </g>

          {/* 9. Jumping cheerfully on top of E (x=1048, y=110) (Tangerine) */}
          <g transform="translate(1048, 110)">
            <g className="anim-jump">
              <circle cx="0" cy="-25" r="3.9" fill="#ff7d00" stroke="#001524" strokeWidth="1.2" />
              <path d="M0 -21 L0 -8 L-5 0 M0 -8 L5 0" className="stick-limb" />
              <path d="M0 -17 L-8 -24 M0 -17 L8 -24" className="stick-limb" />
            </g>
          </g>

          {/* 10. Balancing handstand on final H's left pillar (x=1198, y=110) (Teal) */}
          <g transform="translate(1198, 110)">
            <g className="anim-wobble">
              <path d="M-4 0 L-1 -9 M4 0 L1 -9" className="stick-limb" />
              <path d="M0 -9 L0 -23 L-4 -32 M0 -23 L4 -32" className="stick-limb" />
              <circle cx="0" cy="-5" r="3.8" fill="#006d77" stroke="#001524" strokeWidth="1.2" />
            </g>
          </g>

          {/* 11. Standing tall on the baseline after final H & waving hello (Terracotta) */}
          <g transform="translate(1292, 250)">
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
