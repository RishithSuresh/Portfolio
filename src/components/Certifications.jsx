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
  const railRef = useRef(null)

  const items = useMemo(
    () =>
      category === 'All'
        ? certifications
        : certifications.filter(c => c.category === category),
    [category]
  )

  const safeIndex = items.length ? Math.min(index, items.length - 1) : 0
  const active = items[safeIndex]

  const goTo = (nextIdx, dir = 1) => {
    if (!items.length) return
    const wrapped = (nextIdx + items.length) % items.length
    setDirection(dir)
    setIndex(wrapped)
  }

  const handleCategoryChange = cat => {
    setCategory(cat)
    setDirection(1)
    setIndex(0)
  }

  // Gentle auto-advance when visible, enabled, not hovered, and lightbox closed
  useEffect(() => {
    if (!autoPlay || paused || lightboxOpen || items.length <= 1) return undefined
    const timer = setInterval(() => {
      setDirection(1)
      setIndex(prev => (prev + 1) % items.length)
    }, 5200)
    return () => clearInterval(timer)
  }, [autoPlay, paused, lightboxOpen, items.length])

  // Keyboard support inside section or lightbox
  useEffect(() => {
    if (!lightboxOpen) return undefined
    const onKey = e => {
      if (e.key === 'Escape') setLightboxOpen(false)
      if (e.key === 'ArrowRight') goTo(safeIndex + 1, 1)
      if (e.key === 'ArrowLeft') goTo(safeIndex - 1, -1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightboxOpen, safeIndex, items.length])

  // Keep active thumbnail smoothly centered inside the bottom strip
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
          Verified courses, hackathon podiums, conference presentations, and campus research
          recognitions — flip through the carousel or expand any certificate.
        </p>
      </Reveal>

      {/* Filter pills + Autoplay control */}
      <div className="cert-toolbar">
        <div className="cert-filters" role="tablist" aria-label="Filter certificates">
          {CATEGORIES.map(cat => {
            const count =
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
                {cat} <span>{count}</span>
              </button>
            )
          })}
        </div>

        <div className="cert-toolbar-meta">
          <span className="cert-counter">
            {String(safeIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
          </span>
          <button
            type="button"
            className="cert-play-btn"
            onClick={() => setAutoPlay(v => !v)}
            aria-label={autoPlay ? 'Pause carousel autoplay' : 'Resume carousel autoplay'}
          >
            {autoPlay ? <Pause size={14} /> : <Play size={14} />}
            {autoPlay ? 'Autoplay on' : 'Paused'}
          </button>
        </div>
      </div>

      {/* Carousel Main Stage */}
      <div
        className="cert-carousel-shell"
        tabIndex={0}
        onKeyDown={e => {
          if (e.key === 'ArrowRight') goTo(safeIndex + 1, 1)
          if (e.key === 'ArrowLeft') goTo(safeIndex - 1, -1)
        }}
        aria-roledescription="carousel"
        aria-label="Certificates carousel"
      >
        <SectionStickman variant="sketcher" className="stickman-cert-ledge" width={46} height={40} />

        <div className="cert-stage-grid">
          {/* Certificate Visual Frame */}
          <div className="cert-viewer">
            <button
              type="button"
              className="cert-nav-btn cert-nav-prev"
              onClick={() => goTo(safeIndex - 1, -1)}
              aria-label="Previous certificate"
            >
              <ChevronLeft size={20} />
            </button>

            <div
              className="cert-canvas-frame"
              onClick={() => setLightboxOpen(true)}
              role="button"
              tabIndex={0}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setLightboxOpen(true)
                }
              }}
              aria-label={`Inspect ${active.title} full screen`}
            >
              <AnimatePresence mode="wait" custom={direction}>
                <motion.img
                  key={active.id}
                  src={active.preview}
                  alt={`${active.title} — ${active.issuer}`}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 36, scale: 0.98 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: direction * -36, scale: 0.98 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                />
              </AnimatePresence>

              <span className="cert-zoom-chip">
                <Maximize2 size={13} /> Click to expand
              </span>
            </div>

            <button
              type="button"
              className="cert-nav-btn cert-nav-next"
              onClick={() => goTo(safeIndex + 1, 1)}
              aria-label="Next certificate"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Active Certificate Details Panel */}
          <div className="cert-details">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                className="cert-details-inner"
              >
                <div className="cert-badges">
                  <span className="cert-badge-category">
                    <Award size={12} /> {active.category}
                  </span>
                  <span className="cert-badge-date">{active.date}</span>
                </div>

                <h3>{active.title}</h3>
                <p className="cert-issuer">{active.issuer}</p>
                <p className="cert-summary">{active.detail}</p>

                {active.credential && (
                  <div className="cert-credential-box">
                    <ShieldCheck size={14} />
                    <span>{active.credential}</span>
                  </div>
                )}

                <div className="cert-actions">
                  <button
                    type="button"
                    className="button button-primary"
                    onClick={() => setLightboxOpen(true)}
                  >
                    <Maximize2 size={15} /> Inspect full size
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
        </div>

        {/* Interactive Thumbnail Strip */}
        <div className="cert-thumb-rail" ref={railRef} aria-label="Certificate thumbnails">
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
