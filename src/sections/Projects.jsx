import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import SectionShell from '../components/SectionShell';
import { projects } from '../data/portfolio';

// Projects zone — mission vault.
// Holographic mission cards with 3D tilt + cinematic open transition.
export default function Projects() {
  const [active, setActive] = useState(null);

  return (
    <SectionShell
      id="projects"
      eyebrow="02 · MISSION VAULT"
      title="Selected missions"
      kicker="A curated archive of shipped systems and crafted experiences. Open any mission for the deep brief."
    >
      <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {projects.map((p, i) => (
          <ProjectCard key={p.id} p={p} index={i} onOpen={() => setActive(p)} />
        ))}
      </div>

      <AnimatePresence>
        {active && <ProjectViewer project={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </SectionShell>
  );
}

function ProjectCard({ p, index, onOpen }) {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 220, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 220, damping: 18 });
  const gx = useTransform(mx, [-0.5, 0.5], ['0%', '100%']);
  const gy = useTransform(my, [-0.5, 0.5], ['0%', '100%']);

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  const accentRing = {
    emerald: '0 0 40px -10px rgba(46,139,87,0.45)',
    cyan: '0 0 40px -10px rgba(91,192,190,0.45)',
    silver: '0 0 40px -10px rgba(217,226,236,0.18)',
  }[p.accent];

  return (
    <motion.button
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      onClick={onOpen}
      data-magnetic
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
      className="group relative block overflow-hidden rounded-2xl p-7 text-left glass"
    >
      {/* hover light */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: useTransform(
            [gx, gy],
            ([x, y]) => `radial-gradient(360px circle at ${x} ${y}, rgba(91,192,190,0.12), transparent 60%)`
          ),
        }}
      />
      {/* accent ring */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
           style={{ boxShadow: accentRing }} />

      <div className="flex items-start justify-between" style={{ transform: 'translateZ(20px)' }}>
        <div className="flex items-center gap-2">
          <span className="hud-label">{p.code}</span>
          <span className="h-3 w-px bg-silver/20" />
          <span className="hud-label text-cyan/80">{p.year}</span>
        </div>
        <span className="hud-label opacity-60">{p.tags.join(' · ')}</span>
      </div>

      <h3 className="mt-6 font-display text-2xl leading-tight text-silver-soft sm:text-3xl"
          style={{ transform: 'translateZ(30px)' }}>
        {p.title}
      </h3>

      <p className="mt-3 max-w-md font-sans text-sm leading-relaxed text-silver-dim"
         style={{ transform: 'translateZ(20px)' }}>
        {p.summary}
      </p>

      <div className="mt-7 flex flex-wrap items-center gap-2" style={{ transform: 'translateZ(15px)' }}>
        {p.stack.map((s) => (
          <span key={s} className="hud-label rounded-full px-2.5 py-1 hair">
            {s}
          </span>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between" style={{ transform: 'translateZ(25px)' }}>
        <span className="hud-label">{p.role.toUpperCase()}</span>
        <span className="inline-flex items-center gap-2 font-display text-sm text-cyan">
          OPEN MISSION
          <span className="transition-transform duration-300 group-hover:translate-x-1">▸</span>
        </span>
      </div>
    </motion.button>
  );
}

function ProjectViewer({ project, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-6"
    >
      <div className="absolute inset-0 bg-ink-900/80 backdrop-blur-md" onClick={onClose} />
      <motion.div
        initial={{ y: 40, opacity: 0, scale: 0.96 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 20, opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="glass relative z-10 w-full max-w-3xl overflow-hidden rounded-2xl p-10"
      >
        <div className="flex items-center justify-between">
          <span className="hud-label text-cyan/80">{project.code} · {project.year}</span>
          <button onClick={onClose} className="hud-label hover:text-cyan">CLOSE ✕</button>
        </div>
        <h3 className="mt-6 font-display text-4xl leading-tight text-silver-soft sm:text-5xl">
          {project.title}
        </h3>
        <p className="mt-5 font-sans text-base leading-relaxed text-silver-dim">{project.summary}</p>
        <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
          <Detail k="Role" v={project.role} />
          <Detail k="Tags" v={project.tags.join(', ')} />
          <Detail k="Stack" v={project.stack.join(' · ')} />
          <Detail k="Year" v={String(project.year)} />
        </div>
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 font-display text-sm tracking-widest text-silver-soft transition-all hover:text-cyan"
            style={{
              border: '1px solid rgba(91,192,190,0.4)',
              background: 'linear-gradient(180deg, rgba(28,36,49,0.7), rgba(13,17,23,0.7))',
              boxShadow: '0 0 20px rgba(91,192,190,0.12)',
            }}
          >
            VIEW ON GITHUB <span className="text-cyan">↗</span>
          </a>
        )}
      </motion.div>
    </motion.div>
  );
}

function Detail({ k, v }) {
  return (
    <div className="rounded-lg p-3 hair">
      <div className="hud-label opacity-70">{k}</div>
      <div className="mt-1 font-sans text-silver">{v}</div>
    </div>
  );
}
