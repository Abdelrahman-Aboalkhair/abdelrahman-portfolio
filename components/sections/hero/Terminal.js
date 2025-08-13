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
      className="w-full min-h-[300px] max-h-[500px] sm:min-h-[350px] sm:max-h-[600px] lg:min-h-[400px] lg:max-h-[700px] rounded-lg border border-border shadow-2xl overflow-hidden font-mono text-xs sm:text-sm bg-background terminal-container"
    >
      {/* Terminal Header */}
      <TerminalHeader />

      {/* Terminal Content */}
      <div
        ref={terminalRef}
        className="p-2 sm:p-4 h-full overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-border scrollbar-track-muted terminal-container"
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
