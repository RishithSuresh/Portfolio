"use client";

import { Canvas } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere } from "@react-three/drei";
import { motion } from "framer-motion";
import Lenis from "lenis";
import { ArrowUpRight, Github, Mail, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const skills = {
  Frontend: ["React", "Next.js", "Tailwind", "Framer Motion"],
  Backend: ["Node.js", "Express", "PostgreSQL", "REST APIs"],
  "UI/UX": ["Figma", "Design Systems", "Prototyping", "Interaction Design"],
  "AI/ML": ["Python", "TensorFlow", "Computer Vision", "NLP"],
  Cybersecurity: ["OWASP", "Threat Modeling", "SIEM", "Network Security"],
  "Tools & Technologies": ["GitHub", "Docker", "AWS", "Vercel"],
};

const projects = [
  {
    name: "Vision Commerce",
    category: "Luxury E-Commerce",
    description:
      "A cinematic storefront with fluid storytelling, product immersion, and conversion-focused interactions.",
  },
  {
    name: "Aether OS",
    category: "Product Experience",
    description:
      "A concept operating system landing page inspired by spatial computing, glass depth, and precision motion.",
  },
  {
    name: "Studio Noir",
    category: "Creative Portfolio",
    description:
      "An art-directed digital identity for a premium architecture studio with layered scroll narratives.",
  },
];

const experience = [
  { year: "2026", title: "Senior Frontend Engineer", org: "FutureForm Labs" },
  { year: "2024", title: "Creative Technologist", org: "Lumen Interactive" },
  { year: "2022", title: "UI Engineer", org: "Pixel Atelier" },
];

const testimonials = [
  {
    quote:
      "The experience felt like a product launch film translated into code — elegant, measured, unforgettable.",
    author: "Design Director, Atelier One",
  },
  {
    quote:
      "Every animation feels intentional. The level of polish is in a different league.",
    author: "Head of Product, Nova Systems",
  },
  {
    quote: "A rare blend of engineering depth and visual sophistication.",
    author: "Founder, Meridian Studio",
  },
];

function Orb() {
  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 55 }}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[2, 2, 2]} intensity={1.2} />
      <Float speed={1.8} rotationIntensity={1.1} floatIntensity={1.4}>
        <Sphere args={[1.15, 128, 128]}>
          <MeshDistortMaterial
            color="#d4af37"
            roughness={0.2}
            metalness={0.8}
            distort={0.35}
            speed={1.6}
          />
        </Sphere>
      </Float>
    </Canvas>
  );
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showOrb, setShowOrb] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
    let raf = 0;

    const animate = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setLoading(false);
          return 100;
        }
        return prev + 4;
      });
    }, 45);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setShowOrb(true);
  }, []);

  const blurDots = useMemo(
    () =>
      Array.from({ length: 18 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: i * 0.25,
      })),
    []
  );

  return (
    <div className="relative overflow-hidden bg-[#050505] text-[#f5f5f5]">
      <motion.div
        className="pointer-events-none fixed inset-0 z-0"
        animate={{ opacity: [0.45, 0.65, 0.45] }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      >
        <div className="absolute -left-28 top-24 h-80 w-80 rounded-full bg-[radial-gradient(circle,#d4af3770_0%,transparent_70%)] blur-3xl" />
        <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-[radial-gradient(circle,#ffffff30_0%,transparent_72%)] blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-[radial-gradient(circle,#a8a8a822_0%,transparent_72%)] blur-3xl" />
      </motion.div>

      {blurDots.map((dot) => (
        <motion.span
          key={dot.id}
          className="pointer-events-none fixed z-0 h-1 w-1 rounded-full bg-white/40"
          style={{ left: dot.left, top: dot.top }}
          animate={{ y: [0, -14, 0], opacity: [0.25, 0.8, 0.25] }}
          transition={{ duration: 5, delay: dot.delay, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      ))}

      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505]"
        initial={false}
        animate={loading ? { opacity: 1 } : { opacity: 0, pointerEvents: "none" }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="glass-panel w-[min(84vw,430px)] rounded-3xl p-8 text-center">
          <p className="text-xs tracking-[0.42em] text-[#a8a8a8]">RISHITH SURESH</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">Loading Experience</h1>
          <div className="mt-8 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <motion.div className="h-full bg-gradient-to-r from-[#d4af37] to-[#f7e7ce]" style={{ width: `${progress}%` }} />
          </div>
          <p className="mt-4 text-sm text-[#a8a8a8]">{progress}%</p>
        </div>
      </motion.div>

      <header className="fixed inset-x-0 top-5 z-40 mx-auto w-[min(92vw,1120px)]">
        <nav className="glass-panel flex items-center justify-between rounded-2xl px-6 py-4">
          <p className="text-sm tracking-[0.3em] text-[#f5f5f5]">RS</p>
          <div className="hidden gap-7 text-sm text-[#a8a8a8] md:flex">
            {[
              ["About", "#about"],
              ["Skills", "#skills"],
              ["Projects", "#projects"],
              ["Contact", "#contact"],
            ].map(([label, href]) => (
              <a key={label} href={href} className="soft-link">
                {label}
              </a>
            ))}
          </div>
          <a href="#contact" className="premium-btn text-xs">
            Let&apos;s Talk
          </a>
        </nav>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-6 pb-24 pt-32 md:px-8 md:pt-40">
        <section className="grid min-h-[80vh] items-center gap-12 md:grid-cols-[1.15fr_0.85fr]">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <p className="mb-4 flex items-center gap-2 text-xs tracking-[0.35em] text-[#a8a8a8]">
              <Sparkles size={14} /> APPLE-LEVEL DIGITAL CRAFT
            </p>
            <h1 className="text-balance text-5xl font-semibold leading-[1.02] tracking-tight md:text-7xl">
              Crafting Digital Experiences With Precision.
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-[#a8a8a8]">
              Frontend Developer • Creative Technologist • UI Experience Architect.
              I build cinematic interfaces that feel engineered, immersive, and premium.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="#projects" className="premium-btn">
                View Projects <ArrowUpRight size={16} />
              </a>
              <a href="#about" className="glass-btn">
                About Me
              </a>
              <a href="#contact" className="glass-btn">
                Contact
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="glass-panel relative h-[460px] overflow-hidden rounded-[2rem]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#ffffff22_0%,transparent_55%)]" />
            {showOrb ? <Orb /> : null}
          </motion.div>
        </section>

        <motion.section
          id="about"
          className="mt-24"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="section-head">
            <p>About</p>
            <h2>Storytelling through software, motion, and taste.</h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              "I design with whitespace, rhythm, and cinematic pacing.",
              "I engineer robust systems that stay fast under visual complexity.",
              "I obsess over micro-details that make interfaces feel alive.",
            ].map((item) => (
              <article key={item} className="glass-panel rounded-3xl p-6 text-[#d6d6d6]">
                {item}
              </article>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="skills"
          className="mt-24"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="section-head">
            <p>Skills</p>
            <h2>Modular capabilities across product, code, and interaction.</h2>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(skills).map(([group, values]) => (
              <article key={group} className="glass-panel skill-card rounded-3xl p-6">
                <h3 className="text-lg font-medium">{group}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {values.map((skill) => (
                    <span key={skill} className="chip">
                      {skill}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="projects"
          className="mt-24"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="section-head">
            <p>Projects</p>
            <h2>A curated gallery of premium interactive products.</h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {projects.map((project) => (
              <article key={project.name} className="glass-panel project-card rounded-3xl p-6">
                <p className="text-xs tracking-[0.25em] text-[#a8a8a8]">{project.category}</p>
                <h3 className="mt-3 text-2xl font-semibold">{project.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#d2d2d2]">{project.description}</p>
                <div className="mt-6 flex items-center gap-3 text-sm">
                  <a href="#" className="soft-link inline-flex items-center gap-1">
                    Live Preview <ArrowUpRight size={14} />
                  </a>
                  <a href="#" className="soft-link inline-flex items-center gap-1">
                    <Github size={14} /> GitHub
                  </a>
                </div>
              </article>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="mt-24"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="section-head">
            <p>Experience</p>
            <h2>Timeline of high-impact product craftsmanship.</h2>
          </div>
          <div className="mt-8 space-y-4 border-l border-white/10 pl-6">
            {experience.map((item) => (
              <article key={item.year} className="glass-panel relative rounded-3xl p-5">
                <span className="absolute -left-[33px] top-6 h-3 w-3 rounded-full bg-[#d4af37] shadow-[0_0_18px_#d4af37]" />
                <p className="text-xs tracking-[0.2em] text-[#a8a8a8]">{item.year}</p>
                <h3 className="mt-2 text-xl">{item.title}</h3>
                <p className="text-[#d2d2d2]">{item.org}</p>
              </article>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="mt-24"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="section-head">
            <p>Testimonials</p>
            <h2>Words from teams and collaborators.</h2>
          </div>
          <div className="testimonial-track mt-8 flex gap-4 overflow-hidden">
            {[...testimonials, ...testimonials].map((item, idx) => (
              <article key={`${item.author}-${idx}`} className="glass-panel min-w-[320px] rounded-3xl p-6">
                <p className="text-[#e3e3e3]">“{item.quote}”</p>
                <p className="mt-4 text-sm text-[#a8a8a8]">{item.author}</p>
              </article>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="contact"
          className="mt-24"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="section-head">
            <p>Contact</p>
            <h2>Let&apos;s craft a memorable digital universe together.</h2>
          </div>
          <form className="glass-panel mt-8 grid gap-4 rounded-3xl p-6 md:grid-cols-2">
            <label className="field md:col-span-1">
              <span>Name</span>
              <input type="text" placeholder="Your name" />
            </label>
            <label className="field md:col-span-1">
              <span>Email</span>
              <input type="email" placeholder="you@example.com" />
            </label>
            <label className="field md:col-span-2">
              <span>Message</span>
              <textarea placeholder="Tell me about your project" rows={4} />
            </label>
            <button type="submit" className="premium-btn md:col-span-2 md:justify-self-start">
              <Mail size={16} /> Send Inquiry
            </button>
          </form>
        </motion.section>
      </main>

      <footer className="relative z-10 mx-auto mt-12 w-[min(92vw,1120px)] border-t border-white/10 pb-12 pt-8 text-sm text-[#a8a8a8]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p>RS — Luxury Cinematic Portfolio</p>
          <p>© {new Date().getFullYear()} Crafted with precision.</p>
        </div>
      </footer>
    </div>
  );
}
