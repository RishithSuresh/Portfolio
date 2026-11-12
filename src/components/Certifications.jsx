import { Award, ExternalLink } from 'lucide-react'
import { certifications } from '../data/site'
import Reveal from './Reveal'

export default function Certifications() {
  return <section className="section certifications-section" id="certifications">
    <Reveal className="section-heading"><div><span className="eyebrow">05 / CERTIFICATIONS</span><h2>Proof of<br/><em>continuous learning.</em></h2></div><p>A place to collect verified certifications, courses and credentials as the journey grows.</p></Reveal>
    <div className="certification-grid">{certifications.map(cert => <article className="certification-card" key={`${cert.title}-${cert.issuer}`}><div className="certification-top"><Award size={22}/><span>{cert.date}</span></div><h3>{cert.title}</h3><span className="certification-issuer">{cert.issuer}</span><p>{cert.detail}</p>{cert.credential ? <a href={cert.credential} target="_blank" rel="noreferrer">View credential <ExternalLink size={13}/></a> : <span className="certification-placeholder">Add credential link</span>}</article>)}</div>
  </section>
}
