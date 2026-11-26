import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, ArrowUpRight, Sun, Moon, Command } from 'lucide-react'
import { profile } from '../data/site'
import { useTheme } from './ThemeProvider'

const sections = [
  { num: '00', label: 'HERO', id: '#top' },
  { num: '01', label: 'DOSSIER', id: '#about' },
  { num: '02', label: 'ARCHIVE', id: '#work' },
  { num: '03', label: 'LAB', id: '#research' },
  { num: '04', label: 'TELEMETRY', id: '#experience' },
  { num: '05', label: 'CODE', id: '#github' },
  { num: '06', label: 'DISPATCH', id: '#contact' }
]

function LiveClock() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const update = () => {
      try {
        setTime(
          new Intl.DateTimeFormat('en-IN', {
            timeZone: 'Asia/Kolkata',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
          }).format(new Date())
        )
      } catch {
        setTime('IST')
      }
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  return <strong>{time} IST</strong>
}

export default function Navbar({ onOpenCommand }) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('#top')
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (location.pathname !== '/') return
    const nodes = sections.map(s => document.querySelector(s.id)).filter(Boolean)
    if (!nodes.length) return

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) {
          setActive(`#${visible[0].target.id}`)
        }
      },
      { rootMargin: '-22% 0px -55% 0px', threshold: [0.1, 0.35, 0.6] }
    )

    nodes.forEach(n => observer.observe(n))
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
    <>
      <div className="masthead-wrap">
        <header className="masthead">
          <Link className="brand" to="/" aria-label="Rishith home">
            {profile.shortName}
            <span>✳</span>
          </Link>

          <div className="masthead-coords">
            <span>SPECIMEN LAB // BENGALURU</span>
            <span className="sep">/</span>
            <LiveClock />
            <span className="sep">/</span>
            <span>LRDE · DRDO</span>
          </div>

          <div className="nav-actions">
            <button
              type="button"
              className="cmd-trigger"
              onClick={onOpenCommand}
              aria-label="Open command palette"
            >
              <Command size={13} />
              <span>INDEX</span>
              <kbd>⌘K</kbd>
            </button>

            <button
              type="button"
              className="icon-button"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to Travertine Light theme' : 'Switch to Ultramarine Dark theme'}
              title={theme === 'dark' ? 'Travertine & Klein Blue' : 'Ultramarine & Vermilion'}
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
              Dispatch <ArrowUpRight size={14} />
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
              {sections.map(s => (
                <a
                  key={s.id}
                  href={`/${s.id}`}
                  onClick={e => {
                    e.preventDefault()
                    go(s.id)
                  }}
                >
                  {s.num} / {s.label}
                  <ArrowUpRight size={16} />
                </a>
              ))}
            </div>
          )}
        </header>
      </div>

      {location.pathname === '/' && (
        <nav className="index-rail" aria-label="Section index">
          {sections.map(s => {
            const isActive = active === s.id
            return (
              <a
                key={s.id}
                href={s.id}
                className={`rail-link ${isActive ? 'is-active' : ''}`}
                onClick={e => {
                  e.preventDefault()
                  go(s.id)
                }}
              >
                <span className="rail-dot" />
                <span>{s.num}</span>
                <span>{s.label}</span>
              </a>
            )
          })}
        </nav>
      )}
    </>
  )
}
