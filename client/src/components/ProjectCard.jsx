import { motion } from "framer-motion";
import { useState } from "react";
import { FaCodeBranch, FaExternalLinkAlt, FaGithub, FaStar } from "react-icons/fa";
import { FiClock } from "react-icons/fi";

const ProjectCard = ({ project, index }) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const fallbackQuery = encodeURIComponent(
    `${project.title || "software project"}, ${project.techStack?.join(", ") || "web development"}`
  );
  const fallbackSeed = project._id || project.title?.length || 1;
  const fallbackImage = `https://source.unsplash.com/1600x900/?${fallbackQuery}&sig=${fallbackSeed}`;
  const updatedDate = project.updatedAt ? new Date(project.updatedAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : null;

  const onMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const rotateX = ((y / rect.height) - 0.5) * -10;
    const rotateY = ((x / rect.width) - 0.5) * 10;
    setRotate({ x: rotateX, y: rotateY });
  };

  const onLeave = () => setRotate({ x: 0, y: 0 });

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="group relative overflow-hidden rounded-2xl border border-cyan-200/30 bg-transparent shadow-[0_0_14px_rgba(103,232,249,0.1)]"
    >
      <div className="relative h-full rounded-2xl bg-transparent p-4 md:p-5">
        <div
          className="relative overflow-hidden rounded-xl flex items-center justify-center bg-gradient-to-br from-black/70 via-black/45 to-black/30"
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          style={{
            transformStyle: "preserve-3d",
            willChange: "transform",
            backfaceVisibility: "hidden",
            transform: `perspective(900px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          }}
        >
          <FaGithub size={48} className="text-white/20" />
        </div>

        <h3 className="mt-4 font-display text-[1.35rem] leading-tight text-white">{project.title}</h3>
        <p className="mt-2.5 line-clamp-3 text-sm leading-6 text-white/70">{project.description}</p>

        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-semibold text-white/70">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-200/30 bg-transparent px-3 py-1 text-white/80 shadow-[0_0_10px_rgba(103,232,249,0.08)]">
            <FaStar size={11} className="text-white/80" /> {project.stars ?? 0}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-200/30 bg-transparent px-3 py-1 text-white/80 shadow-[0_0_10px_rgba(103,232,249,0.08)]">
            <FaCodeBranch size={11} className="text-white/80" /> {project.forks ?? 0}
          </span>
          {updatedDate && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-200/30 bg-transparent px-3 py-1 text-white/80 shadow-[0_0_10px_rgba(103,232,249,0.08)]">
              <FiClock size={11} className="text-white/80" /> {updatedDate}
            </span>
          )}
        </div>

        {/* Tech tags removed per request to simplify GitHub card */}

        <div className="mt-4 flex items-center gap-2.5 border-t border-white/10 pt-3.5">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-cyan-200/40 bg-transparent px-3.5 py-1.5 text-xs font-semibold text-white/85 transition hover:border-cyan-100/85 hover:shadow-[0_0_18px_rgba(103,232,249,0.18)]"
            >
              Live Demo <FaExternalLinkAlt size={12} />
            </a>
          ) : null}
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-cyan-200/40 bg-transparent px-3.5 py-1.5 text-xs font-semibold text-white/85 transition hover:border-cyan-100/85 hover:shadow-[0_0_18px_rgba(103,232,249,0.18)]"
          >
            Code <FaGithub size={14} />
          </a>
        </div>
      </div>
    </motion.article>
  );
};

export default ProjectCard;
