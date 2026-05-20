import { motion } from 'framer-motion';

export const SkillsSection = () => {
  const skillCategories = [
    { title: 'Frontend', skills: ['React', 'Vite', 'Tailwind', 'Framer Motion'] },
    { title: 'Backend', skills: ['Node.js', 'Express', 'REST APIs', 'Authentication'] },
    { title: 'AI / ML', skills: ['LLMs', 'Prompt UX', 'Automation', 'Applied AI'] },
    { title: 'Design stack', skills: ['Figma', 'Typography', 'Visual systems', 'Prototyping'] },
  ];

  return (
    <section id="skills" className="section-shell pt-12 sm:pt-16 lg:pt-20">
      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="section-header"
        >
          <span className="section-kicker">Capabilities</span>
          <h2 className="section-title">Technology and design leverage</h2>
          <p className="section-subtitle">A high-impact stack across interface systems, product engineering, and strategic visual execution.</p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
          {skillCategories.map((category, idx) => (
            <motion.article
              key={category.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: idx * 0.05 }}
              whileHover={{ y: -4 }}
               className="glass-effect premium-outline shine-sweep rounded-[2rem] p-6 sm:p-7"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-xl font-grotesk font-semibold leading-[1.1] text-white">{category.title}</h3>
                <span className="number-pill">{idx + 1}</span>
              </div>
              <div className="mt-6 flex flex-wrap gap-2.5">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="tag-pill"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
