import { useEffect } from "react";

const COLORS = ["#FF4D4F", "#FFD700", "#7CFC00", "#00BFFF", "#FF69B4", "#FFA500"];

const ConfettiBlast = ({ x = 0, y = 0, count = 18, onComplete }) => {
  useEffect(() => {
    const t = setTimeout(() => onComplete && onComplete(), 1400);
    return () => clearTimeout(t);
  }, [onComplete]);

  const pieces = Array.from({ length: count }).map((_, i) => {
    const size = Math.round(6 + Math.random() * 10);
    const color = COLORS[i % COLORS.length];
    const angle = Math.random() * Math.PI * 2;
    const distance = 40 + Math.random() * 120;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance - (20 + Math.random() * 40);
    const rotate = Math.round(Math.random() * 360);
    const delay = Math.random() * 0.12;

    const style = {
      position: "absolute",
      left: x - size / 2,
      top: y - size / 2,
      width: size,
      height: size,
      background: color,
      transform: `translate(0px, 0px) rotate(0deg)`,
      borderRadius: "2px",
      pointerEvents: "none",
      willChange: "transform, opacity",
      transition: `transform 1s cubic-bezier(.2,.8,.2,1) ${delay}s, opacity 1s ease ${delay}s`,
    };

    return (
      <div
        key={i}
        className="confetti-piece"
        style={style}
        data-dx={dx}
        data-dy={dy}
        data-rotate={rotate}
      />
    );
  });

  // After mount, trigger transforms via requestAnimationFrame
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const nodes = document.getElementsByClassName("confetti-piece");
      for (let n of nodes) {
        const dx = parseFloat(n.getAttribute("data-dx")) || 0;
        const dy = parseFloat(n.getAttribute("data-dy")) || 0;
        const rotate = parseFloat(n.getAttribute("data-rotate")) || 0;
        n.style.transform = `translate(${dx}px, ${dy}px) rotate(${rotate}deg)`;
        n.style.opacity = "0";
      }
    });

    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div style={{ position: "fixed", left: 0, top: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 60 }}>
      {pieces}
    </div>
  );
};

export default ConfettiBlast;
