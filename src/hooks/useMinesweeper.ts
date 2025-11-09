import { useState, useCallback, useEffect } from "react";
import type { Cell, GameStatus } from "../types";
import { generateBoard } from "../utils/board";

export function useMinesweeper(rows: number, cols: number, mines: number) {
  /** State: the grid itself */
  const [board, setBoard] = useState<Cell[][]>(() =>
    generateBoard(rows, cols, mines),
  );

  /** State: game status and mine count */
  const [gameStatus, setGameStatus] = useState<GameStatus>("playing");
  const [minesLeft, setMinesLeft] = useState(mines);

  /** Debugging log (to verify board is actually generated) */
  useEffect(() => {
    console.log("Board initialized:", board);
  }, [board]);

  /** Count adjacent mines for a specific cell */
  const countAdjacentMines = useCallback(
    (b: Cell[][], r: number, c: number) => {
      const directions = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1],
      ];
      let count = 0;
      for (const [dr, dc] of directions) {
        const nr = r + dr;
        const nc = c + dc;
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && b[nr][nc].isMine) {
          count++;
        }
      }
      return count;
    },
    [rows, cols],
  );

  /** Recursive reveal logic */
  const revealCell = useCallback(
    (row: number, col: number) => {
      setBoard((prevBoard) => {
        // Prevent updates after win/loss
        if (gameStatus !== "playing") return prevBoard;

        // Deep copy board to avoid state mutation
        const newBoard = prevBoard.map((r) => r.map((cell) => ({ ...cell })));
        const cell = newBoard[row][col];

        // Ignore flagged or revealed cells
        if (cell.isRevealed || cell.isFlagged) return newBoard;

        cell.isRevealed = true;

        // If a mine is revealed — game over
        if (cell.isMine) {
          setGameStatus("lost");
          // Reveal all mines
          return newBoard.map((r) =>
            r.map((c) => ({ ...c, isRevealed: true })),
          );
        }

        // Count surrounding mines
        const adjacentMines = countAdjacentMines(newBoard, row, col);
        cell.adjacentMines = adjacentMines;

        // If empty, recursively reveal neighbors
        if (adjacentMines === 0) {
          const directions = [
            [-1, -1],
            [-1, 0],
            [-1, 1],
            [0, -1],
            [0, 1],
            [1, -1],
            [1, 0],
            [1, 1],
          ];

          for (const [dr, dc] of directions) {
            const nr = row + dr;
            const nc = col + dc;
            if (
              nr >= 0 &&
              nr < rows &&
              nc >= 0 &&
              nc < cols &&
              !newBoard[nr][nc].isRevealed &&
              !newBoard[nr][nc].isFlagged
            ) {
              // Recursive reveal of neighboring cells
              newBoard[nr][nc].isRevealed = true;
              const adj = countAdjacentMines(newBoard, nr, nc);
              newBoard[nr][nc].adjacentMines = adj;
              if (adj === 0) {
                // Minimal recursion — prevents infinite flood
                for (const [dr2, dc2] of directions) {
                  const rr = nr + dr2;
                  const cc = nc + dc2;
                  if (
                    rr >= 0 &&
                    rr < rows &&
                    cc >= 0 &&
                    cc < cols &&
                    !newBoard[rr][cc].isRevealed
                  ) {
                    newBoard[rr][cc].isRevealed = true;
                  }
                }
              }
            }
          }
        }

        // Check win condition
        const hasWon = newBoard.flat().every((c) => c.isMine || c.isRevealed);

        if (hasWon) setGameStatus("won");

        return newBoard;
      });
    },
    [gameStatus, countAdjacentMines, rows, cols],
  );

  /** Toggle a flag */
  const toggleFlag = useCallback(
    (row: number, col: number) => {
      setBoard((prevBoard) => {
        if (gameStatus !== "playing") return prevBoard;

        const newBoard = prevBoard.map((r) => r.map((c) => ({ ...c })));
        const cell = newBoard[row][col];

        if (cell.isRevealed) return newBoard;

        cell.isFlagged = !cell.isFlagged;
        setMinesLeft((prev) => prev + (cell.isFlagged ? -1 : 1));

        return newBoard;
      });
    },
    [gameStatus],
  );

  /** Reset game state */
  const resetGame = useCallback(() => {
    setBoard(generateBoard(rows, cols, mines));
    setGameStatus("playing");
    setMinesLeft(mines);
  }, [rows, cols, mines]);

  /** Return everything for the game */
  return {
    board,
    minesLeft,
    gameStatus,
    revealCell,
    toggleFlag,
    resetGame,
  };
}
