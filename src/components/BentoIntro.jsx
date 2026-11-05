import { ArrowUpRight, BrainCircuit, FlaskConical, Code2, Compass } from 'lucide-react'
import Reveal from './Reveal'
const cards = [
  { icon: BrainCircuit, title: 'AI & machine learning', text: 'Exploring intelligent systems, computer vision and deep learning.', tone: 'sage' },
  { icon: FlaskConical, title: 'Research & exploration', text: 'Testing ideas, learning from experiments and asking better questions.', tone: 'plain' },
  { icon: Code2, title: 'Software development', text: 'Turning concepts into practical applications and useful tools.', tone: 'plain' },
  { icon: Compass, title: 'Curiosity across domains', text: 'Following interesting problems wherever technology leads.', tone: 'sand' }
]
export default function BentoIntro() {
  return <section className="section" id="about">
    <Reveal className="section-heading"><div><span className="eyebrow">01 / A LITTLE ABOUT ME</span><h2>Many interests.<br/><em>One curious mind.</em></h2></div><p>I’m a Computer Science Engineer who enjoys exploring different corners of technology — from intelligent systems to software that solves everyday problems.</p></Reveal>
    <div className="intro-grid">
      <Reveal className="intro-note"><span className="eyebrow">THE SHORT VERSION</span><h3>Always learning.<br/>Always building.</h3><p>I like understanding how things work, experimenting with new approaches and turning what I learn into something tangible.</p><a href="#experience" className="text-link">A little more about my journey <ArrowUpRight size={16}/></a><div className="note-stamp">RS / 2026</div></Reveal>
      {cards.map((c, i) => <Reveal key={c.title} delay={i * 0.06} className={`interest-card ${c.tone}`}><c.icon size={22}/><h3>{c.title}</h3><p>{c.text}</p><span className="card-index">0{i + 1}</span></Reveal>)}
    </div>
  </section>
}