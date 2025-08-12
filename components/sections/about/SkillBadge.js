"use client";

import { motion } from "framer-motion";

const SkillBadge = ({ skill, variants }) => {
  return (
    <motion.div
      variants={variants}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-muted text-foreground text-center px-3 py-2 sm:py-[4px] rounded-full font-medium text-sm sm:text-base hover:bg-muted/80 transition-colors duration-300 cursor-default break-words"
    >
      {skill}
    </motion.div>
  );
};

export default SkillBadge;
