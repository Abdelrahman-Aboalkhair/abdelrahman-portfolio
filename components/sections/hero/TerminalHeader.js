"use client";

const TerminalHeader = () => {
  return (
    <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-700">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
      </div>
      <div className="text-gray-400 text-xs">user@portfolio:~</div>
    </div>
  );
};

export default TerminalHeader;
