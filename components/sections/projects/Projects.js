"use client";

import { motion } from "framer-motion";
import projectsData from "../../../data/projects.json";
import SectionLayout from "../../shared/layout/SectionLayout";
import SectionHeader from "../../shared/ui/SectionHeader";
import ProjectCard from "./ProjectCard";

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
        <SectionHeader title="Projects" align="right" overlayDelay={0.3} />

        {/* Projects Grid */}
        <motion.div
          className="grid md:grid-cols-2 gap-6"
          variants={containerVariants}
        >
          {projectsData.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              variants={cardVariants}
            />
          ))}
        </motion.div>
      </motion.div>
    </SectionLayout>
  );
};

export default Projects;
