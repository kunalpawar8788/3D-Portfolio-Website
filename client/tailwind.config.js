/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: "#080A12",
          panel: "rgba(255, 255, 255, 0.08)",
          border: "rgba(255, 255, 255, 0.18)",
          neon: "#00F5D4",
          accent: "#FF7A18",
          violet: "#7F5AF0"
        }
      },
      fontFamily: {
        display: ["Syne", "sans-serif"],
        body: ["Space Grotesk", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 30px rgba(0, 245, 212, 0.35)",
        orangeGlow: "0 0 24px rgba(255, 122, 24, 0.35)"
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        blob: "blob 14s ease-in-out infinite",
        pulseGlow: "pulseGlow 2.4s ease-in-out infinite",
        gridPan: "gridPan 18s linear infinite"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" }
        },
        blob: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)", opacity: "0.38" },
          "33%": { transform: "translate(28px, -26px) scale(1.14)", opacity: "0.58" },
          "66%": { transform: "translate(-24px, 22px) scale(0.9)", opacity: "0.44" }
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 12px rgba(0, 245, 212, 0.25)" },
          "50%": { boxShadow: "0 0 32px rgba(0, 245, 212, 0.55)" }
        },
        gridPan: {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "120px 120px" }
        }
      }
    }
  },
  plugins: [],
};
