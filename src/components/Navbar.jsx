
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { profile } from '../data/site'

const links = [
  ['About', '/#about'],
  ['Work', '/#work'],
  ['Research', '/#research'],
  ['Experience', '/#experience'],
  ['Contact', '/#contact']
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const go = id => {
    setOpen(false)

    if (location.pathname !== '/') {
      location.href = `/${id}`
    } else {
      document.querySelector(id)?.scrollIntoView({
        behavior: 'smooth'
      })
    }
  }

  return (
    <header
      className="navbar"
      style={{
        background: 'transparent',
        backdropFilter: 'none',
        WebkitBackdropFilter: 'none'
      }}
    >
      <Link
        className="brand"
        to="/"
        aria-label="Rishith home"
      >
        {profile.shortName}
        <span>✳</span>
      </Link>

      <nav className="desktop-nav" aria-label="Main navigation">
        {links.map(([label, href]) => (
          <a
            key={label}
            href={href}
            onClick={e => {
              if (href.startsWith('/#')) {
                e.preventDefault()
                go(href.slice(1))
              }
            }}
          >
            {label}
          </a>
        ))}
      </nav>

      <div className="nav-actions">
        <a
          className="nav-contact"
          href="#contact"
          onClick={e => {
            e.preventDefault()
            go('#contact')
          }}
        >
          Let's talk <ArrowUpRight size={15} />
        </a>

        <button
          className="icon-button mobile-menu-button"
          onClick={() => setOpen(v => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="mobile-nav">
          {links.map(([label, href]) => (
            <a
              key={label}
              href={href}
              onClick={e => {
                e.preventDefault()
                go(href.slice(1))
              }}
            >
              {label}
              <ArrowUpRight size={16} />
            </a>
          ))}
        </div>
      )}
    </header>
  )
}
