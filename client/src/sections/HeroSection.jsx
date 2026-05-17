import { Line, OrbitControls, Stars } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const OrbitRing = ({ points, color, opacity, rotation = [0, 0, 0], spin = [0, 0, 0] }) => {
  const groupRef = useRef(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.x += spin[0] * delta;
      groupRef.current.rotation.y += spin[1] * delta;
      groupRef.current.rotation.z += spin[2] * delta;
    }
  });

  return (
    <group ref={groupRef} rotation={rotation}>
      <Line points={points} color={color} lineWidth={0.35} transparent opacity={opacity} />
    </group>
  );
};

const WireGlobe = () => {
  const points = useMemo(() => {
    const spherePoints = [];
    const radius = 1.85;

    for (let index = 0; index < 700; index += 1) {
      const theta = Math.acos(2 * Math.random() - 1);
      const phi = 2 * Math.PI * Math.random();
      const x = radius * Math.sin(theta) * Math.cos(phi);
      const y = radius * Math.cos(theta);
      const z = radius * Math.sin(theta) * Math.sin(phi);
      spherePoints.push(new THREE.Vector3(x, y, z));
    }

    return spherePoints;
  }, []);

  const orbit1 = useMemo(() => {
    const path = [];
    const radius = 2.16;

    for (let i = 0; i <= 96; i += 1) {
      const angle = (i / 96) * Math.PI * 2;
      path.push([Math.cos(angle) * radius, 0, Math.sin(angle) * radius]);
    }

    return path;
  }, []);

  const orbit2 = useMemo(() => {
    const path = [];
    const radius = 2.22;
    const tilt = new THREE.Matrix4().makeRotationX(Math.PI * 0.34);

    for (let i = 0; i <= 96; i += 1) {
      const angle = (i / 96) * Math.PI * 2;
      const vector = new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
      vector.applyMatrix4(tilt);
      path.push([vector.x, vector.y, vector.z]);
    }

    return path;
  }, []);

  return (
    <group>
      <mesh rotation={[0.35, 0.2, 0]}>
        <sphereGeometry args={[1.85, 34, 34]} />
        <meshBasicMaterial color="#7bf0c2" transparent opacity={0.18} wireframe />
      </mesh>

      {points.map((point, index) => (
        <mesh key={index} position={point}>
          <sphereGeometry args={[0.01, 8, 8]} />
          <meshBasicMaterial color={index % 4 === 0 ? "#f5f38d" : "#d9fff1"} transparent opacity={0.92} />
        </mesh>
      ))}

      <OrbitRing points={orbit1} color="#effff7" opacity={0.14} rotation={[0, 0, 0]} spin={[0.02, 0.14, 0.02]} />
      <OrbitRing points={orbit2} color="#bfefff" opacity={0.11} rotation={[Math.PI * 0.34, Math.PI * 0.12, 0]} spin={[0.03, -0.1, 0.04]} />
    </group>
  );
};

