'use client';

import { motion } from 'framer-motion';
import experienceData from '../data/experience.json';
import SectionLayout from './SectionLayout';

const Experience = () => {
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
        hidden: { opacity: 0, x: -50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.6 }
        }
    };

    return (
        <SectionLayout id="experience">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={containerVariants}
            >
                {/* Section Title */}
                <motion.h2
                    className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#7300FF] mb-12"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    Experience<span className="text-[#7300FF]">.</span>
                </motion.h2>

                {/* Experience Entries */}
                <div className="space-y-12">
                    {experienceData.map((exp) => (
                        <motion.div
                            key={exp.id}
                            variants={itemVariants}
                            className="border-l-2 border-[#7300FF] pl-8 relative"
                        >
                            {/* Timeline Dot */}
                            <div className="absolute -left-2 top-0 w-4 h-4 bg-[#7300FF] rounded-full"></div>

                            {/* Experience Header */}
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                                <div>
                                    <h3 className="text-2xl font-bold text-[#7300FF] mb-1">
                                        {exp.company}
                                    </h3>
                                    <h4 className="text-xl font-semibold text-[#7300FF] mb-2">
                                        {exp.role}
                                    </h4>
                                </div>
                                <div className="text-right">
                                    <p className="text-[#E4E0E0] font-medium">
                                        {exp.date}
                                    </p>
                                    <p className="text-[#E4E0E0]">
                                        {exp.location}
                                    </p>
                                </div>
                            </div>

                            {/* Experience Description */}
                            <p className="text-[#E4E0E0] leading-relaxed mb-6">
                                {exp.desc}
                            </p>

                            {/* Tech Stack */}
                            <div className="flex flex-wrap gap-2">
                                {exp.tech.map((tech, index) => (
                                    <motion.span
                                        key={index}
                                        whileHover={{ scale: 1.05 }}
                                        className="bg-[#2E2E2E] text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-[#3E3E3E] transition-colors duration-300"
                                    >
                                        {tech}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </SectionLayout>
    );
};

export default Experience;
