"use client";

import { motion } from "framer-motion";
import SectionLayout from "../../shared/layout/SectionLayout";
import SectionHeader from "../../shared/ui/SectionHeader";
import SocialLinks from "../../shared/ui/SocialLinks";
import SkillSection from "./SkillSection";
import OverlayReveal from "../../shared/ui/OverlayReveal";

const About = () => {
  const projectSkills = [
    "Javascript",
    "Typescript",
    "SQL",
    "NextJs",
    "React",
    "Tailwind",
    "Redux",
    "NodeJs",
    "Express",
    "MongoDB",
    "Prisma",
    "Postgres",
    "Redis",
    "CI/CD",
    "GitHub Actions",
    "Docker",
    "GraphQL",
    "REST",
  ];

  const funSkills = [
    "Three Js",
    "React Three Fiber",
    "Framer Motion",
    "Gsap",
    "Spline",
    "Whimsical",
    "Figma",
    "Adobe Illustrator",
    "Adobe Photoshop",
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.1 },
    },
  };

  return (
    <SectionLayout id="about">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <SectionHeader title="About" align="left" overlayDelay={0.2} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* About Text */}
          <motion.div variants={itemVariants} className="w-full">
            <OverlayReveal>
              <p className="text-base sm:text-lg text-light-gray mb-4 sm:mb-6 leading-relaxed">
                Hey! I'm Abdelrahman – if you haven't pieced that together yet.
                I'm a self-taught developer from Egypt with a passion for
                crafting full-stack web apps.
              </p>
            </OverlayReveal>

            <OverlayReveal>
              <p className="text-base sm:text-lg text-light-gray mb-6 sm:mb-8 leading-relaxed">
                I specialize in the Full Stack Development, but I'm always game
                to explore new tools if they're the right fit for the job. When
                I'm not building, I'm probably learning something new to push my
                skills.
              </p>
            </OverlayReveal>

            {/* Social Links */}
            <motion.div variants={itemVariants}>
              <SocialLinks />
            </motion.div>
          </motion.div>

          {/* Skills Section */}
          <motion.div
            variants={itemVariants}
            className="w-full space-y-6 sm:space-y-8"
          >
            <SkillSection
              title="Use at projects"
              icon="💼"
              skills={projectSkills}
              gridCols="grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
              containerVariants={containerVariants}
              itemVariants={itemVariants}
            />

            <SkillSection
              title="Use for fun"
              icon="🎨"
              skills={funSkills}
              gridCols="grid-cols-2 sm:grid-cols-3"
              containerVariants={containerVariants}
              itemVariants={itemVariants}
            />
          </motion.div>
        </div>
      </motion.div>
    </SectionLayout>
  );
};

export default About;
