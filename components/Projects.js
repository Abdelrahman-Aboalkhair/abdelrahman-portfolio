"use client";

import { motion } from "framer-motion";
import projectsData from "../data/projects.json";
import SectionLayout from "./SectionLayout";
import OverlayReveal from "./OverlayReveal";

const Projects = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 80 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <SectionLayout id="projects">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between gap-8 mb-12"
        >
          {/* Live divider */}
          <div className="w-full h-[1.6px] bg-muted"></div>

          <OverlayReveal>
            <h2 className="flex items-center text-2xl sm:text-3xl lg:text-4xl font-bold mr-9 ">
              Projects <span className="text-primary">.</span>
            </h2>
          </OverlayReveal>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid md:grid-cols-2 gap-8"
          variants={containerVariants}
        >
          {projectsData.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className="bg-[#2E2E2E] rounded-xl overflow-hidden hover:bg-[#3E3E3E] transition-colors duration-300"
            >
              {/* Project Image Placeholder */}
              <div className="h-48 bg-white flex items-center justify-center">
                <div className="text-black text-2xl font-handwritten">
                  My Project
                </div>
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
          ))}
        </motion.div>
      </motion.div>
    </SectionLayout>
  );
};

export default Projects;
