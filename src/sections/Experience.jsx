import { motion } from 'framer-motion';
import SectionShell from '../components/SectionShell';
import { experience } from '../data/portfolio';

// Experience zone — cinematic vertical mission timeline.
// A glowing rail reveals as the user scrolls; nodes slide in from alternating sides.
export default function Experience() {
  return (
    <SectionShell
      id="experience"
      eyebrow="05 · TRAJECTORY"
      title="Mission log"
      kicker="A chronological dispatch of the operator's previous assignments and theatres of work."
    >
      <div className="relative w-full">
        {/* Center rail */}
        <div className="absolute left-4 top-0 h-full w-px md:left-1/2 md:-translate-x-1/2"
             style={{
               background: 'linear-gradient(180deg, transparent, rgba(91,192,190,0.5), rgba(46,139,87,0.4), transparent)',
             }} />

        {/* Reveal overlay — animates from top to bottom on scroll */}
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: 'top' }}
          className="absolute left-4 top-0 h-full w-px md:left-1/2 md:-translate-x-1/2"
        >
          <div className="h-full w-full" style={{ background: 'linear-gradient(180deg, rgba(91,192,190,0.85), transparent)', filter: 'blur(2px)' }} />
        </motion.div>

        <div className="space-y-12">
          {experience.map((e, i) => (
            <Milestone key={e.year} item={e} index={i} />
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

function Milestone({ item, index }) {
  const left = index % 2 === 0;
  return (
    <div className="relative grid grid-cols-1 items-center gap-6 md:grid-cols-2">
      {/* Marker on rail */}
      <span className="absolute left-4 top-7 z-10 -translate-x-1/2 md:left-1/2">
        <span className="block h-3 w-3 rounded-full bg-cyan"
              style={{ boxShadow: '0 0 18px rgba(91,192,190,0.7)' }} />
        <span className="absolute inset-0 -m-2 animate-pulse-soft rounded-full"
              style={{ boxShadow: '0 0 24px rgba(91,192,190,0.3)' }} />
      </span>

      <motion.div
        initial={{ opacity: 0, x: left ? -40 : 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className={`pl-12 md:pl-0 ${left ? 'md:pr-12 md:text-right md:col-start-1' : 'md:pl-12 md:col-start-2'}`}
      >
        <div className="glass inline-block w-full max-w-md rounded-2xl p-6">
          <div className={`flex items-center gap-2 ${left ? 'md:justify-end' : ''}`}>
            <span className="hud-label text-cyan/80">{item.year}</span>
            <span className="h-3 w-px bg-silver/20" />
            <span className="hud-label">UNLOCKED</span>
          </div>
          <h3 className="mt-3 font-display text-2xl text-silver-soft">{item.title}</h3>
          <p className="mt-1 font-sans text-sm text-cyan">{item.org}</p>
          <p className="mt-4 font-sans text-sm leading-relaxed text-silver-dim">{item.summary}</p>
        </div>
      </motion.div>
    </div>
  );
}
