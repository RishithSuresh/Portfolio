import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Lightformer, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

const CUBE_SIZE = 0.8
const CUBE_GAP = 0.068
const SPACING = CUBE_SIZE + CUBE_GAP

const MOVE_SEQUENCE = [
  { axis: 'y', layer: 1, direction: 1 },
  { axis: 'x', layer: -1, direction: -1 },
  { axis: 'z', layer: 1, direction: 1 },
  { axis: 'y', layer: 0, direction: -1 },
  { axis: 'x', layer: 1, direction: 1 },
  { axis: 'z', layer: -1, direction: -1 },
  { axis: 'y', layer: -1, direction: 1 },
  { axis: 'x', layer: 0, direction: -1 },
  { axis: 'z', layer: 0, direction: 1 },
  { axis: 'y', layer: 1, direction: -1 },
  { axis: 'x', layer: -1, direction: 1 },
  { axis: 'z', layer: 1, direction: -1 },
  { axis: 'y', layer: 0, direction: 1 },
  { axis: 'x', layer: 1, direction: -1 },
  { axis: 'z', layer: -1, direction: 1 },
  { axis: 'y', layer: -1, direction: -1 },
  { axis: 'z', layer: 0, direction: -1 },
  { axis: 'x', layer: 0, direction: 1 }
]

const AXIS_VEC = {
  x: new THREE.Vector3(1, 0, 0),
  y: new THREE.Vector3(0, 1, 0),
  z: new THREE.Vector3(0, 0, 1)
}

function Sticker({ position, size, color }) {
  return (
    <RoundedBox position={position} args={size} radius={0.016} smoothness={3}>
      <meshStandardMaterial color={color} roughness={0.62} metalness={0.05} />
    </RoundedBox>
  )
}

function Cubelet({ position, index, register }) {
  const [x, y, z] = position
  const stickerSize = CUBE_SIZE * 0.72
  const stickerDepth = 0.032
  const stickerOffset = CUBE_SIZE / 2 + stickerDepth / 2

  return (
    <group ref={node => register(index, node)}>
      <RoundedBox args={[CUBE_SIZE, CUBE_SIZE, CUBE_SIZE]} radius={0.088} smoothness={4}>
        <meshStandardMaterial color="#3c6b73" roughness={0.55} metalness={0.18} />
      </RoundedBox>
      {x === 1 && <Sticker position={[stickerOffset, 0, 0]} size={[stickerDepth, stickerSize, stickerSize]} color="#c9937a" />}
      {x === -1 && <Sticker position={[-stickerOffset, 0, 0]} size={[stickerDepth, stickerSize, stickerSize]} color="#d8c3b8" />}
      {y === 1 && <Sticker position={[0, stickerOffset, 0]} size={[stickerSize, stickerDepth, stickerSize]} color="#dce8ec" />}
      {y === -1 && <Sticker position={[0, -stickerOffset, 0]} size={[stickerSize, stickerDepth, stickerSize]} color="#6f8d92" />}
      {z === 1 && <Sticker position={[0, 0, stickerOffset]} size={[stickerSize, stickerSize, stickerDepth]} color="#9abdb9" />}
      {z === -1 && <Sticker position={[0, 0, -stickerOffset]} size={[stickerSize, stickerSize, stickerDepth]} color="#d6ab7d" />}
    </group>
  )
}

