import { motion } from 'framer-motion';
import SectionShell from '../components/SectionShell';
import { identity, attributes, stats } from '../data/portfolio';

// About zone — interactive operator profile.
// Layout: identity card (left) + attributes / stats (right).
export default function About() {
  return (
    <SectionShell
      id="about"
      eyebrow="01 · IDENTITY"
      title="Operator profile"
      kicker="A scan of the operator behind the system. Specs, signature, and current operating parameters."
    >
      <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Identity card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="glass relative overflow-hidden rounded-2xl p-8 lg:col-span-5"
        >
          {/* corner glyphs */}
          <CornerGlyphs />

          <div className="flex items-center justify-between">
            <span className="hud-label">UID · 0xAETHER</span>
            <span className="hud-label text-cyan/80">CLEARANCE · 5</span>
          </div>

          {/* avatar holo */}
          <div className="relative mx-auto my-8 h-44 w-44">
            <div className="absolute inset-0 animate-spin-slow rounded-full" style={{
              background: 'conic-gradient(from 0deg, rgba(91,192,190,0.0), rgba(91,192,190,0.5), rgba(91,192,190,0.0) 60%)',
              filter: 'blur(8px)',
            }} />
            <div className="absolute inset-2 rounded-full hair" />
            <div className="absolute inset-4 rounded-full hair" />
            <div className="absolute inset-6 rounded-full glass flex items-center justify-center">
              <span className="font-display text-4xl text-holo">{identity.callsign[0]}</span>
            </div>
            <div className="absolute -inset-2 rounded-full" style={{ boxShadow: '0 0 60px rgba(91,192,190,0.18)' }} />
          </div>

          <div className="text-center">
            <h3 className="font-display text-2xl text-silver-soft">{identity.name}</h3>
            <p className="mt-1 hud-label text-cyan/80">{identity.role}</p>
            <p className="mt-5 font-sans text-sm leading-relaxed text-silver-dim">{identity.bio}</p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3">
            <Pill k="Status" v={identity.status} accent />
            <Pill k="Origin" v={identity.location} />
          </div>
        </motion.div>

        {/* Attributes & stats */}
        <div className="flex flex-col gap-6 lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="glass rounded-2xl p-7"
          >
            <div className="mb-6 flex items-center justify-between">
              <h4 className="font-display text-xl text-silver-soft">Attributes</h4>
              <span className="hud-label">CALIBRATED</span>
            </div>
            <div className="space-y-5">
              {attributes.map((a, i) => (
                <Attribute key={a.label} {...a} delay={i * 0.08} />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-2 gap-4 sm:grid-cols-4"
          >
            {stats.map((s) => (
              <div key={s.label} className="glass rounded-xl p-4 text-center">
                <div className="font-display text-3xl text-holo">{s.value}{s.suffix}</div>
                <div className="mt-1 hud-label">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </SectionShell>
  );
}

function Attribute({ label, value, delay = 0 }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="font-sans text-sm text-silver">{label}</span>
        <span className="hud-label">{Math.round(value)}</span>
      </div>
      <div className="relative h-1.5 overflow-hidden rounded-full bg-silver/5">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.4, delay, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full"
          style={{
            background: 'linear-gradient(90deg, rgba(46,139,87,0.9), rgba(91,192,190,0.95))',
            boxShadow: '0 0 16px rgba(91,192,190,0.45)',
          }}
        />
        <div className="pointer-events-none absolute inset-0" style={{
          background: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.04) 0 2px, transparent 2px 6px)',
        }} />
      </div>
    </div>
  );
}

function Pill({ k, v, accent }) {
  return (
    <div className={`rounded-lg px-3 py-2 hair ${accent ? 'text-cyan' : 'text-silver'}`}>
      <div className="hud-label opacity-70">{k}</div>
      <div className="mt-1 font-sans text-sm">{v}</div>
    </div>
  );
}

function CornerGlyphs() {
  return (
    <>
      <span className="absolute left-3 top-3 h-3 w-3 border-l border-t border-cyan/40" />
      <span className="absolute right-3 top-3 h-3 w-3 border-r border-t border-cyan/40" />
      <span className="absolute left-3 bottom-3 h-3 w-3 border-l border-b border-cyan/40" />
      <span className="absolute right-3 bottom-3 h-3 w-3 border-r border-b border-cyan/40" />
    </>
  );
}
