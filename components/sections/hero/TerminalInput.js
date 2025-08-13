"use client";

import { motion } from "framer-motion";

const TerminalInput = ({
  input,
  setInput,
  inputRef,
  handleSubmit,
  handleKeyDown,
}) => {
  return (
    <form onSubmit={handleSubmit} className="flex items-center min-w-0">
      <span className="text-green-400 mr-2 flex-shrink-0 text-xs sm:text-sm">
        <span className="hidden sm:inline">user@portfolio:~$</span>
        <span className="sm:hidden">$</span>
      </span>
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 bg-transparent text-white outline-none caret-green-400 min-w-0 text-xs sm:text-sm terminal-input"
        autoComplete="off"
        spellCheck="false"
        style={{ wordBreak: "break-all" }}
      />
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 1, repeat: Infinity }}
        className="w-1 sm:w-2 h-3 sm:h-4 bg-green-400 ml-1 flex-shrink-0"
      />
    </form>
  );
};

export default TerminalInput;
