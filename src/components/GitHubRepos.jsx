import { useEffect, useState } from 'react'
import { ArrowUpRight, Github, Star, GitFork } from 'lucide-react'
import { profile, getGithubUsername, getGithubUrl } from '../data/site'
import Reveal from './Reveal'
import SectionStickman from './SectionStickman'

export default function GitHubRepos() {
  const [repos, setRepos] = useState([])
  const [status, setStatus] = useState('loading')
  const username = getGithubUsername(profile.github)
  const profileUrl = getGithubUrl(profile.github)

  useEffect(() => {
    if (!username) {
      setStatus('error')
      return
    }
    let active = true
    fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`)
      .then(r => {
        if (!r.ok) throw new Error('GitHub request failed')
        return r.json()
      })
      .then(data => {
        if (active) {
          setRepos(data.filter(x => !x.fork).slice(0, 4))
          setStatus('ready')
        }
      })
      .catch(() => {
        if (active) setStatus('error')
      })
    return () => {
      active = false
    }
  }, [username])

  return (
    <section className="section" id="github">
      <Reveal className="section-heading">
        <div>
          <span className="eyebrow">05 / Open Source</span>
          <h2>
            Built in the
            <br />
            <em>open.</em>
          </h2>
        </div>
        <p>Recent public repositories directly from GitHub.</p>
      </Reveal>

      <div className="github-header">
        <div>
          <Github size={18} />
          <span>github.com/{username}</span>
        </div>
        <SectionStickman variant="starCheer" className="stickman-github-ledge" width={38} height={44} />
        <a href={profileUrl} target="_blank" rel="noreferrer">
          Visit profile <ArrowUpRight size={15} />
        </a>
      </div>

      {status === 'loading' && <p className="muted">Fetching public repositories…</p>}
      {status === 'error' && (
        <p className="muted">
          Could not load live repositories right now. Visit the GitHub profile above to explore the
          latest code.
        </p>
      )}
      {status === 'ready' && repos.length === 0 && (
        <p className="muted">No public repositories found yet.</p>
      )}
      {status === 'ready' && repos.length > 0 && (
        <div className="repo-grid">
          {repos.map((r, idx) => (
            <a
              className="repo-card"
              key={r.id}
              href={r.html_url}
              target="_blank"
              rel="noreferrer"
            >
              {idx === 0 && (
                <SectionStickman variant="pogo" className="stickman-repo-pogo" width={32} height={46} />
              )}
              {idx === 1 && (
                <SectionStickman variant="napper" className="stickman-repo-napper" width={48} height={30} />
              )}
              <div>
                <span className="repo-name">{r.name}</span>
                <ArrowUpRight size={16} />
              </div>
              <p>{r.description || 'A public repository — explore the source code on GitHub.'}</p>
              <footer>
                <span>{r.language || 'Code'}</span>
                <span>
                  <Star size={13} /> {r.stargazers_count}
                </span>
                <span>
                  <GitFork size={13} /> {r.forks_count}
                </span>
              </footer>
            </a>
          ))}
        </div>
      )}
    </section>
  )
}
