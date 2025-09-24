"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useTranslation } from "react-i18next";
import SectionLayout from "../../shared/layout/SectionLayout";
import SectionHeader from "../../shared/ui/SectionHeader";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  const [showAll, setShowAll] = useState(false);
  const [projectsData, setProjectsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { i18n, t } = useTranslation();
  const INITIAL_PROJECTS_COUNT = 4;
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

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, delay: 0.2 },
    },
  };

  // Load projects data from database
  useEffect(() => {
    const loadProjectsData = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/projects", {
          cache: "no-store", // Ensure fresh data
        });
        const result = await response.json();
        console.log("result: ", result);

        if (result.ok) {
          setProjectsData(result.data);
        } else {
          console.error("Failed to load projects:", result.error);
          setProjectsData([]);
        }
      } catch (error) {
        console.error("Error loading projects:", error);
        setProjectsData([]);
      } finally {
        setLoading(false);
      }
    };

    loadProjectsData();
  }, []); // Remove i18n.language dependency since we're using database

  // Get projects to display based on showAll state
  const displayedProjects = showAll
    ? projectsData
    : projectsData.slice(0, INITIAL_PROJECTS_COUNT);

  const hasMoreProjects = projectsData.length > INITIAL_PROJECTS_COUNT;

  const handleToggleProjects = () => {
    setShowAll(!showAll);
  };

  return (
    <SectionLayout id="projects">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <SectionHeader
          title={t("projects.title")}
          align="right"
          overlayDelay={0.3}
        />

        {/* Projects Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="flex items-center gap-3 text-foreground/60">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              <span>Loading projects...</span>
            </div>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
            variants={containerVariants}
          >
            <AnimatePresence mode="popLayout">
              {displayedProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  variants={cardVariants}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Load More/Less Button */}
        {!loading && hasMoreProjects && (
          <motion.div
            className="flex justify-center mt-8 sm:mt-12"
            variants={buttonVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <button
              onClick={handleToggleProjects}
              className="group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#7300FF] to-[#9333ea] hover:from-[#5a00cc] hover:to-[#7c3aed] text-white font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#7300FF]/25"
            >
              <span>
                {showAll
                  ? t("projects.showLess")
                  : `${t("projects.showAll")} (${projectsData.length})`}
              </span>
              {showAll ? (
                <ChevronUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
              ) : (
                <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
              )}
            </button>
          </motion.div>
        )}
      </motion.div>
    </SectionLayout>
  );
};

export default Projects;
