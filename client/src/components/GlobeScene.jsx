import { Canvas, useFrame } from "@react-three/fiber";
import { Line, OrbitControls, Stars, useTexture } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const latLonToVector3 = (lat, lon, radius) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
};

const buildArcPoints = (start, end, height = 0.42, segments = 56) => {
  const points = [];

  for (let step = 0; step <= segments; step += 1) {
    const t = step / segments;
    const curveHeight = Math.sin(Math.PI * t) * height;
    const point = start.clone().lerp(end, t).normalize().multiplyScalar(1.32 + curveHeight);
    points.push(point);
  }

  return points;
};

const GlobeCore = () => {
  const cloudRef = useRef();
  const markerGroupRef = useRef();
  const signalPulseRef = useRef();
  const [dayMap, normalMap, specularMap, cloudMap, nightMap] = useTexture([
    "/textures/earth_daymap_2048.jpg",
    "/textures/earth_normal_2048.jpg",
    "/textures/earth_specular_2048.jpg",
    "/textures/earth_clouds_1024.png",
    "/textures/earth_night_2048.png",
  ]);

  dayMap.colorSpace = THREE.SRGBColorSpace;
  cloudMap.colorSpace = THREE.SRGBColorSpace;
  nightMap.colorSpace = THREE.SRGBColorSpace;

  const markers = useMemo(
    () => [
      { lat: 18.5204, lon: 73.8567, color: "#22d3ee", label: "India", symbol: "IN", size: 1.55, ring: "#7bf0c2" },
      { lat: 51.5072, lon: -0.1276, color: "#a78bfa", label: "UK", symbol: "UK", size: 1, ring: "#c4b5fd" },
      { lat: 37.7749, lon: -122.4194, color: "#f97316", label: "USA", symbol: "US", size: 1, ring: "#fdba74" },
      { lat: 35.6762, lon: 139.6503, color: "#38bdf8", label: "Japan", symbol: "JP", size: 1, ring: "#7dd3fc" },
      { lat: -33.8688, lon: 151.2093, color: "#c084fc", label: "Australia", symbol: "AU", size: 1, ring: "#e9d5ff" },
      { lat: 25.2048, lon: 55.2708, color: "#22d3ee", label: "UAE", symbol: "AE", size: 1, ring: "#67e8f9" },
    ],
    []
  );

  const signalRoutes = useMemo(() => {
    const india = markers.find((marker) => marker.label === "India");

    if (!india) {
      return [];
    }

    const start = latLonToVector3(india.lat, india.lon, 1.31);

    return markers
      .filter((marker) => marker.label !== "India")
      .map((marker) => {
        const end = latLonToVector3(marker.lat, marker.lon, 1.31);

        return {
          id: `${india.label}-${marker.label}`,
          color: marker.ring,
          points: buildArcPoints(start, end, 0.34 + marker.size * 0.05),
        };
      });
  }, [markers]);

  useFrame((state, delta) => {
    if (cloudRef.current) {
      cloudRef.current.rotation.y += delta * 0.03;
    }

    if (markerGroupRef.current) {
      markerGroupRef.current.children.forEach((child, index) => {
        const pulse = 0.75 + Math.sin(state.clock.elapsedTime * 2.2 + index * 0.6) * 0.22;
        child.scale.setScalar(Math.max(0.5, pulse));
      });
    }

    if (signalPulseRef.current && signalRoutes.length > 0) {
      signalPulseRef.current.children.forEach((child, index) => {
        const route = signalRoutes[index % signalRoutes.length];
        const progress = (state.clock.elapsedTime * 0.2 + index * 0.17) % 1;
        const routeIndex = progress * (route.points.length - 1);
        const startIndex = Math.floor(routeIndex);
        const endIndex = Math.min(route.points.length - 1, startIndex + 1);
        const interpolation = routeIndex - startIndex;
        const position = route.points[startIndex].clone().lerp(route.points[endIndex], interpolation);

        child.position.copy(position);

        const pulseScale = 0.72 + Math.sin(state.clock.elapsedTime * 4 + index) * 0.14;
        child.scale.setScalar(pulseScale);
      });
    }
  });

  return (
    <group rotation={[0.04, 2.2, 0.14]}>
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[1.28, 128, 128]} />
        <meshPhongMaterial
          map={dayMap}
          bumpMap={normalMap}
          bumpScale={0.045}
          specularMap={specularMap}
          specular="#4a75c7"
          shininess={20}
          emissiveMap={nightMap}
          emissive="#ffd9a8"
          emissiveIntensity={0.12}
        />
      </mesh>

      <mesh ref={cloudRef} scale={1.016}>
        <sphereGeometry args={[1.28, 128, 128]} />
        <meshStandardMaterial
          alphaMap={cloudMap}
          color="#f6fbff"
          transparent
          opacity={0.2}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh scale={1.045}>
        <sphereGeometry args={[1.28, 96, 96]} />
        <shaderMaterial
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.BackSide}
          uniforms={{
            glowColor: { value: new THREE.Color("#4f8dff") },
          }}
          vertexShader={`
            varying vec3 vNormal;
            void main() {
              vNormal = normalize(normalMatrix * normal);
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            varying vec3 vNormal;
            uniform vec3 glowColor;
            void main() {
              float intensity = pow(0.63 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.3);
              gl_FragColor = vec4(glowColor * intensity, intensity * 0.58);
            }
          `}
        />
      </mesh>

      {signalRoutes.map((route) => (
        <Line key={route.id} points={route.points} color={route.color} lineWidth={1.2} transparent opacity={0.6} />
      ))}

      <group ref={signalPulseRef}>
        {signalRoutes.map((route) => (
          <mesh key={`pulse-${route.id}`}>
            <sphereGeometry args={[0.022, 14, 14]} />
            <meshBasicMaterial color={route.color} transparent opacity={0.95} />
          </mesh>
        ))}
      </group>

      <group ref={markerGroupRef}>
        {markers.map((marker, index) => (
          <mesh
            key={`${marker.lat}-${marker.lon}-${index}`}
            position={latLonToVector3(marker.lat, marker.lon, 1.34)}
          >
            <sphereGeometry args={[0.026 * marker.size, 16, 16]} />
            <meshStandardMaterial color={marker.color} emissive={marker.color} emissiveIntensity={0.9} />
          </mesh>
        ))}
      </group>

      {markers.map((marker, index) => (
        <mesh
          key={`ring-${marker.lat}-${marker.lon}-${index}`}
          position={latLonToVector3(marker.lat, marker.lon, 1.32)}
          lookAt={[0, 0, 0]}
        >
          <ringGeometry args={[0.038 * marker.size, 0.052 * marker.size, 36]} />
          <meshBasicMaterial color={marker.ring} transparent opacity={0.54} side={THREE.DoubleSide} />
        </mesh>
      ))}

      {markers.map((marker, index) => (
        <mesh
          key={`symbol-${marker.lat}-${marker.lon}-${index}`}
          position={latLonToVector3(marker.lat, marker.lon, 1.39)}
          lookAt={[0, 0, 0]}
        >
          <planeGeometry args={[0.16 * marker.size, 0.08 * marker.size]} />
          <meshBasicMaterial color={marker.color} transparent opacity={0.16} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
};

const GlobeScene = ({ className = "h-[360px]" }) => {
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 640px)");

    const updateMode = () => {
      setIsCompact(mediaQuery.matches);
    };

    updateMode();
    mediaQuery.addEventListener("change", updateMode);

    return () => {
      mediaQuery.removeEventListener("change", updateMode);
    };
  }, []);

  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.025),transparent_64%)]" />
      {!isCompact && (
        <div className="pointer-events-none absolute left-4 top-4 z-10 rounded-full border border-cyan-300/30 bg-black/35 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-100 backdrop-blur-md">
          Signals from India
        </div>
      )}
      <Canvas shadows camera={{ position: [0, 0.1, isCompact ? 4.6 : 4], fov: isCompact ? 52 : 42 }} dpr={isCompact ? [1, 1.35] : [1, 2]}>
        <ambientLight intensity={isCompact ? 0.36 : 0.44} />
        <directionalLight position={[6, 3, 5]} intensity={isCompact ? 1.6 : 2.1} color="#ffffff" castShadow />
        <directionalLight position={[-5, 2, -4]} intensity={isCompact ? 0.65 : 0.85} color="#8cc9ff" />
        <pointLight position={[-3, -1, 2]} intensity={isCompact ? 0.3 : 0.42} color="#6ea8ff" />
        <Stars radius={90} depth={48} count={isCompact ? 180 : 620} factor={isCompact ? 2 : 2.8} fade speed={0.6} />
        <GlobeCore />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableDamping
          dampingFactor={0.09}
          rotateSpeed={0.55}
          autoRotate
          autoRotateSpeed={isCompact ? 0.16 : 0.24}
          minPolarAngle={Math.PI * 0.35}
          maxPolarAngle={Math.PI * 0.65}
        />
      </Canvas>
      {!isCompact && (
        <div className="pointer-events-none absolute bottom-4 left-4 z-10 flex flex-wrap gap-2">
          {[
            { label: "India", tone: "border-cyan-300/40 bg-cyan-300/10 text-cyan-100" },
            { label: "Signal Hub", tone: "border-emerald-300/40 bg-emerald-300/10 text-emerald-100" },
            { label: "USA", tone: "border-orange-300/40 bg-orange-300/10 text-orange-100" },
            { label: "UK", tone: "border-violet-300/40 bg-violet-300/10 text-violet-100" },
            { label: "Japan", tone: "border-sky-300/40 bg-sky-300/10 text-sky-100" },
          ].map((item) => (
            <span key={item.label} className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${item.tone}`}>
              {item.label}
            </span>
          ))}
        </div>
      )}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#030507]/40 to-transparent" />
    </div>
  );
};

export default GlobeScene;
