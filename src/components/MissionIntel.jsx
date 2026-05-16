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
      className="pointer-events-none fixed bottom-24 left-4 z-40 hidden w-[min(28rem,calc(100vw-2rem))] rounded-2xl border border-cyan/20 bg-ink-900/65 p-4 backdrop-blur-2xl lg:block"
      style={{ boxShadow: '0 0 30px rgba(56,239,245,0.10), inset 0 0 26px rgba(56,239,245,0.06)' }}
    >
      <div className="flex items-center justify-between">
        <span className="hud-label text-cyan/80">MISSION CONTROL</span>
        <span className="hud-label">{transitioning ? 'WARPING…' : 'STABLE'}</span>
      </div>

      <div className="mt-4 rounded-xl border border-silver/10 bg-ink-900/55 p-3">
        <div className="flex items-center justify-between">
          <span className="hud-label">{protocol.codename.toUpperCase()}</span>
          <span className="hud-label text-cyan/80">{completion}% COMPLETE</span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-silver-dim">{protocol.objective}</p>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-silver/10">
          <motion.div
            key={zone}
            initial={{ width: 0 }}
            animate={{ width: `${completion}%` }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, rgba(56,239,245,0.9), rgba(0,201,122,0.9))' }}
          />
        </div>
      </div>

      <ul className="mt-3 grid gap-2">
        {protocol.tasks.map((task) => (
          <li key={task} className="flex items-center justify-between rounded-lg border border-silver/10 bg-ink-900/45 px-3 py-2">
            <span className="hud-label text-[9px] text-silver-dim">TASK</span>
            <span className="text-xs text-silver">{task}</span>
          </li>
        ))}
      </ul>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="rounded-lg border border-silver/10 bg-ink-900/45 p-3">
          <div className="hud-label opacity-70">RESPONSE TIME</div>
          <div className="mt-1 text-sm text-cyan">{availability.response}</div>
        </div>
        <div className="rounded-lg border border-silver/10 bg-ink-900/45 p-3">
          <div className="hud-label opacity-70">DEPLOY MODE</div>
          <div className="mt-1 text-xs text-silver">{availability.mode}</div>
        </div>
      </div>

      <div className="mt-3 rounded-lg border border-silver/10 bg-ink-900/45 p-3">
        <div className="hud-label opacity-70">ACTIVE MODULES</div>
        <div className="mt-2 flex flex-wrap gap-2">
          {services.map((service) => (
            <span key={service.id} className="rounded-full border border-cyan/20 px-2.5 py-1 text-[10px] text-cyan/90">
              {service.title}
            </span>
          ))}
        </div>
      </div>
    </motion.aside>
  );
}
