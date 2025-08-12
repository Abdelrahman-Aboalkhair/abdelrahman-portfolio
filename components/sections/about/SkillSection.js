"use client";

import { motion } from "framer-motion";
import OverlayReveal from "../../shared/ui/OverlayReveal";
import SkillBadge from "./SkillBadge";

const SkillSection = ({
  title,
  icon,
  skills,
  gridCols = "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
  containerVariants,
  itemVariants,
}) => {
  return (
    <div className="w-full">
      <OverlayReveal>
        <h3 className="flex items-center gap-2 text-lg sm:text-xl font-bold text-white mb-4">
          <div className="bg-primary px-2 py-1 text-sm rounded-sm flex-shrink-0">
            {icon}
          </div>
          <span className="break-words">{title}</span>
        </h3>
      </OverlayReveal>

      <OverlayReveal>
        <motion.div
          className={`grid ${gridCols} gap-2 sm:gap-3 w-full`}
          variants={containerVariants}
        >
          {skills.map((skill, index) => (
            <SkillBadge key={skill} skill={skill} variants={itemVariants} />
          ))}
        </motion.div>
      </OverlayReveal>
    </div>
  );
};

export default SkillSection;
