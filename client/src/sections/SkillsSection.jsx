import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { FaBootstrap, FaCode, FaCodeBranch, FaCss3Alt, FaDatabase, FaJava, FaLayerGroup, FaMobileAlt, FaServer, FaTools, FaWindowRestore } from "react-icons/fa";
import {
  SiDocker,
  SiExpress,
  SiFirebase,
  SiGit,
  SiGithubactions,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiNodedotjs,
  SiPhp,
  SiPython,
  SiReact,
  SiTailwindcss,
} from "react-icons/si";

const skillGroups = {
  languages: [
    { name: "SQL", level: "Advanced", icon: SiMysql },
    { name: "Python", level: "Intermediate", icon: SiPython },
    { name: "JavaScript", level: "Expert", icon: SiJavascript },
    { name: "Java", level: "Intermediate", icon: FaJava },
  ],
  frontend: [
    { name: "HTML", level: "Expert", icon: SiHtml5 },
    { name: "CSS", level: "Expert", icon: FaCss3Alt },
    { name: "JavaScript", level: "Expert", icon: SiJavascript },
    { name: "Tkinter", level: "Intermediate", icon: FaWindowRestore },
    { name: "React.js", level: "Expert", icon: SiReact },
    { name: "Bootstrap", level: "Advanced", icon: FaBootstrap },
    { name: "Tailwind CSS", level: "Expert", icon: SiTailwindcss },
    { name: "Responsive Design", level: "Expert", icon: FaMobileAlt },
  ],
  backend: [
    { name: "NodeJS", level: "Expert", icon: SiNodedotjs },
    { name: "Php (Basics)", level: "Basic", icon: SiPhp },
    { name: "RESTful API", level: "Advanced", icon: FaServer },
    { name: "ExpressJS", level: "Advanced", icon: SiExpress },
    { name: "Java", level: "Intermediate", icon: FaJava },
    { name: "Python", level: "Intermediate", icon: SiPython },
    { name: "Version Control", level: "Advanced", icon: FaCodeBranch },
    { name: "Git", level: "Advanced", icon: SiGit },
  ],
  database: [
    { name: "MongoDB", level: "Advanced", icon: SiMongodb },
    { name: "MySQL", level: "Intermediate", icon: SiMysql },
    { name: "Firebase", level: "Intermediate", icon: SiFirebase },
  ],
  devops: [
    { name: "Docker", level: "Intermediate", icon: SiDocker },
    { name: "GitHub Actions", level: "Intermediate", icon: SiGithubactions },
    { name: "CI/CD", level: "Intermediate", icon: FaTools },
  ],
};

const tabs = [
  { key: "languages", label: "Languages", icon: FaCode, accent: "text-violet-300" },
  { key: "frontend", label: "Frontend", icon: FaLayerGroup, accent: "text-sky-300" },
  { key: "backend", label: "Backend", icon: FaServer, accent: "text-emerald-300" },
  { key: "database", label: "Database", icon: FaDatabase, accent: "text-yellow-300" },
  { key: "devops", label: "DevOps & Tools", icon: FaTools, accent: "text-orange-300" },
];

const SkillsSection = () => {
  const [activeTab, setActiveTab] = useState("frontend");

  const activeSkills = useMemo(() => skillGroups[activeTab] || [], [activeTab]);

  return (
    <section id="skills" className="section-fade relative overflow-hidden px-6 py-18 md:px-12 lg:px-20">
      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-5xl rounded-[2rem] border border-white/10 bg-black/42 p-4 backdrop-blur-sm md:p-6"
        >
          <div className="mb-6 text-center">
            <h2 className="font-display text-[clamp(1.6rem,3.4vw,2.45rem)] font-bold text-white">
              Tech <span className="text-[#4dff81]">Arsenal</span>
            </h2>
          </div>

          <div className="mb-6 flex flex-wrap items-center justify-center gap-2 md:gap-2.5">
            {tabs.map((tab) => {
              const TabIcon = tab.icon;
              const isActive = tab.key === activeTab;

              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
                    isActive
                      ? "border-white/35 bg-white/12 text-white shadow-[0_0_18px_rgba(77,255,129,0.18)]"
                      : "border-white/15 bg-transparent text-white/65 hover:border-white/28 hover:text-white/90"
                  }`}
                >
                  <TabIcon className={isActive ? "text-white" : tab.accent} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
          >
            {activeSkills.map((skill, index) => {
              const SkillIcon = skill.icon;

              return (
                <motion.div
                  key={`${activeTab}-${skill.name}`}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ y: -3, scale: 1.01 }}
                  className="group rounded-2xl bg-black/35 p-3 transition hover:shadow-[0_0_20px_rgba(77,255,129,0.12)]"
                >
                  <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-black/60 text-lg text-white/80 transition group-hover:text-[#7fff9f]">
                    <SkillIcon />
                  </div>
                  <p className="text-center font-display text-[1.05rem] text-white">{skill.name}</p>
                  <p className="mt-1 text-center text-xs font-semibold uppercase tracking-[0.2em] text-white/45">
                    {skill.level}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
