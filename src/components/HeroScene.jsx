import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Lightformer, OrbitControls, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import { useTheme } from './ThemeProvider'

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

const PALETTES = {
  dark: {
    body: '#001524',
    px: '#ff7d00',
    nx: '#ffecd1',
    py: '#15616d',
    ny: '#78290f',
    pz: '#ffb366',
    nz: '#288796'
  },
  light: {
    body: '#006d77',
    px: '#ffddd2',
    nx: '#e29578',
    py: '#edf6f9',
    ny: '#83c5be',
    pz: '#ff7d00',
    nz: '#15616d'
  }
}

function Sticker({ position, size, color, emissive = '#000000', emissiveIntensity = 0 }) {
  return (
    <RoundedBox position={position} args={size} radius={0.016} smoothness={3}>
      <meshStandardMaterial
        color={color}
        emissive={emissive}
        emissiveIntensity={emissiveIntensity}
        roughness={0.2}
        metalness={0.1}
      />
    </RoundedBox>
  )
}

function Cubelet({ position, index, register, colors }) {
  const [x, y, z] = position
  const stickerSize = CUBE_SIZE * 0.72
  const stickerDepth = 0.036
  const stickerOffset = CUBE_SIZE / 2 + stickerDepth / 2

  return (
    <group ref={node => register(index, node)}>
      <RoundedBox args={[CUBE_SIZE, CUBE_SIZE, CUBE_SIZE]} radius={0.085} smoothness={4}>
        <meshStandardMaterial color={colors.body} roughness={0.24} metalness={0.45} />
      </RoundedBox>
      {x === 1 && (
        <Sticker
          position={[stickerOffset, 0, 0]}
          size={[stickerDepth, stickerSize, stickerSize]}
          color={colors.px}
          emissive={colors.px}
          emissiveIntensity={0.08}
        />
      )}
      {x === -1 && <Sticker position={[-stickerOffset, 0, 0]} size={[stickerDepth, stickerSize, stickerSize]} color={colors.nx} />}
      {y === 1 && <Sticker position={[0, stickerOffset, 0]} size={[stickerSize, stickerDepth, stickerSize]} color={colors.py} />}
      {y === -1 && <Sticker position={[0, -stickerOffset, 0]} size={[stickerSize, stickerDepth, stickerSize]} color={colors.ny} />}
      {z === 1 && <Sticker position={[0, 0, stickerOffset]} size={[stickerSize, stickerSize, stickerDepth]} color={colors.pz} />}
      {z === -1 && <Sticker position={[0, 0, -stickerOffset]} size={[stickerSize, stickerSize, stickerDepth]} color={colors.nz} />}
    </group>
  )
}

export function RubiksCube({ colors }) {
  const rig = useRef()
  const group = useRef()
  const cubeletRefs = useRef([])
  const impulseSpin = useRef(0)
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

    rig.current.rotation.x = THREE.MathUtils.lerp(rig.current.rotation.x, -state.pointer.y * 0.22, safeDelta * 3.5)
    rig.current.rotation.y = THREE.MathUtils.lerp(rig.current.rotation.y, state.pointer.x * 0.28, safeDelta * 3.5)

    impulseSpin.current = THREE.MathUtils.lerp(impulseSpin.current, 0, safeDelta * 3.2)
    group.current.rotation.y += safeDelta * (0.16 + impulseSpin.current)
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.11
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.075

    const moveDuration = 0.42
    const pauseDuration = 0.08
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

    const move = MOVE_SEQUENCE[timeline.moveIndex]
    const axis = AXIS_VEC[move.axis]
    const layerIdx = move.axis === 'x' ? 0 : move.axis === 'y' ? 1 : 2
    const rawProgress = timeline.holding ? 0 : Math.min(timeline.elapsed / moveDuration, 1)
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
  })

  return (
    <group
      ref={rig}
      onClick={() => {
        impulseSpin.current = 4.2
      }}
    >
      <group ref={group} scale={1.08}>
        {coords.map(([x, y, z], index) => (
          <Cubelet
            key={`${x}-${y}-${z}`}
            index={index}
            position={[x, y, z]}
            register={registerCubelet}
            colors={colors}
          />
        ))}
      </group>
    </group>
  )
}

export function StudioEnvironment() {
  return (
    <Environment resolution={256}>
      <group rotation={[-Math.PI / 3, 0, 1]}>
        <Lightformer form="circle" intensity={3.2} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={10} color="#ffecd1" />
        <Lightformer form="rect" intensity={2.4} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[12, 4, 1]} color="#15616d" />
        <Lightformer form="rect" intensity={2.2} rotation-y={-Math.PI / 2} position={[5, 2, 1]} scale={[12, 4, 1]} color="#ff7d00" />
      </group>
    </Environment>
  )
}

export default function HeroScene() {
  const { theme } = useTheme()
  const colors = PALETTES[theme] || PALETTES.dark

  return (
    <Canvas
      camera={{ position: [0, 0.15, 6.4], fov: 44 }}
      dpr={[1, 1.75]}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={1.05} />
      <directionalLight position={[4, 6, 5]} intensity={1.9} color="#ffecd1" />
      <pointLight position={[-4, -2, 3]} intensity={1.5} color={theme === 'dark' ? '#15616d' : '#83c5be'} />
      <pointLight position={[3, 2, -4]} intensity={1.4} color={theme === 'dark' ? '#ff7d00' : '#ffddd2'} />
      <RubiksCube colors={colors} />
      <StudioEnvironment />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.35}
        maxPolarAngle={Math.PI / 1.7}
        minPolarAngle={Math.PI / 3.2}
      />
    </Canvas>
  )
}
