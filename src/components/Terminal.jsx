import { useState } from 'react'
import { Terminal as TerminalIcon, ArrowUpRight } from 'lucide-react'
import { profile, terminalCommands } from '../data/site'
import Reveal from './Reveal'
export default function TerminalSection() {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([{ cmd: 'hello', output: 'Welcome to rishith.shell — type help to explore.' }])
  const run = e => {
    e.preventDefault()
    const cmd = input.trim().toLowerCase()
    if (!cmd) return
    if (cmd === 'clear') setHistory([])
    else setHistory(h => [...h.slice(-4), { cmd, output: terminalCommands[cmd] || `Command not found: ${cmd}. Type help to see available commands.` }])
    if (cmd === 'github') window.open(`https://github.com/${profile.github}`, '_blank', 'noopener,noreferrer')
    setInput('')
  }
  return <section className="section terminal-section" id="terminal">
    <Reveal className="section-heading"><div><span className="eyebrow">06 / A LITTLE PLAYGROUND</span><h2>Talk to my<br/><em>terminal.</em></h2></div><p>A tiny command-line interface for exploring this portfolio. Try a command.</p></Reveal>
    <div className="terminal-window"><div className="terminal-top"><div className="window-dots"><i/><i/><i/></div><span><TerminalIcon size={13}/> rishith — zsh</span><span className="terminal-live">● LIVE</span></div><div className="terminal-body" aria-live="polite">{history.map((h, i) => <div className="terminal-line" key={i}><div><b>visitor@rishith</b><span> ~ % </span>{h.cmd}</div><p>{h.output}</p></div>)}<form onSubmit={run} className="terminal-input"><label htmlFor="terminal-command">visitor@rishith <span>~ %</span></label><input id="terminal-command" value={input} onChange={e => setInput(e.target.value)} placeholder="type a command…" autoComplete="off"/><button aria-label="Run command"><ArrowUpRight size={17}/></button></form></div><div className="terminal-hints">TRY: <button onClick={() => setInput('projects')}>projects</button><button onClick={() => setInput('skills')}>skills</button><button onClick={() => setInput('contact')}>contact</button><button onClick={() => setInput('help')}>help</button></div></div>
  </section>
}