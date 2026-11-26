import { useRef } from 'react'

export default function SpotlightCard({
  as: Component = 'div',
  className = '',
  children,
  onPointerMove,
  ...props
}) {
  const ref = useRef(null)

  const handleMove = e => {
    const el = ref.current
    if (el) {
      const rect = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${e.clientX - rect.left}px`)
      el.style.setProperty('--my', `${e.clientY - rect.top}px`)
    }
    if (onPointerMove) onPointerMove(e)
  }

  return (
    <Component
      ref={ref}
      className={`spotlight-card ${className}`.trim()}
      onPointerMove={handleMove}
      {...props}
    >
      {children}
    </Component>
  )
}
