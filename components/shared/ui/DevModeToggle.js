"use client";

import { motion } from "framer-motion";
import { Terminal, Code } from "lucide-react";
import { useDevMode } from "../../../contexts/DevModeContext";

const DevModeToggle = () => {
  const { isDevMode, toggleDevMode } = useDevMode();

  return (
    <div className="flex items-center gap-3">
      {/* Dev Mode Label */}
      <div className="hidden lg:flex items-center gap-1 text-xs text-gray-400">
        <span>Dev Mode</span>
      </div>

      {/* Toggle Switch */}
      <button
        onClick={toggleDevMode}
        className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${
          isDevMode
            ? "bg-gradient-to-r from-purple-500 to-blue-500"
            : "bg-gray-600"
        }`}
        title={`Turn ${isDevMode ? "off" : "on"} developer mode`}
      >
        <motion.div
          className="flex items-center justify-center w-5 h-5 bg-white rounded-full shadow-lg"
          animate={{
            x: isDevMode ? 20 : 2,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
        >
          <motion.div
            animate={{
              scale: isDevMode ? 1 : 0.8,
              opacity: isDevMode ? 1 : 0.6,
            }}
            transition={{ duration: 0.2 }}
          >
            <Code
              className={`w-3 h-3 ${
                isDevMode ? "text-purple-600" : "text-gray-400"
              }`}
            />
          </motion.div>
        </motion.div>
      </button>
    </div>
  );
};

export default DevModeToggle;
