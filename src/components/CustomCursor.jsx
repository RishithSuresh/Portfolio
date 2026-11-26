import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

export default function CustomCursor() {
  const [visible, setVisible] = useState(false)
  const [active, setActive] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const smoothX = useSpring(x, { stiffness: 520, damping: 38, mass: 0.4 })
  const smoothY = useSpring(y, { stiffness: 520, damping: 38, mass: 0.4 })

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    if (!fine) return

    const move = e => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
      const hit = e.target?.closest?.('a, button, .project-card, input, textarea')
      setActive(Boolean(hit))
    }

    const leave = () => setVisible(false)

    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerleave', leave)
    return () => {
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerleave', leave)
    }
  }, [x, y])

  return (
    <motion.div
      aria-hidden="true"
      className={`custom-cursor ${visible ? 'is-visible' : ''} ${active ? 'is-active' : ''}`}
      style={{ x: smoothX, y: smoothY }}
    />
  )
}
