import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, Suspense, lazy } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import CustomCursor from "./components/CustomCursor";
import FloatingDock from "./components/FloatingDock";
import ScrollProgress from "./components/ScrollProgress";
import HeroSection from "./sections/HeroSection";
import Loader from "./components/Loader";

// Lazy load heavy sections
const AboutSection = lazy(() => import("./sections/AboutSection"));
const ContactSection = lazy(() => import("./sections/ContactSection"));
const ExperienceSection = lazy(() => import("./sections/ExperienceSection"));
const ProjectsSection = lazy(() => import("./sections/ProjectsSection"));
const QuickNavSection = lazy(() => import("./sections/QuickNavSection"));
const ResumeSection = lazy(() => import("./sections/ResumeSection"));
const ShowreelSection = lazy(() => import("./sections/ShowreelSection"));
const SkillsSection = lazy(() => import("./sections/SkillsSection"));

const LoadingFallback = () => (
  <div className="min-h-screen bg-black flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-[#6bff92] border-t-transparent rounded-full animate-spin"></div>
  </div>
);

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    console.log("Starting loader timeout - 9 seconds");
    const timer = setTimeout(() => {
      console.log("Loader timeout finished - setting loading to false");
      setLoading(false);
    }, 9000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const sections = gsap.utils.toArray(".section-fade");
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          clearProps: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            once: true,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("theme-light", theme === "light");
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div className={`relative min-h-screen overflow-x-hidden bg-cyber-bg text-white ${theme === "light" ? "light-mode" : ""}`}>
      <CustomCursor />
      <ScrollProgress />
      <AnimatePresence mode="wait">
        {loading ? (
          <Loader key="loader" />
        ) : (
          <motion.main
            key="site"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative site-layout"
          >
                  <div className="site-global-bg pointer-events-none fixed inset-0 z-0" />
                  <div className="site-global-grid pointer-events-none fixed inset-0 z-0" />
            <HeroSection />
            <Suspense fallback={<LoadingFallback />}>
              <QuickNavSection />
              <AboutSection className="section-fade" />
              <ExperienceSection className="section-fade" />
              <ShowreelSection className="section-fade" />
              <SkillsSection className="section-fade" />
              <ResumeSection className="section-fade" />
              <ProjectsSection className="section-fade" />
              <ContactSection className="section-fade" />
            </Suspense>
            <FloatingDock theme={theme} onToggleTheme={toggleTheme} />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
