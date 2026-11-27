import { useEffect, useRef } from 'react'

/**
 * Full-bleed kinetic Hero background matching the Art-Deco drafting & stickmen
 * centerpiece: slowly rotating concentric compass arcs, drifting silk waves,
 * and pointer-reactive floating constellation particles & 4-point sparkles.
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

    const palette = ['#006d77', '#83c5be', '#e29578', '#ff7d00', '#15616d']
    const nodes = Array.from({ length: 34 }, (_, i) => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00032,
      vy: (Math.random() - 0.5) * 0.00028,
      r: 1.6 + (i % 4) * 0.65,
      color: palette[i % palette.length],
      isStar: i % 5 === 0,
      phase: Math.random() * Math.PI * 2
    }))

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
      pointerRef.current = {
        x: (e.clientX - rect.left) / Math.max(1, rect.width),
        y: (e.clientY - rect.top) / Math.max(1, rect.height),
        active: true
      }
    }

    const onPointerLeave = () => {
      pointerRef.current.active = false
    }

    const parentEl = canvas.parentElement
    parentEl?.addEventListener('pointermove', onPointerMove, { passive: true })
    parentEl?.addEventListener('pointerleave', onPointerLeave)

    const drawStar4 = (x, y, size, color, alpha) => {
      ctx.save()
      ctx.globalAlpha = alpha
      ctx.fillStyle = color
      ctx.beginPath()
      const inner = size * 0.28
      ctx.moveTo(x, y - size)
      ctx.lineTo(x + inner, y - inner)
      ctx.lineTo(x + size, y)
      ctx.lineTo(x + inner, y + inner)
      ctx.lineTo(x, y + size)
      ctx.lineTo(x - inner, y + inner)
      ctx.lineTo(x - size, y)
      ctx.lineTo(x - inner, y - inner)
      ctx.closePath()
      ctx.fill()
      ctx.restore()
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      const cx = width * 0.5
      const cy = height * 0.48
      const baseR = Math.min(width, height) * 0.42

      // 1. Slow rotating architectural compass arcs behind the centerpiece
      const arcs = [
        { r: baseR * 0.72, start: time * 0.12, span: Math.PI * 1.15, color: 'rgba(131, 197, 190, 0.34)', dash: [] },
        { r: baseR * 0.94, start: -time * 0.09 + 1.1, span: Math.PI * 0.85, color: 'rgba(226, 149, 120, 0.3)', dash: [4, 7] },
        { r: baseR * 1.16, start: time * 0.07 + 2.4, span: Math.PI * 1.35, color: 'rgba(0, 109, 119, 0.2)', dash: [2, 8] }
      ]

      arcs.forEach(a => {
        ctx.save()
        ctx.strokeStyle = a.color
        ctx.lineWidth = 1.1
        ctx.setLineDash(a.dash)
        ctx.beginPath()
        ctx.arc(cx, cy, a.r, a.start, a.start + a.span)
        ctx.stroke()
        ctx.restore()
      })

      // 2. Soft drifting silk waves spanning the canvas
      const drawRibbon = (yRatio, amp, freq, speed, strokeColor) => {
        ctx.save()
        ctx.strokeStyle = strokeColor
        ctx.lineWidth = 1.25
        ctx.beginPath()
        const yBase = height * yRatio
        for (let x = 0; x <= width; x += 10) {
          const nx = x / Math.max(1, width)
          const wave =
            Math.sin(nx * freq + time * speed) * amp +
            Math.cos(nx * (freq * 0.55) - time * speed * 0.7) * (amp * 0.45)
          const y = yBase + wave
          if (x === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()
        ctx.restore()
      }

      drawRibbon(0.32, 22, 5.5, 0.55, 'rgba(131, 197, 190, 0.28)')
      drawRibbon(0.54, 28, 4.2, -0.45, 'rgba(226, 149, 120, 0.24)')
      drawRibbon(0.72, 18, 6.4, 0.38, 'rgba(0, 109, 119, 0.18)')

      // 3. Update & draw floating geometric nodes + pointer-reactive constellation lines
      const px = pointerRef.current.x * width
      const py = pointerRef.current.y * height

      const coords = nodes.map(n => {
        if (!reducedMotion) {
          n.x += n.vx
          n.y += n.vy
          if (n.x < 0.02 || n.x > 0.98) n.vx *= -1
          if (n.y < 0.04 || n.y > 0.96) n.vy *= -1
        }
        let x = n.x * width
        let y = n.y * height

        if (pointerRef.current.active) {
          const dx = x - px
          const dy = y - py
          const dist = Math.hypot(dx, dy)
          if (dist < 170 && dist > 1) {
            const push = (1 - dist / 170) * 14
            x += (dx / dist) * push
            y += (dy / dist) * push
          }
        }
        return { x, y, n }
      })

      // Faint hairline links between nearby nodes
      for (let i = 0; i < coords.length; i++) {
        for (let j = i + 1; j < coords.length; j++) {
          const dx = coords[i].x - coords[j].x
          const dy = coords[i].y - coords[j].y
          const dist = Math.hypot(dx, dy)
          if (dist < 145) {
            ctx.save()
            ctx.strokeStyle = `rgba(0, 109, 119, ${(1 - dist / 145) * 0.16})`
            ctx.lineWidth = 0.8
            ctx.beginPath()
            ctx.moveTo(coords[i].x, coords[i].y)
            ctx.lineTo(coords[j].x, coords[j].y)
            ctx.stroke()
            ctx.restore()
          }
        }
      }

      // Draw particles & twinkling 4-point sparkles
      coords.forEach(({ x, y, n }) => {
        const twinkle = 0.45 + Math.sin(time * 2.1 + n.phase) * 0.25
        if (n.isStar) {
          drawStar4(x, y, n.r * 2.4, n.color, twinkle + 0.15)
        } else {
          ctx.save()
          ctx.globalAlpha = twinkle
          ctx.fillStyle = n.color
          ctx.beginPath()
          ctx.arc(x, y, n.r, 0, Math.PI * 2)
          ctx.fill()
          ctx.restore()
        }
      })

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
