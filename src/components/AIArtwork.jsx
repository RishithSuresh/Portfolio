import { Suspense, lazy } from 'react'

const Scene = lazy(() => import('./ArtworkScene'))

export default function AIArtwork() {
  return (
    <div className="artwork-wrap" aria-label="Interactive 3D Rubik's cube">
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </div>
  )
}
