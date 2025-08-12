"use client";

import { motion } from "framer-motion";
import { Languages, Globe } from "lucide-react";
import { useLanguage } from "../../../contexts/LanguageContext";
import { useTranslation } from "react-i18next";

const LanguageToggle = () => {
  const { currentLanguage, isRTL, toggleLanguage } = useLanguage();
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-3">
      {/* Language Label */}
      <div className="hidden lg:flex items-center gap-1 text-xs text-gray-400">
        <Globe className="w-3 h-3" />
        <span>{t("nav.language")}</span>
      </div>

      {/* Toggle Switch */}
      <button
        onClick={toggleLanguage}
        className={`relative inline-flex items-center h-6 w-16 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${
          isRTL
            ? "bg-gradient-to-r from-green-500 to-blue-500"
            : "bg-gradient-to-r from-purple-500 to-pink-500"
        }`}
        title={`Switch to ${currentLanguage === "en" ? "Arabic" : "English"}`}
      >
        <motion.div
          className="flex items-center justify-center w-5 h-5 bg-white rounded-full shadow-lg"
          animate={{
            x: isRTL ? 42 : 2,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
        >
          <motion.div
            animate={{
              scale: 1,
              opacity: 1,
            }}
            transition={{ duration: 0.2 }}
          >
            <Languages
              className={`w-3 h-3 ${
                isRTL ? "text-green-600" : "text-purple-600"
              }`}
            />
          </motion.div>
        </motion.div>
      </button>

      {/* Language Display */}
      <div className="flex items-center gap-1">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 0.5,
            repeat: 0,
          }}
          key={currentLanguage}
          className={`text-xs font-medium px-2 py-1 rounded ${
            isRTL
              ? "bg-green-100 text-green-800"
              : "bg-purple-100 text-purple-800"
          }`}
        >
          {currentLanguage === "en" ? "EN" : "ع"}
        </motion.div>
      </div>
    </div>
  );
};

export default LanguageToggle;
