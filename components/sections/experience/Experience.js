"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import SectionLayout from "../../shared/layout/SectionLayout";
import SectionHeader from "../../shared/ui/SectionHeader";
import ExperienceCard from "./ExperienceCard";

const Experience = () => {
  const [experienceData, setExperienceData] = useState([]);
  const { i18n, t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  // Load language-specific experience data
  useEffect(() => {
    const loadExperienceData = async () => {
      try {
        const data = await import(
          `../../../data/experience.${i18n.language}.json`
        );
        setExperienceData(data.default);
      } catch (error) {
        // Fallback to English if language-specific file doesn't exist
        const fallbackData = await import("../../../data/experience.en.json");
        setExperienceData(fallbackData.default);
      }
    };

    loadExperienceData();
  }, [i18n.language]);

  return (
    <SectionLayout id="experience">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <SectionHeader
          title={t("nav.experience")}
          align="left"
          overlayDelay={0.4}
        />

        {/* Experience Entries */}
        <div className="space-y-12">
          {experienceData.map((exp) => (
            <ExperienceCard key={exp.id} experience={exp} />
          ))}
        </div>
      </motion.div>
    </SectionLayout>
  );
};

export default Experience;
