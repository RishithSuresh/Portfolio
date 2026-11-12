import { ArrowUpRight, AudioWaveform, ExternalLink, FileText, ScanFace, Network } from 'lucide-react'
import { researchPapers } from '../data/site'
import Reveal from './Reveal'
export default function Research() {
  return <section className="section research-section" id="research">
    <Reveal className="section-heading"><div><span className="eyebrow">03 / THE RESEARCH LAB</span><h2>Questions worth<br/><em>investigating.</em></h2></div><p>A space for deeper technical explorations — methods, experiments, results and lessons learned along the way.</p></Reveal>
    <div className="research-panel">
      <div className="research-copy"><span className="eyebrow">CURRENT FOCUS / 001</span><h3>Multimodal<br/>deepfake detection</h3><p>Exploring how audio and visual evidence can work together to identify manipulated media, with a focus on robust evaluation and cross-dataset generalization.</p><a className="text-link" href="/projects/multimodal-deepfake-detection">Explore the case study <ArrowUpRight size={16}/></a></div>
      <div className="research-visual"><div className="signal signal-a"><ScanFace/><span>VISUAL SIGNAL</span></div><div className="signal signal-b"><AudioWaveform/><span>AUDIO SIGNAL</span></div><div className="fusion-node"><Network size={26}/><b>FUSION</b></div><div className="fusion-line line-a"/><div className="fusion-line line-b"/><span className="visual-caption">MULTI-MODAL / ANALYSIS</span></div>
    </div>
    <div className="research-foot"><span>METHOD · EXPERIMENT · EVALUATE · ITERATE</span><span>Research is a process, not just a result.</span></div>
    <div className="papers-heading"><span className="eyebrow">RESEARCH PAPERS / ARCHIVE</span><p>Add published papers, preprints, posters and technical reports here.</p></div>
    <div className="papers-grid">{researchPapers.map(paper => <article className="paper-card" key={paper.title}><div className="paper-icon"><FileText size={18}/><span>{paper.status}</span></div><h3>{paper.title}</h3><span className="paper-venue">{paper.venue}</span><p>{paper.summary}</p>{paper.url ? <a href={paper.url} target="_blank" rel="noreferrer">Read paper <ExternalLink size={14}/></a> : <span className="paper-placeholder">Add paper link <ArrowUpRight size={14}/></span>}</article>)}</div>
  </section>
}