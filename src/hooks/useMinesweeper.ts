// src/hooks/useMinesweeper.ts
import { useCallback, useMemo, useState } from "react";
import type { Cell, Board, GameStatus } from "../types";

function makeEmptyBoard(rows: number, cols: number): Board {
  return Array.from({ length: rows }, (_, r) =>
    Array.from(
      { length: cols },
      (_, c): Cell => ({
        row: r,
        col: c,
        isMine: false,
        isRevealed: false,
        isFlagged: false,
        adjacentMines: 0,
      }),
    ),
  );
}

function inBounds(rows: number, cols: number, r: number, c: number) {
  return r >= 0 && r < rows && c >= 0 && c < cols;
}

const NEIGHBORS = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

function placeMines(board: Board, mines: number) {
  const rows = board.length;
  const cols = board[0].length;
  let placed = 0;
  while (placed < mines) {
    const r = Math.floor(Math.random() * rows);
    const c = Math.floor(Math.random() * cols);
    if (!board[r][c].isMine) {
      board[r][c].isMine = true;
      placed++;
    }
  }
}

function computeAdjacency(board: Board) {
  const rows = board.length;
  const cols = board[0].length;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (board[r][c].isMine) continue;
      let count = 0;
      for (const [dr, dc] of NEIGHBORS) {
        const rr = r + dr;
        const cc = c + dc;
        if (inBounds(rows, cols, rr, cc) && board[rr][cc].isMine) count++;
      }
      board[r][c].adjacentMines = count;
    }
  }
}

function generateBoard(rows: number, cols: number, mines: number): Board {
  const b = makeEmptyBoard(rows, cols);
  placeMines(b, mines);
  computeAdjacency(b);
  return b;
}

export function useMinesweeper(rows: number, cols: number, mines: number) {
  // re-generate when dimensions or mine count change
  const initialBoard = useMemo(
    () => generateBoard(rows, cols, mines),
    [rows, cols, mines],
  );

  const [board, setBoard] = useState<Board>(initialBoard);
  const [minesLeft, setMinesLeft] = useState<number>(mines);
  const [gameStatus, setGameStatus] = useState<GameStatus>("playing");

  const floodReveal = useCallback((b: Board, r: number, c: number) => {
    const stack: Array<[number, number]> = [[r, c]];
    const seen = new Set<string>();
    const key = (rr: number, cc: number) => `${rr},${cc}`;

    while (stack.length) {
      const [cr, cc] = stack.pop()!;
      if (!inBounds(b.length, b[0].length, cr, cc)) continue;
      const cell = b[cr][cc];
      if (cell.isRevealed || cell.isFlagged) continue;

      cell.isRevealed = true;
      seen.add(key(cr, cc));

      if (!cell.isMine && cell.adjacentMines === 0) {
        for (const [dr, dc] of NEIGHBORS) {
          const nr = cr + dr;
          const nc = cc + dc;
          if (
            inBounds(b.length, b[0].length, nr, nc) &&
            !seen.has(key(nr, nc))
          ) {
            stack.push([nr, nc]);
          }
        }
      }
    }
  }, []);

  const revealCell = useCallback(
    (row: number, col: number) => {
      setBoard((prev) => {
        if (gameStatus !== "playing") return prev;

        // clone board immutably
        const next = prev.map((r) => r.map((c) => ({ ...c })));
        const cell = next[row][col];

        if (cell.isRevealed || cell.isFlagged) return next;

        if (cell.isMine) {
          // reveal all, lose
          for (const r of next) for (const c of r) c.isRevealed = true;
          setGameStatus("lost");
          return next;
        }

        floodReveal(next, row, col);

        // win check
        const won = next.flat().every((c) => c.isMine || c.isRevealed);
        if (won) setGameStatus("won");

        return next;
      });
    },
    [gameStatus, floodReveal],
  );

  const toggleFlag = useCallback(
    (row: number, col: number) => {
      setBoard((prev) => {
        if (gameStatus !== "playing") return prev;

        const next = prev.map((r) => r.map((c) => ({ ...c })));
        const cell = next[row][col];

        if (cell.isRevealed) return next;

        const willFlag = !cell.isFlagged;
        cell.isFlagged = willFlag;
        setMinesLeft((m) => m + (willFlag ? -1 : 1));

        return next;
      });
    },
    [gameStatus],
  );

  const resetGame = useCallback(() => {
    setBoard(generateBoard(rows, cols, mines));
    setMinesLeft(mines);
    setGameStatus("playing");
  }, [rows, cols, mines]);

  return { board, minesLeft, gameStatus, revealCell, toggleFlag, resetGame };
}
