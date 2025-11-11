import React from "react";

interface SidebarProps {
  difficulty: string;
  flagsLeft: number;
  time: number;
  onReset: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  difficulty,
  flagsLeft,
  time,
  onReset,
}) => {
  return (
    <aside className="flex flex-col justify-between p-6 bg-[var(--slate)] text-[var(--beige)] w-64 h-full rounded-l-xl shadow-lg">
      <div>
        <h1 className="text-2xl font-bold mb-8 text-center tracking-wide">
          Minesweeper
        </h1>
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b border-[var(--stone)] pb-2">
            <span className="opacity-80">Difficulty</span>
            <span className="font-semibold capitalize">{difficulty}</span>
          </div>
          <div className="flex justify-between items-center border-b border-[var(--stone)] pb-2">
            <span className="opacity-80">Flags Left</span>
            <span className="font-semibold">{flagsLeft}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="opacity-80">Time</span>
            <span className="font-semibold">{time}s</span>
          </div>
        </div>
      </div>

      <button
        onClick={onReset}
        className="mt-6 w-full py-2 bg-[var(--stone)] hover:bg-[var(--charcoal)] text-[var(--beige)] rounded-md font-semibold transition-all"
      >
        Reset Board
      </button>
    </aside>
  );
};

export default Sidebar;
