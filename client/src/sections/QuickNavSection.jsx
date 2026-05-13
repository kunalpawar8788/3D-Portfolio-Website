import { motion } from "framer-motion";

import SectionHeading from "../components/SectionHeading";

const links = [
  {
    title: "Home",
    subtitle: "Back to the main hero",
    href: "#home",
    accent: "from-cyan-300/25 to-sky-500/20",
  },
  {
    title: "About",
    subtitle: "Who I am and what I build",
    href: "#about",
    accent: "from-violet-300/25 to-indigo-500/20",
  },
  {
    title: "3D Globe",
    subtitle: "Interactive Earth showcase",
    href: "#showreel",
    accent: "from-blue-300/25 to-cyan-500/20",
  },
  {
    title: "Skills",
    subtitle: "Core tech stack",
    href: "#skills",
    accent: "from-emerald-300/25 to-teal-500/20",
  },
  {
    title: "Projects",
    subtitle: "Featured work and repos",
    href: "#projects",
    accent: "from-orange-300/25 to-amber-500/20",
  },
  {
    title: "Contact",
    subtitle: "Reach out quickly",
    href: "#contact",
    accent: "from-fuchsia-300/25 to-pink-500/20",
  },
];

const QuickNavSection = () => {
  return (
    <section id="navigate" className="section-fade relative px-6 py-16 md:px-12 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Quick Navigation"
          subtitle="Jump to any section with one click. This makes it easy to move through the portfolio like separate pages."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((item, index) => (
            <motion.a
              key={item.title}
              href={item.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.04 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className={`group relative overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br ${item.accent} p-4 shadow-[0_10px_24px_rgba(0,0,0,0.2)]`}
            >
              <div className="absolute inset-0 bg-black/45 backdrop-blur-[2px] transition group-hover:bg-black/35" />
              <div className="relative">
                <p className="font-display text-lg text-white">{item.title}</p>
                <p className="mt-1 text-sm text-white/70">{item.subtitle}</p>
                <p className="mt-4 text-xs uppercase tracking-[0.22em] text-cyan-200">Go to section</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickNavSection;