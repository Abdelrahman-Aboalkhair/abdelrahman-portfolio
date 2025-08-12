"use client";

import { motion } from "framer-motion";
import OverlayReveal from "../../shared/ui/OverlayReveal";
import SkillBadge from "./SkillBadge";

const SkillSection = ({
  title,
  icon,
  skills,
  gridCols = "grid-cols-2 sm:grid-cols-4",
  containerVariants,
  itemVariants,
}) => {
  return (
    <div>
      <OverlayReveal>
        <h3 className="flex items-center gap-2 text-xl font-bold text-white mb-4">
          <div className="bg-primary px-[4px] py-[1px] rounded-sm">{icon}</div>
          {title}
        </h3>
      </OverlayReveal>

      <OverlayReveal>
        <motion.div
          className={`grid ${gridCols} gap-3`}
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
