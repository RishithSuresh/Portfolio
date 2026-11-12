
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, OrbitControls, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

const CUBE_SIZE = 0.82;
const CUBE_GAP = 0.06;
const SPACING = CUBE_SIZE + CUBE_GAP;
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
  { axis: 'y', layer: -1, direction: -1 },
  { axis: 'x', layer: 0, direction: 1 },
  { axis: 'z', layer: 0, direction: -1 },
  { axis: 'y', layer: 1, direction: 1 },
  { axis: 'x', layer: -1, direction: -1 },
  { axis: 'z', layer: 1, direction: 1 },
];
const MOVE_SEQUENCE = [
  ...SHUFFLE_MOVES,
  ...SHUFFLE_MOVES.slice().reverse().map(move => ({ ...move, direction: -move.direction })),
];

function Cubelet({ position, index, register }) {
  const [x, y, z] = position;
  const stickerSize = CUBE_SIZE * 0.72;
  const stickerDepth = 0.035;
  const stickerOffset = CUBE_SIZE / 2 + stickerDepth / 2;

  return (
    <group ref={node => register(index, node)}>
      <RoundedBox args={[CUBE_SIZE, CUBE_SIZE, CUBE_SIZE]} radius={0.075} smoothness={4}>
        <meshStandardMaterial color="#102824" roughness={0.34} metalness={0.12} />
      </RoundedBox>
      {x === 1 && <Sticker position={[stickerOffset, 0, 0]} size={[stickerDepth, stickerSize, stickerSize]} color="#D9A79A" />}
      {x === -1 && <Sticker position={[-stickerOffset, 0, 0]} size={[stickerDepth, stickerSize, stickerSize]} color="#F08C78" />}
      {y === 1 && <Sticker position={[0, stickerOffset, 0]} size={[stickerSize, stickerDepth, stickerSize]} color="#FFF8F5" />}
      {y === -1 && <Sticker position={[0, -stickerOffset, 0]} size={[stickerSize, stickerDepth, stickerSize]} color="#FFC400" />}
      {z === 1 && <Sticker position={[0, 0, stickerOffset]} size={[stickerSize, stickerSize, stickerDepth]} color="#5BAA91" />}
      {z === -1 && <Sticker position={[0, 0, -stickerOffset]} size={[stickerSize, stickerSize, stickerDepth]} color="#B8A0D9" />}
    </group>
  );
}

function Sticker({ position, size, color }) {
  return (
    <RoundedBox position={position} args={size} radius={0.012} smoothness={3}>
      <meshStandardMaterial color={color} roughness={0.24} metalness={0.02} />
    </RoundedBox>
  );
}

export function RubiksCube() {
  const group = useRef();
  const cubeletRefs = useRef([]);
  const scheduler = useRef({ elapsed: 0, moveIndex: 0, holding: false, holdElapsed: 0 });
  const cubelets = useRef(
    [-1, 0, 1].flatMap(x =>
      [-1, 0, 1].flatMap(y =>
        [-1, 0, 1].map(z => ({
          position: new THREE.Vector3(x, y, z),
          orientation: new THREE.Quaternion(),
        }))
      )
    )
  );

  const registerCubelet = (index, node) => {
    cubeletRefs.current[index] = node;
  };

  useFrame((state, delta) => {
    if (!group.current) return;

    group.current.rotation.y += delta * 0.12;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.35) * 0.08;
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.08;

    const moveDuration = 0.46;
    const pauseDuration = 0.08;
    const slotDuration = moveDuration + pauseDuration;
    const timeline = scheduler.current;

    if (timeline.holding) {
      timeline.holdElapsed += delta;
      if (timeline.holdElapsed < 5) return;
      timeline.holding = false;
      timeline.holdElapsed = 0;
      timeline.elapsed = 0;
      timeline.moveIndex = 0;
    }

    timeline.elapsed += delta;

    if (timeline.elapsed >= slotDuration) {
      const completedMove = MOVE_SEQUENCE[timeline.moveIndex];
      const axis = completedMove.axis === 'x' ? new THREE.Vector3(1, 0, 0)
        : completedMove.axis === 'y' ? new THREE.Vector3(0, 1, 0)
          : new THREE.Vector3(0, 0, 1);
      const rotation = new THREE.Quaternion().setFromAxisAngle(axis, completedMove.direction * Math.PI / 2);

      cubelets.current.forEach(cubelet => {
        if (cubelet.position.getComponent(axis.x ? 0 : axis.y ? 1 : 2) === completedMove.layer) {
          cubelet.position.applyQuaternion(rotation);
          cubelet.position.set(
            Math.round(cubelet.position.x),
            Math.round(cubelet.position.y),
            Math.round(cubelet.position.z)
          );
          cubelet.orientation.premultiply(rotation);
        }
      });

      timeline.elapsed -= slotDuration;
      if (timeline.moveIndex === MOVE_SEQUENCE.length - 1) {
        timeline.holding = true;
        timeline.holdElapsed = 0;
        timeline.elapsed = 0;
      }
      if (!timeline.holding) timeline.moveIndex += 1;
    }

    const move = MOVE_SEQUENCE[timeline.moveIndex];
    const axis = move.axis === 'x' ? new THREE.Vector3(1, 0, 0)
      : move.axis === 'y' ? new THREE.Vector3(0, 1, 0)
        : new THREE.Vector3(0, 0, 1);
    const layerIndex = axis.x ? 0 : axis.y ? 1 : 2;
    const progress = Math.min(timeline.elapsed / moveDuration, 1);
    const rotation = new THREE.Quaternion().setFromAxisAngle(axis, move.direction * progress * Math.PI / 2);

    cubelets.current.forEach((cubelet, index) => {
      const node = cubeletRefs.current[index];
      if (!node) return;

      const position = cubelet.position.clone().multiplyScalar(SPACING);
      const isTurning = cubelet.position.getComponent(layerIndex) === move.layer;
      if (isTurning) position.applyQuaternion(rotation);
      node.position.copy(position);
      node.quaternion.copy(cubelet.orientation);
      if (isTurning) node.quaternion.premultiply(rotation);
    });
  });

  return (
    <group ref={group} scale={1.1}>
      {[-1, 0, 1].flatMap(x =>
        [-1, 0, 1].flatMap(y =>
          [-1, 0, 1].map(z => (
            <Cubelet
              key={`${x}-${y}-${z}`}
              index={(x + 1) * 9 + (y + 1) * 3 + z + 1}
              position={[x, y, z]}
              register={registerCubelet}
            />
          ))
        )
      )}
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={1.3} />
      <directionalLight position={[4, 5, 5]} intensity={2} color="#D9A79A" />
      <pointLight position={[-4, -2, 3]} intensity={2} color="#FFC400" />

      <RubiksCube />

      <Environment preset="studio" />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.3}
        maxPolarAngle={Math.PI / 1.8}
        minPolarAngle={Math.PI / 3}
      />
    </>
  );
}

export default function HeroScene() {
  return (
    <div className="hero-scene">
      <Canvas
        camera={{ position: [0, 0, 6.4], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
