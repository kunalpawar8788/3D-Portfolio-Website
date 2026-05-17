import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const CustomCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 14, stiffness: 900, mass: 0.12 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setIsVisible(true);

    const handleMove = (event) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
    };

    window.addEventListener("pointermove", handleMove);

    return () => {
      window.removeEventListener("pointermove", handleMove);
    };
  }, [mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed z-[80] h-2.5 w-2.5 rounded-full bg-[#54ff9d]"
        style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%", filter: "none", mixBlendMode: "normal" }}
      />
      <motion.div
        className="pointer-events-none fixed z-[79] h-8 w-8 rounded-full border border-[#54ff9d]/30"
        style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%", filter: "none", mixBlendMode: "normal" }}
      />
    </>
  );
};

export default CustomCursor;
