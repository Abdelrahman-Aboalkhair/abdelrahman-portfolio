"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import DevModeToggle from "./shared/ui/DevModeToggle";
import LanguageToggle from "./shared/ui/LanguageToggle";
import ThemeToggle from "./shared/ui/ThemeToggle";
import { SocialLinks } from "./shared/ui";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-background/50 backdrop-blur-sm border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Copyright */}
          <div className="text-center md:text-left">
            <p className="text-foreground/60 text-sm">
              © 2024 Abdelrahman Aboalkhair. {t("footer.rights")}
            </p>
          </div>

          {/* Toggle Controls */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-foreground/60 text-xs hidden sm:block">
                {t("footer.language")}
              </span>
              <LanguageToggle />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-foreground/60 text-xs hidden sm:block">
                {t("footer.theme")}
              </span>
              <ThemeToggle />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-foreground/60 text-xs hidden sm:block">
                {t("footer.devMode")}
              </span>
              <DevModeToggle />
            </div>
          </div>
        </div>

        <SocialLinks />
      </div>
    </footer>
  );
};

export default Footer;
