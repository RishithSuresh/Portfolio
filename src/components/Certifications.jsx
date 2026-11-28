import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Maximize2,
  Pause,
  Play,
  ShieldCheck,
  X
} from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { certifications } from '../data/site'
import Reveal from './Reveal'
import SectionStickman from './SectionStickman'

const CATEGORIES = ['All', 'AI & Systems', 'Recognition', 'Research', 'Competitions', 'Coursework']

export default function Certifications() {
  const [category, setCategory] = useState('All')
  const [activeIdx, setActiveIdx] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const items = useMemo(
    () =>
      category === 'All'
        ? certifications
        : certifications.filter(c => c.category === category),
    [category]
  )

  const count = items.length
  const safeIndex = count ? Math.min(activeIdx, count - 1) : 0
  const active = items[safeIndex]

  // Imperative continuous animation state for silky 60fps circular rotation
  const stageRef = useRef(null)
  const cardRefs = useRef([])
  const phaseRef = useRef(0)
  const boostRef = useRef(0)
  const activeIdxRef = useRef(0)
  const autoPlayRef = useRef(true)
  const lightboxRef = useRef(false)
  const dragRef = useRef({ active: false, startX: 0, lastX: 0, moved: false })

  autoPlayRef.current = autoPlay
  lightboxRef.current = lightboxOpen

  const spinBy = delta => {
    if (count <= 1) return
    boostRef.current += delta
  }

  const spinTo = targetIdx => {
    if (count <= 1) return
    const current = ((phaseRef.current % count) + count) % count
    let diff = targetIdx - current
    if (diff > count / 2) diff -= count
    if (diff < -count / 2) diff += count
    boostRef.current = diff
  }

  const handleCategoryChange = cat => {
    setCategory(cat)
    phaseRef.current = 0
    boostRef.current = 0
    activeIdxRef.current = 0
    setActiveIdx(0)
  }

  // Reset phase when list length changes
  useEffect(() => {
    phaseRef.current = 0
    boostRef.current = 0
    activeIdxRef.current = 0
    setActiveIdx(0)
  }, [count])

  // Continuous 60fps circular carousel loop
  useEffect(() => {
    if (!count) return undefined
    let rafId = 0
    let lastTime = performance.now()
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const renderFrame = now => {
      const dt = Math.min(0.05, (now - lastTime) / 1000)
      lastTime = now

      if (!reducedMotion && !lightboxRef.current && !dragRef.current.active && count > 1) {
        const baseRate = autoPlayRef.current ? 0.2 : 0
        const settle = boostRef.current * Math.min(1, dt * 6.8)
        boostRef.current -= settle
        phaseRef.current += settle + baseRate * dt
      } else if (!reducedMotion && count === 1) {
        phaseRef.current += dt * 0.4
      }

      const stageW = stageRef.current?.clientWidth || 1200
      const radiusX =
        count <= 1
          ? 0
          : count === 2
            ? Math.min(220, stageW * 0.25)
            : count <= 5
              ? Math.min(410, stageW * 0.36)
              : Math.min(610, stageW * 0.43)

      const phase = phaseRef.current

      if (count > 1) {
        const nearest = ((Math.round(phase) % count) + count) % count
        if (nearest !== activeIdxRef.current) {
          activeIdxRef.current = nearest
          setActiveIdx(nearest)
        }
      }

      for (let i = 0; i < count; i++) {
        const el = cardRefs.current[i]
        if (!el) continue

        if (count === 1) {
          const floatY = Math.sin(phase * 2) * 5
          el.style.transform = `translate3d(0px, ${floatY}px, 0px) scale(1)`
          el.style.opacity = '1'
          el.style.zIndex = '20'
          el.style.filter = 'brightness(1)'
          el.dataset.front = 'true'
          continue
        }

        const angle = ((i - phase) / count) * Math.PI * 2
        const cosA = Math.cos(angle)
        const sinA = Math.sin(angle)
        const depth = (cosA + 1) * 0.5 // 1 at front, 0 at back

        const x = sinA * radiusX
        const y = (1 - cosA) * -32 + 12
        const scale = 0.54 + 0.46 * Math.pow(depth, 1.15)
        const rotY = sinA * -22
        const rotZ = sinA * -4.2
        const opacity = count <= 3 ? 0.42 + 0.58 * depth : Math.max(0.14, Math.pow(depth, 1.35))
        const bright = 0.62 + 0.38 * depth

        el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0px) perspective(1100px) rotateY(${rotY.toFixed(2)}deg) rotateZ(${rotZ.toFixed(2)}deg) scale(${scale.toFixed(3)})`
        el.style.opacity = opacity.toFixed(3)
        el.style.zIndex = String(Math.round(depth * 100))
        el.style.filter = `brightness(${bright.toFixed(3)})`
        el.style.pointerEvents = cosA > -0.2 ? 'auto' : 'none'
        el.dataset.front = cosA > 0.88 ? 'true' : 'false'
      }

      rafId = requestAnimationFrame(renderFrame)
    }

    rafId = requestAnimationFrame(renderFrame)
    return () => cancelAnimationFrame(rafId)
  }, [count])

  // Lightbox keyboard handling
  useEffect(() => {
    if (!lightboxOpen) return undefined
    const onKey = e => {
      if (e.key === 'Escape') setLightboxOpen(false)
      if (e.key === 'ArrowRight') spinBy(1)
      if (e.key === 'ArrowLeft') spinBy(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightboxOpen, count])

  const onPointerDown = e => {
    if (count <= 1) return
    dragRef.current = { active: true, startX: e.clientX, lastX: e.clientX, moved: false }
  }

  const onPointerMove = e => {
    if (!dragRef.current.active) return
    const dx = e.clientX - dragRef.current.lastX
    dragRef.current.lastX = e.clientX
    if (Math.abs(e.clientX - dragRef.current.startX) > 6) {
      dragRef.current.moved = true
    }
    phaseRef.current -= dx / 220
  }

  const onPointerUp = () => {
    dragRef.current.active = false
  }

  if (!active) return null

  return (
    <section
      className="cert-dark-section section-relative"
      id="certifications"
      onMouseLeave={() => {
        dragRef.current.active = false
      }}
    >
      {/* Subtle floating coastal cosmos glow & orbital rings */}
      <svg className="cert-orbital-backdrop" viewBox="0 0 1440 620" preserveAspectRatio="none" aria-hidden="true">
        <ellipse cx="720" cy="300" rx="600" ry="175" className="cert-silk-orbit" />
        <ellipse cx="720" cy="300" rx="440" ry="122" className="cert-silk-orbit-warm" />
        <path d="M-40 365 Q360 190 720 300 T1480 245" className="cert-silk-arc cert-silk-teal" />
      </svg>

      <div className="cert-inner-shell">
        <Reveal className="section-heading cert-heading">
          <div>
            <span className="eyebrow">05 / Certifications</span>
            <h2>
              Honors &amp;
              <br />
              <em>credentials.</em>
            </h2>
          </div>

          <div className="cert-filters" role="tablist" aria-label="Filter certificates">
            {CATEGORIES.map(cat => {
              const catCount =
                cat === 'All'
                  ? certifications.length
                  : certifications.filter(c => c.category === cat).length
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={category === cat}
                  className={`cert-filter-pill ${category === cat ? 'is-active' : ''}`}
                  onClick={() => handleCategoryChange(cat)}
                >
                  {cat} <span>{catCount}</span>
                </button>
              )
            })}
          </div>
        </Reveal>
      </div>

      {/* Continuous Rotating Circular Stage */}
      <div
        className="cert-freedom-bleed"
        tabIndex={0}
        onKeyDown={e => {
          if (e.key === 'ArrowRight') spinBy(1)
          if (e.key === 'ArrowLeft') spinBy(-1)
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        aria-roledescription="carousel"
        aria-label="Continuously rotating certificates carousel"
      >
        <div className="cert-arc-stage" ref={stageRef}>
          <SectionStickman
            variant="surfer"
            className="stickman-cert-orbit stickman-on-dark"
            width={44}
            height={42}
          />

          {items.map((cert, i) => {
            const isActive = i === safeIndex
            return (
              <div
                key={cert.id}
                ref={el => {
                  cardRefs.current[i] = el
                }}
                className={`cert-float-card ${isActive ? 'is-active' : ''}`}
                onClick={() => {
                  if (dragRef.current.moved) return
                  if (isActive) setLightboxOpen(true)
                  else spinTo(i)
                }}
                role="button"
                tabIndex={isActive ? 0 : -1}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    if (isActive) setLightboxOpen(true)
                    else spinTo(i)
                  }
                }}
                aria-label={isActive ? `Inspect ${cert.title}` : `Rotate to ${cert.title}`}
              >
                <div className="cert-float-media">
                  <img src={cert.preview} alt={`${cert.title} — ${cert.issuer}`} draggable="false" />
                  <span className="cert-inspect-pill">
                    <Maximize2 size={12} /> Inspect
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Minimal Floating Editorial Meta Below Active Card */}
        <div className="cert-minimal-caption">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -6, filter: 'blur(4px)' }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="cert-caption-inner"
            >
              <div className="cert-caption-kicker">
                <span className="cert-serif-num">{String(safeIndex + 1).padStart(2, '0')}</span>
                <span className="cert-dot-sep">·</span>
                <span>{active.category}</span>
                <span className="cert-dot-sep">·</span>
                <span>{active.date}</span>
                {active.credential && (
                  <>
                    <span className="cert-dot-sep">·</span>
                    <span className="cert-cred-inline">
                      <ShieldCheck size={12} /> {active.credential}
                    </span>
                  </>
                )}
              </div>

              <h3>{active.title}</h3>
              <p className="cert-caption-issuer">{active.issuer}</p>

              <div className="cert-caption-links">
                <button
                  type="button"
                  className="cert-link-pill cert-link-primary"
                  onClick={() => setLightboxOpen(true)}
                >
                  <Maximize2 size={13} /> Full view
                </button>
                <a className="cert-link-pill" href={active.file} target="_blank" rel="noreferrer">
                  Original file <ExternalLink size={13} />
                </a>
                {active.verifyUrl && (
                  <a
                    className="cert-link-pill"
                    href={active.verifyUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Verify <ExternalLink size={13} />
                  </a>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Glass Scrubber Controls */}
        <div className="cert-scrubber-bar">
          <button
            type="button"
            className="cert-circle-ctrl"
            onClick={() => spinBy(-1)}
            aria-label="Previous certificate"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="cert-dots" role="tablist" aria-label="Choose certificate">
            {items.map((cert, i) => (
              <button
                key={cert.id}
                type="button"
                title={cert.title}
                aria-label={`Jump to ${cert.title}`}
                aria-selected={i === safeIndex}
                className={`cert-dot ${i === safeIndex ? 'is-active' : ''}`}
                onClick={() => spinTo(i)}
              />
            ))}
          </div>

          <button
            type="button"
            className="cert-circle-ctrl"
            onClick={() => spinBy(1)}
            aria-label="Next certificate"
          >
            <ChevronRight size={18} />
          </button>

          <button
            type="button"
            className="cert-circle-ctrl cert-play-ctrl"
            onClick={() => setAutoPlay(v => !v)}
            aria-label={autoPlay ? 'Pause rotation' : 'Resume rotation'}
            title={autoPlay ? 'Pause rotation' : 'Resume rotation'}
          >
            {autoPlay ? <Pause size={14} /> : <Play size={14} />}
          </button>
        </div>
      </div>

      {/* Fullscreen Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            className="cert-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxOpen(false)}
          >
            <motion.div
              className="cert-lightbox-card"
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.22 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="cert-lightbox-top">
                <div>
                  <span className="eyebrow">
                    {active.category} · {active.date}
                  </span>
                  <h4>{active.title}</h4>
                </div>
                <div className="cert-lightbox-controls">
                  <button
                    type="button"
                    className="cert-lightbox-icon"
                    onClick={() => spinBy(-1)}
                    aria-label="Previous certificate"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    className="cert-lightbox-icon"
                    onClick={() => spinBy(1)}
                    aria-label="Next certificate"
                  >
                    <ChevronRight size={18} />
                  </button>
                  <a
                    className="cert-lightbox-icon"
                    href={active.file}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Open original certificate file"
                  >
                    <ExternalLink size={16} />
                  </a>
                  <button
                    type="button"
                    className="cert-lightbox-icon"
                    onClick={() => setLightboxOpen(false)}
                    aria-label="Close modal"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              <div className="cert-lightbox-media">
                <img src={active.preview} alt={active.title} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
