"use client";

import { motion, AnimatePresence } from "framer-motion";

const TerminalOutput = ({ history }) => {
  return (
    <AnimatePresence>
      {history.map((entry, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-2"
        >
          {entry.type === "command" && (
            <div className="text-green-400">{entry.content}</div>
          )}
          {entry.type === "output" && (
            <div className="text-gray-300 whitespace-pre-line">
              {Array.isArray(entry.content)
                ? entry.content.join("\n")
                : entry.content}
            </div>
          )}
          {entry.type === "error" && (
            <div className="text-red-400 whitespace-pre-line">
              {Array.isArray(entry.content)
                ? entry.content.join("\n")
                : entry.content}
            </div>
          )}
          {entry.type === "welcome" && (
            <div className="text-cyan-400 whitespace-pre-line">
              {Array.isArray(entry.content)
                ? entry.content.join("\n")
                : entry.content}
            </div>
          )}
        </motion.div>
      ))}
    </AnimatePresence>
  );
};

export default TerminalOutput;
