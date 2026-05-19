import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export const ProjectsSection = () => {
  const projects = [
    {
      title: 'AI Portfolio Assistant',
      description: 'A polished conversational interface that helps visitors explore projects, experience, and services without digging through dense content.',
      tech: ['React', 'Conversation UX', 'Motion'],
    }
  ];

  return (
    <section id="projects" className="section-shell pt-12 sm:pt-16 lg:pt-20">
      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="section-kicker">Portfolio</span>
          <h2 className="section-title mt-4">Some featured projects</h2>
          <p className="section-subtitle">Presented with larger visual anchors and cleaner storytelling so each project has room to breathe.</p>
        </motion.div>

        <motion.div
          className="mt-14 space-y-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.06 }}
        >
          {projects.map((project, idx) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.06 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="project-card glass-effect"
            >
              <div className={`project-preview ${idx % 2 === 1 ? 'lg:order-2 lg:justify-self-end' : ''}`}>
                <img src="/src/assets/project-bg.svg" alt="project preview" className="w-full h-full object-cover" />
              </div>

              <div className={`flex flex-col justify-center ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                <span className="number-pill">{idx + 1}</span>
                <h3 className="mt-5 font-grotesk text-3xl font-semibold text-white">{project.title}</h3>
                <p className="mt-4 max-w-lg text-sm leading-7 text-muted sm:text-base">{project.description}</p>

                <div className="mt-6 flex flex-wrap gap-2.5">
                  {project.tech.map((tech) => (
                    <span key={tech} className="tag-pill">
                      {tech}
                    </span>
                  ))}
                </div>

                <motion.a
                  href="#contact"
                  className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-white transition-opacity hover:opacity-80"
                  whileHover={{ x: 4 }}
                >
                  Start a similar project
                  <ArrowUpRight size={15} />
                </motion.a>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
