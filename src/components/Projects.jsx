import { ArrowUpRight, MoveUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { projects } from '../data/site'
import Reveal from './Reveal'
export function ProjectCard({ project, large = false }) {
  return <Link to={`/projects/${project.slug}`} className={`project-card ${large ? 'project-card-large' : ''}`}>
    <div className="project-image"><img src={project.image} alt="" loading="lazy"/><span className="image-arrow"><MoveUpRight size={20}/></span></div>
    <div className="project-meta"><span>{project.number} / {project.category}</span><span>CASE STUDY</span></div>
    <h3>{project.title}</h3><p>{project.summary}</p>
    <div className="tag-row">{project.tags.map(t => <span key={t}>{t}</span>)}</div>
  </Link>
}
export default function Projects() {
  const featured = projects.filter(p => p.featured)
  return <section className="section" id="work">
    <Reveal className="section-heading"><div><span className="eyebrow">02 / SELECTED WORK</span><h2>Ideas turned<br/><em>into projects.</em></h2></div><p>A selection of experiments, applications and research projects. Each one taught me something new.</p></Reveal>
    <div className="projects-grid"><Reveal className="project-feature"><ProjectCard project={featured[0]} large/></Reveal><div className="project-stack">{featured.slice(1).map((p, i) => <Reveal key={p.slug} delay={i * 0.1}><ProjectCard project={p}/></Reveal>)}</div></div>
    <div className="all-projects"><span>MORE THINGS I'VE BEEN BUILDING</span><div>{projects.filter(p => !p.featured).map(p => <Link key={p.slug} to={`/projects/${p.slug}`}>{p.title}<ArrowUpRight size={15}/></Link>)}</div></div>
  </section>
}