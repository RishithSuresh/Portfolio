import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { Menu, X, ArrowUpRight, Sun, Moon, Command } from 'lucide-react'
import { profile } from '../data/site'
import { useTheme } from './ThemeProvider'

const links = [
  ['About', '#about'],
  ['Work', '#work'],
  ['Research', '#research'],
  ['Experience', '#experience'],
  ['Contact', '#contact']
]

export default function Navbar({ onOpenCommand }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('#about')
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (location.pathname !== '/') return
    const sections = links
      .map(([, id]) => document.querySelector(id))
      .filter(Boolean)

    if (!sections.length) return

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) {
          setActive(`#${visible[0].target.id}`)
        }
      },
      { rootMargin: '-25% 0px -55% 0px', threshold: [0.1, 0.35, 0.6] }
    )

    sections.forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [location.pathname])

  const go = id => {
    setOpen(false)
    setActive(id)
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => {
        document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
      }, 120)
    } else {
      document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="navbar-wrap">
      <header className={`navbar ${scrolled ? 'is-scrolled' : ''}`}>
        <Link className="brand" to="/" aria-label="Rishith home">
          {profile.shortName}
          <span>✳</span>
        </Link>

        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(([label, id]) => {
            const isActive = location.pathname === '/' && active === id
            return (
              <a
                key={label}
                href={`/${id}`}
                className={isActive ? 'is-active' : ''}
                onClick={e => {
                  e.preventDefault()
                  go(id)
                }}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="nav-pill-bg"
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                  />
                )}
                {label}
              </a>
            )
          })}
        </nav>

        <div className="nav-actions">
          <button
            type="button"
            className="cmd-trigger"
            onClick={onOpenCommand}
            aria-label="Open command palette"
            title="Command palette (Ctrl+K)"
          >
            <Command size={13} />
            <span>Menu</span>
            <kbd>⌘K</kbd>
          </button>

          <button
            type="button"
            className="icon-button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            title={theme === 'dark' ? 'Light theme' : 'Dark theme'}
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          <a
            className="nav-contact"
            href="#contact"
            onClick={e => {
              e.preventDefault()
              go('#contact')
            }}
          >
            Let's talk <ArrowUpRight size={14} />
          </a>

          <button
            type="button"
            className="icon-button mobile-menu-button"
            onClick={() => setOpen(v => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>

        {open && (
          <div className="mobile-nav">
            {links.map(([label, id]) => (
              <a
                key={label}
                href={`/${id}`}
                onClick={e => {
                  e.preventDefault()
                  go(id)
                }}
              >
                {label}
                <ArrowUpRight size={16} />
              </a>
            ))}
          </div>
        )}
      </header>
    </div>
  )
}
