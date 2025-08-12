'use client';

import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import SectionLayout from './SectionLayout';

const Contact = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    return (
        <SectionLayout
            id="contact"
            maxWidth="max-w-4xl"
            containerClassName="text-center"
        >
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={containerVariants}
            >
                {/* Section Title */}
                <motion.h2
                    className="text-4xl sm:text-5xl lg:text-5xl font-bold mb-12"
                    variants={itemVariants}
                >
                    Contact<span className="text-[#7300FF]">.</span>
                </motion.h2>

                {/* Contact Description */}
                <motion.p
                    className="text-lg sm:text-xl text-[#E4E0E0] mb-8 leading-relaxed max-w-2xl mx-auto"
                    variants={itemVariants}
                >
                    Shoot me an email if you want to connect! You can also find me on LinkedIn if that's more your speed.
                </motion.p>

                {/* Email Link */}
                <motion.div
                    className="mb-12"
                    variants={itemVariants}
                >
                    <motion.a
                        href="mailto:abdelrahman.aboalkhair@gmail.com"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-2xl sm:text-3xl font-semibold text-[#7300FF] hover:text-[#A366FF] transition-colors duration-300 inline-block"
                    >
                        abdelrahman.aboalkhair@gmail.com
                    </motion.a>
                </motion.div>

                {/* Social Links */}
                <motion.div
                    className="flex justify-center space-x-8"
                    variants={itemVariants}
                >
                    <motion.a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.2, y: -5 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-[#7300FF] hover:text-[#A366FF] text-4xl transition-colors duration-300"
                    >
                        <FaLinkedin />
                    </motion.a>
                    <motion.a
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.2, y: -5 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-[#7300FF] hover:text-[#A366FF] text-4xl transition-colors duration-300"
                    >
                        <FaGithub />
                    </motion.a>
                    <motion.a
                        href="https://upwork.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.2, y: -5 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-[#7300FF] hover:text-[#A366FF] text-4xl transition-colors duration-300"
                    >
                        {/* <FaUpwork /> */}
                    </motion.a>
                </motion.div>

                {/* Footer */}
                <motion.div
                    className="mt-16 pt-8 border-t border-[#2E2E2E]"
                    variants={itemVariants}
                >
                    <p className="text-[#E4E0E0] text-sm">
                        © 2024 Body's Portfolio. Built with Next.js and Tailwind CSS.
                    </p>
                </motion.div>
            </motion.div>
        </SectionLayout>
    );
};

export default Contact;
