import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const CustomCursor = () => {
  const [enabled, setEnabled] = useState(window.innerWidth > 1024);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 14, stiffness: 900, mass: 0.12 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleResize = () => setEnabled(window.innerWidth > 1024);

    const handleMove = (event) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMove);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMove);
    };
  }, [mouseX, mouseY]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed z-[80] h-2.5 w-2.5 rounded-full bg-cyan-300"
        style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }}
      />
      <motion.div
        className="pointer-events-none fixed z-[79] h-8 w-8 rounded-full border border-cyan-300/40"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          boxShadow: "0 0 14px rgba(0,245,212,0.35)",
        }}
      />
    </>
  );
};

export default CustomCursor;
