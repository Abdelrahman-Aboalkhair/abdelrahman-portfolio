'use client';

import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import SectionLayout from './SectionLayout';

const About = () => {
    const projectSkills = [
        'Javascript', 'Typescript', 'SQL', 'NextJs', 'React', 'Redux',
        'NodeJs', 'Express', 'MongoDB', 'Prisma', 'Postgres', 'Redis',
        'CI/CD', 'GitHub Actions', 'Docker'
    ];

    const funSkills = [
        'Three Js', 'React Three Fiber', 'Framer Motion'
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
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
                    className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#7300FF] mb-12"
                    variants={itemVariants}
                >
                    About<span className="text-[#7300FF]">.</span>
                </motion.h2>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* About Text */}
                    <motion.div variants={itemVariants}>
                        <p className="text-lg sm:text-xl text-[#E4E0E0] mb-8 leading-relaxed">
                            Hey! I'm <span className="text-white font-semibold">Abdelrahman</span> – if you haven't pieced that together yet. I'm a <span className="text-white font-semibold">self-taught developer</span> from Egypt with a passion for crafting full-stack web apps.
                        </p>

                        <p className="text-lg sm:text-xl text-[#E4E0E0] mb-8 leading-relaxed">
                            I specialize in the <span className="text-[#7300FF] font-semibold">MERN stack</span>, but I'm always game to explore new tools if they're the right fit for the job. When I'm not building, I'm probably learning something new to push my skills.
                        </p>

                        {/* Social Links */}
                        <motion.div
                            className="flex items-center space-x-4"
                            variants={itemVariants}
                        >
                            <span className="text-[#7300FF] font-medium text-lg">My links →</span>
                            <div className="flex space-x-4">
                                <motion.a
                                    href="https://linkedin.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="text-[#7300FF] hover:text-[#A366FF] text-2xl transition-colors duration-300"
                                >
                                    <FaLinkedin />
                                </motion.a>
                                <motion.a
                                    href="https://github.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="text-[#7300FF] hover:text-[#A366FF] text-2xl transition-colors duration-300"
                                >
                                    <FaGithub />
                                </motion.a>
                                <motion.a
                                    href="https://upwork.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="text-[#7300FF] hover:text-[#A366FF] text-2xl transition-colors duration-300"
                                >
                                    {/* <FaUpwork /> */}
                                </motion.a>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Skills Section */}
                    <motion.div variants={itemVariants} className="space-y-8">
                        {/* Use at projects */}
                        <div>
                            <h3 className="text-xl font-semibold text-white mb-4">Use at projects</h3>
                            <motion.div
                                className="grid grid-cols-2 sm:grid-cols-3 gap-3"
                                variants={containerVariants}
                            >
                                {projectSkills.map((skill, index) => (
                                    <motion.div
                                        key={skill}
                                        variants={itemVariants}
                                        whileHover={{ scale: 1.05 }}
                                        className="bg-[#2E2E2E] text-white px-4 py-2 rounded-lg text-center font-medium hover:bg-[#3E3E3E] transition-colors duration-300 cursor-default"
                                    >
                                        {skill}
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>

                        {/* Use for fun */}
                        <div>
                            <h3 className="text-xl font-semibold text-white mb-4">Use for fun</h3>
                            <motion.div
                                className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                                variants={containerVariants}
                            >
                                {funSkills.map((skill, index) => (
                                    <motion.div
                                        key={skill}
                                        variants={itemVariants}
                                        whileHover={{ scale: 1.05 }}
                                        className="bg-[#2E2E2E] text-white px-4 py-2 rounded-lg text-center font-medium hover:bg-[#3E3E3E] transition-colors duration-300 cursor-default"
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
