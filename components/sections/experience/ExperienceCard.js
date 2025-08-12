"use client";

import { motion } from "framer-motion";
import OverlayReveal from "../../shared/ui/OverlayReveal";

const ExperienceCard = ({ experience }) => {
  return (
    <div className="border-l-2 border-[#7300FF] pl-8 relative">
      {/* Timeline Dot */}
      <div className="absolute -left-2 top-0 w-4 h-4 bg-[#7300FF] rounded-full"></div>

      {/* Experience Header */}
      <OverlayReveal>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <div>
            <h3 className="text-2xl font-bold text-[#7300FF] mb-1">
              {experience.company}
            </h3>
            <h4 className="text-xl font-semibold text-[#7300FF] mb-2">
              {experience.role}
            </h4>
          </div>
          <div className="text-right">
            <p className="text-[#E4E0E0] font-medium">{experience.date}</p>
            <p className="text-[#E4E0E0]">{experience.location}</p>
          </div>
        </div>
      </OverlayReveal>

      {/* Experience Description */}
      <OverlayReveal>
        <p className="text-[#E4E0E0] leading-relaxed mb-6">{experience.desc}</p>
      </OverlayReveal>

      {/* Tech Stack */}
      <OverlayReveal>
        <div className="flex flex-wrap gap-2">
          {experience.tech.map((tech, index) => (
            <motion.span
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-[#2E2E2E] text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-[#3E3E3E] transition-colors duration-300"
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </OverlayReveal>
    </div>
  );
};

export default ExperienceCard;
