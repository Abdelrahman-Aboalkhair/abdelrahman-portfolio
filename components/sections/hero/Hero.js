"use client";

import { motion } from "framer-motion";
import SectionLayout from "../../shared/layout/SectionLayout";
import Terminal from "./Terminal";
import HeroContent from "./HeroContent";
import { useDevMode } from "../../../contexts/DevModeContext";

const Hero = () => {
  const { isDevMode } = useDevMode();

  return (
    <SectionLayout
      id="hero"
      className="min-h-screen flex items-center justify-center pt-16"
      paddingY=""
      backgroundColor=""
    >
      <div
        className={`flex flex-col lg:flex-row items-center ${
          isDevMode ? "justify-between" : "justify-center"
        } w-full gap-6 lg:gap-8`}
      >
        <HeroContent />

        {/* Interactive Terminal - Only show in dev mode */}
        {isDevMode && (
          <motion.div
            className="w-full lg:w-3/5 mt-4 lg:mt-0"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <Terminal />
          </motion.div>
        )}
      </div>
    </SectionLayout>
  );
};

export default Hero;
