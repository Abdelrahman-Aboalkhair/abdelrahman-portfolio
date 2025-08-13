"use client";

import { motion } from "framer-motion";

const ServiceCard = ({ service, variants }) => {
  return (
    <motion.div
      variants={variants}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group relative border-2 border-border backdrop-blur-xl rounded-md overflow-hidden cursor-pointer hover:border-primary/30 transition-colors duration-300 p-6"
    >
      {/* Service Icon */}
      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
        {service.icon}
      </div>

      {/* Service Content */}
      <div className="relative z-10">
        <h3 className="text-lg sm:text-xl font-semibold mb-3 transition-colors tracking-wide">
          {service.title}
        </h3>

        <p className="text-foreground/80 leading-relaxed mb-4 text-sm sm:text-base">
          {service.description}
        </p>

        {/* Features List */}
        <div className="space-y-2">
          {service.features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#7300FF] rounded-full flex-shrink-0"></div>
              <span className="text-sm text-foreground/70">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Glassmorphic border glow effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#7300FF]/10 via-transparent to-[#7300FF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );
};

export default ServiceCard;
