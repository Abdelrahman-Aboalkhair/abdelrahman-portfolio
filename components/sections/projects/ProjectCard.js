"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import ProjectModal from "./ProjectModal";
import { FaChevronRight } from "react-icons/fa";

const ProjectCard = ({ project, variants }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLearnMore = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <motion.div
        variants={variants}
        whileHover={{ y: -10, rotate: 1, scale: 1.02 }}
        className="group relative border-2 border-muted backdrop-blur-xl rounded-md overflow-hidden"
      >
        {/* Project Image Placeholder */}
        <div className="h-48 bg-white flex items-center justify-center border-b border-white/10">
          <div className="text-black text-2xl font-handwritten">
            Project Image
          </div>
        </div>

        {/* Project Content */}
        <div className="p-6 relative z-10">
          <h3 className="text-xl font-semibold mb-2 transition-colors tracking-wide capitalize">
            {project.title}
          </h3>

          <p className="text-primary mb-4 text-sm">{project.tech}</p>

          <p className="text-white/80 leading-relaxed mb-4">
            {project.desc.replace(" Learn more >", "")}
          </p>

          {/* Learn More Button */}
          <button
            onClick={handleLearnMore}
            className="flex items-center gap-2 text-[#7300FF] hover:text-[#8533ff] font-medium transition-colors group/btn"
          >
            <span>Learn more</span>
            <FaChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Glassmorphic border glow effect */}
        {/* <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#7300FF]/20 via-transparent to-[#7300FF]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" /> */}
      </motion.div>

      {/* Project Modal */}
      <ProjectModal
        project={project}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default ProjectCard;
