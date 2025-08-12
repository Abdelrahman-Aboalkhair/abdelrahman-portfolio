"use client";

import { motion } from "framer-motion";
import SectionLayout from "../../shared/layout/SectionLayout";
import OverlayReveal from "../../shared/ui/OverlayReveal";
import SocialLinks from "../../shared/ui/SocialLinks";

const Contact = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
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
        <motion.div className="mb-4" variants={itemVariants}>
          <OverlayReveal trigger="whileInView" delay={0.5} duration={0.8}>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mr-[-2px]">
              Contact<span className="text-[#7300FF]">.</span>
            </h2>
          </OverlayReveal>
        </motion.div>

        {/* Contact Description */}
        <OverlayReveal>
          <p className="text-lg sm:text-lg text-light-gray mb-4 leading-relaxed max-w-2xl mx-auto">
            Shoot me an email if you want to connect! You can also find me on
            LinkedIn if that's more your speed.
          </p>
        </OverlayReveal>

        {/* Email Link */}
        <div className="mb-8">
          <OverlayReveal>
            <motion.a
              href="mailto:abdelrahman.aboalkhair@gmail.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-2xl sm:text-xl font-medium inline-block"
            >
              abdelrahman.aboalkhair@gmail.com
            </motion.a>
          </OverlayReveal>
        </div>

        <SocialLinks />

        {/* Footer */}
        <motion.div
          className="mt-4 pt-8 border-t border-[#2E2E2E]"
          variants={itemVariants}
        >
          <p className="text-[#E4E0E0] text-sm">
            © 2024 Abdelrahman's Portfolio.
          </p>
        </motion.div>
      </motion.div>
    </SectionLayout>
  );
};

export default Contact;
