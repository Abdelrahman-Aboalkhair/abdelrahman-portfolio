"use client";

import { motion } from "framer-motion";

const OverlayReveal = ({
  children,
  trigger = "whileInView",
  delay = 0,
  duration = 0.6,
  className = "",
  wrapperClassName = "",
}) => {
  // Container variants for the wrapper
  const containerVariants = {
    hidden: {},
    visible: {},
  };

  // Text reveal variants - text starts hidden and becomes visible
  const textVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.1,
        delay: delay + duration * 0.4, // Text appears near the end of overlay animation
      },
    },
  };

  // Overlay animation - slides from left to right
  const overlayVariants = {
    hidden: {
      x: "-100%",
    },
    visible: {
      x: "100%",
      transition: {
        duration,
        ease: [0.4, 0, 0.2, 1], // [x1,y1,x2,y2]
        delay,
      },
    },
  };

  const animationProps =
    trigger === "whileInView"
      ? {
          initial: "hidden",
          whileInView: "visible",
          viewport: { once: true, amount: 0.1 },
        }
      : {
          initial: "hidden",
          animate: "visible",
        };

  return (
    <motion.div
      className={`relative inline-block overflow-hidden ${wrapperClassName}`}
      variants={containerVariants}
      {...animationProps}
    >
      {/* Content that gets revealed */}
      <motion.div variants={textVariants} className={className}>
        {children}
      </motion.div>

      {/* Violet overlay that slides across */}
      <motion.div
        className="absolute inset-0 bg-primary pointer-events-none"
        variants={overlayVariants}
      />
    </motion.div>
  );
};

export default OverlayReveal;
