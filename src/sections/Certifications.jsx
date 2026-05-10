import { motion } from 'framer-motion';
import SectionShell from '../components/SectionShell';
import { credentials, identity } from '../data/portfolio';

// Certifications / credentials zone — proof layer.
// Uses verified academic + leadership + technical signals from the current portfolio data.
export default function Certifications() {
  return (
    <SectionShell
      id="certifications"
      eyebrow="04 · CREDENTIAL VAULT"
      title="Certifications & credentials"
      kicker="This layer holds formal certifications when available, plus the proof signals that make the portfolio feel complete and credible."
    >
      <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.28 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="glass relative overflow-hidden rounded-2xl p-8 lg:col-span-5"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-cyan/10 via-transparent to-violet/10" />
          <div className="relative z-10 flex h-full flex-col justify-between gap-8">
            <div>
              <div className="flex items-center justify-between">
                <span className="hud-label text-cyan/80">CERTIFICATION VAULT</span>
                <span className="hud-label">ACTIVE</span>
              </div>

              <div className="mt-8 rounded-2xl border border-cyan/10 bg-ink-900/40 p-6">
                <p className="hud-label text-cyan/80">STATUS</p>
                <h3 className="mt-3 font-display text-lg leading-snug text-silver-soft sm:text-xl">
                  Open to Opportunities
                </h3>
                <p className="mt-2 font-sans text-xs leading-relaxed text-silver-dim">
                  Actively seeking roles in software engineering, blockchain, and creative tech.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <Metric label="Identity" value={identity.role} />
              <Metric label="Location" value={identity.location} />
              <Metric label="Status" value={identity.status} accent />
            </div>
          </div>
        </motion.div>

        <div className="grid gap-4 lg:col-span-7">
          {credentials.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="glass-vivid group relative overflow-hidden rounded-2xl p-6"
            >
              <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: 'radial-gradient(600px circle at 20% 20%, rgba(56,239,245,0.10), transparent 55%)' }} />
              <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-cyan" style={{ boxShadow: '0 0 12px rgba(56,239,245,0.7)' }} />
                    <span className="hud-label text-cyan/80">{item.label}</span>
                  </div>
                  <h4 className="mt-3 font-display text-2xl text-silver-soft">{item.issuer}</h4>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-silver-dim">{item.detail}</p>
                </div>

                <div className="flex flex-col items-start gap-2 sm:items-end">
                  <span className="hud-label">{item.status}</span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-cyan/15 bg-ink-900/40 px-3 py-1 text-xs text-cyan/80">
                    VERIFIED SIGNAL
                    <span>▸</span>
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

function Metric({ label, value, accent = false }) {
  return (
    <div className="rounded-xl border border-silver/10 bg-ink-900/35 p-4 text-center">
      <div className={`hud-label ${accent ? 'text-cyan/80' : ''}`}>{label}</div>
      <div className="mt-2 font-display text-sm text-silver-soft sm:text-base">{value}</div>
    </div>
  );
}