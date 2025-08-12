"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { RiCloseFill, RiMenu3Fill } from "react-icons/ri";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  const navItems = [
    { label: "About", id: "about" },
    { label: "Projects", id: "projects" },
    { label: "Experience", id: "experience" },
    { label: "Contact", id: "contact" },
  ];

  // Intersection Observer to track active section
  useEffect(() => {
    const sections = ["hero", "about", "projects", "experience", "contact"];
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#111111]/90 backdrop-blur-sm border-b border-[#2E2E2E]">
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
                      ? "bg-muted/40 text-white border-b-2 border-primary"
                      : "text-[#E4E0E0] hover:text-primary"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
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
              className="text-[#E4E0E0] hover:text-primary focus:outline-none"
            >
              {isOpen ? <RiCloseFill size={24} /> : <RiMenu3Fill size={24} />}
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
          className="md:hidden bg-[#111111] border-t border-[#2E2E2E]"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`block px-3 py-2 text-base font-medium w-full text-left transition-colors duration-300 ${
                  isActiveNavItem(item.id)
                    ? "text-primary bg-primary/10"
                    : "text-[#E4E0E0] hover:text-primary hover:bg-primary/5"
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="px-3 py-2">
              <motion.a
                href="https://drive.google.com/file/d/1M2QmESPSAYzRGxH1FMPLMHFeIsk5LGW4/view?usp=drive_link"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary text-white px-4 py-2 rounded-sm
                                 font-medium hover:bg-primary-hover transition-colors duration-300 w-full"
              >
                My resume
              </motion.a>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
