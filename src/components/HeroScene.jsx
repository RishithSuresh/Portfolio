import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Lightformer, OrbitControls, RoundedBox, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

const CUBE_SIZE = 0.76
const CUBE_GAP = 0.068
const SPACING = CUBE_SIZE + CUBE_GAP

const SHUFFLE_MOVES = [
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
  { axis: 'y', layer: -1, direction: -1 }
]

const MOVE_SEQUENCE = [
  ...SHUFFLE_MOVES,
  ...SHUFFLE_MOVES.slice().reverse().map(move => ({ ...move, direction: -move.direction }))
]

const AXIS_VEC = {
  x: new THREE.Vector3(1, 0, 0),
  y: new THREE.Vector3(0, 1, 0),
  z: new THREE.Vector3(0, 0, 1)
}

function Sticker({ position, size, color, emissive = '#000000', emissiveIntensity = 0 }) {
  return (
    <RoundedBox position={position} args={size} radius={0.016} smoothness={3}>
      <meshStandardMaterial
        color={color}
        emissive={emissive}
        emissiveIntensity={emissiveIntensity}
        roughness={0.18}
        metalness={0.14}
      />
    </RoundedBox>
  )
}

function Cubelet({ position, index, register }) {
  const [x, y, z] = position
  const stickerSize = CUBE_SIZE * 0.72
  const stickerDepth = 0.038
  const stickerOffset = CUBE_SIZE / 2 + stickerDepth / 2

  return (
    <group ref={node => register(index, node)}>
      <RoundedBox args={[CUBE_SIZE, CUBE_SIZE, CUBE_SIZE]} radius={0.085} smoothness={4}>
        <meshStandardMaterial color="#0b1236" roughness={0.22} metalness={0.55} />
      </RoundedBox>
      {x === 1 && (
        <Sticker
          position={[stickerOffset, 0, 0]}
          size={[stickerDepth, stickerSize, stickerSize]}
          color="#ff5e42"
          emissive="#ff4d2e"
          emissiveIntensity={0.12}
        />
      )}
      {x === -1 && (
        <Sticker
          position={[-stickerOffset, 0, 0]}
          size={[stickerDepth, stickerSize, stickerSize]}
          color="#f7d959"
          emissive="#f5d547"
          emissiveIntensity={0.08}
        />
      )}
      {y === 1 && (
        <Sticker
          position={[0, stickerOffset, 0]}
          size={[stickerSize, stickerDepth, stickerSize]}
          color="#f6f2e9"
        />
      )}
      {y === -1 && (
        <Sticker
          position={[0, -stickerOffset, 0]}
          size={[stickerSize, stickerDepth, stickerSize]}
          color="#2952ff"
        />
      )}
      {z === 1 && (
        <Sticker
          position={[0, 0, stickerOffset]}
          size={[stickerSize, stickerSize, stickerDepth]}
          color="#7ce8ff"
          emissive="#7ce8ff"
          emissiveIntensity={0.1}
        />
      )}
      {z === -1 && (
        <Sticker
          position={[0, 0, -stickerOffset]}
          size={[stickerSize, stickerSize, stickerDepth]}
          color="#c4b5fd"
        />
      )}
    </group>
  )
}

