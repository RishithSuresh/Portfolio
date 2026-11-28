import { useEffect, useMemo, useRef, useState } from 'react'
import {
  Award,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Maximize2,
  Pause,
  Play,
  ShieldCheck,
  Sparkles,
  X
} from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { certifications } from '../data/site'
import Reveal from './Reveal'
import SectionStickman from './SectionStickman'

const CATEGORIES = ['All', 'AI & Systems', 'Recognition', 'Research', 'Competitions', 'Coursework']

export default function Certifications() {
  const [category, setCategory] = useState('All')
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [autoPlay, setAutoPlay] = useState(true)
  const [paused, setPaused] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, glowX: 50, glowY: 50 })
  const railRef = useRef(null)

  const items = useMemo(
    () =>
      category === 'All'
        ? certifications
        : certifications.filter(c => c.category === category),
    [category]
  )

  const count = items.length
  const safeIndex = count ? Math.min(index, count - 1) : 0
  const active = items[safeIndex]
  const prevIdx = count > 1 ? (safeIndex - 1 + count) % count : null
  const nextIdx = count > 1 ? (safeIndex + 1) % count : null
  const prevItem = prevIdx !== null ? items[prevIdx] : null
  const nextItem = nextIdx !== null && nextIdx !== prevIdx ? items[nextIdx] : null

  const goTo = (nextIndex, dir = 1) => {
    if (!count) return
    const wrapped = (nextIndex + count) % count
    setDirection(dir)
    setIndex(wrapped)
  }

  const handleCategoryChange = cat => {
    setCategory(cat)
    setDirection(1)
    setIndex(0)
  }

  const handleStageMove = e => {
    const rect = e.currentTarget.getBoundingClientRect()
    const nx = (e.clientX - rect.left) / Math.max(1, rect.width)
    const ny = (e.clientY - rect.top) / Math.max(1, rect.height)
    setTilt({
      rx: (0.5 - ny) * 8,
      ry: (nx - 0.5) * 10,
      glowX: nx * 100,
      glowY: ny * 100
    })
  }

  const resetTilt = () => setTilt({ rx: 0, ry: 0, glowX: 50, glowY: 50 })

  // Gentle auto-advance when visible, enabled, not hovered, and lightbox closed
  useEffect(() => {
    if (!autoPlay || paused || lightboxOpen || count <= 1) return undefined
    const timer = setInterval(() => {
      setDirection(1)
      setIndex(prev => (prev + 1) % count)
    }, 5200)
    return () => clearInterval(timer)
  }, [autoPlay, paused, lightboxOpen, count])

  // Keyboard support inside lightbox
  useEffect(() => {
    if (!lightboxOpen) return undefined
    const onKey = e => {
      if (e.key === 'Escape') setLightboxOpen(false)
      if (e.key === 'ArrowRight') goTo(safeIndex + 1, 1)
      if (e.key === 'ArrowLeft') goTo(safeIndex - 1, -1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightboxOpen, safeIndex, count])

  // Keep active contact-sheet thumbnail centered
  useEffect(() => {
    const rail = railRef.current
    if (!rail) return
    const activeBtn = rail.children[safeIndex]
    if (activeBtn) {
      activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    }
  }, [safeIndex, category])

  if (!active) return null

  return (
    <section
      className="section section-relative"
      id="certifications"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Reveal className="section-heading">
        <div>
          <span className="eyebrow">05 / Certifications</span>
          <h2>
            Honors &amp;
            <br />
            <em>credentials.</em>
          </h2>
        </div>
        <p>
          Interactive archive of verified courses, research presentations, hackathon podiums, and
          campus recognitions — browse the fanned deck or click any certificate to inspect.
        </p>
      </Reveal>

      {/* Filter pills + Autoplay control */}
      <div className="cert-toolbar">
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

        <div className="cert-toolbar-meta">
          <span className="cert-counter">
            {String(safeIndex + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
          </span>
          <button
            type="button"
            className="cert-play-btn"
            onClick={() => setAutoPlay(v => !v)}
            aria-label={autoPlay ? 'Pause carousel autoplay' : 'Resume carousel autoplay'}
          >
            {autoPlay ? <Pause size={14} /> : <Play size={14} />}
            {autoPlay ? 'Autoplay' : 'Paused'}
          </button>
        </div>
      </div>

      {/* Atelier Fanned Carousel Showcase */}
      <div
        className="cert-atelier"
        tabIndex={0}
        onKeyDown={e => {
          if (e.key === 'ArrowRight') goTo(safeIndex + 1, 1)
          if (e.key === 'ArrowLeft') goTo(safeIndex - 1, -1)
        }}
        aria-roledescription="carousel"
        aria-label="Certificates carousel"
      >
        <SectionStickman variant="sketcher" className="stickman-cert-ledge" width={46} height={40} />

        {/* Subtle geometric compass halo matching Hero drafting aesthetic */}
        <svg className="cert-bg-compass" viewBox="0 0 600 420" aria-hidden="true">
          <circle cx="300" cy="210" r="172" className="cert-compass-ring" />
          <circle cx="300" cy="210" r="126" className="cert-compass-dashed" />
          <line x1="40" y1="210" x2="560" y2="210" className="cert-compass-axis" />
          <line x1="300" y1="20" x2="300" y2="400" className="cert-compass-axis" />
        </svg>

        {/* Top 3D Fanned Card Deck Stage */}
        <div className="cert-deck-stage">
          {prevItem && (
            <button
              type="button"
              className="cert-peek-card cert-peek-left"
              onClick={() => goTo(prevIdx, -1)}
              aria-label={`Previous: ${prevItem.title}`}
            >
              <img src={prevItem.preview} alt="" />
              <span>{prevItem.issuer}</span>
            </button>
          )}

          <button
            type="button"
            className="cert-nav-btn cert-nav-prev"
            onClick={() => goTo(safeIndex - 1, -1)}
            aria-label="Previous certificate"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Active Spotlight Framed Certificate with 3D Tilt + Sheen */}
          <div
            className="cert-spotlight-wrap"
            onPointerMove={handleStageMove}
            onPointerLeave={resetTilt}
          >
            <div
              className="cert-spotlight-card"
              onClick={() => setLightboxOpen(true)}
              role="button"
              tabIndex={0}
              style={{
                transform: `perspective(1100px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
                '--glow-x': `${tilt.glowX}%`,
                '--glow-y': `${tilt.glowY}%`
              }}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setLightboxOpen(true)
                }
              }}
              aria-label={`Inspect ${active.title} full screen`}
            >
              <div className="cert-foil-corner" aria-hidden="true">
                <Sparkles size={11} />
                <span>#{String(safeIndex + 1).padStart(2, '0')}</span>
              </div>

              <AnimatePresence mode="wait" custom={direction}>
                <motion.img
                  key={active.id}
                  src={active.preview}
                  alt={`${active.title} — ${active.issuer}`}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 42, scale: 0.96 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: direction * -42, scale: 0.96 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
              </AnimatePresence>

              <div className="cert-sheen-layer" aria-hidden="true" />
              <span className="cert-zoom-chip">
                <Maximize2 size={13} /> Inspect full plate
              </span>
            </div>
          </div>

          <button
            type="button"
            className="cert-nav-btn cert-nav-next"
            onClick={() => goTo(safeIndex + 1, 1)}
            aria-label="Next certificate"
          >
            <ChevronRight size={20} />
          </button>

          {nextItem && (
            <button
              type="button"
              className="cert-peek-card cert-peek-right"
              onClick={() => goTo(nextIdx, 1)}
              aria-label={`Next: ${nextItem.title}`}
            >
              <img src={nextItem.preview} alt="" />
              <span>{nextItem.issuer}</span>
            </button>
          )}
        </div>

        {/* Autoplay Hairline Progress Bar */}
        <div className="cert-progress-track" aria-hidden="true">
          {autoPlay && !paused && !lightboxOpen && count > 1 && (
            <motion.div
              key={`${category}-${safeIndex}`}
              className="cert-progress-fill"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 5.2, ease: 'linear' }}
            />
          )}
        </div>

        {/* Editorial Gallery Plaque Below Stage */}
        <div className="cert-plaque">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="cert-plaque-grid"
            >
              <div className="cert-plaque-index" aria-hidden="true">
                {String(safeIndex + 1).padStart(2, '0')}
              </div>

              <div className="cert-plaque-main">
                <div className="cert-badges">
                  <span className="cert-badge-category">
                    <Award size={12} /> {active.category}
                  </span>
                  <span className="cert-badge-date">{active.date}</span>
                  {active.credential && (
                    <span className="cert-badge-cred">
                      <ShieldCheck size={12} /> {active.credential}
                    </span>
                  )}
                </div>

                <h3>{active.title}</h3>
                <p className="cert-issuer">{active.issuer}</p>
                <p className="cert-summary">{active.detail}</p>
              </div>

              <div className="cert-plaque-actions">
                <button
                  type="button"
                  className="button button-primary"
                  onClick={() => setLightboxOpen(true)}
                >
                  <Maximize2 size={15} /> Inspect
                </button>
                <a
                  className="button button-quiet"
                  href={active.file}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open file <ExternalLink size={14} />
                </a>
                {active.verifyUrl && (
                  <a
                    className="button button-quiet"
                    href={active.verifyUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Verify <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Contact Sheet Filmstrip Dock */}
        <div className="cert-thumb-rail" ref={railRef} aria-label="Certificate contact sheet">
          {items.map((cert, i) => {
            const isCurrent = i === safeIndex
            return (
              <button
                key={cert.id}
                type="button"
                className={`cert-thumb ${isCurrent ? 'is-active' : ''}`}
                onClick={() => goTo(i, i >= safeIndex ? 1 : -1)}
                aria-label={`View ${cert.title}`}
                aria-current={isCurrent ? 'true' : undefined}
              >
                <span className="cert-thumb-num">{String(i + 1).padStart(2, '0')}</span>
                <img src={cert.preview} alt="" loading="lazy" />
                <div>
                  <span>{cert.issuer}</span>
                  <strong>{cert.title}</strong>
                </div>
              </button>
            )
          })}
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
                    onClick={() => goTo(safeIndex - 1, -1)}
                    aria-label="Previous certificate"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    className="cert-lightbox-icon"
                    onClick={() => goTo(safeIndex + 1, 1)}
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
