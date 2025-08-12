"use client";

import { useState, useEffect, useRef } from "react";
import {
  createCommands,
  executeCommand,
  getCommandSuggestions,
} from "../utils/terminalCommands";

export const useTerminal = () => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  // Create commands with setHistory reference
  const commands = createCommands(setHistory);

  // Handle command submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      executeCommand(input, commands, setHistory);
      setInput("");
    }
  };

  // Handle tab completion
  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const suggestions = getCommandSuggestions(input, commands);
      if (suggestions.length === 1) {
        setInput(suggestions[0]);
      }
    }
  };

  // Auto-focus input
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Auto-scroll to bottom when history updates
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Initialize with welcome message
  useEffect(() => {
    setHistory([
      {
        type: "welcome",
        content: [
          "Welcome to Abdelrahman's Portfolio Terminal",
          "",
          "Type 'help' to see available commands.",
          "Type 'whoami' to learn about me.",
          "",
        ],
      },
    ]);
  }, []);

  return {
    input,
    setInput,
    history,
    inputRef,
    terminalRef,
    handleSubmit,
    handleKeyDown,
  };
};
