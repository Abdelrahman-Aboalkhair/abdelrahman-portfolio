"use client";

import { motion } from "framer-motion";
import experienceData from "../../../data/experience.json";
import SectionLayout from "../../shared/layout/SectionLayout";
import SectionHeader from "../../shared/ui/SectionHeader";
import ExperienceCard from "./ExperienceCard";

const Experience = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <SectionLayout id="experience">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <SectionHeader title="Experience" align="left" overlayDelay={0.4} />

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
