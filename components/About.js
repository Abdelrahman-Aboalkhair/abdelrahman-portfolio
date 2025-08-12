"use client";

import { motion } from "framer-motion";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import SectionLayout from "./SectionLayout";

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
      transition: { duration: 0.6 },
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
        {/* Section Title */}
        <motion.h2
          className="flex items-center gap-8 text-4xl sm:text-5xl lg:text-5xl font-bold mb-8"
          variants={itemVariants}
        >
          <div className="flex gap-1">
            About <span className="text-primary">.</span>
          </div>
          {/* Live divider */}
          <div className="w-full h-[1.6px] bg-muted"></div>
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* About Text */}
          <motion.div variants={itemVariants}>
            <p className="text-lg sm:text-lg text-light-gray mb-6 leading-relaxed">
              Hey! I'm Abdelrahman – if you haven't pieced that together yet.
              I'm a self-taught developer from Egypt with a passion for crafting
              full-stack web apps.
            </p>

            <p className="text-lg sm:text-lg text-light-gray mb-8 leading-relaxed">
              I specialize in the Full Stack Development, but I'm always game to
              explore new tools if they're the right fit for the job. When I'm
              not building, I'm probably learning something new to push my
              skills.
            </p>

            {/* Social Links */}
            <motion.div
              className="flex items-center space-x-4"
              variants={itemVariants}
            >
              <span className="text-primary font-medium text-lg">
                My links →
              </span>
              <div className="flex space-x-4">
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
            </motion.div>
          </motion.div>

          {/* Skills Section */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div>
              <h3 className="flex items-center gap-2 text-xl font-bold text-white mb-4">
                <div className="bg-primary px-[4px] py-[1px] rounded-sm ">
                  ☺
                </div>
                Use at projects
              </h3>

              <motion.div
                className="grid grid-cols-2 sm:grid-cols-4 gap-3"
                variants={containerVariants}
              >
                {projectSkills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    className="bg-muted text-white whitespace-nowrap text-center py-[4px] rounded-full font-medium hover:bg-muted/80 
                    transition-colors duration-300 cursor-default"
                  >
                    {skill}
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Use for fun */}
            <div>
              <h3 className="flex items-center gap-2 text-xl font-bold text-white mb-4">
                <div className="bg-primary px-[4px] py-[1px] rounded-sm ">
                  ☺
                </div>{" "}
                Use for fun
              </h3>
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-3 gap-3"
                variants={containerVariants}
              >
                {funSkills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    className="bg-muted text-white whitespace-nowrap text-center py-[4px] rounded-full font-medium hover:bg-muted/80 
                    transition-colors duration-300 cursor-default"
                  >
                    {skill}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </SectionLayout>
  );
};

export default About;
