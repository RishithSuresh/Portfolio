import { Suspense, lazy } from 'react'
const Scene = lazy(() => import('./ArtworkScene'))
export default function AIArtwork() {
  return <div className="artwork-wrap" aria-label="Abstract animated 3D artwork">
    <Suspense fallback={null}><Scene/></Suspense>
  </div>
}