"use client";

import { motion } from "framer-motion";
import { useTerminal } from "../../../hooks/useTerminal";
import TerminalHeader from "./TerminalHeader";
import TerminalOutput from "./TerminalOutput";
import TerminalInput from "./TerminalInput";

const Terminal = () => {
  const {
    input,
    setInput,
    history,
    inputRef,
    terminalRef,
    handleSubmit,
    handleKeyDown,
  } = useTerminal();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="w-full h-96 bg-gray-900 rounded-lg border border-gray-700 shadow-2xl overflow-hidden font-mono text-sm"
    >
      {/* Terminal Header */}
      <TerminalHeader />

      {/* Terminal Content */}
      <div
        ref={terminalRef}
        className="p-4 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
        onClick={() => inputRef.current?.focus()}
      >
        {/* Output History */}
        <TerminalOutput history={history} />

        {/* Input Line */}
        <TerminalInput
          input={input}
          setInput={setInput}
          inputRef={inputRef}
          handleSubmit={handleSubmit}
          handleKeyDown={handleKeyDown}
        />
      </div>
    </motion.div>
  );
};

export default Terminal;
