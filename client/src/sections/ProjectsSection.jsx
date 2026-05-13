import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";

import ProjectCard from "../components/ProjectCard";
import SectionHeading from "../components/SectionHeading";
import { fetchProjects } from "../utils/api";

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAllProjects, setShowAllProjects] = useState(false);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getProjects();
  }, []);

  const visibleProjects = showAllProjects ? projects : projects.slice(0, 3);

  return (
    <section id="projects" className="section-fade relative px-6 py-18 pt-28 md:px-12 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="GitHub Projects"
          subtitle="All public projects from my GitHub account, shown here with live links and source code."
        />

        {!loading && !error && projects.length > 0 && (
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-cyan-200/25 bg-transparent px-4 py-3 backdrop-blur-sm shadow-[0_0_20px_rgba(103,232,249,0.08)]">
            <div className="inline-flex items-center gap-2 text-sm font-medium text-white/75">
              <FaGithub className="text-white/85" />
              <span>Source: github.com/kunalpawar8788</span>
            </div>
            <div className="rounded-full border border-cyan-200/30 bg-transparent px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-white/80 shadow-[0_0_14px_rgba(103,232,249,0.08)]">
              Total Projects: {projects.length}
            </div>
          </div>
        )}

        {loading && <p className="text-white/70">Loading projects...</p>}
        {error && <p className="text-red-300">{error}</p>}

        {!loading && !error && (
          <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
            {visibleProjects.map((project, index) => (
              <ProjectCard key={project._id || project.title} project={project} index={index} />
            ))}
          </div>
        )}

        {!loading && !error && projects.length > 3 && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAllProjects((previous) => !previous)}
              className="rounded-full border border-cyan-200/35 bg-transparent px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white/85 transition hover:border-cyan-100/80 hover:shadow-[0_0_18px_rgba(103,232,249,0.18)]"
            >
              {showAllProjects ? "Show Less" : "See More"}
            </button>
          </div>
        )}

        {!loading && !error && projects.length === 0 && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-white/60">
            No projects found. Seed the database or connect the GitHub repos list to populate this section.
          </motion.p>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
