"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import ProjectModal from "./ProjectModal";
import { ChevronRight } from "lucide-react";

const ProjectCard = ({ project, variants }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();

  const handleLearnMore = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <motion.div
        variants={variants}
        whileHover={{ y: -8, rotate: 0.5, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="group relative border-2 border-border backdrop-blur-xl rounded-md overflow-hidden cursor-pointer hover:border-primary/30 transition-colors duration-300"
        onClick={handleLearnMore}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleLearnMore();
          }
        }}
      >
        {/* Project Image */}
        <div className="relative h-48 sm:h-52 bg-gradient-to-br from-white/10 to-white/5 border-b border-white/10 overflow-hidden">
          <Image
            src={project.image}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            alt={`${project.title} preview`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Overlay on hover for better text readability */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
        </div>

        {/* Project Content */}
        <div className="p-4 sm:p-6 relative z-10">
          <h3 className="text-lg sm:text-xl font-semibold mb-2 transition-colors tracking-wide line-clamp-2">
            {project.title}
          </h3>

          <p className="text-primary mb-3 sm:mb-4 text-xs sm:text-sm font-medium line-clamp-2">
            {project.tech}
          </p>

          <p className="text-foreground/80 leading-relaxed mb-4 text-sm sm:text-base line-clamp-3">
            {project.desc.replace(` ${t("projects.learnMore")} >`, "")}
          </p>

          {/* Learn More Button */}
          <button
            onClick={handleLearnMore}
            className="flex items-center gap-2 text-[#7300FF] hover:text-[#8533ff] font-medium transition-colors group/btn text-sm sm:text-base"
          >
            <span>{t("projects.learnMore")}</span>
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover/btn:translate-x-1 transition-transform" />
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
