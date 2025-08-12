"use client";

import { motion } from "framer-motion";

const ProjectCard = ({ project, variants }) => {
  return (
    <motion.div
      variants={variants}
      whileHover={{ y: -10 }}
      className="bg-[#2E2E2E] rounded-xl overflow-hidden hover:bg-[#3E3E3E] transition-colors duration-300"
    >
      {/* Project Image Placeholder */}
      <div className="h-48 bg-white flex items-center justify-center">
        <div className="text-black text-2xl font-handwritten">My Project</div>
      </div>

      {/* Project Content */}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-[#7300FF] mb-2">
          {project.title}
        </h3>

        <p className="text-[#E4E0E0] mb-4 text-sm">{project.tech}</p>

        <p className="text-[#E4E0E0] leading-relaxed">{project.desc}</p>

        {/* Status Dots */}
        <div className="flex space-x-2 mt-4">
          <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
