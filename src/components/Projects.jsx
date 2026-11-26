import { useEffect, useMemo, useState } from 'react'
import { ArrowUpRight, Github, LayoutGrid, List, MoveUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { projects, getGithubUrl } from '../data/site'
import Reveal from './Reveal'
import SpotlightCard from './SpotlightCard'

const filters = [
  { id: 'all', label: 'All Works (08)' },
  { id: 'ai', label: 'AI / ML' },
  { id: 'systems', label: 'Systems' },
  { id: 'product', label: 'Web & Mobile' }
]

function matchesFilter(project, filterId) {
  if (filterId === 'all') return true
  const cat = project.category.toLowerCase()
  if (filterId === 'ai') return cat.includes('ai') || cat.includes('ml')
  if (filterId === 'systems') return cat.includes('automation') || cat.includes('systems')
  if (filterId === 'product') return cat.includes('web') || cat.includes('mobile')
  return true
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [viewMode, setViewMode] = useState('exhibition')
  const [selectedSlug, setSelectedSlug] = useState(projects[0].slug)

  const visible = useMemo(
    () => projects.filter(p => matchesFilter(p, activeFilter)),
    [activeFilter]
  )

  useEffect(() => {
    if (!visible.some(p => p.slug === selectedSlug) && visible[0]) {
      setSelectedSlug(visible[0].slug)
    }
  }, [visible, selectedSlug])

  const activeProject = visible.find(p => p.slug === selectedSlug) || visible[0]

  return (
    <section className="section" id="work">
      <Reveal className="section-heading">
        <div>
          <span className="eyebrow">02 / THE ARCHIVE</span>
          <h2>
            Ideas turned
            <br />
            <em>into artifacts.</em>
          </h2>
        </div>
        <p>
          Browse the exhibition index — hover or select any specimen to inspect its architecture,
          stack, and case study.
        </p>
      </Reveal>

      <div className="archive-controls">
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

        <div className="filter-pills">
          <button
            type="button"
            className={`filter-pill ${viewMode === 'exhibition' ? 'is-active' : ''}`}
            onClick={() => setViewMode('exhibition')}
            aria-label="Exhibition split view"
          >
            <List size={12} style={{ verticalAlign: 'middle', marginRight: 5 }} />
            EXHIBITION
          </button>
          <button
            type="button"
            className={`filter-pill ${viewMode === 'grid' ? 'is-active' : ''}`}
            onClick={() => setViewMode('grid')}
            aria-label="Grid card view"
          >
            <LayoutGrid size={12} style={{ verticalAlign: 'middle', marginRight: 5 }} />
            GRID
          </button>
        </div>
      </div>

      {viewMode === 'exhibition' ? (
        <div className="exhibition-split">
          <div className="exhibition-index">
            {visible.map(p => {
              const isSelected = activeProject?.slug === p.slug
              return (
                <button
                  type="button"
                  key={p.slug}
                  className={`exhibition-row ${isSelected ? 'is-active' : ''}`}
                  onMouseEnter={() => setSelectedSlug(p.slug)}
                  onFocus={() => setSelectedSlug(p.slug)}
                  onClick={() => setSelectedSlug(p.slug)}
                >
                  <span className="exhibition-num">{p.number}</span>
                  <div>
                    <h3>{p.title}</h3>
                    <span className="exhibition-cat">{p.category}</span>
                  </div>
                  <ArrowUpRight size={17} />
                </button>
              )
            })}
          </div>

          {activeProject && (
            <div className="exhibition-stage">
              <div className="stage-preview-media">
                <img src={activeProject.image} alt={`${activeProject.title} preview`} />
                <span className="stage-preview-badge">
                  SPECIMEN {activeProject.number} · {activeProject.category}
                </span>
              </div>
              <div className="stage-preview-body">
                <h3>{activeProject.title}</h3>
                <p>{activeProject.description}</p>
                <div className="tag-row">
                  {activeProject.tags.map(t => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
                <div className="stage-actions">
                  <Link className="button button-dark" to={`/projects/${activeProject.slug}`}>
                    Read Case Study <ArrowUpRight size={15} />
                  </Link>
                  {activeProject.github && (
                    <a
                      className="button button-quiet"
                      href={getGithubUrl(activeProject.github)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Github size={15} /> Source
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="projects-grid-view">
          {visible.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.05}>
              <SpotlightCard as="article" className="project-card">
                <Link to={`/projects/${p.slug}`}>
                  <div className="project-image">
                    <img src={p.image} alt={`${p.title} preview`} loading="lazy" />
                    <span className="image-arrow">
                      <MoveUpRight size={17} />
                    </span>
                  </div>
                  <div className="project-meta">
                    <span>
                      {p.number} / {p.category}
                    </span>
                    <span>CASE STUDY</span>
                  </div>
                  <h3>{p.title}</h3>
                  <p>{p.summary}</p>
                  <div className="tag-row">
                    {p.tags.map(t => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                </Link>
                {p.github && (
                  <a
                    className="project-github-link"
                    href={getGithubUrl(p.github)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Github size={14} /> View source <ArrowUpRight size={13} />
                  </a>
                )}
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      )}
    </section>
  )
}
