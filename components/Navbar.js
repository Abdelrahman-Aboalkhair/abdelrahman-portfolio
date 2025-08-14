"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Menu } from "lucide-react";
import { useTranslation } from "react-i18next";
import DevModeToggle from "./shared/ui/DevModeToggle";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const { t } = useTranslation();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  const navItems = [
    { label: t("nav.about"), id: "about" },
    { label: t("nav.projects"), id: "projects" },
    { label: t("nav.services"), id: "services" },
    { label: t("nav.contact"), id: "contact" },
  ];

  // Intersection Observer to track active section
  useEffect(() => {
    const sections = ["hero", "about", "projects", "services", "contact"];
    const observers = new Map();

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px", // Trigger when section is 20% from top
      threshold: 0,
    };

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    // Create observers for each section
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        const observer = new IntersectionObserver(
          handleIntersect,
          observerOptions
        );
        observer.observe(element);
        observers.set(sectionId, observer);
      }
    });

    // Cleanup observers on unmount
    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  // Helper function to check if a nav item is active
  const isActiveNavItem = (itemId) => {
    // If we're on hero section and this is the logo, it's active
    if (activeSection === "hero" && itemId === "hero") return true;
    // Otherwise check if the item ID matches the active section
    return activeSection === itemId;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => scrollToSection("hero")}
              className={`text-2xl font-extrabold transition-colors duration-300 `}
            >
              B<span className="text-primary">.</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-4 py-2 text-sm font-medium transition-colors duration-300 relative ${
                    isActiveNavItem(item.id)
                      ? "bg-muted/40 text-foreground border-b-2 border-primary"
                      : "text-foreground/80 hover:text-primary"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Theme Toggle - Keep only theme in navbar */}
          <div className="hidden md:flex items-center gap-4">
            <DevModeToggle />
          </div>

          {/* Resume Button */}
          <div className="hidden md:block">
            <motion.a
              href="https://drive.google.com/file/d/1M2QmESPSAYzRGxH1FMPLMHFeIsk5LGW4/view?usp=drive_link"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex gap-2 items-center border-2 border-primary text-primary px-6 py-2 rounded-sm font-medium 
                             transition-colors duration-300"
            >
              My resume
            </motion.a>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground/80 hover:text-primary focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-background border-t border-border"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`block px-3 py-2 text-base font-medium w-full text-left transition-colors duration-300 ${
                  isActiveNavItem(item.id)
                    ? "text-primary bg-primary/10"
                    : "text-foreground/80 hover:text-primary hover:bg-primary/5"
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* Mobile Theme Toggle - Keep only theme in mobile menu */}
            <div className="px-3 py-2 border-t border-border mt-2">
              <div className="flex items-center justify-between">
                <span className="text-foreground/60 text-sm">Theme</span>
                <ThemeToggle />
              </div>
            </div>

            <div className="px-3 py-2">
              <motion.a
                href="https://drive.google.com/file/d/1M2QmESPSAYzRGxH1FMPLMHFeIsk5LGW4/view?usp=drive_link"
                whileTap={{ scale: 0.95 }}
                whileHover="hover"
                className="relative flex items-center justify-center border-2 border-primary text-primary px-4 py-2 rounded-sm
                                 font-medium overflow-hidden group transition-all duration-300 w-full"
              >
                <motion.span
                  className="absolute inset-0 bg-primary origin-top-left"
                  initial={{ scaleX: 0, scaleY: 0 }}
                  variants={{
                    hover: { scaleX: 1, scaleY: 1 },
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                  {t("nav.resume")}
                </span>
              </motion.a>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
