import { useState } from 'react'
import { Terminal as TerminalIcon, ArrowUpRight } from 'lucide-react'
import { profile, terminalCommands, getGithubUrl } from '../data/site'
import { useTheme } from './ThemeProvider'
import Reveal from './Reveal'

export default function TerminalSection({ embedded = false }) {
  const [input, setInput] = useState('')
  const [cmdHistory, setCmdHistory] = useState([])
  const [histCursor, setHistCursor] = useState(-1)
  const [history, setHistory] = useState([
    { cmd: 'hello', output: 'Welcome to rishith.shell — type help or click a command below.' }
  ])
  const { theme, toggleTheme } = useTheme()

  const executeCommand = raw => {
    const cmd = raw.trim().toLowerCase()
    if (!cmd) return

    setCmdHistory(prev => [cmd, ...prev])
    setHistCursor(-1)

    if (cmd === 'clear') {
      setHistory([])
      return
    }

    if (cmd === 'theme') {
      const next = theme === 'dark' ? 'light' : 'dark'
      toggleTheme()
      setHistory(h => [...h.slice(-4), { cmd, output: `Switched palette to ${next} mode.` }])
      return
    }

    if (cmd === 'neofetch') {
      const info = [
        `user      : ${profile.name}`,
        `role      : ${profile.role}`,
        `location  : ${profile.location}`,
        `focus     : Multimodal AI · Vision · Automation`,
        `theme     : ${theme}`
      ].join('\n')
      setHistory(h => [...h.slice(-4), { cmd, output: info }])
      return
    }

    const output =
      terminalCommands[cmd] ||
      `Command not found: ${cmd}. Type help to see available commands.`
    setHistory(h => [...h.slice(-4), { cmd, output }])

    if (cmd === 'github') {
      window.open(getGithubUrl(profile.github), '_blank', 'noopener,noreferrer')
    }
  }

  const run = e => {
    e.preventDefault()
    executeCommand(input)
    setInput('')
  }

  const handleKeyDown = e => {
    if (e.key === 'ArrowUp' && cmdHistory.length > 0) {
      e.preventDefault()
      const nextIdx = Math.min(histCursor + 1, cmdHistory.length - 1)
      setHistCursor(nextIdx)
      setInput(cmdHistory[nextIdx])
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (histCursor <= 0) {
        setHistCursor(-1)
        setInput('')
      } else {
        const nextIdx = histCursor - 1
        setHistCursor(nextIdx)
        setInput(cmdHistory[nextIdx])
      }
    }
  }

  const terminalWindow = (
    <div className="terminal-window">
      <div className="terminal-top">
        <div className="window-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <span>
          <TerminalIcon size={13} /> rishith — zsh
        </span>
        <span className="terminal-live">● LIVE</span>
      </div>

      <div className="terminal-body" aria-live="polite">
        {history.map((h, i) => (
          <div className="terminal-line" key={`${h.cmd}-${i}`}>
            <div>
              <b>visitor@rishith</b>
              <span> ~ % </span>
              {h.cmd}
            </div>
            <p>{h.output}</p>
          </div>
        ))}

        <form onSubmit={run} className="terminal-input">
          <label htmlFor="terminal-command">
            visitor@rishith <span>~ %</span>
          </label>
          <input
            id="terminal-command"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="type a command…"
            autoComplete="off"
          />
          <button type="submit" aria-label="Run command">
            <ArrowUpRight size={17} />
          </button>
        </form>
      </div>

      <div className="terminal-hints">
        TRY:
        {['neofetch', 'projects', 'research', 'theme', 'help', 'clear'].map(cmd => (
          <button type="button" key={cmd} onClick={() => executeCommand(cmd)}>
            {cmd}
          </button>
        ))}
      </div>
    </div>
  )

  if (embedded) return terminalWindow

  return (
    <section className="section terminal-section" id="terminal">
      <Reveal className="section-heading">
        <div>
          <span className="eyebrow">07 / A LITTLE PLAYGROUND</span>
          <h2>
            Talk to my
            <br />
            <em>terminal.</em>
          </h2>
        </div>
        <p>A tiny command-line interface for exploring this portfolio. Try a command or press ↑↓.</p>
      </Reveal>
      {terminalWindow}
    </section>
  )
}
