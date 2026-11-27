import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { profile } from '../data/site'
import SectionStickman from './SectionStickman'

const links = [
  ['About', '#about'],
  ['Work', '#work'],
  ['Research', '#research'],
  ['Experience', '#experience'],
  ['Contact', '#contact']
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const go = id => {
    setOpen(false)
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
      <header className="navbar">
        <Link className="brand" to="/" aria-label="Rishith home">
          {profile.shortName}
          <span>✳</span>
        </Link>

        <nav className="desktop-nav" aria-label="Main navigation">
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
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <div className="nav-cta-wrap">
            <SectionStickman variant="peeker" className="stickman-nav-peeker" width={26} height={26} />
            <a
              className="nav-cta"
              href="#contact"
              onClick={e => {
                e.preventDefault()
                go('#contact')
              }}
            >
              Let&apos;s talk <ArrowUpRight size={14} />
            </a>
          </div>

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
