import { Suspense, lazy } from 'react'
const Scene = lazy(() => import('./ArtworkScene'))
export default function AIArtwork() {
  return <div className="artwork-wrap" aria-label="Abstract animated 3D artwork">
    <div className="artwork-fallback"><div className="art-orbit orbit-one"/><div className="art-orbit orbit-two"/><div className="art-core"/><i/><i/><i/><span className="art-label">IDEAS IN MOTION</span></div>
    <Suspense fallback={null}><Scene/></Suspense>
  </div>
}