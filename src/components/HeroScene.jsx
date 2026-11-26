import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Lightformer, OrbitControls, RoundedBox, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

const CUBE_SIZE = 0.8
const CUBE_GAP = 0.065
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
        roughness={0.22}
        metalness={0.08}
      />
    </RoundedBox>
  )
}

function Cubelet({ position, index, register }) {
  const [x, y, z] = position
  const stickerSize = CUBE_SIZE * 0.72
  const stickerDepth = 0.036
  const stickerOffset = CUBE_SIZE / 2 + stickerDepth / 2

  return (
    <group ref={node => register(index, node)}>
      <RoundedBox args={[CUBE_SIZE, CUBE_SIZE, CUBE_SIZE]} radius={0.08} smoothness={4}>
        <meshStandardMaterial color="#111917" roughness={0.28} metalness={0.42} />
      </RoundedBox>
      {x === 1 && (
        <Sticker
          position={[stickerOffset, 0, 0]}
          size={[stickerDepth, stickerSize, stickerSize]}
          color="#d4ff3f"
          emissive="#d4ff3f"
          emissiveIntensity={0.08}
        />
      )}
      {x === -1 && (
        <Sticker
          position={[-stickerOffset, 0, 0]}
          size={[stickerDepth, stickerSize, stickerSize]}
          color="#ff7a59"
        />
      )}
      {y === 1 && (
        <Sticker
          position={[0, stickerOffset, 0]}
          size={[stickerSize, stickerDepth, stickerSize]}
          color="#f4f1ea"
        />
      )}
      {y === -1 && (
        <Sticker
          position={[0, -stickerOffset, 0]}
          size={[stickerSize, stickerDepth, stickerSize]}
          color="#fbbf24"
        />
      )}
      {z === 1 && (
        <Sticker
          position={[0, 0, stickerOffset]}
          size={[stickerSize, stickerSize, stickerDepth]}
          color="#5eead4"
          emissive="#5eead4"
          emissiveIntensity={0.06}
        />
      )}
      {z === -1 && (
        <Sticker
          position={[0, 0, -stickerOffset]}
          size={[stickerSize, stickerSize, stickerDepth]}
          color="#a78bfa"
        />
      )}
    </group>
  )
}

export function RubiksCube({ paused = false }) {
  const group = useRef()
  const ringA = useRef()
  const ringB = useRef()
  const cubeletRefs = useRef([])
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
    if (!group.current) return
    const safeDelta = Math.min(delta, 0.05)

    if (ringA.current) {
      ringA.current.rotation.z += safeDelta * 0.14
    }
    if (ringB.current) {
      ringB.current.rotation.z -= safeDelta * 0.1
    }

    if (!paused) {
      group.current.rotation.y += safeDelta * 0.14
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.1
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.85) * 0.07

      const moveDuration = 0.42
      const pauseDuration = 0.07
      const slotDuration = moveDuration + pauseDuration
      const timeline = scheduler.current

      if (timeline.holding) {
        timeline.holdElapsed += safeDelta
        if (timeline.holdElapsed >= 3.2) {
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

      const move = MOVE_SEQUENCE[timeline.moveIndex]
      const axis = AXIS_VEC[move.axis]
      const layerIdx = move.axis === 'x' ? 0 : move.axis === 'y' ? 1 : 2
      const rawProgress = timeline.holding ? 0 : Math.min(timeline.elapsed / moveDuration, 1)
      // Smooth cubic ease-in-out for crisp mechanical turns
      const eased =
        rawProgress < 0.5
          ? 4 * rawProgress * rawProgress * rawProgress
          : 1 - Math.pow(-2 * rawProgress + 2, 3) / 2

      scratchQuat.current.setFromAxisAngle(axis, move.direction * eased * (Math.PI / 2))

      cubelets.current.forEach((cubelet, index) => {
        const node = cubeletRefs.current[index]
        if (!node) return

        scratchVec.current.copy(cubelet.position).multiplyScalar(SPACING)
        const isTurning = !timeline.holding && cubelet.position.getComponent(layerIdx) === move.layer
        if (isTurning) scratchVec.current.applyQuaternion(scratchQuat.current)
        node.position.copy(scratchVec.current)
        node.quaternion.copy(cubelet.orientation)
        if (isTurning) node.quaternion.premultiply(scratchQuat.current)
      })
    }
  })

  return (
    <group>
      <group ref={group} scale={0.96}>
        {coords.map(([x, y, z], index) => (
          <Cubelet
            key={`${x}-${y}-${z}`}
            index={index}
            position={[x, y, z]}
            register={registerCubelet}
          />
        ))}
      </group>

      <mesh ref={ringA} rotation={[Math.PI / 2.6, 0.35, 0]}>
        <torusGeometry args={[2.55, 0.008, 12, 96]} />
        <meshBasicMaterial color="#d4ff3f" transparent opacity={0.35} />
      </mesh>

      <mesh ref={ringB} rotation={[-Math.PI / 3.2, -0.4, 0]}>
        <torusGeometry args={[2.85, 0.006, 12, 96]} />
        <meshBasicMaterial color="#5eead4" transparent opacity={0.25} />
      </mesh>

      <Sparkles count={36} scale={5.5} size={1.6} speed={0.3} opacity={0.55} color="#d4ff3f" />
    </group>
  )
}

export function StudioEnvironment() {
  return (
    <Environment resolution={256}>
      <group rotation={[-Math.PI / 3, 0, 1]}>
        <Lightformer form="circle" intensity={3.2} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={10} color="#ffffff" />
        <Lightformer form="rect" intensity={2.2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[12, 4, 1]} color="#5eead4" />
        <Lightformer form="rect" intensity={2.0} rotation-y={-Math.PI / 2} position={[5, 2, 1]} scale={[12, 4, 1]} color="#d4ff3f" />
        <Lightformer form="ring" intensity={1.4} rotation-y={Math.PI / 2} position={[0, -5, 2]} scale={8} color="#ff7a59" />
      </group>
    </Environment>
  )
}

export default function HeroScene({ paused = false }) {
  return (
    <Canvas
      camera={{ position: [0, 0.2, 6.8], fov: 44 }}
      dpr={[1, 1.75]}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.9} />
      <directionalLight position={[4, 6, 5]} intensity={1.8} color="#f4f1ea" />
      <pointLight position={[-4, -2, 3]} intensity={1.4} color="#5eead4" />
      <pointLight position={[3, 2, -4]} intensity={1.2} color="#ff7a59" />
      <RubiksCube paused={paused} />
      <StudioEnvironment />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={!paused}
        autoRotateSpeed={0.35}
        maxPolarAngle={Math.PI / 1.75}
        minPolarAngle={Math.PI / 3.2}
      />
    </Canvas>
  )
}
