import { useEffect, useRef } from 'react'

/**
 * Multi-layered kinetic Hero background with rotating astrolabe degree dial,
 * wave-surfing light pulses, tumbling geometric polygons, shaded color blooms,
 * floating motes, constellation threads, pointer ripples, and click sparkle bursts.
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

    const motes = Array.from({ length: 56 }, (_, i) => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00042,
      vy: -0.0002 - Math.random() * 0.00026,
      r: 1.5 + (i % 5) * 0.72,
      color: shades[i % shades.length],
      kind: i % 4 === 0 ? 'star' : i % 4 === 1 ? 'ring' : i % 4 === 2 ? 'plus' : 'dot',
      phase: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 1.1
    }))

    const polygons = Array.from({ length: 12 }, (_, i) => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00024,
      vy: -0.00014 - Math.random() * 0.00018,
      size: 10 + (i % 4) * 6,
      sides: i % 3 === 0 ? 3 : i % 3 === 1 ? 6 : 4,
      angle: Math.random() * Math.PI * 2,
      spin: (i % 2 === 0 ? 1 : -1) * (0.004 + (i % 3) * 0.003),
      color: shades[(i * 2) % shades.length]
    }))

    const ripples = []
    const bursts = []

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
      if (!reducedMotion && now - lastRippleAt > 200 && ripples.length < 9) {
        lastRippleAt = now
        ripples.push({
          x: nx * width,
          y: ny * height,
          r: 6,
          alpha: 0.38,
          color: ripples.length % 2 === 0 ? '131, 197, 190' : '226, 149, 120'
        })
      }
    }

    const onPointerDown = e => {
      if (reducedMotion) return
      const rect = canvas.getBoundingClientRect()
      const bx = e.clientX - rect.left
      const by = e.clientY - rect.top
      ripples.push({ x: bx, y: by, r: 8, alpha: 0.55, color: '255, 125, 0' })
      for (let i = 0; i < 10; i++) {
        const angle = (Math.PI * 2 * i) / 10 + Math.random() * 0.3
        const speed = 1.4 + Math.random() * 2.2
        bursts.push({
          x: bx,
          y: by,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 3 + Math.random() * 3,
          alpha: 0.9,
          color: shades[i % shades.length]
        })
      }
    }

    const onPointerLeave = () => {
      pointerRef.current.active = false
    }

    const parentEl = canvas.parentElement
    parentEl?.addEventListener('pointermove', onPointerMove, { passive: true })
    parentEl?.addEventListener('pointerdown', onPointerDown)
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

    const drawPolygon = (x, y, size, sides, angle, color, alpha) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(angle)
      ctx.globalAlpha = alpha
      ctx.strokeStyle = color
      ctx.lineWidth = 1.15
      ctx.beginPath()
      for (let i = 0; i < sides; i++) {
        const a = (Math.PI * 2 * i) / sides
        const px = Math.cos(a) * size
        const py = Math.sin(a) * size
        if (i === 0) ctx.moveTo(px, py)
        else ctx.lineTo(px, py)
      }
      ctx.closePath()
      ctx.stroke()
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

    const waveY = (nx, yRatio, amp, freq, speed, phaseOffset) =>
      height * yRatio +
      Math.sin(nx * freq + time * speed + phaseOffset) * amp +
      Math.cos(nx * (freq * 0.6) - time * speed * 0.75 + phaseOffset) * (amp * 0.42)

    const drawWaveBand = (yRatio, amp, freq, speed, strokeRgba, fillRgba, phaseOffset, pulseColor, pulseSpeed) => {
      ctx.save()
      ctx.beginPath()
      for (let x = 0; x <= width; x += 10) {
        const nx = x / Math.max(1, width)
        const y = waveY(nx, yRatio, amp, freq, speed, phaseOffset)
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
        const grad = ctx.createLinearGradient(0, height * yRatio - amp, 0, height)
        grad.addColorStop(0, fillRgba)
        grad.addColorStop(1, 'rgba(237, 246, 249, 0)')
        ctx.fillStyle = grad
        ctx.fill()
      }

      // Surfing glowing pulse traveling along the wave curve
      if (pulseColor) {
        const pnx = ((time * pulseSpeed + phaseOffset * 0.2) % 1.2) - 0.1
        if (pnx >= 0 && pnx <= 1) {
          const px = pnx * width
          const py = waveY(pnx, yRatio, amp, freq, speed, phaseOffset)
          const glow = ctx.createRadialGradient(px, py, 0, px, py, 16)
          glow.addColorStop(0, pulseColor)
          glow.addColorStop(1, 'rgba(237, 246, 249, 0)')
          ctx.fillStyle = glow
          ctx.beginPath()
          ctx.arc(px, py, 16, 0, Math.PI * 2)
          ctx.fill()

          ctx.fillStyle = '#ffffff'
          ctx.beginPath()
          ctx.arc(px, py, 2.2, 0, Math.PI * 2)
          ctx.fill()
        }
      }
      ctx.restore()
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      // 1. Drifting multi-shade atmospheric blooms
      const blooms = [
        {
          x: width * (0.2 + Math.sin(time * 0.28) * 0.09),
          y: height * (0.3 + Math.cos(time * 0.22) * 0.08),
          r: Math.max(width, height) * 0.35,
          rgba: 'rgba(131, 197, 190, 0.3)'
        },
        {
          x: width * (0.8 + Math.cos(time * 0.24) * 0.09),
          y: height * (0.32 + Math.sin(time * 0.26) * 0.09),
          r: Math.max(width, height) * 0.33,
          rgba: 'rgba(255, 221, 210, 0.48)'
        },
        {
          x: width * (0.5 + Math.sin(time * 0.2 + 1.2) * 0.14),
          y: height * (0.68 + Math.cos(time * 0.23) * 0.08),
          r: Math.max(width, height) * 0.31,
          rgba: 'rgba(255, 125, 0, 0.1)'
        },
        {
          x: width * (0.62 + Math.cos(time * 0.19) * 0.11),
          y: height * (0.2 + Math.sin(time * 0.25) * 0.07),
          r: Math.max(width, height) * 0.25,
          rgba: 'rgba(0, 109, 119, 0.13)'
        }
      ]
      blooms.forEach(b => drawBloom(b.x, b.y, b.r, b.rgba))

      // 2. Layered multi-shade drifting wave bands + surfing energy pulses
      drawWaveBand(0.22, 24, 5.2, 0.58, 'rgba(0, 109, 119, 0.22)', 'rgba(131, 197, 190, 0.08)', 0, 'rgba(0, 109, 119, 0.55)', 0.12)
      drawWaveBand(0.37, 28, 4.4, -0.46, 'rgba(131, 197, 190, 0.38)', 'rgba(255, 221, 210, 0.09)', 1.1, 'rgba(131, 197, 190, 0.7)', 0.09)
      drawWaveBand(0.55, 26, 6.0, 0.52, 'rgba(226, 149, 120, 0.32)', 'rgba(255, 236, 209, 0.13)', 2.4, 'rgba(255, 125, 0, 0.65)', 0.14)
      drawWaveBand(0.7, 20, 4.8, -0.38, 'rgba(255, 125, 0, 0.22)', null, 3.6, 'rgba(226, 149, 120, 0.6)', 0.11)
      drawWaveBand(0.84, 16, 6.8, 0.34, 'rgba(120, 41, 15, 0.15)', null, 4.5, null, 0)

      // 3. Rotating degree dial & multi-ring astrolabe with satellites
      const cx = width * 0.5
      const cy = height * 0.48
      const baseR = Math.min(width, height) * 0.44

      // Radial compass degree ticks
      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(time * 0.05)
      ctx.strokeStyle = 'rgba(0, 109, 119, 0.16)'
      ctx.lineWidth = 0.9
      const tickR1 = baseR * 0.96
      const tickR2 = baseR * 1.01
      for (let i = 0; i < 36; i++) {
        const a = (Math.PI * 2 * i) / 36
        const len = i % 3 === 0 ? 1.04 : 1.0
        ctx.beginPath()
        ctx.moveTo(Math.cos(a) * tickR1, Math.sin(a) * tickR1)
        ctx.lineTo(Math.cos(a) * tickR2 * len, Math.sin(a) * tickR2 * len)
        ctx.stroke()
      }
      ctx.restore()

      const orbits = [
        { r: baseR * 0.62, start: time * 0.18, span: Math.PI * 1.15, color: 'rgba(0, 109, 119, 0.25)', dash: [], sat: '#ff7d00' },
        { r: baseR * 0.82, start: -time * 0.14 + 0.9, span: Math.PI * 0.95, color: 'rgba(226, 149, 120, 0.35)', dash: [4, 7], sat: '#006d77' },
        { r: baseR * 1.04, start: time * 0.1 + 2.2, span: Math.PI * 1.3, color: 'rgba(131, 197, 190, 0.35)', dash: [2, 8], sat: '#e29578' },
        { r: baseR * 1.24, start: -time * 0.07 + 3.5, span: Math.PI * 0.9, color: 'rgba(120, 41, 15, 0.2)', dash: [8, 6], sat: '#83c5be' }
      ]

      orbits.forEach(o => {
        ctx.save()
        ctx.strokeStyle = o.color
        ctx.lineWidth = 1.15
        ctx.setLineDash(o.dash)
        ctx.beginPath()
        ctx.arc(cx, cy, o.r, o.start, o.start + o.span)
        ctx.stroke()

        const sx = cx + Math.cos(o.start) * o.r
        const sy = cy + Math.sin(o.start) * o.r
        ctx.setLineDash([])
        ctx.fillStyle = o.sat
        ctx.globalAlpha = 0.78
        ctx.beginPath()
        ctx.arc(sx, sy, 3.4, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })

      // 4. Slow-tumbling geometric polygons
      polygons.forEach(p => {
        if (!reducedMotion) {
          p.x += p.vx
          p.y += p.vy
          p.angle += p.spin
          if (p.x < -0.05) p.x = 1.05
          if (p.x > 1.05) p.x = -0.05
          if (p.y < -0.05) p.y = 1.05
        }
        drawPolygon(p.x * width, p.y * height, p.size, p.sides, p.angle, p.color, 0.2)
      })

      // 5. Floating shaded motes + pointer-reactive constellation threads
      const px = pointerRef.current.x * width
      const py = pointerRef.current.y * height

      const coords = motes.map(m => {
        if (!reducedMotion) {
          m.x += m.vx + Math.sin(time * 0.9 + m.phase) * 0.00014
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
          if (dist < 190 && dist > 1) {
            const push = (1 - dist / 190) * 18
            x += (dx / dist) * push
            y += (dy / dist) * push
          }
        }
        return { x, y, m }
      })

      for (let i = 0; i < coords.length; i++) {
        for (let j = i + 1; j < coords.length; j++) {
          const dx = coords[i].x - coords[j].x
          const dy = coords[i].y - coords[j].y
          const dist = Math.hypot(dx, dy)
          if (dist < 138) {
            ctx.save()
            ctx.strokeStyle = i % 2 === 0
              ? `rgba(0, 109, 119, ${(1 - dist / 138) * 0.2})`
              : `rgba(226, 149, 120, ${(1 - dist / 138) * 0.18})`
            ctx.lineWidth = 0.85
            ctx.beginPath()
            ctx.moveTo(coords[i].x, coords[i].y)
            ctx.lineTo(coords[j].x, coords[j].y)
            ctx.stroke()
            ctx.restore()
          }
        }
      }

      coords.forEach(({ x, y, m }) => {
        const twinkle = 0.45 + Math.sin(time * 2.4 + m.phase) * 0.28
        if (m.kind === 'star') {
          drawStar4(x, y, m.r * 2.35, m.color, twinkle + 0.18, time * m.spin)
        } else if (m.kind === 'ring') {
          ctx.save()
          ctx.globalAlpha = twinkle
          ctx.strokeStyle = m.color
          ctx.lineWidth = 1.25
          ctx.beginPath()
          ctx.arc(x, y, m.r * 1.45, 0, Math.PI * 2)
          ctx.stroke()
          ctx.restore()
        } else if (m.kind === 'plus') {
          ctx.save()
          ctx.translate(x, y)
          ctx.rotate(time * m.spin)
          ctx.globalAlpha = twinkle
          ctx.strokeStyle = m.color
          ctx.lineWidth = 1.2
          const s = m.r * 1.4
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

      // 6. Expanding ripples & click sparkle bursts
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i]
        rp.r += 1.75
        rp.alpha *= 0.966
        if (rp.alpha < 0.015) {
          ripples.splice(i, 1)
          continue
        }
        ctx.save()
        ctx.strokeStyle = `rgba(${rp.color}, ${rp.alpha})`
        ctx.lineWidth = 1.15
        ctx.beginPath()
        ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2)
        ctx.stroke()
        ctx.restore()
      }

      for (let i = bursts.length - 1; i >= 0; i--) {
        const b = bursts[i]
        b.x += b.vx
        b.y += b.vy
        b.vx *= 0.96
        b.vy *= 0.96
        b.alpha *= 0.94
        if (b.alpha < 0.03) {
          bursts.splice(i, 1)
          continue
        }
        drawStar4(b.x, b.y, b.size, b.color, b.alpha, time * 2)
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
      parentEl?.removeEventListener('pointerdown', onPointerDown)
      parentEl?.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [])

  return <canvas ref={canvasRef} className="hero-bg-canvas" aria-hidden="true" />
}
