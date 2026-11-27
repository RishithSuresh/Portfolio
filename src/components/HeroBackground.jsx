import { useEffect, useRef } from 'react'

/**
 * Architectural Hero background focused on flowing line animations:
 * layered harmonic silk lines, sweeping dashed blueprint vectors,
 * breathing Lissajous curves, rotating astrolabe arcs, and light
 * pointer-reactive particles.
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

    // Calmer, reduced particle count so linework leads the composition
    const motes = Array.from({ length: 24 }, (_, i) => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00028,
      vy: -0.00014 - Math.random() * 0.00018,
      r: 1.6 + (i % 4) * 0.65,
      color: shades[i % shades.length],
      kind: i % 3 === 0 ? 'star' : i % 3 === 1 ? 'ring' : 'dot',
      phase: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.8
    }))

    const polygons = Array.from({ length: 6 }, (_, i) => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00018,
      vy: -0.0001 - Math.random() * 0.00012,
      size: 11 + (i % 3) * 6,
      sides: i % 2 === 0 ? 3 : 6,
      angle: Math.random() * Math.PI * 2,
      spin: (i % 2 === 0 ? 1 : -1) * 0.0035,
      color: shades[(i * 2) % shades.length]
    }))

    // Sweeping dashed blueprint lines moving smoothly across the viewport
    const scanLines = [
      { axis: 'x', pos: 0.18, speed: 0.018, color: 'rgba(0, 109, 119, 0.16)', dash: [14, 18] },
      { axis: 'x', pos: 0.72, speed: -0.014, color: 'rgba(226, 149, 120, 0.18)', dash: [8, 22] },
      { axis: 'y', pos: 0.28, speed: 0.012, color: 'rgba(131, 197, 190, 0.22)', dash: [24, 16] },
      { axis: 'y', pos: 0.78, speed: -0.015, color: 'rgba(255, 125, 0, 0.14)', dash: [10, 20] }
    ]

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
      if (!reducedMotion && now - lastRippleAt > 240 && ripples.length < 7) {
        lastRippleAt = now
        ripples.push({
          x: nx * width,
          y: ny * height,
          r: 6,
          alpha: 0.34,
          color: ripples.length % 2 === 0 ? '131, 197, 190' : '226, 149, 120'
        })
      }
    }

    const onPointerDown = e => {
      if (reducedMotion) return
      const rect = canvas.getBoundingClientRect()
      const bx = e.clientX - rect.left
      const by = e.clientY - rect.top
      ripples.push({ x: bx, y: by, r: 8, alpha: 0.5, color: '255, 125, 0' })
      for (let i = 0; i < 8; i++) {
        const angle = (Math.PI * 2 * i) / 8 + Math.random() * 0.25
        const speed = 1.4 + Math.random() * 1.8
        bursts.push({
          x: bx,
          y: by,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 3 + Math.random() * 2.5,
          alpha: 0.85,
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

    const drawWaveBand = (yRatio, amp, freq, speed, strokeRgba, fillRgba, phaseOffset, pulseColor, pulseSpeed, dash = []) => {
      ctx.save()
      ctx.beginPath()
      for (let x = 0; x <= width; x += 8) {
        const nx = x / Math.max(1, width)
        const y = waveY(nx, yRatio, amp, freq, speed, phaseOffset)
        if (x === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.strokeStyle = strokeRgba
      ctx.lineWidth = 1.25
      if (dash.length) {
        ctx.setLineDash(dash)
        ctx.lineDashOffset = -time * speed * 26
      }
      ctx.stroke()

      if (fillRgba) {
        ctx.setLineDash([])
        ctx.lineTo(width, height)
        ctx.lineTo(0, height)
        ctx.closePath()
        const grad = ctx.createLinearGradient(0, height * yRatio - amp, 0, height)
        grad.addColorStop(0, fillRgba)
        grad.addColorStop(1, 'rgba(237, 246, 249, 0)')
        ctx.fillStyle = grad
        ctx.fill()
      }

      if (pulseColor) {
        const pnx = ((time * pulseSpeed + phaseOffset * 0.2) % 1.2) - 0.1
        if (pnx >= 0 && pnx <= 1) {
          const px = pnx * width
          const py = waveY(pnx, yRatio, amp, freq, speed, phaseOffset)
          const glow = ctx.createRadialGradient(px, py, 0, px, py, 14)
          glow.addColorStop(0, pulseColor)
          glow.addColorStop(1, 'rgba(237, 246, 249, 0)')
          ctx.fillStyle = glow
          ctx.beginPath()
          ctx.arc(px, py, 14, 0, Math.PI * 2)
          ctx.fill()

          ctx.fillStyle = '#ffffff'
          ctx.beginPath()
          ctx.arc(px, py, 2, 0, Math.PI * 2)
          ctx.fill()
        }
      }
      ctx.restore()
    }

    const drawLissajous = (cx, cy, rx, ry, aFreq, bFreq, phase, color, dash = []) => {
      ctx.save()
      ctx.strokeStyle = color
      ctx.lineWidth = 1.05
      if (dash.length) {
        ctx.setLineDash(dash)
        ctx.lineDashOffset = -time * 18
      }
      ctx.beginPath()
      const steps = 160
      for (let i = 0; i <= steps; i++) {
        const t = (Math.PI * 2 * i) / steps
        const x = cx + Math.sin(aFreq * t + phase) * rx
        const y = cy + Math.sin(bFreq * t) * ry
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()
      ctx.restore()
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      // 1. Drifting multi-shade atmospheric blooms
      const blooms = [
        {
          x: width * (0.2 + Math.sin(time * 0.26) * 0.09),
          y: height * (0.3 + Math.cos(time * 0.22) * 0.08),
          r: Math.max(width, height) * 0.35,
          rgba: 'rgba(131, 197, 190, 0.28)'
        },
        {
          x: width * (0.8 + Math.cos(time * 0.24) * 0.09),
          y: height * (0.32 + Math.sin(time * 0.25) * 0.09),
          r: Math.max(width, height) * 0.33,
          rgba: 'rgba(255, 221, 210, 0.45)'
        },
        {
          x: width * (0.5 + Math.sin(time * 0.19 + 1.2) * 0.13),
          y: height * (0.68 + Math.cos(time * 0.22) * 0.08),
          r: Math.max(width, height) * 0.3,
          rgba: 'rgba(255, 125, 0, 0.09)'
        },
        {
          x: width * (0.62 + Math.cos(time * 0.18) * 0.1),
          y: height * (0.2 + Math.sin(time * 0.24) * 0.07),
          r: Math.max(width, height) * 0.24,
          rgba: 'rgba(0, 109, 119, 0.12)'
        }
      ]
      blooms.forEach(b => drawBloom(b.x, b.y, b.r, b.rgba))

      // 2. Animated sweeping blueprint lines (horizontal, vertical & diagonal rays)
      scanLines.forEach(sl => {
        if (!reducedMotion) {
          sl.pos = (sl.pos + sl.speed * 0.016 + 1) % 1
        }
        ctx.save()
        ctx.strokeStyle = sl.color
        ctx.lineWidth = 0.9
        ctx.setLineDash(sl.dash)
        ctx.lineDashOffset = time * 22
        ctx.beginPath()
        if (sl.axis === 'x') {
          const x = sl.pos * width
          ctx.moveTo(x, 0)
          ctx.lineTo(x, height)
        } else {
          const y = sl.pos * height
          ctx.moveTo(0, y)
          ctx.lineTo(width, y)
        }
        ctx.stroke()
        ctx.restore()
      })

      // Rotating diagonal architectural rays
      const cx = width * 0.5
      const cy = height * 0.48
      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(time * 0.035)
      const diagLen = Math.max(width, height) * 0.75
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI * i) / 6
        ctx.strokeStyle = i % 2 === 0 ? 'rgba(0, 109, 119, 0.1)' : 'rgba(226, 149, 120, 0.12)'
        ctx.lineWidth = 0.8
        ctx.setLineDash([6, 14])
        ctx.lineDashOffset = -time * 16
        ctx.beginPath()
        ctx.moveTo(-Math.cos(a) * diagLen, -Math.sin(a) * diagLen)
        ctx.lineTo(Math.cos(a) * diagLen, Math.sin(a) * diagLen)
        ctx.stroke()
      }
      ctx.restore()

      // 3. Flowing Lissajous ribbon curves behind the centerpiece
      drawLissajous(cx, cy, width * 0.38, height * 0.28, 2, 3, time * 0.3, 'rgba(131, 197, 190, 0.25)', [10, 10])
      drawLissajous(cx, cy, width * 0.34, height * 0.22, 3, 2, -time * 0.24 + 1.1, 'rgba(226, 149, 120, 0.24)', [])

      // 4. 8 layered multi-shade drifting harmonic wave lines + surfing pulses
      drawWaveBand(0.16, 16, 6.2, 0.45, 'rgba(0, 109, 119, 0.16)', null, 0.4, null, 0, [8, 12])
      drawWaveBand(0.24, 24, 5.2, 0.58, 'rgba(0, 109, 119, 0.22)', 'rgba(131, 197, 190, 0.07)', 0, 'rgba(0, 109, 119, 0.55)', 0.12)
      drawWaveBand(0.35, 28, 4.4, -0.46, 'rgba(131, 197, 190, 0.36)', 'rgba(255, 221, 210, 0.08)', 1.1, 'rgba(131, 197, 190, 0.7)', 0.09)
      drawWaveBand(0.47, 22, 7.0, 0.4, 'rgba(21, 97, 109, 0.18)', null, 1.8, null, 0, [14, 10])
      drawWaveBand(0.56, 26, 6.0, 0.52, 'rgba(226, 149, 120, 0.32)', 'rgba(255, 236, 209, 0.12)', 2.4, 'rgba(255, 125, 0, 0.65)', 0.14)
      drawWaveBand(0.68, 20, 4.8, -0.38, 'rgba(255, 125, 0, 0.22)', null, 3.6, 'rgba(226, 149, 120, 0.6)', 0.11)
      drawWaveBand(0.78, 18, 5.6, 0.36, 'rgba(226, 149, 120, 0.2)', null, 4.1, null, 0, [6, 10])
      drawWaveBand(0.88, 14, 6.8, -0.32, 'rgba(120, 41, 15, 0.15)', null, 4.9, null, 0)

      // 5. Rotating degree dial & multi-ring astrolabe arcs with satellites
      const baseR = Math.min(width, height) * 0.44

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
        { r: baseR * 0.62, start: time * 0.18, span: Math.PI * 1.15, color: 'rgba(0, 109, 119, 0.26)', dash: [], sat: '#ff7d00' },
        { r: baseR * 0.82, start: -time * 0.14 + 0.9, span: Math.PI * 0.95, color: 'rgba(226, 149, 120, 0.36)', dash: [4, 7], sat: '#006d77' },
        { r: baseR * 1.04, start: time * 0.1 + 2.2, span: Math.PI * 1.3, color: 'rgba(131, 197, 190, 0.36)', dash: [2, 8], sat: '#e29578' },
        { r: baseR * 1.24, start: -time * 0.07 + 3.5, span: Math.PI * 0.9, color: 'rgba(120, 41, 15, 0.22)', dash: [8, 6], sat: '#83c5be' }
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

      // 6. Subtle floating geometric polygons & reduced motes with constellation links
      polygons.forEach(p => {
        if (!reducedMotion) {
          p.x += p.vx
          p.y += p.vy
          p.angle += p.spin
          if (p.x < -0.05) p.x = 1.05
          if (p.x > 1.05) p.x = -0.05
          if (p.y < -0.05) p.y = 1.05
        }
        drawPolygon(p.x * width, p.y * height, p.size, p.sides, p.angle, p.color, 0.18)
      })

      const px = pointerRef.current.x * width
      const py = pointerRef.current.y * height

      const coords = motes.map(m => {
        if (!reducedMotion) {
          m.x += m.vx + Math.sin(time * 0.8 + m.phase) * 0.0001
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
          if (dist < 175 && dist > 1) {
            const push = (1 - dist / 175) * 15
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
          if (dist < 155) {
            ctx.save()
            ctx.strokeStyle = i % 2 === 0
              ? `rgba(0, 109, 119, ${(1 - dist / 155) * 0.18})`
              : `rgba(226, 149, 120, ${(1 - dist / 155) * 0.16})`
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
        const twinkle = 0.42 + Math.sin(time * 2.2 + m.phase) * 0.24
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

      // 7. Expanding ripples & click bursts
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
