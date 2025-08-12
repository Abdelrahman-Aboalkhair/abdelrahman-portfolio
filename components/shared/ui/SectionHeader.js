"use client";

import { motion } from "framer-motion";
import OverlayReveal from "./OverlayReveal";

const SectionHeader = ({
  title,
  align = "left",
  className = "",
  overlayDelay = 0.2,
  showDivider = true,
}) => {
  const headerContent = (
    <h2 className="flex items-center text-2xl sm:text-3xl lg:text-4xl font-bold">
      {title} <span className="text-primary">.</span>
    </h2>
  );

  if (align === "right") {
    return (
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={`flex items-center justify-between gap-8 mb-12 ${className}`}
      >
        {showDivider && <div className="w-full h-[1.6px] bg-muted"></div>}
        <OverlayReveal
          trigger="whileInView"
          delay={overlayDelay}
          duration={0.8}
        >
          <div className="mr-9">{headerContent}</div>
        </OverlayReveal>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`flex items-center gap-8 mb-12 ${className}`}
    >
      <OverlayReveal trigger="whileInView" delay={overlayDelay} duration={0.8}>
        <div className="mr-24">{headerContent}</div>
      </OverlayReveal>
      {showDivider && <div className="w-full h-[1.6px] bg-muted"></div>}
    </motion.div>
  );
};

export default SectionHeader;
