import { motion } from 'framer-motion';
import { Code2, Brain, Cloud } from 'lucide-react';

export const AboutSection = () => {
  const highlights = [
    { icon: Code2, title: 'Product Engineering', text: 'Building resilient full-stack systems with precise UI and scalable architecture.' },
    { icon: Brain, title: 'AI Integration', text: 'Crafting useful AI-powered experiences that blend naturally into product workflows.' },
    { icon: Cloud, title: 'Cloud Delivery', text: 'Deploying performant applications with automated pipelines and solid observability.' },
  ];

  return (
    <section id="about" className="section-shell">
      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="section-title">About</h2>
          <p className="section-subtitle">
            I create polished digital products where engineering quality and design detail are treated with equal importance.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6 text-muted text-lg leading-relaxed"
          >
            <p>
              Over the past several years, I have led and shipped user-facing products across startup and enterprise environments, balancing product speed with long-term maintainability.
            </p>
            <p>
              My work spans frontend craftsmanship, backend systems, cloud infrastructure, and AI-assisted product features. I focus on thoughtful details, robust performance, and outcomes that feel premium.
            </p>
            <motion.a
              href="#"
              className="pill-button text-white mt-2"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              Download resume
            </motion.a>
          </motion.div>

          <div className="space-y-4">
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: idx * 0.12 }}
                  whileHover={{ y: -4 }}
                  className="glass-effect rounded-3xl p-6 sm:p-7"
                >
                  <div className="flex items-start gap-4">
                    <div className="rounded-2xl border border-white/12 bg-white/5 p-3">
                      <Icon size={22} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-grotesk font-semibold text-white">{item.title}</h3>
                      <p className="mt-2 text-sm sm:text-base text-muted leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
