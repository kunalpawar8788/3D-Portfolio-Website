import { motion } from "framer-motion";
import { FiAward } from "react-icons/fi";
import SectionHeading from "../components/SectionHeading";

const certifications = [
  {
    id: 1,
    title: "Generative AI in Learning and Development",
    organization: "LinkedIn Learning",
    date: "Jul 20, 2025",
    color: "#0A66C2",
    skills: ["Artificial Intelligence", "Generative AI", "Learning & Development"],
  },
  {
    id: 2,
    title: "Artificial Intelligence Fundamentals",
    organization: "IBM SkillsBuild",
    date: "Sep 28, 2025",
    color: "#0F62FE",
    skills: ["AI Concepts", "Machine Learning Basics", "AI Ethics"],
  },
  {
    id: 3,
    title: "Finding, Sorting & Filtering Data in Microsoft Excel",
    organization: "Coursera Project Network",
    date: "2025",
    color: "#00B4EF",
    skills: ["Data Management", "Excel", "Data Analysis"],
  },
  {
    id: 4,
    title: "Python for Data Science (CS250)",
    organization: "Saylor Academy",
    date: "December 9, 2025",
    color: "#3776AB",
    skills: ["Python", "Data Science", "67 Hours"],
  },
];

const ResumeSection = () => {
  return (
    <section id="resume" className="section-fade relative overflow-hidden px-6 py-18 md:px-12 lg:px-20 mt-12 md:mt-16">
      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeading
          title="Certifications & Achievements"
          subtitle="Professional credentials and recognized learning achievements"
        />

        <div className="grid gap-6 md:grid-cols-2">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-2xl border border-white/20 bg-black/60 p-6 backdrop-blur-md transition duration-300 hover:border-white/30 hover:shadow-[0_0_24px_rgba(77,255,129,0.15)]"
            >
              <div className="mb-4 flex items-center gap-4">
                <div
                  className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-black/80 text-2xl font-bold"
                  style={{ color: cert.color }}
                >
                  ◆
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/60">
                    {cert.organization}
                  </p>
                  <p className="text-sm text-white/75">{cert.date}</p>
                </div>
              </div>

              <h3 className="font-display text-lg font-semibold text-white mb-4 transition group-hover:text-[#4dff81]">
                {cert.title}
              </h3>

              <div className="flex flex-wrap gap-2 mb-4">
                {cert.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="inline-block rounded-full border border-white/20 bg-white/8 px-3 py-1.5 text-xs font-medium text-white/70 transition group-hover:border-[#4dff81]/40 group-hover:text-white/90"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 text-xs text-[#4dff81] font-semibold">
                <FiAward className="h-4 w-4" />
                <span>Verified</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResumeSection;
