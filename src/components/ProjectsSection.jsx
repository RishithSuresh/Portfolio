import { motion } from 'framer-motion';
import { ArrowUpRight, GitBranch } from 'lucide-react';

export const ProjectsSection = () => {
  const projects = [
    {
      title: 'AI Chat Platform',
      description: 'Intelligent conversational product with real-time collaboration, search, and context-aware assistance.',
      tech: ['React', 'Node.js', 'LLM', 'WebSocket'],
      github: 'https://github.com',
      live: 'https://demo.com',
      size: 'lg:col-span-2 lg:row-span-2',
    },
    {
      title: 'Analytics Dashboard',
      description: 'Data-rich dashboard system with modular charts and role-based insights.',
      tech: ['TypeScript', 'Charts', 'API Design'],
      github: 'https://github.com',
      live: 'https://demo.com',
      size: 'lg:col-span-1',
    },
    {
      title: 'Cloud Delivery Suite',
      description: 'Automated deployment and observability toolkit for distributed web services.',
      tech: ['AWS', 'Docker', 'CI/CD'],
      github: 'https://github.com',
      live: 'https://demo.com',
      size: 'lg:col-span-1',
    },
    {
      title: 'ML Deployment Pipeline',
      description: 'Model training and serving workflow with scalable inference endpoints.',
      tech: ['TensorFlow', 'FastAPI', 'Kubernetes'],
      github: 'https://github.com',
      live: 'https://demo.com',
      size: 'lg:col-span-2',
    },
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
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">A curated selection of product and engineering work delivered with clarity, depth, and strong user experience focus.</p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-5 auto-rows-[220px]">
          {projects.map((project, idx) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              whileHover={{ y: -6 }}
              className={`${project.size} group relative overflow-hidden rounded-3xl glass-effect p-6 sm:p-7`}
            >
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.4 }}
                style={{
                  background: 'radial-gradient(circle at 10% 0%, rgba(255,255,255,0.12), transparent 55%)',
                }}
              />

              <div className="relative h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-grotesk font-semibold text-white">{project.title}</h3>
                  <p className="mt-3 text-sm sm:text-base leading-relaxed text-muted max-w-xl">{project.description}</p>
                </div>

                <div>
                  <div className="mb-5 flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span key={tech} className="rounded-full border border-white/12 bg-white/[0.03] px-3 py-1 text-xs text-soft">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pill-button !px-5 !py-2.5 text-soft"
                      whileHover={{ scale: 1.03 }}
                    >
                      <GitBranch size={14} />
                      Code
                    </motion.a>
                    <motion.a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pill-button !px-5 !py-2.5 text-white"
                      whileHover={{ scale: 1.03 }}
                    >
                      <ArrowUpRight size={14} />
                      Live
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