export function RubiksCube() {
  const group = useRef()
  const cubeletRefs = useRef([])
  const scratchQuat = useRef(new THREE.Quaternion())
  const scratchVec = useRef(new THREE.Vector3())
  const scheduler = useRef({ elapsed: 0, moveIndex: 0 })

  const cubelets = useRef(
    [-1, 0, 1].flatMap(x =>
      [-1, 0, 1].flatMap(y =>
        [-1, 0, 1].map(z => ({
          position: new THREE.Vector3(x, y, z),
          orientation: new THREE.Quaternion()
        }))
      )
    )
  )

  const coords = useMemo(
    () =>
      [-1, 0, 1].flatMap(x =>
        [-1, 0, 1].flatMap(y => [-1, 0, 1].map(z => [x, y, z]))
      ),
    []
  )

  const registerCubelet = (index, node) => {
    cubeletRefs.current[index] = node
  }

  useFrame((state, delta) => {
    if (!group.current) return
    const safeDelta = Math.min(delta, 0.05)

    group.current.rotation.y += safeDelta * 0.14
    group.current.rotation.x = 0.32 + Math.sin(state.clock.elapsedTime * 0.32) * 0.12
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.55) * 0.08

    const moveDuration = 0.44
    const pauseDuration = 0.04
    const slotDuration = moveDuration + pauseDuration
    const timeline = scheduler.current

    timeline.elapsed += safeDelta
    if (timeline.elapsed >= slotDuration) {
      const completedMove = MOVE_SEQUENCE[timeline.moveIndex]
      const axis = AXIS_VEC[completedMove.axis]
      const layerIdx = completedMove.axis === 'x' ? 0 : completedMove.axis === 'y' ? 1 : 2
      scratchQuat.current.setFromAxisAngle(axis, (completedMove.direction * Math.PI) / 2)

      cubelets.current.forEach(cubelet => {
        if (cubelet.position.getComponent(layerIdx) === completedMove.layer) {
          cubelet.position.applyQuaternion(scratchQuat.current)
          cubelet.position.set(
            Math.round(cubelet.position.x),
            Math.round(cubelet.position.y),
            Math.round(cubelet.position.z)
          )
          cubelet.orientation.premultiply(scratchQuat.current)
        }
      })

      timeline.elapsed -= slotDuration
      timeline.moveIndex = (timeline.moveIndex + 1) % MOVE_SEQUENCE.length
    }

    const move = MOVE_SEQUENCE[timeline.moveIndex]
    const axis = AXIS_VEC[move.axis]
    const layerIdx = move.axis === 'x' ? 0 : move.axis === 'y' ? 1 : 2
    const rawProgress = Math.min(timeline.elapsed / moveDuration, 1)
    const eased =
      rawProgress < 0.5
        ? 4 * rawProgress * rawProgress * rawProgress
        : 1 - Math.pow(-2 * rawProgress + 2, 3) / 2

    scratchQuat.current.setFromAxisAngle(axis, move.direction * eased * (Math.PI / 2))

    cubelets.current.forEach((cubelet, index) => {
      const node = cubeletRefs.current[index]
      if (!node) return

      scratchVec.current.copy(cubelet.position).multiplyScalar(SPACING)
      const isTurning = cubelet.position.getComponent(layerIdx) === move.layer
      if (isTurning) scratchVec.current.applyQuaternion(scratchQuat.current)
      node.position.copy(scratchVec.current)
      node.quaternion.copy(cubelet.orientation)
      if (isTurning) node.quaternion.premultiply(scratchQuat.current)
    })
  })

  return (
    <group ref={group} scale={1.32}>
      {coords.map(([x, y, z], index) => (
        <Cubelet
          key={`${x}-${y}-${z}`}
          index={index}
          position={[x, y, z]}
          register={registerCubelet}
        />
      ))}
    </group>
  )
}

export function StudioEnvironment() {
  return (
    <Environment resolution={128}>
      <group rotation={[-Math.PI / 3, 0, 1]}>
        <Lightformer form="circle" intensity={2.0} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={10} color="#edf6f9" />
        <Lightformer form="rect" intensity={1.4} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[12, 4, 1]} color="#83c5be" />
      </group>
    </Environment>
  )
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0.1, 6.2], fov: 44 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={1.15} />
      <directionalLight position={[4, 6, 5]} intensity={1.25} color="#edf6f9" />
      <RubiksCube />
      <StudioEnvironment />
    </Canvas>
  )
}
