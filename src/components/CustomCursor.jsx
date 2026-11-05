import { useEffect, useState } from 'react'

export default function CustomCursor() {
  const [point, setPoint] = useState({ x: -100, y: -100 })
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    if (!fine) return
    const move = e => { setPoint({ x: e.clientX, y: e.clientY }); setVisible(true) }
    const leave = () => setVisible(false)
    window.addEventListener('pointermove', move)
    document.addEventListener('pointerleave', leave)
    return () => { window.removeEventListener('pointermove', move); document.removeEventListener('pointerleave', leave) }
  }, [])
  return <div aria-hidden="true" className={`custom-cursor ${visible ? 'is-visible' : ''}`} style={{ transform: `translate3d(${point.x}px, ${point.y}px, 0)` }} />
}