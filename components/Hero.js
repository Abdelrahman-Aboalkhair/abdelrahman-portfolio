"use client";

import { motion } from "framer-motion";
import SectionLayout from "./SectionLayout";
import SplineScene from "./SplineScene";
import OverlayReveal from "./OverlayReveal";

const Hero = () => {
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
    <SectionLayout
      id="hero"
      className="min-h-screen flex items-center justify-center pt-16"
      paddingY=""
      backgroundColor=""
    >
      <div className="flex flex-col lg:flex-row items-center justify-between">
        {/* Main Content */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <OverlayReveal
              trigger="animate"
              delay={0.2}
              duration={0.8}
              wrapperClassName="mb-4"
            >
              <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-7xl font-black">
                Hey, It's Body
                <span className="text-primary">.</span>
              </h1>
            </OverlayReveal>

            <OverlayReveal
              trigger="animate"
              delay={0.2}
              duration={0.8}
              wrapperClassName="mb-3"
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-4xl font-medium text-white">
                I'm a{" "}
                <span className="text-primary">Full Stack Developer.</span>
              </h2>
            </OverlayReveal>

            <OverlayReveal trigger="animate" delay={0.2} duration={0.8}>
              <p className="text-lg sm:text-lg text-light-gray mb-6 max-w-2xl mx-auto lg:mx-0">
                I've been diving deep into web development, building and
                refining projects that bring ideas to life. When I'm not coding,
                I'm learning new skills and exploring ways to solve real-world
                problems with tech.
              </p>
            </OverlayReveal>

            {/* Desktop Resume Button */}

            <OverlayReveal trigger="animate" delay={0.2} duration={0.8}>
              <button
                className="flex gap-2 items-center bg-primary text-white px-8 py-[12px] text-md rounded-sm font-medium 
                                transition-colors duration-300"
              >
                Let's connect!
              </button>
            </OverlayReveal>

            {/* Mobile Connect Button */}
            <motion.div
              className="block lg:hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection("contact")}
                className="bg-primary text-white px-8 py-4 rounded-xl font-medium text-lg hover:bg-[#A366FF] transition-colors duration-300"
              >
                Let's connect!
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Side Navigation Buttons (Mobile) */}
        <motion.div
          className="lg:hidden mt-12 flex flex-col space-y-4 w-full max-w-sm"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          {sideButtons.map((button, index) => (
            <motion.button
              key={button.id}
              onClick={() => scrollToSection(button.id)}
              className="flex items-center justify-between bg-[#2E2E2E] text-[#E4E0E0] px-6 py-4 rounded-xl hover:bg-[#3E3E3E] transition-colors duration-300"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 + index * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="font-medium">{button.label}</span>
              <div className="w-3 h-3 bg-primary rounded-full"></div>
            </motion.button>
          ))}
        </motion.div>

        {/* Desktop 3D Scene */}
        <motion.div
          className="hidden lg:block lg:w-1/2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
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
