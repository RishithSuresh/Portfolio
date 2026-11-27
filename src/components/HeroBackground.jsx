import { useEffect, useRef } from 'react'

/**
 * Rich multi-shade kinetic Hero background blending atmospheric color blooms,
 * layered translucent silk wave ribbons, orbiting astrolabe arcs with satellites,
 * drifting geometric motes, and interactive cursor constellation & ripple rings.
 */
export default function HeroBackground() {
  const canvasRef = useRef(null)
  const pointerRef = useRef({ x: 0.5, y: 0.5, active: false })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let rafId = 0
    let width = 0
    let height = 0
    let time = 0
    let lastRippleAt = 0

    const shades = [
      '#006d77',
      '#83c5be',
      '#15616d',
      '#e29578',
      '#ff7d00',
      '#78290f',
      '#ffddd2'
    ]

    const motes = Array.from({ length: 48 }, (_, i) => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00038,
      vy: -0.00018 - Math.random() * 0.00024,
      r: 1.5 + (i % 5) * 0.75,
      color: shades[i % shades.length],
      kind: i % 4 === 0 ? 'star' : i % 4 === 1 ? 'ring' : i % 4 === 2 ? 'plus' : 'dot',
      phase: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.9
    }))

    const ripples = []

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = parent.clientWidth
      height = parent.clientHeight
      canvas.width = Math.max(1, Math.floor(width * dpr))
      canvas.height = Math.max(1, Math.floor(height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    window.addEventListener('resize', resize)

    const onPointerMove = e => {
      const rect = canvas.getBoundingClientRect()
      const nx = (e.clientX - rect.left) / Math.max(1, rect.width)
      const ny = (e.clientY - rect.top) / Math.max(1, rect.height)
      pointerRef.current = { x: nx, y: ny, active: true }

      const now = performance.now()
      if (!reducedMotion && now - lastRippleAt > 240 && ripples.length < 7) {
        lastRippleAt = now
        ripples.push({
          x: nx * width,
          y: ny * height,
          r: 6,
          alpha: 0.36,
          color: ripples.length % 2 === 0 ? '131, 197, 190' : '226, 149, 120'
        })
      }
    }

    const onPointerLeave = () => {
      pointerRef.current.active = false
    }

    const parentEl = canvas.parentElement
    parentEl?.addEventListener('pointermove', onPointerMove, { passive: true })
    parentEl?.addEventListener('pointerleave', onPointerLeave)

    const drawStar4 = (x, y, size, color, alpha, rotation = 0) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)
      ctx.globalAlpha = alpha
      ctx.fillStyle = color
      ctx.beginPath()
      const inner = size * 0.28
      ctx.moveTo(0, -size)
      ctx.lineTo(inner, -inner)
      ctx.lineTo(size, 0)
      ctx.lineTo(inner, inner)
      ctx.lineTo(0, size)
      ctx.lineTo(-inner, inner)
      ctx.lineTo(-size, 0)
      ctx.lineTo(-inner, -inner)
      ctx.closePath()
      ctx.fill()
      ctx.restore()
    }

    const drawBloom = (cx, cy, radius, rgba) => {
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius)
      grad.addColorStop(0, rgba)
      grad.addColorStop(1, 'rgba(237, 246, 249, 0)')
      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.arc(cx, cy, radius, 0, Math.PI * 2)
      ctx.fill()
    }

    const drawWaveBand = (yRatio, amp, freq, speed, strokeRgba, fillRgba, phaseOffset) => {
      ctx.save()
      ctx.beginPath()
      const yBase = height * yRatio
      for (let x = 0; x <= width; x += 10) {
        const nx = x / Math.max(1, width)
        const wave =
          Math.sin(nx * freq + time * speed + phaseOffset) * amp +
          Math.cos(nx * (freq * 0.6) - time * speed * 0.75 + phaseOffset) * (amp * 0.42)
        const y = yBase + wave
        if (x === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.strokeStyle = strokeRgba
      ctx.lineWidth = 1.3
      ctx.stroke()

      if (fillRgba) {
        ctx.lineTo(width, height)
        ctx.lineTo(0, height)
        ctx.closePath()
        const grad = ctx.createLinearGradient(0, yBase - amp, 0, height)
        grad.addColorStop(0, fillRgba)
        grad.addColorStop(1, 'rgba(237, 246, 249, 0)')
        ctx.fillStyle = grad
        ctx.fill()
      }
      ctx.restore()
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      // 1. Drifting multi-shade atmospheric blooms
      const blooms = [
        {
          x: width * (0.22 + Math.sin(time * 0.25) * 0.08),
          y: height * (0.3 + Math.cos(time * 0.2) * 0.08),
          r: Math.max(width, height) * 0.34,
          rgba: 'rgba(131, 197, 190, 0.28)' // Seafoam
        },
        {
          x: width * (0.78 + Math.cos(time * 0.22) * 0.09),
          y: height * (0.34 + Math.sin(time * 0.26) * 0.09),
          r: Math.max(width, height) * 0.32,
          rgba: 'rgba(255, 221, 210, 0.44)' // Peach
        },
        {
          x: width * (0.5 + Math.sin(time * 0.18 + 1.2) * 0.12),
          y: height * (0.68 + Math.cos(time * 0.21) * 0.07),
          r: Math.max(width, height) * 0.3,
          rgba: 'rgba(255, 125, 0, 0.09)' // Soft Tangerine glow
        },
        {
          x: width * (0.64 + Math.cos(time * 0.17) * 0.1),
          y: height * (0.22 + Math.sin(time * 0.23) * 0.06),
          r: Math.max(width, height) * 0.24,
          rgba: 'rgba(0, 109, 119, 0.12)' // Deep Lagoon tint
        }
      ]
      blooms.forEach(b => drawBloom(b.x, b.y, b.r, b.rgba))

      // 2. Layered multi-shade drifting wave ribbons
      drawWaveBand(0.24, 24, 5.2, 0.55, 'rgba(0, 109, 119, 0.2)', 'rgba(131, 197, 190, 0.08)', 0)
      drawWaveBand(0.38, 28, 4.4, -0.42, 'rgba(131, 197, 190, 0.36)', 'rgba(255, 221, 210, 0.09)', 1.1)
      drawWaveBand(0.56, 26, 6.0, 0.48, 'rgba(226, 149, 120, 0.3)', 'rgba(255, 236, 209, 0.12)', 2.4)
      drawWaveBand(0.7, 20, 4.8, -0.36, 'rgba(255, 125, 0, 0.2)', null, 3.6)
      drawWaveBand(0.84, 16, 6.8, 0.32, 'rgba(120, 41, 15, 0.14)', null, 4.5)

      // 3. Orbiting multi-shade astrolabe rings + satellite dots
      const cx = width * 0.5
      const cy = height * 0.48
      const baseR = Math.min(width, height) * 0.43

      const orbits = [
        { r: baseR * 0.64, start: time * 0.16, span: Math.PI * 1.1, color: 'rgba(0, 109, 119, 0.24)', dash: [], sat: '#ff7d00' },
        { r: baseR * 0.84, start: -time * 0.12 + 0.9, span: Math.PI * 0.95, color: 'rgba(226, 149, 120, 0.34)', dash: [4, 7], sat: '#006d77' },
        { r: baseR * 1.05, start: time * 0.09 + 2.2, span: Math.PI * 1.25, color: 'rgba(131, 197, 190, 0.34)', dash: [2, 8], sat: '#e29578' },
        { r: baseR * 1.26, start: -time * 0.06 + 3.5, span: Math.PI * 0.85, color: 'rgba(120, 41, 15, 0.18)', dash: [8, 6], sat: '#83c5be' }
      ]

      orbits.forEach(o => {
        ctx.save()
        ctx.strokeStyle = o.color
        ctx.lineWidth = 1.1
        ctx.setLineDash(o.dash)
        ctx.beginPath()
        ctx.arc(cx, cy, o.r, o.start, o.start + o.span)
        ctx.stroke()

        // Satellite marker riding the tip of each arc
        const sx = cx + Math.cos(o.start) * o.r
        const sy = cy + Math.sin(o.start) * o.r
        ctx.setLineDash([])
        ctx.fillStyle = o.sat
        ctx.globalAlpha = 0.72
        ctx.beginPath()
        ctx.arc(sx, sy, 3.2, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })

      // 4. Floating shaded motes + pointer-reactive constellation threads
      const px = pointerRef.current.x * width
      const py = pointerRef.current.y * height

      const coords = motes.map(m => {
        if (!reducedMotion) {
          m.x += m.vx + Math.sin(time * 0.8 + m.phase) * 0.00012
          m.y += m.vy
          if (m.x < 0.01) m.x = 0.99
          if (m.x > 0.99) m.x = 0.01
          if (m.y < -0.02) m.y = 1.02
        }
        let x = m.x * width
        let y = m.y * height

        if (pointerRef.current.active) {
          const dx = x - px
          const dy = y - py
          const dist = Math.hypot(dx, dy)
          if (dist < 185 && dist > 1) {
            const push = (1 - dist / 185) * 16
            x += (dx / dist) * push
            y += (dy / dist) * push
          }
        }
        return { x, y, m }
      })

      // Constellation threads
      for (let i = 0; i < coords.length; i++) {
        for (let j = i + 1; j < coords.length; j++) {
          const dx = coords[i].x - coords[j].x
          const dy = coords[i].y - coords[j].y
          const dist = Math.hypot(dx, dy)
          if (dist < 135) {
            ctx.save()
            ctx.strokeStyle = i % 2 === 0
              ? `rgba(0, 109, 119, ${(1 - dist / 135) * 0.18})`
              : `rgba(226, 149, 120, ${(1 - dist / 135) * 0.16})`
            ctx.lineWidth = 0.8
            ctx.beginPath()
            ctx.moveTo(coords[i].x, coords[i].y)
            ctx.lineTo(coords[j].x, coords[j].y)
            ctx.stroke()
            ctx.restore()
          }
        }
      }

      // Draw shaded motes (stars, hollow rings, crosses, dots)
      coords.forEach(({ x, y, m }) => {
        const twinkle = 0.42 + Math.sin(time * 2.2 + m.phase) * 0.26
        if (m.kind === 'star') {
          drawStar4(x, y, m.r * 2.3, m.color, twinkle + 0.15, time * m.spin)
        } else if (m.kind === 'ring') {
          ctx.save()
          ctx.globalAlpha = twinkle
          ctx.strokeStyle = m.color
          ctx.lineWidth = 1.2
          ctx.beginPath()
          ctx.arc(x, y, m.r * 1.4, 0, Math.PI * 2)
          ctx.stroke()
          ctx.restore()
        } else if (m.kind === 'plus') {
          ctx.save()
          ctx.translate(x, y)
          ctx.rotate(time * m.spin)
          ctx.globalAlpha = twinkle
          ctx.strokeStyle = m.color
          ctx.lineWidth = 1.15
          const s = m.r * 1.35
          ctx.beginPath()
          ctx.moveTo(-s, 0)
          ctx.lineTo(s, 0)
          ctx.moveTo(0, -s)
          ctx.lineTo(0, s)
          ctx.stroke()
          ctx.restore()
        } else {
          ctx.save()
          ctx.globalAlpha = twinkle
          ctx.fillStyle = m.color
          ctx.beginPath()
          ctx.arc(x, y, m.r, 0, Math.PI * 2)
          ctx.fill()
          ctx.restore()
        }
      })

      // 5. Expanding cursor ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i]
        rp.r += 1.6
        rp.alpha *= 0.968
        if (rp.alpha < 0.015) {
          ripples.splice(i, 1)
          continue
        }
        ctx.save()
        ctx.strokeStyle = `rgba(${rp.color}, ${rp.alpha})`
        ctx.lineWidth = 1.1
        ctx.beginPath()
        ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2)
        ctx.stroke()
        ctx.restore()
      }

      if (!reducedMotion) {
        time += 0.016
        rafId = requestAnimationFrame(render)
      }
    }

    render()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
      parentEl?.removeEventListener('pointermove', onPointerMove)
      parentEl?.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [])

  return <canvas ref={canvasRef} className="hero-bg-canvas" aria-hidden="true" />
}
