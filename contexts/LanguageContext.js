"use client";

import { createContext, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "../lib/i18n"; // Initialize i18n

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const { i18n } = useTranslation();

  const currentLanguage = i18n.language || "en";
  const isRTL = currentLanguage === "ar";

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === "en" ? "ar" : "en";
    changeLanguage(newLanguage);
  };

  // Update document direction and font based on language
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    // Set direction
    html.dir = isRTL ? "rtl" : "ltr";
    html.lang = currentLanguage;

    // Set font family
    if (isRTL) {
      body.classList.remove("font-poppins");
      body.classList.add("font-cairo");
    } else {
      body.classList.remove("font-cairo");
      body.classList.add("font-poppins");
    }
  }, [currentLanguage, isRTL]);

  const value = {
    currentLanguage,
    isRTL,
    changeLanguage,
    toggleLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
