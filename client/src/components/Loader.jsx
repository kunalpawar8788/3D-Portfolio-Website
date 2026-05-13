import { motion, usePresence } from "framer-motion";
import MultilingualGreeting from "./MultilingualGreeting";
import { useEffect } from "react";

const Loader = () => {
  const [isPresent, safeToRemove] = usePresence();

  useEffect(() => {
    if (!isPresent) {
      // Allow the exit animation to finish, then allow unmount
      const t = setTimeout(() => {
        safeToRemove();
      }, 900);
      return () => clearTimeout(t);
    }
  }, [isPresent, safeToRemove]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#04050a]"
      style={{ pointerEvents: isPresent ? "auto" : "none" }}
    >
      <div className="relative flex flex-col items-center gap-5">
        <MultilingualGreeting />
      </div>
    </motion.div>
  );
};

export default Loader;
