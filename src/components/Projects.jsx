import { ArrowUpRight, Github, MoveUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { projects, getGithubUrl } from '../data/site'
import Reveal from './Reveal'

export function ProjectCard({ project, large = false }) {
  return (
    <article className={`project-card ${large ? 'project-card-large' : ''}`}>
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
          {project.tags.slice(0, 4).map(t => (
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
    </article>
  )
}

export default function Projects() {
  const featured = projects.filter(p => p.featured)
  const secondary = projects.filter(p => !p.featured)

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
          A focused selection of research experiments, desktop systems, and full-stack
          applications.
        </p>
      </Reveal>

      <div className="projects-grid">
        <Reveal>
          <ProjectCard project={featured[0]} large />
        </Reveal>
        <div className="project-stack">
          {featured.slice(1).map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.06}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
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
