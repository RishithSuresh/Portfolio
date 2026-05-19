import { motion } from 'framer-motion';
import { Quote, Sparkles } from 'lucide-react';

export const ExperienceSection = () => {
  const testimonials = [
    {
      name: 'Founder, SaaS product',
      role: 'Product lead',
      quote: 'The work consistently feels premium, deliberate, and conversion-focused. Every section looks more intentional after the redesign.',
    },
    {
      name: 'Design collaborator',
      role: 'Product designer',
      quote: 'Strong visual hierarchy and polished motion made the final build feel much closer to a top-tier portfolio showcase.',
    },
    {
      name: 'Startup operator',
      role: 'Marketing lead',
      quote: 'The updated sections guide attention naturally. It is cleaner, easier to scan, and far more memorable than before.',
    },
    {
      name: 'Agency partner',
      role: 'Creative director',
      quote: 'The design system feels cohesive from the hero to the closing CTA, which gives the site a much stronger brand presence.',
    },
  ];

  const stats = [
    { number: '50+', label: 'Projects shaped' },
    { number: '4+', label: 'Years refining UI' },
    { number: '100%', label: 'Responsive sections' },
    { number: '1', label: 'Unified visual language' },
  ];

  return (
    <section id="experience" className="section-shell pt-12 sm:pt-16 lg:pt-20">
      <div className="section-inner max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="section-kicker">Social proof</span>
          <h2 className="section-title mt-4">Client testimonials</h2>
          <p className="section-subtitle">A testimonial-style section to add trust and mirror the richer structure shown in the reference direction.</p>
        </motion.div>

        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              className="glass-effect rounded-2xl p-5 text-center"
            >
              <p className="text-2xl sm:text-3xl font-grotesk font-bold text-white">{stat.number}</p>
              <p className="mt-1 text-xs sm:text-sm text-muted">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          {testimonials.map((item, idx) => (
            <motion.article
              key={item.name}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: idx * 0.08 }}
              whileHover={{ y: -4 }}
              className="testimonial-card"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="avatar-dot" />
                  <div>
                    <p className="text-sm font-medium text-white">{item.name}</p>
                    <p className="text-xs text-muted">{item.role}</p>
                  </div>
                </div>
                <Quote size={20} className="text-[#ffd6a0]" />
              </div>
              <p className="mt-5 text-sm leading-7 text-muted">{item.quote}</p>
              <div className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-white/58">
                <Sparkles size={12} />
                premium UI feedback
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