const HeroSection = () => {
  const [spotlight, setSpotlight] = useState({ x: 50, y: 38 });
  const [istTime, setIstTime] = useState("");

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });

    const updateTime = () => {
      setIstTime(`${formatter.format(new Date())} IST`);
    };

    updateTime();
    const timerId = window.setInterval(updateTime, 1000);

    return () => {
      window.clearInterval(timerId);
    };
  }, []);

  const handleHeroPointerMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;

    setSpotlight({
      x: Math.min(100, Math.max(0, x)),
      y: Math.min(100, Math.max(0, y)),
    });
  };

  const resetHeroPointer = () => {
    setSpotlight({ x: 50, y: 38 });
  };

  return (
    <section
      id="home"
      className="full-bleed hero-ref relative min-h-screen overflow-hidden px-4 pb-0 pt-5 md:px-8 md:pb-28 lg:px-12 xl:px-20"
      onPointerMove={handleHeroPointerMove}
      onPointerLeave={resetHeroPointer}
    >
      <div className="hero-grid-overlay absolute inset-0 opacity-70" />
      <div
        className="pointer-events-none absolute inset-0 transition-[opacity,transform] duration-300"
        style={{
          background: `radial-gradient(circle at ${spotlight.x}% ${spotlight.y}%, rgba(122,255,199,0.16), transparent 18%), radial-gradient(circle at 50% 40%, rgba(216,223,73,0.08), rgba(0,0,0,0.5) 68%), radial-gradient(circle at 20% 78%, rgba(91,255,160,0.08), transparent 26%), radial-gradient(circle at 82% 70%, rgba(116,233,255,0.08), transparent 24%)`,
        }}
      />

      <header className="z-20 mx-auto flex w-full max-w-7xl items-center justify-between gap-4 absolute top-4 left-4 right-4 md:relative md:top-0 md:left-0 md:right-0">
        <div className="flex items-center gap-3 md:gap-4">
          <p className="font-display text-[1.6rem] font-bold text-[#6bff92] md:text-[2rem]">&lt;Kunal /&gt;</p>
          <p className="text-xs text-white/65 lg:hidden">{istTime || "--:--:-- IST"}</p>
          <div className="hidden items-center gap-3 rounded-full border border-white/15 bg-black/40 px-4 py-2 text-sm text-white/75 lg:flex">
            <span className="h-2 w-2 rounded-full bg-[#42ff93] shadow-[0_0_10px_rgba(66,255,147,0.95)]" />
            <span>Online</span>
            <span className="text-white/30">|</span>
            <span>{istTime || "--:--:-- IST"}</span>
          </div>
        </div>

        <nav className="hidden items-center gap-6 text-base font-medium text-white/70 lg:flex xl:gap-8 xl:text-lg">
          <a
            href="#about"
            className="relative border-b border-[#59ff9c] pb-1 text-[#59ff9c] transition hover:text-white"
          >
            About
          </a>
          <a
            href="#projects"
            className="group relative pb-1 transition hover:text-white after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-[#59ff9c] after:transition-transform after:duration-300 group-hover:after:scale-x-100"
          >
            Projects
          </a>
          <a
            href="#research"
            className="group relative pb-1 transition hover:text-white after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-[#59ff9c] after:transition-transform after:duration-300 group-hover:after:scale-x-100"
          >
            Blog
          </a>
          <a
            href="#contact"
            className="group relative pb-1 transition hover:text-white after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-[#59ff9c] after:transition-transform after:duration-300 group-hover:after:scale-x-100"
          >
            Contact
          </a>
          <a href="#contact" className="rounded-full bg-gradient-to-r from-[#71ff7e] to-[#d8df49] px-6 py-2.5 font-semibold text-black shadow-[0_0_24px_rgba(132,255,131,0.32)] xl:px-7">
            Hire Me
          </a>
        </nav>
        <a href="#contact" className="mr-5 shrink-0 whitespace-nowrap rounded-full bg-gradient-to-r from-[#71ff7e] to-[#d8df49] px-3 py-2 text-xs font-semibold text-black shadow-[0_0_20px_rgba(132,255,131,0.3)] sm:mr-0 sm:px-5 sm:text-sm lg:hidden">
          Hire Me
        </a>
      </header>

      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <div className="pointer-events-auto h-[52vh] min-h-[280px] w-[min(94vw,940px)] md:h-[62vh] md:min-h-[420px]">
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
            <ambientLight intensity={0.75} />
            <pointLight position={[3, 2, 4]} intensity={1.4} color="#6fffd0" />
            <Stars radius={85} depth={55} count={1100} factor={3.8} fade speed={0.9} />
            <WireGlobe />
            <OrbitControls
              enablePan={false}
              enableZoom={false}
              enableRotate={false}
              enableDamping
              dampingFactor={0.08}
              rotateSpeed={0.6}
              autoRotate
              autoRotateSpeed={0.28}
              minPolarAngle={Math.PI * 0.3}
              maxPolarAngle={Math.PI * 0.7}
            />
          </Canvas>
        </div>
      </div>

      <main className="z-20 mx-auto flex w-full max-w-5xl flex-col items-center px-4 text-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:relative md:left-0 md:top-0 md:translate-x-0 md:translate-y-0 md:mt-20 md:justify-start md:px-2">
        <div className="pointer-events-none absolute left-1/2 top-[18%] h-[70vh] w-[140vw] -translate-x-1/2 bg-[radial-gradient(circle,rgba(104,255,159,0.12)_0%,rgba(104,255,159,0.06)_24%,transparent_58%)] blur-3xl" />
        <div className="rounded-full border border-[#54ff9d]/45 bg-black/45 px-5 py-1.5 text-[clamp(0.95rem,1.9vw,1.35rem)] font-medium text-[#54ff9d] md:px-6 md:py-1.5">
          Full-Stack Developer
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mt-5 text-[clamp(2rem,6.2vw,4.8rem)] font-extrabold leading-[0.98] text-white"
        >
          Hi, I&apos;m{" "}
          <span className="bg-gradient-to-r from-[#4bff78] via-[#8cff66] to-[#d4d93c] bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(125,255,97,0.42)]">
            Kunal Pawar
          </span>
        </motion.h1>

        <p className="mt-5 max-w-3xl text-[clamp(1rem,1.65vw,1.35rem)] leading-relaxed text-white/72 md:leading-[1.45]">
          I build scalable, high-performance web applications that solve real-world problems.
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-3.5 md:gap-4">
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.06, y: -3 }}
            whileTap={{ scale: 0.98 }}
            className="rounded-full bg-gradient-to-r from-[#67ff7d] to-[#d7db4a] px-7 py-3 text-sm font-semibold text-black shadow-[0_0_26px_rgba(123,255,118,0.35)] md:px-8 md:py-3 md:text-lg"
          >
            View My Work
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.06, y: -3 }}
            whileTap={{ scale: 0.98 }}
            className="rounded-full border border-white/25 bg-black/55 px-7 py-3 text-sm font-semibold text-white/92 transition hover:border-white/45 md:px-8 md:py-3 md:text-lg"
          >
            Get In Touch
          </motion.a>
        </div>
      </main>

      {/* Mobile-only scroll hint (center bottom) */}
      <button
        aria-label="Scroll down"
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        className="lg:hidden absolute left-1/2 bottom-28 z-50 -translate-x-1/2 flex items-center gap-2 rounded-full bg-black/40 px-3 py-2 text-sm font-medium text-white/90 backdrop-blur-md shadow-md transition-transform hover:scale-105 sm:bottom-20"
        style={{ pointerEvents: 'auto' }}
      >
        <svg className="h-4 w-4 text-white/90 animate-bounce" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M12 5v14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M19 12l-7 7-7-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="select-none">Scroll</span>
      </button>

    </section>
  );
};

export default HeroSection;
