"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import SectionLayout from "../../shared/layout/SectionLayout";
import SectionHeader from "../../shared/ui/SectionHeader";
import ServiceCard from "./ServiceCard";

const Services = () => {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 80 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  const services = [
    {
      id: 1,
      title: t("services.landingPage.title"),
      description: t("services.landingPage.description"),
      icon: "🌐",
      features: t("services.landingPage.features", { returnObjects: true }),
    },
    {
      id: 2,
      title: t("services.fullStack.title"),
      description: t("services.fullStack.description"),
      icon: "⚡",
      features: t("services.fullStack.features", { returnObjects: true }),
    },
    {
      id: 3,
      title: t("services.ecommerce.title"),
      description: t("services.ecommerce.description"),
      icon: "🛒",
      features: t("services.ecommerce.features", { returnObjects: true }),
    },
  ];

  return (
    <SectionLayout id="services">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <SectionHeader
          title={t("services.title")}
          align="left"
          overlayDelay={0.3}
        />

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
          variants={containerVariants}
        >
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              variants={cardVariants}
            />
          ))}
        </motion.div>
      </motion.div>
    </SectionLayout>
  );
};

export default Services;
