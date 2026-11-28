import { useEffect, useMemo, useState } from 'react'
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

const SPRING_GLIDE = {
  type: 'spring',
  stiffness: 170,
  damping: 24,
  mass: 0.9
}

function getCircularOffset(i, active, total) {
  if (total <= 3) return i - active
  let diff = i - active
  if (diff > total / 2) diff -= total
  if (diff < -total / 2) diff += total
  return diff
}

export default function Certifications() {
  const [category, setCategory] = useState('All')
  const [index, setIndex] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)
  const [paused, setPaused] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)

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

  const goTo = nextIndex => {
    if (!count) return
    setIndex((nextIndex + count) % count)
  }

  const handleCategoryChange = cat => {
    setCategory(cat)
    setIndex(0)
  }

  // Gentle auto-advance when active and not hovered/inspecting
  useEffect(() => {
    if (!autoPlay || paused || lightboxOpen || count <= 1) return undefined
    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % count)
    }, 5200)
    return () => clearInterval(timer)
  }, [autoPlay, paused, lightboxOpen, count])

  // Keyboard navigation in lightbox
  useEffect(() => {
    if (!lightboxOpen) return undefined
    const onKey = e => {
      if (e.key === 'Escape') setLightboxOpen(false)
      if (e.key === 'ArrowRight') goTo(safeIndex + 1)
      if (e.key === 'ArrowLeft') goTo(safeIndex - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightboxOpen, safeIndex, count])

  if (!active) return null

  return (
    <section
      className="section section-relative"
      id="certifications"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
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

      {/* Unconstrained Full-Bleed Flowing Arc Showcase */}
      <div
        className="cert-freedom-bleed"
        tabIndex={0}
        onKeyDown={e => {
          if (e.key === 'ArrowRight') goTo(safeIndex + 1)
          if (e.key === 'ArrowLeft') goTo(safeIndex - 1)
        }}
        aria-roledescription="carousel"
        aria-label="Certificates carousel"
      >
        {/* Airy coastal ambient glow & orbital wave strings matching portfolio theme */}
        <svg className="cert-orbital-backdrop" viewBox="0 0 1440 520" preserveAspectRatio="none" aria-hidden="true">
          <path d="M-40 310 Q360 150 720 260 T1480 210" className="cert-silk-arc cert-silk-teal" />
          <path d="M-40 360 Q420 440 760 285 T1480 340" className="cert-silk-arc cert-silk-warm" />
          <ellipse cx="720" cy="255" rx="540" ry="180" className="cert-silk-orbit" />
        </svg>

        {/* Continuous Spring Deck Track */}
        <div className="cert-arc-stage">
          {items.map((cert, i) => {
            const offset = getCircularOffset(i, safeIndex, count)
            const abs = Math.abs(offset)
            const isVisible = abs <= 2
            const isActive = offset === 0

            // Smooth orbital fan positions across full width
            const xOffset = offset * 335
            const yOffset = abs * abs * 16
            const scale = isActive ? 1 : abs === 1 ? 0.8 : 0.64
            const rotate = offset * 5.2
            const opacity = isActive ? 1 : abs === 1 ? 0.72 : abs === 2 ? 0.34 : 0
            const zIndex = 20 - abs * 4

            return (
              <motion.div
                key={cert.id}
                className={`cert-float-card ${isActive ? 'is-active' : ''}`}
                initial={false}
                animate={{
                  x: xOffset,
                  y: yOffset,
                  scale,
                  rotate,
                  opacity,
                  zIndex
                }}
                transition={SPRING_GLIDE}
                style={{
                  pointerEvents: isVisible ? 'auto' : 'none',
                  transformOrigin: 'center bottom'
                }}
                drag={isActive && count > 1 ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.22}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -55) goTo(safeIndex + 1)
                  else if (info.offset.x > 55) goTo(safeIndex - 1)
                }}
                whileHover={
                  isActive
                    ? { y: -6, scale: 1.02, transition: { duration: 0.25 } }
                    : { y: yOffset - 10, opacity: Math.min(0.95, opacity + 0.18) }
                }
                onClick={() => {
                  if (isActive) setLightboxOpen(true)
                  else goTo(i)
                }}
              >
                {isActive && (
                  <SectionStickman
                    variant="starCheer"
                    className="stickman-cert-float"
                    width={38}
                    height={44}
                  />
                )}

                <div className="cert-float-media">
                  <img src={cert.preview} alt={`${cert.title} — ${cert.issuer}`} draggable="false" />
                  {isActive && (
                    <span className="cert-inspect-pill">
                      <Maximize2 size={12} /> Inspect
                    </span>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Minimal Floating Editorial Meta Below Active Card */}
        <div className="cert-minimal-caption">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
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

        {/* Airy Constellation Scrubber Controls */}
        <div className="cert-scrubber-bar">
          <button
            type="button"
            className="cert-circle-ctrl"
            onClick={() => goTo(safeIndex - 1)}
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
                onClick={() => goTo(i)}
              />
            ))}
          </div>

          <button
            type="button"
            className="cert-circle-ctrl"
            onClick={() => goTo(safeIndex + 1)}
            aria-label="Next certificate"
          >
            <ChevronRight size={18} />
          </button>

          <button
            type="button"
            className="cert-circle-ctrl cert-play-ctrl"
            onClick={() => setAutoPlay(v => !v)}
            aria-label={autoPlay ? 'Pause autoplay' : 'Play autoplay'}
            title={autoPlay ? 'Pause autoplay' : 'Resume autoplay'}
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
                    onClick={() => goTo(safeIndex - 1)}
                    aria-label="Previous certificate"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    className="cert-lightbox-icon"
                    onClick={() => goTo(safeIndex + 1)}
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
