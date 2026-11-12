import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
import { RubiksCube } from './HeroScene'

export default function ArtworkScene() {
  return <Canvas camera={{ position: [0, 0, 6.4], fov: 45 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }}>
    <ambientLight intensity={1.2}/>
    <directionalLight position={[3, 3, 4]} intensity={2}/>
    <RubiksCube/>
    <OrbitControls enableZoom={false} enablePan={false} autoRotate={false}/>
    <Environment preset="studio"/>
  </Canvas>
}