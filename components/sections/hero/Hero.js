"use client";

import { motion } from "framer-motion";
import SectionLayout from "../../shared/layout/SectionLayout";
import SplineScene from "../../shared/ui/SplineScene";
import HeroContent from "./HeroContent";

const Hero = () => {
  return (
    <SectionLayout
      id="hero"
      className="min-h-screen flex items-center justify-center pt-16"
      paddingY=""
      backgroundColor=""
    >
      <div className="flex flex-col lg:flex-row items-center justify-between">
        {/* Main Content */}
        <HeroContent />

        {/* Desktop 3D Scene */}
        <motion.div
          className="hidden lg:block lg:w-1/2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <SplineScene
            sceneUrl="https://prod.spline.design/Hwjz8oLv9WN8ejij/scene.splinecoe"
            className="w-full h-96"
            fallback={
              <div className="flex justify-center">
                <div className="w-96 h-96 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl"></div>
              </div>
            }
          />
        </motion.div>
      </div>
    </SectionLayout>
  );
};

export default Hero;
