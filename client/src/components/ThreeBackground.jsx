import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Icosahedron, MeshDistortMaterial, Stars, Torus } from "@react-three/drei";
import { useRef } from "react";

const FloatingMesh = ({ position, speed = 0.8, scale = 1 }) => {
  const ref = useRef();

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.2 * speed;
    ref.current.rotation.y = state.clock.elapsedTime * 0.3 * speed;
  });

  return (
    <Float speed={1.8 * speed} rotationIntensity={0.8} floatIntensity={1.6}>
      <Icosahedron ref={ref} args={[1, 0]} position={position} scale={scale}>
        <MeshDistortMaterial
          color="#7f5af0"
          attach="material"
          distort={0.35}
          speed={2}
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0.8}
        />
      </Icosahedron>
    </Float>
  );
};

const RingMesh = ({ position, scale = 1 }) => {
  return (
    <Float speed={2.2} rotationIntensity={1.1} floatIntensity={1.3}>
      <Torus args={[1.3, 0.14, 16, 100]} position={position} scale={scale}>
        <meshStandardMaterial color="#00f5d4" metalness={0.95} roughness={0.1} emissive="#00f5d4" emissiveIntensity={0.22} />
      </Torus>
    </Float>
  );
};

const ThreeBackground = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[2, 2, 3]} intensity={3} color="#00f5d4" />
        <pointLight position={[-3, -1, -2]} intensity={2} color="#ff7a18" />
        <Stars radius={80} depth={60} count={1400} factor={4} fade speed={0.9} />
        <FloatingMesh position={[-2.3, 0.7, -1]} speed={1} scale={0.85} />
        <FloatingMesh position={[2.5, -0.8, -0.8]} speed={0.7} scale={1} />
        <RingMesh position={[0, -1.8, -2]} scale={0.9} />
      </Canvas>
    </div>
  );
};

export default ThreeBackground;
