"use client";

import { createContext, useContext, useState, useEffect } from "react";

const DevModeContext = createContext();

export const useDevMode = () => {
  const context = useContext(DevModeContext);
  if (!context) {
    throw new Error("useDevMode must be used within a DevModeProvider");
  }
  return context;
};

export const DevModeProvider = ({ children }) => {
  const [isDevMode, setIsDevMode] = useState(false);

  // Load dev mode state from localStorage on mount
  useEffect(() => {
    const savedDevMode = localStorage.getItem("portfolioDevMode");
    if (savedDevMode === "true") {
      setIsDevMode(true);
    }
  }, []);

  // Save dev mode state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("portfolioDevMode", isDevMode.toString());
  }, [isDevMode]);

  const toggleDevMode = () => {
    setIsDevMode((prev) => !prev);
  };

  const value = {
    isDevMode,
    toggleDevMode,
  };

  return (
    <DevModeContext.Provider value={value}>{children}</DevModeContext.Provider>
  );
};
