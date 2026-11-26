import { Suspense, lazy } from 'react'

const Scene = lazy(() => import('./ArtworkScene'))

export default function AIArtwork({ paused = false, exploded = false }) {
  return (
    <div className="artwork-wrap" aria-label="Interactive 3D combinatorial Rubik's cube specimen">
      <Suspense fallback={null}>
        <Scene paused={paused} exploded={exploded} />
      </Suspense>
    </div>
  )
}
