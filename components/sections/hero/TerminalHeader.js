"use client";

const TerminalHeader = () => {
  return (
    <div className="px-2 sm:px-4 py-2 flex items-center justify-between border-b border-border">
      <div className="flex items-center gap-1 sm:gap-2">
        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
      </div>
      <div className="text-foreground/60 text-xs sm:text-sm truncate">
        <span className="hidden sm:inline">user@portfolio:~</span>
        <span className="sm:hidden">terminal</span>
      </div>
    </div>
  );
};

export default TerminalHeader;
