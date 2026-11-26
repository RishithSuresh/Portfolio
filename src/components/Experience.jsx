import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { experience, projects, skills } from '../data/site'
import Reveal from './Reveal'

export default function Experience() {
  const [activeSkill, setActiveSkill] = useState('Python')

  const matchingProjects = useMemo(() => {
    const q = activeSkill.toLowerCase()
    return projects.filter(
      p =>
        p.tags.some(t => t.toLowerCase().includes(q) || q.includes(t.toLowerCase())) ||
        p.description.toLowerCase().includes(q)
    )
  }, [activeSkill])

  return (
    <section className="section" id="experience">
      <Reveal className="section-heading">
        <div>
          <span className="eyebrow">04 / TELEMETRY &amp; STACK</span>
          <h2>
            Learning by
            <br />
            <em>doing.</em>
          </h2>
        </div>
        <p>
          Experiences that have shaped how I think — plus an interactive skill tracer linked to
          real projects.
        </p>
      </Reveal>

      <div className="journey-grid">
        <div className="timeline">
          {experience.map((e, i) => (
            <Reveal key={e.organization} delay={i * 0.08} className="timeline-item">
              <span className="timeline-dot" />
              <span className="timeline-period">{e.period}</span>
              <div>
                <h3>{e.role}</h3>
                <h4>{e.organization}</h4>
                <p>{e.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="skills-panel">
          <span className="eyebrow">SKILL TRACER</span>
          <h3>
            Technologies
            <br />
            <em>I work with.</em>
          </h3>
          <p className="skills-intro">Click any technology below to trace where it is applied.</p>

          {skills.map(s => (
            <div className="skill-group" key={s.group}>
              <span>{s.group}</span>
              <div>
                {s.items.map(item => (
                  <button
                    type="button"
                    key={item}
                    className={`skill-chip ${activeSkill === item ? 'is-active' : ''}`}
                    onClick={() => setActiveSkill(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div className="skill-trace-box" aria-live="polite">
            <div>
              TRACING <strong>{activeSkill}</strong> →{' '}
              {matchingProjects.length
                ? `${matchingProjects.length} artifact${matchingProjects.length > 1 ? 's' : ''}`
                : 'Core curriculum & research toolkit'}
            </div>
            {matchingProjects.length > 0 && (
              <div className="skill-trace-links">
                {matchingProjects.map(p => (
                  <Link key={p.slug} to={`/projects/${p.slug}`}>
                    {p.number} · {p.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
