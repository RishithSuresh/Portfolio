import { useState } from 'react'
import { ArrowUpRight, Github } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { projects, getGithubUrl } from '../data/site'
import Reveal from './Reveal'

export default function Projects() {
  const featured = projects.filter(p => p.featured)
  const secondary = projects.filter(p => !p.featured)
  const [activeSlug, setActiveSlug] = useState(featured[0].slug)

  const activeProject = featured.find(p => p.slug === activeSlug) || featured[0]

  return (
    <section className="section" id="work">
      <Reveal className="section-heading">
        <div>
          <span className="eyebrow">02 / Selected Work</span>
          <h2>
            Ideas turned
            <br />
            <em>into projects.</em>
          </h2>
        </div>
        <p>
          Hover or select a project to preview its architecture, stack, and full case study.
        </p>
      </Reveal>

      <div className="showcase-split">
        <div className="showcase-list">
          {featured.map(p => {
            const isSelected = activeProject.slug === p.slug
            return (
              <button
                type="button"
                key={p.slug}
                className={`showcase-row ${isSelected ? 'is-active' : ''}`}
                onMouseEnter={() => setActiveSlug(p.slug)}
                onFocus={() => setActiveSlug(p.slug)}
                onClick={() => setActiveSlug(p.slug)}
              >
                <span className="showcase-num">{p.number}</span>
                <div>
                  <h3>{p.title}</h3>
                  <span>{p.category}</span>
                </div>
                <ArrowUpRight size={18} />
              </button>
            )
          })}
        </div>

        <div className="showcase-stage">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.slug}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="showcase-media">
                <img src={activeProject.image} alt={`${activeProject.title} preview`} />
              </div>
              <div className="showcase-body">
                <h3>{activeProject.title}</h3>
                <p>{activeProject.description}</p>
                <div className="tag-row">
                  {activeProject.tags.slice(0, 4).map(t => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
                <div className="showcase-actions">
                  <Link className="button button-primary" to={`/projects/${activeProject.slug}`}>
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
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {secondary.length > 0 && (
        <div className="all-projects">
          <span>MORE EXPERIMENTS</span>
          <div>
            {secondary.map(p => (
              <Link key={p.slug} to={`/projects/${p.slug}`}>
                {p.title}
                <ArrowUpRight size={15} />
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
