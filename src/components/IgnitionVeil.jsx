import { motion, AnimatePresence } from 'framer-motion';
import { useWorld } from '../context/WorldContext';

// Cinematic veil that pulls back the moment the user "Presses Start".
// Used as a one-time wipe over the entire experience.
export default function IgnitionVeil() {
  const { ignited } = useWorld();
  return (
    <AnimatePresence>
      {!ignited && (
        <motion.div
          key="veil"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.0 }}
          className="pointer-events-none fixed inset-0 z-20"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(13,17,23,0.0) 0%, rgba(10,14,20,0.85) 75%)',
          }}
        />
      )}
    </AnimatePresence>
  );
}
