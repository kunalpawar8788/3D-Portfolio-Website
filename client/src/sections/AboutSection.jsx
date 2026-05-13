import { motion } from "framer-motion";

import SectionHeading from "../components/SectionHeading";

const timeline = [
  {
    year: "Profile",
    title: "A Passionate Software Developer",
    detail: "Focused on building practical, performant apps across frontend, backend, and full-stack systems.",
  },
  {
    year: "About Me",
    title: "Design + Engineering",
    detail: "I like turning complex requirements into elegant interfaces and stable backend services.",
  },
  {
    year: "Tech Stack",
    title: "MERN + Motion + 3D",
    detail: "React, Node.js, MongoDB, Framer Motion, GSAP, and Three.js are central to my current work.",
  },
  {
    year: "Now",
    title: "Building Portfolio-Grade Products",
    detail: "This site is shaped around my own GitHub projects and a cinematic presentation style.",
  },
];

const researchPaper = {
  title: 'Explainable AI-Based Resume Screening System to Reduce Hiring Bias in Fresher Recruitment',
  venue: 'International Journal of Innovative Science and Research Technology (IJISRT)',
  detail:
    'This research focuses on using Explainable Artificial Intelligence (XAI) to build a transparent resume screening system that helps reduce bias in fresher recruitment and supports fair hiring decisions.',
  link: 'https://www.ijisrt.com/explainable-aibased-resume-screening-system-to-reduce-hiring-bias-in-fresher-recruitment',
};

const AboutSection = () => {
  return (
    <section id="about" className="section-fade relative px-6 py-20 md:px-12 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="About Me"
          subtitle="A quick look at who I am, what I build, and the published research paper I’m proud to share."
        />

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative ml-3 border-l border-cyan-300/30 pl-8 md:ml-8">
            {timeline.map((item, idx) => (
              <motion.article
                key={item.year}
                className="timeline-item glass-panel relative mb-7 rounded-2xl p-5"
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <span className="absolute -left-[2.42rem] top-8 h-4 w-4 rounded-full border border-cyan-100/40 bg-cyan-300/70 shadow-glow" />
                <p className="text-sm uppercase tracking-[0.28em] text-cyan-200">{item.year}</p>
                <h3 className="mt-2 font-display text-xl text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-white/70">{item.detail}</p>
              </motion.article>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7 }}
            className="relative space-y-6"
          >
            <div className="rounded-[2rem] border border-[#4dff81]/20 bg-black/30 p-6 shadow-[inset_0_0_50px_rgba(77,255,129,0.08)]">
              <p className="text-sm uppercase tracking-[0.28em] text-[#7dffa8]">Research Paper</p>
              <motion.article
                className="glass-panel mt-5 rounded-2xl p-5"
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.45 }}
              >
                <p className="text-xs uppercase tracking-[0.22em] text-cyan-200">Published in {researchPaper.venue}</p>
                <h3 className="mt-2 font-display text-lg text-white">{researchPaper.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/70">{researchPaper.detail}</p>
                <p className="mt-4 text-sm text-white/75">
                  I’m grateful for the opportunity to contribute to research in Artificial Intelligence and ethical hiring technologies.
                </p>
                <a
                  href={researchPaper.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center rounded-full border border-[#4dff81]/35 px-4 py-2 text-sm font-semibold text-[#8dffae] transition hover:border-[#4dff81]/70 hover:text-white"
                >
                  Read the published paper
                </a>
                <p className="mt-4 text-xs leading-5 text-white/55">
                  Anyone interested in the research paper can click the link above and read it.
                </p>
              </motion.article>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
