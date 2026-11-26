import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { useTheme } from './ThemeProvider'
import Reveal from './Reveal'

function HarmonicWaveCanvas() {
  const canvasRef = useRef(null)
  const pointerRef = useRef({ x: 0.5, active: false })
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let rafId = 0
    let phase = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      canvas.width = Math.max(1, Math.floor(rect.width * dpr))
      canvas.height = Math.max(1, Math.floor(rect.height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    window.addEventListener('resize', resize)

    const render = () => {
      const rect = canvas.getBoundingClientRect()
      const w = rect.width
      const h = rect.height
      ctx.clearRect(0, 0, w, h)

      const primary = theme === 'dark' ? '#ff7d00' : '#006d77'
      const secondary = theme === 'dark' ? '#ffecd1' : '#e29578'
      const tertiary = theme === 'dark' ? '#15616d' : '#83c5be'

      const focusX = pointerRef.current.active ? pointerRef.current.x : 0.5
      const cy = h * 0.5

      const drawWave = (color, amp, freq, speed, width, offset) => {
        ctx.beginPath()
        ctx.strokeStyle = color
        ctx.lineWidth = width
        for (let x = 0; x <= w; x += 4) {
          const nx = x / w
          const envelope = Math.sin(nx * Math.PI)
          const boost = 1 + Math.exp(-Math.pow((nx - focusX) * 4.5, 2)) * 0.65
          const y =
            cy +
            Math.sin(nx * freq + phase * speed + offset) *
              amp *
              envelope *
              boost
          if (x === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()
      }

      drawWave(tertiary, h * 0.24, 9, 0.9, 1.5, 0)
      drawWave(secondary, h * 0.18, 13, -1.1, 1.8, 1.4)
      drawWave(primary, h * 0.22, 7, 1.35, 2.6, 2.8)

      phase += 0.028
      rafId = requestAnimationFrame(render)
    }

    rafId = requestAnimationFrame(render)
    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
    }
  }, [theme])

  return (
    <div
      className="research-canvas-wrap"
      onPointerMove={e => {
        const rect = e.currentTarget.getBoundingClientRect()
        pointerRef.current = {
          x: (e.clientX - rect.left) / rect.width,
          active: true
        }
      }}
      onPointerLeave={() => {
        pointerRef.current.active = false
      }}
    >
      <canvas ref={canvasRef} className="research-canvas" aria-hidden="true" />
    </div>
  )
}

export default function Research() {
  return (
    <section className="section" id="research">
      <Reveal className="section-heading">
        <div>
          <span className="eyebrow">03 / Research</span>
          <h2>
            Questions worth
            <br />
            <em>investigating.</em>
          </h2>
        </div>
        <p>
          Deep-dive technical explorations — methodology, cross-dataset evaluation, and reproducible
          results.
        </p>
      </Reveal>

      <Reveal className="research-panel">
        <div className="research-copy">
          <span className="eyebrow">Current Focus</span>
          <h3>
            Multimodal
            <br />
            deepfake detection
          </h3>
          <p>
            Exploring how audio and visual evidence converge to identify synthetic and manipulated
            media across FaceForensics++, DF40, Celeb-DF, and SDFDC, focusing on cross-dataset
            generalization.
          </p>
          <Link className="text-link" to="/projects/multimodal-deepfake-detection">
            Explore the case study <ArrowUpRight size={16} />
          </Link>
        </div>

        <HarmonicWaveCanvas />
      </Reveal>
    </section>
  )
}
