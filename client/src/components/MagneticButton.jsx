import { motion } from "framer-motion";
import { useRef } from "react";

const MagneticButton = ({ children, href, variant = "primary", target, rel }) => {
  const buttonRef = useRef(null);

  const handleMouseMove = (event) => {
    const node = buttonRef.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    node.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  };

  const resetPosition = () => {
    const node = buttonRef.current;
    if (!node) return;
    node.style.transform = "translate(0px, 0px)";
  };

  const base =
    "inline-flex items-center justify-center rounded-full px-6 py-3 font-semibold transition-all duration-300";

  const styles =
    variant === "outline"
      ? "border border-white/30 bg-white/5 text-white hover:border-cyan-300 hover:text-cyan-200"
      : "bg-gradient-to-r from-cyan-300 to-indigo-400 text-black hover:shadow-glow";

  return (
    <motion.a
      href={href}
      target={target}
      rel={rel}
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetPosition}
      whileTap={{ scale: 0.96 }}
      className={`${base} ${styles}`}
    >
      {children}
    </motion.a>
  );
};

export default MagneticButton;
