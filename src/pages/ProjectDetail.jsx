import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ArrowUpRight, ExternalLink, Github, Globe, Sparkles } from 'lucide-react'
import { projects, getGithubUrl } from '../data/site'
import Footer from '../components/Footer'
import SectionStickman from '../components/SectionStickman'

export default function ProjectDetail() {
  const { slug } = useParams()
  const idx = projects.findIndex(p => p.slug === slug)
  const project = projects[idx]
  const nextProject = idx >= 0 ? projects[(idx + 1) % projects.length] : null

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [slug])

  if (!project) {
    return (
      <main className="not-found page-shell">
        <span className="eyebrow">404 / NOT FOUND</span>
        <h1>That project isn&apos;t here.</h1>
        <Link className="text-link" to="/">
          Back to home <ArrowUpRight size={16} />
        </Link>
      </main>
    )
  }

  return (
    <main className="project-detail page-shell">
      <Link to="/" className="back-link">
        <ArrowLeft size={16} /> Back to home
      </Link>

      <div className="detail-heading">
        <span className="eyebrow">
          PROJECT / {project.number} · {project.category}
        </span>
        <h1>{project.title}</h1>
        <p>{project.description}</p>
        {project.highlights?.length > 0 && (
          <div className="detail-highlights">
            {project.highlights.map(h => (
              <span key={h}>
                <Sparkles size={12} /> {h}
              </span>
            ))}
          </div>
        )}
        <div className="tag-row">
          {project.tags.map(t => (
            <span key={t}>{t}</span>
          ))}
        </div>
        {(project.deployed || project.github) && (
          <div className="detail-top-actions">
            {project.deployed && (
              <a className="button button-primary" href={project.deployed} target="_blank" rel="noreferrer">
                <Globe size={15} /> Open Live Project <ExternalLink size={14} />
              </a>
            )}
            {project.github && (
              <a
                className="button button-quiet"
                href={getGithubUrl(project.github)}
                target="_blank"
                rel="noreferrer"
              >
                <Github size={15} /> View Source <ExternalLink size={14} />
              </a>
            )}
          </div>
        )}
      </div>

      <div className="detail-cover-wrap">
        <SectionStickman variant="sketcher" className="stickman-detail-ledge" width={46} height={40} />
        <img className="detail-cover" src={project.image} alt={`${project.title} visual`} />
      </div>

      <div className="detail-content">
        <aside>
          <span className="eyebrow">ON THIS PAGE</span>
          {project.sections.map((s, i) => (
            <a href={`#section-${i}`} key={s.title}>
              {String(i + 1).padStart(2, '0')} / {s.title}
            </a>
          ))}

          {(project.github || project.links.length > 0) && (
            <>
              <span className="eyebrow detail-links-label">PROJECT LINKS</span>
              {project.github && (
                <a href={getGithubUrl(project.github)} target="_blank" rel="noreferrer">
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    <Github size={13} /> Source Repository
                  </span>
                  <ExternalLink size={13} />
                </a>
              )}
              {project.links.map(l => (
                <a href={l.url} target="_blank" rel="noreferrer" key={l.label}>
                  {l.label} <ExternalLink size={13} />
                </a>
              ))}
            </>
          )}
        </aside>

        <article>
          {project.sections.map((s, i) => (
            <section id={`section-${i}`} key={s.title}>
              <span className="eyebrow">
                0{i + 1} / {s.title.toUpperCase()}
              </span>
              <h2>{s.title}</h2>
              <p>{s.body}</p>
            </section>
          ))}
          <div className="detail-next">
            <Link to="/">
              <ArrowLeft size={15} /> All projects
            </Link>
            {nextProject && (
              <Link to={`/projects/${nextProject.slug}`}>
                Next: {nextProject.title} <ArrowRight size={15} />
              </Link>
            )}
          </div>
        </article>
      </div>

      <Footer />
    </main>
  )
}
