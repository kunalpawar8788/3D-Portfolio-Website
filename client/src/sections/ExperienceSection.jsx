import { motion } from "framer-motion";
import { FiBriefcase } from "react-icons/fi";

import SectionHeading from "../components/SectionHeading";

const experiences = [
  {
    year: "2024",
    role: "Software Developer Intern",
    company: "Humming Byte Technologies Pvt. Ltd.",
    duration: "15 February 2024 - 15 August 2024",
    summary:
      'Worked as a MERN stack intern on software development tasks, learning through real-world assignments and contributing in a professional environment.',
    highlight: "Certificate of Internship | 15 August 2024",
    accent: "from-[#33ff88] to-[#15c46f]",
    side: "right",
  },
  {
    year: "2026 - Present",
    role: "Prompt Engineer",
    company: "Zensar Technologies",
    duration: "April 2026 - Present",
    summary:
      "Started a new role at Zensar Technologies as a Prompt Engineer, currently contributing to prompt design and practical AI solution workflows.",
    mentor: "Current Role",
    highlight: "Started in April and currently working",
    accent: "from-[#17d96b] to-[#1ec7a4]",
    side: "left",
  },
];

const ExperienceSection = () => {
  return (
    <section
      id="experience"
      className="section-fade relative overflow-hidden px-6 py-20 md:px-12 lg:px-20"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(51,255,136,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(51,255,136,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-40" />
      
      {/* Radial Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(51,255,136,0.08),transparent_25%),radial-gradient(circle_at_80%_20%,rgba(51,255,136,0.06),transparent_20%),radial-gradient(circle_at_50%_50%,rgba(51,255,136,0.03),transparent_60%)]" />

      {/* Floating Particles */}
      <div className="pointer-events-none absolute inset-0">
        <motion.span className="absolute left-[8%] top-[16%] h-2 w-2 rounded-full bg-[#33ff88]/30" animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 6, repeat: Infinity }} />
        <motion.span className="absolute left-[14%] top-[30%] h-1.5 w-1.5 rounded-full bg-[#33ff88]/25" animate={{ y: [0, 15, 0], opacity: [0.25, 0.5, 0.25] }} transition={{ duration: 5, repeat: Infinity, delay: 0.5 }} />
        <motion.span className="absolute left-[45%] top-[22%] h-2.5 w-2.5 rounded-full bg-[#33ff88]/20" animate={{ y: [0, -25, 0], opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 7, repeat: Infinity, delay: 1 }} />
        <motion.span className="absolute right-[10%] top-[18%] h-2 w-2 rounded-full bg-[#33ff88]/25" animate={{ y: [0, 18, 0], opacity: [0.25, 0.55, 0.25] }} transition={{ duration: 6.5, repeat: Infinity, delay: 0.3 }} />
        <motion.span className="absolute right-[20%] top-[44%] h-1.5 w-1.5 rounded-full bg-[#33ff88]/20" animate={{ y: [0, -15, 0], opacity: [0.2, 0.45, 0.2] }} transition={{ duration: 5.5, repeat: Infinity, delay: 1.5 }} />
        <motion.span className="absolute left-[12%] top-[70%] h-1.5 w-1.5 rounded-full bg-[#33ff88]/20" animate={{ y: [0, 20, 0], opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 6.8, repeat: Infinity, delay: 2 }} />
        <motion.span className="absolute right-[14%] bottom-[18%] h-2 w-2 rounded-full bg-[#33ff88]/25" animate={{ y: [0, -18, 0], opacity: [0.25, 0.55, 0.25] }} transition={{ duration: 7.2, repeat: Infinity, delay: 0.7 }} />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl">
        <SectionHeading
          title="Experience"
          subtitle="A journey through professional growth and technical expertise"
        />

        <div className="relative mt-16">
          {/* Center Timeline Line */}
          <div className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 lg:block">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#33ff88]/60 to-transparent" />
            <div className="absolute inset-0 shadow-[0_0_20px_rgba(51,255,136,0.4)]" />
          </div>

          <div className="space-y-24 lg:space-y-32">
            {experiences.map((experience, index) => {
              const isLeft = experience.side === "left";

              return (
                <div className="relative" key={`wrap-${index}`}>
                  {/* Timeline Dot */}
                  <motion.div 
                    className="absolute left-1/2 top-6 hidden h-5 w-5 -translate-x-1/2 rounded-full bg-[#33ff88] lg:block"
                    style={{ boxShadow: "0_0_20px_rgba(51,255,136,0.8), 0_0_40px_rgba(51,255,136,0.4)" }}
                    animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  />

                  {/* Card */}
                  <motion.article
                    key={`${experience.role}-${index}`}
                    initial={{ opacity: 0, y: 40, x: isLeft ? -30 : 30 }}
                    whileInView={{ opacity: 1, y: 0, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
                    className={`relative mx-auto w-full max-w-md ${isLeft ? "lg:mr-auto lg:ml-0 lg:pr-20" : "lg:ml-auto lg:mr-0 lg:pl-20"}`}
                  >
                    <motion.div 
                      whileHover={{ scale: 1.02, y: -4 }}
                      transition={{ duration: 0.3 }}
                      className="rounded-2xl border border-[#33ff88]/20 bg-black/40 p-6 backdrop-blur-xl transition-all duration-300 hover:border-[#33ff88]/60 hover:bg-black/60 hover:shadow-[0_0_30px_rgba(51,255,136,0.3),inset_0_0_20px_rgba(51,255,136,0.05)]"
                    >
                      {/* Card Header */}
                      <div className="flex items-start gap-4">
                        <motion.div 
                          whileHover={{ rotate: [0, -10, 10, 0] }}
                          transition={{ duration: 0.5 }}
                          className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${experience.accent} text-black shadow-[0_0_20px_rgba(51,255,136,0.4)]`}
                        >
                          <FiBriefcase className="h-5 w-5" />
                        </motion.div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold tracking-widest text-[#33ff88]">{experience.year}</p>
                          <h3 className="mt-1.5 text-lg font-bold text-white">{experience.role}</h3>
                          <p className="mt-1 text-sm font-medium text-[#44ff9d]">{experience.company}</p>
                        </div>
                      </div>

                      {/* Card Body */}
                      <p className="mt-4 text-sm leading-relaxed text-white/70">{experience.summary}</p>

                      {/* Card Footer */}
                      <div className="mt-5 space-y-2 border-t border-white/10 pt-4 text-xs text-white/60">
                        <p>
                          <span className="text-white/40">Duration:</span>
                          <span className="ml-2 text-white/70">{experience.duration}</span>
                        </p>
                        {experience.mentor && (
                          <p>
                            <span className="text-white/40">Mentor / Location:</span>
                            <span className="ml-2 text-white/70">{experience.mentor}</span>
                          </p>
                        )}
                        <p className="text-[#33ff88]/70 font-medium">{experience.highlight}</p>
                      </div>
                    </motion.div>
                  </motion.article>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
