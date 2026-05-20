import { motion } from 'framer-motion';
import { Compass, Layout, Rocket, Sparkles } from 'lucide-react';

export const AboutSection = () => {
  const process = [
    {
      icon: Compass,
      title: 'Product research and clarity',
      text: 'I start by understanding the audience, current friction points, and the visual tone needed to make the portfolio feel intentional.',
      action: 'User goals • structure • references',
    },
    {
      icon: Layout,
      title: 'Interface direction and systems',
      text: 'Then I shape the layout, hierarchy, and reusable UI patterns so each section feels connected instead of visually isolated.',
      action: 'Layout rhythm • cards • typography',
    },
    {
      icon: Rocket,
      title: 'Polish, motion, and delivery',
      text: 'Finally I refine the interaction details, animation pacing, and responsive behavior to make the final experience feel premium.',
      action: 'Motion • responsiveness • launch-ready finish',
    },
  ];

  return (
    <section id="about" className="section-shell">
      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="section-header"
        >
          <span className="section-kicker">Process</span>
          <h2 className="section-title">How I craft premium digital presence</h2>
          <p className="section-subtitle">
              A strategy-led process focused on clarity, visual authority, and premium execution from the first fold to the final conversion touchpoint.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(18rem,0.75fr)] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="timeline-shell space-y-10"
          >
            {process.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: idx * 0.08 }}
                  className="timeline-row"
                >
                  <span className="timeline-step">{idx + 1}</span>
                  <div className="pb-3">
                    <div className="icon-disc">
                      <Icon size={18} />
                    </div>
                    <h3 className="mt-6 font-grotesk text-2xl font-semibold leading-[1.12] text-white">{item.title}</h3>
                    <p className="mt-4 max-w-2xl text-sm leading-8 text-muted sm:text-base">{item.text}</p>
                    <span className="mt-6 inline-flex rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs tracking-[0.08em] text-white/76">
                      {item.action}
                    </span>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.12 }}
             className="glass-panel premium-outline rounded-[2rem] p-7 sm:p-8"
          >
            <span className="section-kicker">What changes</span>
              <h3 className="mt-5 font-grotesk text-2xl font-semibold leading-[1.12] text-white">A presentation-ready portfolio architecture</h3>
              <p className="mt-4 text-sm leading-8 text-muted sm:text-base">
               The redesign introduces intentional contrast, stronger compositional rhythm, and premium storytelling blocks designed for executive and client-facing audiences.
              </p>

            <div className="mt-8 space-y-3">
              {['Structured hero framing', 'Cleaner project storytelling', 'Higher-end visual consistency'].map((item) => (
                <div key={item} className="stat-chip w-full justify-start text-sm text-white/80">
                  <Sparkles size={14} className="text-[#ffd6a0]" />
                  {item}
                </div>
              ))}
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
};
