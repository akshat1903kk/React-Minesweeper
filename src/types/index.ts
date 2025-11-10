/** Overall game state */
export type GameStatus = "playing" | "won" | "lost";

/** A single cell in the Minesweeper grid */
export interface Cell {
  row: number;
  col: number;
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  adjacentMines: number;
}

export type DifficultyKey = "easy" | "medium" | "hard";

export type DifficultySpec = {
  label: string;
  rows: number;
  cols: number;
  mines: number;
};

export const DIFFICULTY_MAP: Record<DifficultyKey, DifficultySpec> = {
  easy: { label: "Easy", rows: 8, cols: 8, mines: 10 },
  medium: { label: "Medium", rows: 12, cols: 12, mines: 20 },
  hard: { label: "Hard", rows: 16, cols: 16, mines: 40 },
};

/** The board is a 2D array of cells */
export type Board = Cell[][];
