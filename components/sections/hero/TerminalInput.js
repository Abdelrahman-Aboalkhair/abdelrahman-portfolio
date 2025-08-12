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
    <form onSubmit={handleSubmit} className="flex items-center">
      <span className="text-green-400 mr-2">user@portfolio:~$</span>
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 bg-transparent text-white outline-none caret-green-400"
        autoComplete="off"
        spellCheck="false"
      />
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 1, repeat: Infinity }}
        className="w-2 h-4 bg-green-400 ml-1"
      />
    </form>
  );
};

export default TerminalInput;
