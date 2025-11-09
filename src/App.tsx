// src/App.tsx
import React from "react";
import Game from "d:/React-side-project/react-minesweeper/src/pages/Game";

function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
      <div className="w-full max-w-4xl p-6">
        <h1 className="text-3xl font-bold text-center mb-6">💣 Minesweeper</h1>
        <Game />
      </div>
    </div>
  );
}

export default App;
