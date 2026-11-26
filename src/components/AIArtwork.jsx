import { Suspense, lazy, useState } from 'react'
import { Pause, Play } from 'lucide-react'

const Scene = lazy(() => import('./ArtworkScene'))

export default function AIArtwork() {
  const [paused, setPaused] = useState(false)

  return (
    <div className="artwork-wrap" aria-label="Interactive 3D combinatorial Rubik's cube artwork">
      <div className="art-hud-top">
        <span className="art-hud-pill">
          <i /> STATE SPACE // 4.3×10¹⁹
        </span>
        <span>DRAG TO ORBIT</span>
      </div>

      <Suspense
        fallback={
          <div className="artwork-fallback" aria-hidden="true">
            <div className="art-core" />
          </div>
        }
      >
        <Scene paused={paused} />
      </Suspense>

      <div className="art-hud-bottom">
        <span className="art-caption">FIG 01. / IDEAS IN MOTION</span>
        <div className="art-controls">
          <button
            type="button"
            className="art-btn"
            onClick={() => setPaused(p => !p)}
            aria-label={paused ? 'Resume 3D animation' : 'Pause 3D animation'}
          >
            {paused ? <Play size={11} /> : <Pause size={11} />}
            {paused ? 'RESUME' : 'PAUSE'}
          </button>
        </div>
      </div>
    </div>
  )
}
