"use client";

import { motion } from "framer-motion";
import OverlayReveal from "../../shared/ui/OverlayReveal";
import { useDevMode } from "@/contexts/DevModeContext";

const HeroContent = () => {
  const { isDevMode } = useDevMode();

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div
      className={`lg:w-[60%] text-center ${
        isDevMode ? "lg:text-left" : "lg:text-center"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <OverlayReveal
          trigger="animate"
          delay={0.2}
          duration={0.8}
          wrapperClassName="mb-3"
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-tighter tracking-tight font-black whitespace-nowrap">
            Hey, It's Body
            <span className="text-primary">.</span>
          </h1>
        </OverlayReveal>

        <OverlayReveal
          trigger="animate"
          delay={0.6}
          duration={0.8}
          wrapperClassName="mb-3"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-4xl font-medium text-foreground">
            I'm a <span className="text-primary">Full Stack Developer.</span>
          </h2>
        </OverlayReveal>

        <motion.p
          className="text-lg sm:text-lg text-foreground/70 mb-8 max-w-2xl mx-auto lg:mx-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          I've been diving deep into web development, building and refining
          projects that bring ideas to life. When I'm not coding, I'm learning
          new skills and exploring ways to solve real-world problems with tech.
        </motion.p>

        {/* Desktop Connect Button */}
        <motion.div
          className="hidden lg:block mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          <motion.button
            onClick={scrollToContact}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex gap-2 items-center ${
              isDevMode ? "" : "mx-auto"
            } bg-primary text-white px-8 py-[12px] text-md rounded-sm font-medium transition-colors duration-300 hover:bg-primary/90`}
          >
            Let's connect!
          </motion.button>
        </motion.div>

        {/* Mobile Resume Button */}
        <motion.div
          className="block lg:hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          <motion.a
            href="https://drive.google.com/file/d/1M2QmESPSAYzRGxH1FMPLMHFeIsk5LGW4/view?usp=drive_link"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-primary text-white px-8 py-2 rounded-sm font-medium text-md hover:bg-primary/90 transition-colors duration-300"
          >
            My resume
          </motion.a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroContent;
