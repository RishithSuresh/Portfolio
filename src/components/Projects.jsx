import { useMemo, useState } from 'react'
import { ArrowUpRight, Github, MoveUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { projects, getGithubUrl } from '../data/site'
import Reveal from './Reveal'
import SpotlightCard from './SpotlightCard'

const filters = [
  { id: 'all', label: 'All Featured' },
  { id: 'ai', label: 'AI / ML' },
  { id: 'systems', label: 'Systems & Automation' },
  { id: 'product', label: 'Web & Mobile' }
]

function matchesFilter(project, filterId) {
  if (filterId === 'all') return project.featured
  const cat = project.category.toLowerCase()
  if (filterId === 'ai') return cat.includes('ai') || cat.includes('ml')
  if (filterId === 'systems') return cat.includes('automation') || cat.includes('systems')
  if (filterId === 'product') return cat.includes('web') || cat.includes('mobile')
  return true
}

export function ProjectCard({ project, large = false }) {
  return (
    <SpotlightCard as="article" className={`project-card ${large ? 'project-card-large' : ''}`}>
      <Link to={`/projects/${project.slug}`}>
        <div className="project-image">
          <img src={project.image} alt={`${project.title} preview`} loading="lazy" />
          <span className="image-arrow">
            <MoveUpRight size={18} />
          </span>
        </div>
        <div className="project-meta">
          <span>
            {project.number} / {project.category}
          </span>
          <span>CASE STUDY</span>
        </div>
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
        <div className="tag-row">
          {project.tags.map(t => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </Link>
      {project.github && (
        <a
          className="project-github-link"
          href={getGithubUrl(project.github)}
          target="_blank"
          rel="noreferrer"
        >
          <Github size={14} /> View source <ArrowUpRight size={13} />
        </a>
      )}
    </SpotlightCard>
  )
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all')
  const visible = useMemo(
    () => projects.filter(p => matchesFilter(p, activeFilter)),
    [activeFilter]
  )

  return (
    <section className="section" id="work">
      <Reveal className="section-heading">
        <div>
          <span className="eyebrow">02 / SELECTED WORK</span>
          <h2>
            Ideas turned
            <br />
            <em>into projects.</em>
          </h2>
        </div>
        <p>
          A selection of experiments, applications and research projects. Each one taught me
          something new.
        </p>
      </Reveal>

      <div className="filter-pills" role="tablist" aria-label="Filter projects by domain">
        {filters.map(f => (
          <button
            key={f.id}
            type="button"
            role="tab"
            aria-selected={activeFilter === f.id}
            className={`filter-pill ${activeFilter === f.id ? 'is-active' : ''}`}
            onClick={() => setActiveFilter(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {activeFilter === 'all' && visible.length >= 2 ? (
        <div className="projects-grid">
          <Reveal className="project-feature">
            <ProjectCard project={visible[0]} large />
          </Reveal>
          <div className="project-stack">
            {visible.slice(1).map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
        </div>
      ) : (
        <div className="projects-filtered-grid">
          {visible.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.06}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      )}

      <div className="all-projects">
        <span>MORE THINGS I&apos;VE BEEN BUILDING</span>
        <div>
          {projects
            .filter(p => !p.featured)
            .map(p => (
              <Link key={p.slug} to={`/projects/${p.slug}`}>
                {p.title}
                <ArrowUpRight size={15} />
              </Link>
            ))}
        </div>
      </div>
    </section>
  )
}
