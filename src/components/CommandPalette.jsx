import { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import {
  Search,
  Compass,
  FolderGit2,
  Moon,
  Sun,
  Mail,
  Copy,
  Check,
  Terminal,
  ArrowUpRight
} from 'lucide-react'
import { profile, projects, getGithubUrl } from '../data/site'
import { useTheme } from './ThemeProvider'

export default function CommandPalette({ open, onClose }) {
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const [copied, setCopied] = useState(false)
  const inputRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()

  const goSection = id => {
    onClose()
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => {
        document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
      }, 120)
    } else {
      document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const items = useMemo(() => {
    const sections = [
      { id: 'sec-about', label: 'Go to About', tag: '01 / ABOUT', icon: Compass, run: () => goSection('#about') },
      { id: 'sec-work', label: 'Go to Selected Work', tag: '02 / WORK', icon: FolderGit2, run: () => goSection('#work') },
      { id: 'sec-research', label: 'Go to Research Lab', tag: '03 / RESEARCH', icon: Compass, run: () => goSection('#research') },
      { id: 'sec-exp', label: 'Go to Experience & Skills', tag: '04 / JOURNEY', icon: Compass, run: () => goSection('#experience') },
      { id: 'sec-github', label: 'Go to Open Source', tag: '05 / GITHUB', icon: FolderGit2, run: () => goSection('#github') },
      { id: 'sec-term', label: 'Open Interactive Terminal', tag: '06 / SHELL', icon: Terminal, run: () => goSection('#terminal') },
      { id: 'sec-contact', label: 'Go to Contact', tag: '07 / CONTACT', icon: Mail, run: () => goSection('#contact') }
    ]

    const projectItems = projects.map(p => ({
      id: `proj-${p.slug}`,
      label: p.title,
      tag: `CASE STUDY · ${p.number}`,
      icon: ArrowUpRight,
      run: () => {
        onClose()
        navigate(`/projects/${p.slug}`)
      }
    }))

    const actions = [
      {
        id: 'act-theme',
        label: theme === 'dark' ? 'Switch to Light Paper Theme' : 'Switch to Obsidian Dark Theme',
        tag: 'APPEARANCE',
        icon: theme === 'dark' ? Sun : Moon,
        run: () => {
          toggleTheme()
          onClose()
        }
      },
      {
        id: 'act-email',
        label: copied ? `Copied ${profile.email}` : `Copy Email (${profile.email})`,
        tag: 'CLIPBOARD',
        icon: copied ? Check : Copy,
        run: async () => {
          try {
            await navigator.clipboard.writeText(profile.email)
            setCopied(true)
            setTimeout(() => setCopied(false), 1800)
          } catch {
            window.location.href = `mailto:${profile.email}`
          }
        }
      },
      {
        id: 'act-gh',
        label: 'Open GitHub Profile',
        tag: 'EXTERNAL',
        icon: ArrowUpRight,
        run: () => {
          window.open(getGithubUrl(profile.github), '_blank', 'noopener,noreferrer')
          onClose()
        }
      }
    ]

    const all = [...actions, ...sections, ...projectItems]
    const q = query.trim().toLowerCase()
    if (!q) return all
    return all.filter(
      item =>
        item.label.toLowerCase().includes(q) ||
        item.tag.toLowerCase().includes(q)
    )
  }, [query, theme, copied, location.pathname])

  useEffect(() => {
    if (open) {
      setQuery('')
      setActiveIndex(0)
      setTimeout(() => inputRef.current?.focus(), 20)
    }
  }, [open])

  useEffect(() => {
    if (activeIndex >= items.length) setActiveIndex(0)
  }, [items.length, activeIndex])

  const handleKeyDown = e => {
    if (e.key === 'Escape') {
      onClose()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex(i => (items.length ? (i + 1) % items.length : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex(i => (items.length ? (i - 1 + items.length) % items.length : 0))
    } else if (e.key === 'Enter' && items[activeIndex]) {
      e.preventDefault()
      items[activeIndex].run()
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="cmd-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
        >
          <motion.div
            className="cmd-dialog"
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            onClick={e => e.stopPropagation()}
            onKeyDown={handleKeyDown}
          >
            <div className="cmd-input-row">
              <Search size={17} />
              <input
                ref={inputRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Jump to section, project, or toggle theme..."
                aria-label="Search commands"
              />
            </div>

            <div className="cmd-list">
              {items.length === 0 ? (
                <div className="cmd-item">
                  <span className="cmd-item-tag">No matching commands found.</span>
                </div>
              ) : (
                items.map((item, idx) => {
                  const Icon = item.icon
                  return (
                    <button
                      type="button"
                      key={item.id}
                      className={`cmd-item ${idx === activeIndex ? 'is-active' : ''}`}
                      onMouseEnter={() => setActiveIndex(idx)}
                      onClick={item.run}
                    >
                      <span className="cmd-item-left">
                        <Icon size={15} />
                        {item.label}
                      </span>
                      <span className="cmd-item-tag">{item.tag}</span>
                    </button>
                  )
                })
              )}
            </div>

            <div className="cmd-footer">
              <span>↑↓ Navigate · ↵ Select</span>
              <span>ESC to close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
