import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Environment } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

function Forms() {
  const group = useRef()
  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.12
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.25) * 0.12
    }
  })
  return <group ref={group}>
    <Float speed={1.1} rotationIntensity={0.3} floatIntensity={0.45}>
      <mesh scale={1.08}>
        <icosahedronGeometry args={[1, 5]} />
        <MeshDistortMaterial color="#78977c" roughness={0.22} metalness={0.24} distort={0.28} speed={1.5} transparent opacity={0.88}/>
      </mesh>
    </Float>
    <mesh rotation={[1.1, 0.4, 0.2]} scale={1.55}>
      <torusGeometry args={[1, 0.009, 12, 160]}/>
      <meshBasicMaterial color="#b2c5a7" transparent opacity={0.9}/>
    </mesh>
    <mesh rotation={[0.3, 1.1, 0.8]} scale={1.78}>
      <torusGeometry args={[1, 0.006, 10, 160]}/>
      <meshBasicMaterial color="#c6a985" transparent opacity={0.8}/>
    </mesh>
    {Array.from({ length: 14 }).map((_, i) => {
      const a = i / 14 * Math.PI * 2
      return <mesh key={i} position={[Math.cos(a) * 1.55, Math.sin(a * 2) * 0.3, Math.sin(a) * 1.55]}>
        <sphereGeometry args={[0.025 + (i % 3) * 0.008, 12, 12]}/>
        <meshBasicMaterial color={i % 3 === 0 ? '#c6a985' : '#78977c'}/>
      </mesh>
    })}
  </group>
}
export default function ArtworkScene() {
  return <Canvas camera={{ position: [0, 0, 4.4], fov: 42 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }}>
    <ambientLight intensity={1.2}/>
    <directionalLight position={[3, 3, 4]} intensity={2}/>
    <Forms/>
    <Environment preset="studio"/>
  </Canvas>
}