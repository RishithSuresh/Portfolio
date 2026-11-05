import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, ExternalLink } from 'lucide-react'
import { projects } from '../data/site'
import Footer from '../components/Footer'
export default function ProjectDetail() {
  const { slug } = useParams()
  const project = projects.find(p => p.slug === slug)
  if (!project) return <main className="not-found page-shell"><span className="eyebrow">404 / NOT FOUND</span><h1>That project isn't here.</h1><Link className="text-link" to="/">Back to home <ArrowUpRight size={16}/></Link></main>
  return <main className="project-detail page-shell">
    <Link to="/" className="back-link"><ArrowLeft size={16}/> Back to the lab</Link>
    <div className="detail-heading"><span className="eyebrow">PROJECT / {project.number} · {project.category}</span><h1>{project.title}</h1><p>{project.description}</p><div className="tag-row">{project.tags.map(t => <span key={t}>{t}</span>)}</div></div>
    <img className="detail-cover" src={project.image} alt={`${project.title} visual`} />
    <div className="detail-content"><aside><span className="eyebrow">ON THIS PAGE</span>{project.sections.map((s, i) => <a href={`#section-${i}`} key={s.title}>{String(i + 1).padStart(2, '0')} / {s.title}</a>)}<span className="eyebrow detail-links-label">PROJECT LINKS</span>{project.links.map(l => <a href={l.url} target="_blank" rel="noreferrer" key={l.label}>{l.label} <ExternalLink size={13}/></a>)}</aside><article>{project.sections.map((s, i) => <section id={`section-${i}`} key={s.title}><span className="eyebrow">0{i + 1} / {s.title.toUpperCase()}</span><h2>{s.title}</h2><p>{s.body}</p></section>)}<div className="detail-next"><span className="eyebrow">KEEP EXPLORING</span><Link to="/">Back to all projects <ArrowUpRight size={16}/></Link></div></article></div>
    <Footer/>
  </main>
}