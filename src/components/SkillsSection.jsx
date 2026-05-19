import { motion } from 'framer-motion';

export const SkillsSection = () => {
  const skillCategories = [
    { title: 'Frontend', skills: ['React', 'TypeScript', 'Tailwind', 'Framer Motion'] },
    { title: 'Backend', skills: ['Node.js', 'Python', 'Express', 'FastAPI'] },
    { title: 'AI / ML', skills: ['TensorFlow', 'PyTorch', 'LLMs', 'NLP'] },
    { title: 'Database', skills: ['PostgreSQL', 'MongoDB', 'Redis', 'Firebase'] },
    { title: 'Cloud & DevOps', skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'] },
    { title: 'Tooling', skills: ['Git', 'REST APIs', 'GraphQL', 'Figma'] },
  ];

  return (
    <section id="skills" className="section-shell pt-12 sm:pt-16 lg:pt-20">
      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="section-title">Skills & Expertise</h2>
          <p className="section-subtitle">A focused set of tools and technologies I use to build, ship, and scale modern digital products.</p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {skillCategories.map((category, idx) => (
            <motion.article
              key={category.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: idx * 0.05 }}
              whileHover={{ y: -4 }}
              className="glass-effect rounded-3xl p-6"
            >
              <h3 className="text-xl font-grotesk font-semibold text-white">{category.title}</h3>
              <div className="mt-5 flex flex-wrap gap-2.5">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-white/12 bg-white/[0.03] px-3.5 py-1.5 text-xs sm:text-sm text-soft"
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
