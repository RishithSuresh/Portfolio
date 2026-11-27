import { Suspense, lazy } from 'react'

const Scene = lazy(() => import('./ArtworkScene'))

export default function AIArtwork() {
  return (
    <div className="hero-bg-cube" aria-hidden="true">
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </div>
  )
}
