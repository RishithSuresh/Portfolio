import { useState } from 'react'
import { ArrowUpRight, ExternalLink, Github, Globe, Sparkles } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { projects, getGithubUrl } from '../data/site'
import Reveal from './Reveal'
import SectionStickman from './SectionStickman'

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
          Full-stack web apps, explainable NLP, audio AI, and 3D neural visualizers — select a
          project to explore its architecture or open the live deployment.
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
                <div className="showcase-row-copy">
                  <div className="showcase-row-top">
                    <h3>{p.title}</h3>
                    {p.deployed && (
                      <span className="showcase-live-badge">
                        <span className="live-dot" /> Live
                      </span>
                    )}
                  </div>
                  <span className="showcase-row-cat">{p.category}</span>
                  <p className="showcase-row-summary">{p.summary}</p>
                </div>
                <ArrowUpRight size={18} />
              </button>
            )
          })}
        </div>

        <div className="showcase-stage-wrap">
          <SectionStickman variant="observer" className="stickman-stage-ledge" width={38} height={44} />
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
                  {activeProject.deployed && (
                    <a
                      href={activeProject.deployed}
                      target="_blank"
                      rel="noreferrer"
                      className="showcase-media-live"
                      title={`Open live deployment of ${activeProject.title}`}
                    >
                      <Globe size={13} />
                      <span>{activeProject.deployed.replace(/^https?:\/\//, '').replace(/\/$/, '')}</span>
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>

                <div className="showcase-body">
                  <span className="showcase-stage-cat">{activeProject.category}</span>
                  <h3>{activeProject.title}</h3>
                  <p>{activeProject.description}</p>

                  {activeProject.highlights?.length > 0 && (
                    <div className="showcase-highlights">
                      {activeProject.highlights.map(h => (
                        <span key={h}>
                          <Sparkles size={11} /> {h}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="tag-row">
                    {activeProject.tags.slice(0, 5).map(t => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>

                  <div className="showcase-actions">
                    {activeProject.deployed ? (
                      <a
                        className="button button-primary"
                        href={activeProject.deployed}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Live Demo <ExternalLink size={15} />
                      </a>
                    ) : (
                      <Link className="button button-primary" to={`/projects/${activeProject.slug}`}>
                        Read Case Study <ArrowUpRight size={15} />
                      </Link>
                    )}

                    {activeProject.deployed && (
                      <Link className="button button-quiet" to={`/projects/${activeProject.slug}`}>
                        Case Study <ArrowUpRight size={15} />
                      </Link>
                    )}

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
      </div>

      {secondary.length > 0 && (
        <div className="all-projects">
          <span className="all-projects-label">
            <SectionStickman variant="tinker" className="stickman-inline" width={32} height={34} />
            MORE EXPERIMENTS &amp; RESEARCH
          </span>
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
