import HeroScene from './HeroScene'

export default function ArtworkScene({ paused = false, exploded = false }) {
  return <HeroScene paused={paused} exploded={exploded} />
}
