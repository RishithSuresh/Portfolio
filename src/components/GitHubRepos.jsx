import { useEffect, useState } from 'react'
import { ArrowUpRight, Github, Star, GitFork } from 'lucide-react'
import { profile } from '../data/site'
import Reveal from './Reveal'
export default function GitHubRepos() {
  const [repos, setRepos] = useState([])
  const [status, setStatus] = useState('loading')
  useEffect(() => {
    let active = true
    fetch(`https://api.github.com/users/${profile.github}/repos?sort=updated&per_page=4`)
      .then(r => { if (!r.ok) throw new Error('GitHub request failed'); return r.json() })
      .then(data => { if (active) { setRepos(data.filter(x => !x.fork).slice(0, 4)); setStatus('ready') } })
      .catch(() => { if (active) setStatus('error') })
    return () => { active = false }
  }, [])
  return <section className="section github-section" id="github">
    <Reveal className="section-heading"><div><span className="eyebrow">05 / OPEN SOURCE</span><h2>Built in the<br/><em>open.</em></h2></div><p>A live glimpse of public repositories and recent work from GitHub.</p></Reveal>
    <div className="github-header"><div><Github size={20}/><span>github.com/{profile.github}</span></div><a href={`https://github.com/${profile.github}`} target="_blank" rel="noreferrer">Visit profile <ArrowUpRight size={15}/></a></div>
    {status === 'loading' && <p className="muted">Fetching public repositories…</p>}
    {status === 'error' && <p className="muted">Could not load repositories right now. Visit the GitHub profile to explore the latest work.</p>}
    {status === 'ready' && repos.length === 0 && <p className="muted">No public repositories found yet.</p>}
    {status === 'ready' && <div className="repo-grid">{repos.map(r => <a className="repo-card" key={r.id} href={r.html_url} target="_blank" rel="noreferrer"><div><span className="repo-name">{r.name}</span><ArrowUpRight size={16}/></div><p>{r.description || 'A public repository — explore the source code on GitHub.'}</p><footer><span>{r.language || 'Code'}</span><span><Star size={13}/> {r.stargazers_count}</span><span><GitFork size={13}/> {r.forks_count}</span></footer></a>)}</div>}
  </section>
}