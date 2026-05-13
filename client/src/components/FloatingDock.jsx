import { motion } from "framer-motion";
import { FaBriefcase, FaEnvelope, FaHome, FaMoon, FaSun, FaUser } from "react-icons/fa";

const FloatingDock = ({ theme, onToggleTheme }) => {
  const dockItems = [
    { icon: FaHome, href: "#home", label: "Home", type: "link" },
    { icon: FaUser, href: "#about", label: "About", type: "link" },
    { icon: FaBriefcase, href: "#projects", label: "Work", type: "link" },
    {
      icon: FaEnvelope,
      href: "mailto:kunalpawar8805@gmail.com?subject=Portfolio%20Inquiry&body=Hi%20Kunal%2C%20I%20want%20to%20connect%20with%20you.",
      label: "Mail",
      type: "link",
    },
    { icon: theme === "light" ? FaSun : FaMoon, label: "Theme", type: "action", onClick: onToggleTheme },
  ];

  return (
    <div className="pointer-events-none fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-2xl bg-black/18 px-3 py-2 backdrop-blur-md">
      <div className="pointer-events-auto flex items-center gap-2 md:gap-3">
        {dockItems.map((item) => {
          const Icon = item.icon;

          if (item.type === "action") {
            return (
              <motion.button
                key={item.label}
                type="button"
                onClick={item.onClick}
                whileHover={{ y: -3, scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-sm text-white/85 transition hover:bg-white/12 hover:text-[#7fff9f] md:h-11 md:w-11"
                aria-label={item.label}
                title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
              >
                <Icon />
              </motion.button>
            );
          }

          return (
            <motion.a
              key={item.label}
              href={item.href}
              whileHover={{ y: -3, scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-sm text-white/85 transition hover:bg-white/12 hover:text-[#7fff9f] md:h-11 md:w-11"
              aria-label={item.label}
              title={item.label}
            >
              <Icon />
            </motion.a>
          );
        })}
      </div>
    </div>
  );
};

export default FloatingDock;
