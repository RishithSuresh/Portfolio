import { useRef, useState } from 'react'
import { Camera, Sparkles } from 'lucide-react'
import { profile } from '../data/site'
import SectionStickman from './SectionStickman'

export default function PortraitShowcase() {
  const [localSrc, setLocalSrc] = useState('')
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, gx: 50, gy: 50 })
  const inputRef = useRef(null)

  const photoSrc = profile.photo || localSrc

  const onMove = e => {
    const r = e.currentTarget.getBoundingClientRect()
    const nx = (e.clientX - r.left) / Math.max(1, r.width)
    const ny = (e.clientY - r.top) / Math.max(1, r.height)
    setTilt({
      rx: (0.5 - ny) * 10,
      ry: (nx - 0.5) * 12,
      gx: nx * 100,
      gy: ny * 100
    })
  }

  const onReset = () => setTilt({ rx: 0, ry: 0, gx: 50, gy: 50 })

  const onPickFile = e => {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setLocalSrc(url)
  }

  return (
    <div
      className="portrait-stage"
      onPointerMove={onMove}
      onPointerLeave={onReset}
    >
      {/* Orbital SVG compass rings framing the arch */}
      <svg className="portrait-orbits" viewBox="0 0 380 420" aria-hidden="true">
        <g className="anim-orbit-cw" style={{ transformOrigin: '190px 210px' }}>
          <circle cx="190" cy="210" r="170" className="portrait-ring-dashed" />
          <circle cx="360" cy="210" r="4.5" fill="#ff7d00" />
        </g>
        <g className="anim-orbit-ccw" style={{ transformOrigin: '190px 210px' }}>
          <circle cx="190" cy="210" r="144" className="portrait-ring-solid" />
          <circle cx="190" cy="66" r="3.5" fill="#83c5be" />
        </g>
        <path
          d="M 46 84 L 48.5 90.5 L 55 93 L 48.5 95.5 L 46 102 L 43.5 95.5 L 37 93 L 43.5 90.5 Z"
          fill="#ff7d00"
          className="anim-twinkle"
        />
        <path
          d="M 332 320 L 334 325 L 339 327 L 334 329 L 332 334 L 330 329 L 325 327 L 330 325 Z"
          fill="#83c5be"
          className="anim-twinkle-delay"
        />
      </svg>

      {/* Tilting Architectural Portrait Arch */}
      <div
        className="portrait-arch-card"
        style={{
          transform: `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          '--gx': `${tilt.gx}%`,
          '--gy': `${tilt.gy}%`
        }}
      >
        <SectionStickman variant="starCheer" className="stickman-portrait-crown" width={36} height={42} />

        {photoSrc ? (
          <img
            src={photoSrc}
            alt={profile.name}
            className="portrait-photo"
          />
        ) : (
          <button
            type="button"
            className="portrait-monogram-placeholder"
            onClick={() => inputRef.current?.click()}
            title="Click to preview your photo here (or add public/photo.jpg)"
          >
            <span className="portrait-monogram-glyph" aria-hidden="true">RS</span>
            <span className="portrait-monogram-sub">RISHITH SURESH</span>
            <span className="portrait-upload-hint">
              <Camera size={13} /> Preview / drop photo
            </span>
          </button>
        )}

        <div className="portrait-glass-sheen" aria-hidden="true" />
      </div>

      {/* Floating orbital identity chips */}
      <div className="portrait-chip portrait-chip-top">
        <Sparkles size={11} /> LRDE · DRDO Intern
      </div>
      <div className="portrait-chip portrait-chip-bottom">
        BMSIT&amp;M · Bengaluru
      </div>

      {!profile.photo && (
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={onPickFile}
          className="sr-only"
          aria-label="Preview profile photo"
        />
      )}
    </div>
  )
}
