"use client";

import { motion } from "framer-motion";

const HeroNavigation = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const sideButtons = [
    { label: "Who am I?", id: "about" },
    { label: "What I worked on?", id: "projects" },
    { label: "What I've been doing?", id: "experience" },
    { label: "How to reach out?", id: "contact" },
  ];

  return (
    <motion.div
      className="lg:hidden mt-12 flex flex-col space-y-4 w-full max-w-sm"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.2, duration: 0.6 }}
    >
      {sideButtons.map((button, index) => (
        <motion.button
          key={button.id}
          onClick={() => scrollToSection(button.id)}
          className="flex items-center justify-between bg-[#2E2E2E] text-[#E4E0E0] px-6 py-4 rounded-xl hover:bg-[#3E3E3E] transition-colors duration-300"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.4 + index * 0.1, duration: 0.4 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="font-medium">{button.label}</span>
          <div className="w-3 h-3 bg-primary rounded-full"></div>
        </motion.button>
      ))}
    </motion.div>
  );
};

export default HeroNavigation;
