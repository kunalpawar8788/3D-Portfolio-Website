import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const greetings = [
  { text: "Hello", language: "English" },
  { text: "Namaste", language: "Hindi" },
  { text: "Hola", language: "Spanish" },
  { text: "Bonjour", language: "French" },
  { text: "Hallo", language: "German" },
  { text: "Ciao", language: "Italian" },
  { text: "你好", language: "Mandarin" },
  { text: "こんにちは", language: "Japanese" },
  { text: "안녕하세요", language: "Korean" },
  { text: "Привет", language: "Russian" },
  { text: "مرحبا", language: "Arabic" },
  { text: "Olá", language: "Portuguese" },
];

const MultilingualGreeting = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedGreeting, setDisplayedGreeting] = useState(greetings[0]);

  useEffect(() => {
    // Change greeting every 1400ms for smoother, readable slides
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % greetings.length);
    }, 1400);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setDisplayedGreeting(greetings[currentIndex]);
  }, [currentIndex]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "24px" }}>
      <style>{`
        .greeting-text {
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Helvetica, Arial, sans-serif !important;
          font-size: clamp(80px, 12vw, 160px) !important;
          font-weight: 200 !important;
          color: white !important;
          letter-spacing: -0.02em !important;
          text-align: center !important;
          line-height: 1.05 !important;
          -webkit-font-smoothing: antialiased !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        /* language subtitle removed */
      `}</style>
      <AnimatePresence mode="wait">
        <motion.div
          key={displayedGreeting.text}
          initial={{ opacity: 0, y: 18, scale: 0.98, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -14, scale: 1.02, filter: "blur(6px)" }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}
        >
          {/* Main Hello Text - Apple Style */}
          <div className="greeting-text">
            {displayedGreeting.text}
          </div>

          {/* Language subtitle removed - minimal Apple-style greeting */}
        </motion.div>
      </AnimatePresence>

      {/* Progress bar removed for minimal startup feel */}
    </div>
  );
};

export default MultilingualGreeting;
