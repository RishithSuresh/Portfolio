import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export const ProjectsSection = () => {
  const projects = [
    {
      title: 'AI Portfolio Assistant',
      description: 'A high-end conversational interface that helps decision makers evaluate capability, trust, and delivery quality without friction.',
      tech: ['React', 'Conversation UX', 'Motion'],
      accent: 'from-[#8f92ff] via-[#d7c8ff] to-[#ffd6a0]',
    },
    {
      title: 'Analytics Command Center',
      description: 'An executive analytics workspace with elevated hierarchy, premium data framing, and responsive command panels for strategic reporting.',
      tech: ['Dashboards', 'Visual hierarchy', 'Data UI'],
      accent: 'from-[#ffd39f] via-[#d8c8ff] to-[#8f92ff]',
    },
    {
      title: 'Founders Launch Site',
      description: 'A conversion-focused launch website with cinematic section pacing, premium typography, and confidence-building calls to action.',
      tech: ['Brand systems', 'Conversion design', 'Responsive build'],
      accent: 'from-[#8f92ff] via-[#beb3ff] to-[#ffd6a0]',
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
          className="flex flex-col gap-4"
        >
          <span className="section-kicker">Portfolio</span>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="section-title mt-4">Featured premium case studies</h2>
              <p className="section-subtitle">Structured as high-trust narratives so each project communicates business value, craft quality, and execution confidence.</p>
            </div>
            <span className="floating-utility px-4 py-2 text-xs uppercase tracking-[0.22em] text-white/70">Executive selection</span>
          </div>
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
              whileHover={{ y: -8, scale: 1.01 }}
               className="project-card glass-effect premium-outline shine-sweep"
            >
              <div className={`project-preview ${idx % 2 === 1 ? 'lg:order-2 lg:justify-self-end' : ''}`}>
                <div className={`h-full w-full bg-gradient-to-br ${project.accent}`} />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.4),transparent_30%),linear-gradient(180deg,transparent,rgba(0,0,0,0.16))]" />
                <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/20 px-3 py-1 text-[0.65rem] uppercase tracking-[0.22em] text-white/80">0{idx + 1}</span>
              </div>

              <div className={`flex flex-col justify-center ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                <span className="number-pill">{idx + 1}</span>
                <h3 className="mt-5 max-w-xl font-grotesk text-3xl font-semibold leading-[1.08] text-white sm:text-[2.35rem]">{project.title}</h3>
                <p className="mt-5 max-w-xl text-sm leading-8 text-muted sm:text-base">{project.description}</p>

                <div className="mt-7 flex flex-wrap gap-2.5">
                  {project.tech.map((tech) => (
                    <span key={tech} className="tag-pill">
                      {tech}
                    </span>
                  ))}
                </div>

                 <motion.a
                   href="#contact"
                   className="mt-9 inline-flex items-center gap-2 text-sm font-medium text-white transition-opacity hover:opacity-80"
                   whileHover={{ x: 4 }}
                 >
                   Commission a similar product experience
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
