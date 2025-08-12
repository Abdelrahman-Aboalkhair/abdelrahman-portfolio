"use client";

import { motion } from "framer-motion";

const SkillBadge = ({ skill, variants }) => {
  return (
    <motion.div
      variants={variants}
      whileHover={{ scale: 1.05 }}
      className="bg-muted text-white whitespace-nowrap text-center py-[4px] rounded-full font-medium hover:bg-muted/80 transition-colors duration-300 cursor-default"
    >
      {skill}
    </motion.div>
  );
};

export default SkillBadge;
