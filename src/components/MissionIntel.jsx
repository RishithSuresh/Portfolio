import { motion } from 'framer-motion';
import { useWorld } from '../context/WorldContext';
import { availability, missionProtocols, services, zones } from '../data/portfolio';

export default function MissionIntel() {
  const { ignited, zone, transitioning } = useWorld();
  if (!ignited) return null;

  const activeIndex = Math.max(0, zones.findIndex((z) => z.id === zone));
  const completion = Math.round(((activeIndex + 1) / zones.length) * 100);
  const protocol = missionProtocols[zone] ?? missionProtocols.home;

  return (
    <motion.aside
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-none fixed bottom-24 left-4 z-40 hidden w-[min(28rem,calc(100vw-2rem))] overflow-hidden rounded-3xl border border-cyan/30 glass-vivid p-4 shimmer scanlines lg:block"
      style={{ boxShadow: '0 0 42px rgba(56,239,245,0.18), 0 0 84px rgba(217,70,239,0.12), inset 0 0 28px rgba(56,239,245,0.08)' }}
    >
      <div className="aurora-orb orb-cyan absolute -left-20 -top-24 h-56 w-56 opacity-70" />
      <div className="aurora-orb orb-violet absolute -right-16 bottom-8 h-44 w-44 opacity-55" />
      <div className="aurora-orb orb-green absolute left-1/3 top-1/2 h-40 w-40 opacity-50" />

      <div className="flex items-center justify-between">
        <span className="hud-label text-aurora">MISSION CONTROL</span>
        <span className="rounded-full border border-emerald/30 bg-emerald/10 px-2.5 py-1 font-mono text-[10px] tracking-[0.22em] text-emerald">
          {transitioning ? 'WARPING…' : 'STABLE'}
        </span>
      </div>

      <div className="mt-4 rounded-2xl border border-cyan/25 bg-ink-900/70 p-3">
        <div className="flex items-center justify-between">
          <span className="hud-label text-silver">{protocol.codename.toUpperCase()}</span>
          <span className="hud-label text-cyan">{completion}% COMPLETE</span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-silver">{protocol.objective}</p>
        <div className="mt-3 h-2 overflow-hidden rounded-full border border-cyan/20 bg-silver/10">
          <motion.div
            key={zone}
            initial={{ width: 0 }}
            animate={{ width: `${completion}%` }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="h-full rounded-full glow-cyan"
            style={{ background: 'linear-gradient(90deg, rgba(56,239,245,0.95), rgba(217,70,239,0.9), rgba(0,201,122,0.95))' }}
          />
        </div>
      </div>

      <ul className="mt-3 grid gap-2">
        {protocol.tasks.map((task) => (
          <li key={task} className="flex items-center justify-between rounded-xl border border-cyan/20 bg-ink-900/55 px-3 py-2">
            <span className="hud-label text-[9px] text-cyan/70">TASK</span>
            <span className="text-xs text-silver-soft">{task}</span>
          </li>
        ))}
      </ul>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="rounded-xl border border-cyan/20 bg-ink-900/55 p-3">
          <div className="hud-label opacity-70">RESPONSE TIME</div>
          <div className="mt-1 text-base font-medium text-aurora">{availability.response}</div>
        </div>
        <div className="rounded-xl border border-fuchsia/20 bg-ink-900/55 p-3">
          <div className="hud-label opacity-70">DEPLOY MODE</div>
          <div className="mt-1 text-xs text-silver-soft">{availability.mode}</div>
        </div>
      </div>

      <div className="mt-3 rounded-xl border border-cyan/20 bg-ink-900/55 p-3">
        <div className="hud-label opacity-70">ACTIVE MODULES</div>
        <div className="mt-2 flex flex-wrap gap-2">
          {services.map((service) => (
            <span
              key={service.id}
              className="rounded-full border border-cyan/30 bg-cyan/5 px-2.5 py-1 text-[10px] text-cyan"
              style={{ boxShadow: '0 0 20px rgba(56,239,245,0.14)' }}
            >
              {service.title}
            </span>
          ))}
        </div>
      </div>
    </motion.aside>
  );
}
