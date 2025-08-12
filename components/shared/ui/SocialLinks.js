import React from "react";
import OverlayReveal from "./OverlayReveal";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";

const SocialLinks = () => {
  return (
    <OverlayReveal>
      <div className="flex items-center space-x-4">
        <span className="text-primary font-medium text-lg">My links →</span>
        <div className="flex space-x-2">
          <motion.a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-primary hover:text-[#A366FF] text-2xl transition-colors duration-300"
          >
            <FaLinkedin />
          </motion.a>
          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-primary hover:text-[#A366FF] text-2xl transition-colors duration-300"
          >
            <FaGithub />
          </motion.a>
          <motion.a
            href="https://upwork.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-primary hover:text-[#A366FF] text-2xl transition-colors duration-300"
          >
            {/* <FaUpwork /> */}
          </motion.a>
        </div>
      </div>
    </OverlayReveal>
  );
};

export default SocialLinks;
