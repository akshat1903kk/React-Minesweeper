import React from "react";
import { motion } from "framer-motion";
import type { GameStatus } from "../types";

type SidebarProps = {
  difficulty: string;
  time: number;
  flagsLeft: number;
  minesLeft: number;
  status: GameStatus;
  onReset: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({
  difficulty,
  time,
  flagsLeft,
  // minesLeft kept for future display, not shown now
  status,
  onReset,
}) => {
  return (
    <div className="h-full flex flex-col justify-between">
      <div className="glass-card rounded-2xl p-6">
        <h1 className="text-3xl font-semibold mb-6">Minesweeper</h1>

        <ul className="space-y-4">
          <li className="flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] pb-2">
            <span className="opacity-80">Difficulty</span>
            <span className="font-semibold">{difficulty}</span>
          </li>
          <li className="flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] pb-2">
            <span className="opacity-80">Flags Left</span>
            <span className="font-semibold">{flagsLeft}</span>
          </li>
          <li className="flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] pb-2">
            <span className="opacity-80">Time</span>
            <span className="font-semibold">{time}s</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="opacity-80">Status</span>
            <span className="font-semibold capitalize">{status}</span>
          </li>
        </ul>

        <button
          onClick={onReset}
          className="mt-6 w-full rounded-xl bg-[var(--accent)]/85 hover:bg-[var(--accent)] text-[var(--charcoal)] font-semibold py-2 transition-colors"
        >
          Reset Board
        </button>
      </div>

      <motion.p
        className="mt-6 text-xs opacity-70"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.35 } }}
      >
        Tip: right-click to flag a cell.
      </motion.p>
    </div>
  );
};

export default Sidebar;