export function RubiksCube({ paused = false, exploded = false }) {
  const rig = useRef()
  const group = useRef()
  const innerCore = useRef()
  const ringA = useRef()
  const ringB = useRef()
  const cubeletRefs = useRef([])
  const explodeRef = useRef(1)
  const scratchQuat = useRef(new THREE.Quaternion())
  const scratchVec = useRef(new THREE.Vector3())
  const scheduler = useRef({ elapsed: 0, moveIndex: 0, holding: false, holdElapsed: 0 })

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
    if (!group.current || !rig.current) return
    const safeDelta = Math.min(delta, 0.05)

    // Smooth pointer parallax on the entire 3D sculpture
    const targetTiltX = -state.pointer.y * 0.22
    const targetTiltY = state.pointer.x * 0.28
    rig.current.rotation.x = THREE.MathUtils.lerp(rig.current.rotation.x, targetTiltX, safeDelta * 3.5)
    rig.current.rotation.y = THREE.MathUtils.lerp(rig.current.rotation.y, targetTiltY, safeDelta * 3.5)

    const targetExplode = exploded ? 1.76 : 1.0
    explodeRef.current = THREE.MathUtils.lerp(explodeRef.current, targetExplode, Math.min(1, safeDelta * 6.5))

    if (ringA.current) ringA.current.rotation.z += safeDelta * 0.18
    if (ringB.current) ringB.current.rotation.z -= safeDelta * 0.13

    if (innerCore.current) {
      innerCore.current.rotation.y -= safeDelta * 0.65
      innerCore.current.rotation.x += safeDelta * 0.42
      const coreScale = THREE.MathUtils.lerp(0.32, 0.78, (explodeRef.current - 1) / 0.76)
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 3.2) * 0.05
      innerCore.current.scale.setScalar(coreScale * pulse)
    }

    if (!paused) {
      group.current.rotation.y += safeDelta * 0.16
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.12
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.9) * 0.08

      const moveDuration = 0.42
      const pauseDuration = 0.07
      const slotDuration = moveDuration + pauseDuration
      const timeline = scheduler.current

      if (timeline.holding) {
        timeline.holdElapsed += safeDelta
        if (timeline.holdElapsed >= 3.0) {
          timeline.holding = false
          timeline.holdElapsed = 0
          timeline.elapsed = 0
          timeline.moveIndex = 0
        }
      } else {
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
          if (timeline.moveIndex === MOVE_SEQUENCE.length - 1) {
            timeline.holding = true
            timeline.holdElapsed = 0
            timeline.elapsed = 0
          } else {
            timeline.moveIndex += 1
          }
        }
      }
    }

    const timeline = scheduler.current
    const move = MOVE_SEQUENCE[timeline.moveIndex]
    const axis = AXIS_VEC[move.axis]
    const layerIdx = move.axis === 'x' ? 0 : move.axis === 'y' ? 1 : 2
    const moveDuration = 0.42
    const rawProgress = timeline.holding ? 0 : Math.min(timeline.elapsed / moveDuration, 1)
    const eased =
      rawProgress < 0.5
        ? 4 * rawProgress * rawProgress * rawProgress
        : 1 - Math.pow(-2 * rawProgress + 2, 3) / 2

    scratchQuat.current.setFromAxisAngle(axis, move.direction * eased * (Math.PI / 2))

    cubelets.current.forEach((cubelet, index) => {
      const node = cubeletRefs.current[index]
      if (!node) return

      scratchVec.current.copy(cubelet.position).multiplyScalar(SPACING * explodeRef.current)
      const isTurning = !timeline.holding && cubelet.position.getComponent(layerIdx) === move.layer
      if (isTurning) scratchVec.current.applyQuaternion(scratchQuat.current)
      node.position.copy(scratchVec.current)
      node.quaternion.copy(cubelet.orientation)
      if (isTurning) node.quaternion.premultiply(scratchQuat.current)
    })
  })

  return (
    <group ref={rig}>
      <group ref={group} scale={0.98}>
        {coords.map(([x, y, z], index) => (
          <Cubelet
            key={`${x}-${y}-${z}`}
            index={index}
            position={[x, y, z]}
            register={registerCubelet}
          />
        ))}
      </group>

      {/* Luminous Inner Kinetic Core revealed in Explode View */}
      <mesh ref={innerCore}>
        <icosahedronGeometry args={[1.05, 1]} />
        <meshStandardMaterial
          color="#f7d959"
          emissive="#ff4d2e"
          emissiveIntensity={1.25}
          wireframe
        />
      </mesh>

      {/* Orbital Ring A + Satellite Node */}
      <group ref={ringA} rotation={[Math.PI / 2.55, 0.36, 0]}>
        <mesh>
          <torusGeometry args={[2.55, 0.009, 12, 110]} />
          <meshBasicMaterial color="#ff5e42" transparent opacity={0.55} />
        </mesh>
        <mesh position={[2.55, 0, 0]}>
          <sphereGeometry args={[0.065, 16, 16]} />
          <meshBasicMaterial color="#ff5e42" />
        </mesh>
      </group>

      {/* Orbital Ring B + Satellite Node */}
      <group ref={ringB} rotation={[-Math.PI / 3.1, -0.42, 0]}>
        <mesh>
          <torusGeometry args={[2.92, 0.007, 12, 110]} />
          <meshBasicMaterial color="#7ce8ff" transparent opacity={0.4} />
        </mesh>
        <mesh position={[-2.92, 0, 0]}>
          <sphereGeometry args={[0.055, 16, 16]} />
          <meshBasicMaterial color="#7ce8ff" />
        </mesh>
      </group>

      <Sparkles count={46} scale={6.2} size={1.7} speed={0.35} opacity={0.68} color="#f7d959" />
    </group>
  )
}

export function StudioEnvironment() {
  return (
    <Environment resolution={256}>
      <group rotation={[-Math.PI / 3, 0, 1]}>
        <Lightformer form="circle" intensity={3.4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={10} color="#f6f2e9" />
        <Lightformer form="rect" intensity={2.6} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[12, 4, 1]} color="#7ce8ff" />
        <Lightformer form="rect" intensity={2.4} rotation-y={-Math.PI / 2} position={[5, 2, 1]} scale={[12, 4, 1]} color="#ff5e42" />
        <Lightformer form="ring" intensity={1.8} rotation-y={Math.PI / 2} position={[0, -5, 2]} scale={8} color="#f7d959" />
      </group>
    </Environment>
  )
}

export default function HeroScene({ paused = false, exploded = false }) {
  return (
    <Canvas
      camera={{ position: [0, 0.15, 6.7], fov: 44 }}
      dpr={[1, 1.75]}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={1.0} />
      <directionalLight position={[4, 6, 5]} intensity={2.0} color="#f6f2e9" />
      <pointLight position={[-4, -2, 3]} intensity={1.8} color="#2952ff" />
      <pointLight position={[3, 2, -4]} intensity={1.6} color="#ff5e42" />
      <RubiksCube paused={paused} exploded={exploded} />
      <StudioEnvironment />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={!paused}
        autoRotateSpeed={0.35}
        maxPolarAngle={Math.PI / 1.7}
        minPolarAngle={Math.PI / 3.2}
      />
    </Canvas>
  )
}
