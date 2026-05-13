import { useEffect, useState } from "react";

const useParallax = (strength = 20) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (event) => {
      const x = (event.clientX / window.innerWidth - 0.5) * strength;
      const y = (event.clientY / window.innerHeight - 0.5) * strength;
      setOffset({ x, y });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [strength]);

  return offset;
};

export default useParallax;
