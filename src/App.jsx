import { lazy, Suspense } from 'react';
import { WorldProvider, useWorld } from './context/WorldContext';
import SmoothScroll from './components/SmoothScroll';
import Cursor from './components/Cursor';
import HUDFrame from './components/HUDFrame';
import OrbitalNav from './components/OrbitalNav';
import IgnitionVeil from './components/IgnitionVeil';
import Landing from './sections/Landing';

// Heavy / non-critical pieces are lazy-loaded so the landing
// hits the screen as fast as possible.
const WorldScene = lazy(() => import('./three/WorldScene'));
const About = lazy(() => import('./sections/About'));
const Projects = lazy(() => import('./sections/Projects'));
const Skills = lazy(() => import('./sections/Skills'));
const Experience = lazy(() => import('./sections/Experience'));
const Contact = lazy(() => import('./sections/Contact'));

function Shell() {
  const { ignited } = useWorld();

  return (
    <div className="grain relative">
      {/* Persistent 3D world — sits behind everything */}
      <Suspense fallback={null}>
        <WorldScene />
      </Suspense>

      {/* Overlay frame + nav + cursor */}
      <HUDFrame />
      <OrbitalNav />
      <Cursor />
      <IgnitionVeil />

      {/* Foreground content */}
      <main className="relative z-10">
        <Landing />

        {ignited && (
          <Suspense fallback={<SectionFallback />}>
            <About />
            <Projects />
            <Skills />
            <Experience />
            <Contact />

            <footer className="relative z-10 px-6 py-16 text-center sm:px-10">
              <span className="hud-label opacity-60">
                © {new Date().getFullYear()} · AETHER · CRAFTED IN ORBIT
              </span>
            </footer>
          </Suspense>
        )}
      </main>
    </div>
  );
}

function SectionFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <span className="hud-label animate-pulse-soft">LOADING ZONE…</span>
    </div>
  );
}

export default function App() {
  return (
    <WorldProvider>
      <SmoothScroll>
        <Shell />
      </SmoothScroll>
    </WorldProvider>
  );
}
