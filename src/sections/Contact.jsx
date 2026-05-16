import { motion } from 'framer-motion';
import { useState } from 'react';
import SectionShell from '../components/SectionShell';
import Magnetic from '../components/Magnetic';
import { availability, channels, identity, services } from '../data/portfolio';

// Contact zone — futuristic communication terminal.
// A holographic panel with animated input states and a magnetic send button.
export default function Contact() {
  const [state, setState] = useState({ name: '', email: '', msg: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent

  const onChange = (k) => (e) => setState((s) => ({ ...s, [k]: e.target.value }));

  const onSend = (e) => {
    e.preventDefault();
    if (status !== 'idle') return;
    setStatus('sending');
    // Simulate transmission — in production wire to your backend / mail service.
    setTimeout(() => setStatus('sent'), 1400);
  };

  return (
    <SectionShell
      id="contact"
      eyebrow="06 · SUMMON"
      title="Send a raven"
      kicker="Send your message. Channels stay quiet, but never closed."
    >
      <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Terminal */}
        <motion.form
          onSubmit={onSend}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="glass scanlines relative overflow-hidden rounded-2xl p-7 lg:col-span-7"
        >
          <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 animate-pulse-soft rounded-full bg-emerald" />
                <span className="hud-label text-cyan/80">RAVEN NET · KAGE-01</span>
              </div>
              <span className="hud-label">SEALED · ENCRYPTED</span>
          </div>

          <Field label="RONIN // NAME" value={state.name} onChange={onChange('name')} placeholder="your name" />
          <Field label="RETURN SCROLL // EMAIL" type="email" value={state.email} onChange={onChange('email')} placeholder="you@domain.dev" />
          <Field label="MESSAGE // BRIEF" multiline value={state.msg} onChange={onChange('msg')} placeholder="What are we building?" />

          <div className="mt-6 flex items-center justify-between">
            <span className="hud-label opacity-70">
              {status === 'idle' && 'AWAITING INPUT'}
              {status === 'sending' && 'SENDING RAVEN…'}
              {status === 'sent' && 'RAVEN DELIVERED'}
            </span>
            <Magnetic strength={0.4}>
              <button
                data-magnetic
                type="submit"
                className="relative inline-flex items-center justify-center rounded-full px-6 py-3 font-display text-sm tracking-hud text-silver-soft"
                style={{
                  border: '1px solid rgba(245,158,11,0.5)',
                  background: 'linear-gradient(180deg, rgba(33,19,39,0.8), rgba(11,6,13,0.8))',
                  boxShadow: '0 0 28px rgba(245,158,11,0.22), inset 0 0 14px rgba(157,23,77,0.12)',
                }}
              >
                {status === 'sent' ? 'DELIVERED ✓' : 'SEND RAVEN'}
                <motion.span
                  className="ml-3 text-cyan"
                  animate={status === 'sending' ? { rotate: 360 } : { x: [0, 4, 0] }}
                  transition={status === 'sending'
                    ? { duration: 1.0, repeat: Infinity, ease: 'linear' }
                    : { duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                >
                  {status === 'sending' ? '◌' : '▸'}
                </motion.span>
              </button>
            </Magnetic>
          </div>
        </motion.form>

        {/* Channels */}
        <motion.aside
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="glass rounded-2xl p-7 lg:col-span-5"
        >
          <h4 className="font-display text-xl text-silver-soft">Direct channels</h4>
          <p className="mt-1 hud-label">CHOOSE A CHANNEL</p>
          <ul className="mt-6 space-y-3">
            {channels.map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  target="_blank" rel="noreferrer"
                  data-magnetic
                  className="group flex items-center justify-between rounded-xl p-4 hair transition-all hover:bg-cyan/5"
                >
                  <span className="hud-label">{c.label}</span>
                  <span className="font-sans text-sm text-silver group-hover:text-cyan">
                    {c.value} <span className="ml-2 text-cyan">↗</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-xl p-5 hair">
            <div className="hud-label opacity-70">CURRENT STATUS</div>
            <div className="mt-2 font-display text-lg text-cyan">{identity.status}</div>
            <p className="mt-2 text-xs text-silver-dim">Timezone: {availability.timezone}</p>
            <p className="mt-1 text-xs text-silver-dim">Response: {availability.response}</p>
          </div>

          <div className="mt-4 rounded-xl p-5 hair">
            <div className="hud-label opacity-70">ENGAGEMENT MODES</div>
            <p className="mt-2 text-xs leading-relaxed text-silver-dim">{availability.mode}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {availability.preferredRoles.map((role) => (
                <span key={role} className="rounded-full border border-cyan/20 px-2.5 py-1 text-[10px] text-cyan/90">
                  {role}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4 rounded-xl p-5 hair">
            <div className="hud-label opacity-70">WHAT I BUILD</div>
            <ul className="mt-3 space-y-2">
              {services.map((service) => (
                <li key={service.id}>
                  <p className="text-xs text-silver">{service.title}</p>
                  <p className="mt-1 text-xs text-silver-dim">{service.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </motion.aside>
      </div>
    </SectionShell>
  );
}

function Field({ label, value, onChange, placeholder, type = 'text', multiline = false }) {
  return (
    <label className="mb-5 block">
      <span className="mb-2 flex items-center justify-between">
        <span className="hud-label">{label}</span>
        <span className="hud-label opacity-50">{value.length} CH</span>
      </span>
      {multiline ? (
        <textarea
          value={value}
          onChange={onChange}
          rows={5}
          placeholder={placeholder}
          data-cursor="text"
          className="w-full resize-none rounded-lg bg-ink-900/50 p-4 font-sans text-sm text-silver-soft placeholder:text-silver-dim/60 focus:outline-none"
          style={{ border: '1px solid rgba(217,226,236,0.10)' }}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          data-cursor="text"
          className="w-full rounded-lg bg-ink-900/50 p-4 font-sans text-sm text-silver-soft placeholder:text-silver-dim/60 focus:outline-none"
          style={{ border: '1px solid rgba(217,226,236,0.10)' }}
        />
      )}
    </label>
  );
}
