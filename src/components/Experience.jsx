import { experience, skills } from '../data/site'
import Reveal from './Reveal'
export default function Experience() {
  return <section className="section" id="experience">
    <Reveal className="section-heading"><div><span className="eyebrow">04 / THE JOURNEY</span><h2>Learning by<br/><em>doing.</em></h2></div><p>Experiences that have shaped how I think, collaborate and approach technical challenges.</p></Reveal>
    <div className="journey-grid">
      <div className="timeline">{experience.map((e, i) => <Reveal key={e.organization} delay={i * 0.08} className="timeline-item"><span className="timeline-dot"/><span className="timeline-period">{e.period}</span><div><h3>{e.role}</h3><h4>{e.organization}</h4><p>{e.detail}</p></div></Reveal>)}</div>
      <div className="skills-panel"><span className="eyebrow">TOOLS OF THE TRADE</span><h3>Technologies<br/><em>I work with.</em></h3><p className="skills-intro">A growing toolkit. Some are familiar, others are still a work in progress.</p>{skills.map(s => <div className="skill-group" key={s.group}><span>{s.group}</span><div>{s.items.map(x => <b key={x}>{x}</b>)}</div></div>)}</div>
    </div>
  </section>
}