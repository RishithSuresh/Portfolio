import { motion } from 'framer-motion';

// Shared section wrapper: full viewport height, padded, with HUD heading.
// Provides the staggered entry for any section block placed inside.
export default function SectionShell({ id, eyebrow, title, kicker, children, align = 'left', minH = 'min-h-screen' }) {
  return (
    <section
      id={`zone-${id}`}
      className={`relative ${minH} w-full px-6 py-28 sm:px-10 md:px-16 lg:px-24`}
    >
      <div className={`mx-auto flex max-w-7xl flex-col gap-12 ${align === 'center' ? 'items-center text-center' : ''}`}>
        {(eyebrow || title || kicker) && (
          <motion.header
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-4"
          >
            {eyebrow && (
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-cyan/50" />
                <span className="hud-label text-cyan/80">{eyebrow}</span>
              </div>
            )}
            {title && (
              <h2 className="font-display text-4xl leading-[1.05] tracking-tight text-silver-soft sm:text-5xl md:text-6xl lg:text-7xl">
                {title}
              </h2>
            )}
            {kicker && (
              <p className="max-w-2xl font-sans text-base text-silver-dim sm:text-lg">{kicker}</p>
            )}
          </motion.header>
        )}
        {children}
      </div>
    </section>
  );
}
