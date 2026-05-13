import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    minify: "terser",
    terserOptions: {
      compress: { drop_console: true },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          "three-vendor": ["three", "@react-three/fiber", "@react-three/drei"],
          "animation": ["framer-motion", "gsap"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  optimizeDeps: {
    include: ["three", "@react-three/fiber", "gsap"],
  },
});
