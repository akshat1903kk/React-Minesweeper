# 🎮 React Minesweeper

A beautifully designed, fully interactive Minesweeper game built with React, TypeScript, TailwindCSS, and Framer Motion. This project focuses on clean UI, smooth animations, and modern frontend engineering principles.


## ✨ Features

- 🧠 Classic Minsweeper gameplay with multiple difficulty levels.
- 🪞 Glassmorphism UI with a soft, modern gradient theme.
- ⚙️ Built with React + TypeScript + Vite for a fast, modern development experience.
- 🎨 Styled entirely with TailwindCSS for utility-first design.
- 🎬 Subtle Framer Motion animations for smooth transitions and modal interactions.
- 🧱 Modular architecture (components, hooks, utils, pages).
- ⏱️ Real-time game timer and flag counter.
- 💥 Game-over and victory animations.
- 💻 Fully responsive layout for all screen sizes.

## 🛠️ Tech Stack

| Technology      | Purpose                               |
| --------------- | ------------------------------------- |
| ⚛️ React        | UI library for building components    |
| 🧱 TypeScript   | Type safety and scalability           |
| 💨 TailwindCSS  | Utility-first styling                 |
| 🎞️ Framer Motion | Declarative animations and transitions |
| ⚡ Vite          | Build tool for lightning-fast HMR     |
| 🧩 ESLint + Prettier | Code quality and formatting         |

## 🚀 Getting Started

Follow these steps to get the project running on your local machine.

### 1. Clone the Repository

```bash
git clone https://github.com/akshat1903kk/React-Minesweeper.git
cd React-Minesweeper
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## 🧩 Gameplay

- **Left Click:** Reveal a cell.
- **Right Click:** Flag or unflag a cell.
- **Goal:** Reveal all non-mine cells without triggering a mine.

The status indicators (timer and flag counter) update dynamically in real-time.

## 💡 Core Concepts

### Design Philosophy

The game embraces a soft gradient + glassmorphism aesthetic, focusing on minimalism and visual clarity. Typography uses Inter and Poppins for an elegant, modern look. Animations are tuned to be subtle yet expressive, making interactions smooth and engaging.

### Development Notes

- **Modular Architecture:** The project is organized into independent functional components (`Board`, `Cell`, `GameStatusModal`) for reusability.
- **Abstracted Logic:** The core game logic is abstracted into the `useMinesweeper.ts` custom hook, making it easy to test, manage state, and scale.
- **Pure Tailwind:** Styled entirely with TailwindCSS, ensuring no dependency on external CSS frameworks.
- **Animated Variants:** Animations are modularized using Framer Motion variants for clean and readable component code.

## 🗂️ Project Structure

A look at the `src` directory structure:

```
react-minesweeper/
├── public/ # Static assets
└── src/
    ├── assets/ # Images, icons
    ├── components/ # Reusable UI components (Board, Cell, Sidebar)
    ├── hooks/ # Custom React hooks (useMinesweeper.ts)
    ├── pages/ # Main pages (GamePage, LandingPage)
    ├── router/ # App routing logic (AppRouter.tsx)
    ├── styles/ # Global styles and themes (globals.css)
    ├── utils/ # Helper functions (board.ts)
    ├── types/ # TypeScript type definitions
    ├── App.tsx # Root app component
    └── main.tsx # Entry point
```

## 🏆 Future Enhancements

- 🧍 Player stats and local leaderboard
- 🕹️ Custom grid/difficulty creation
- 🌗 Dark mode toggle
- 🎧 Ambient sound effects
- 🧠 AI auto-solver (for fun experimentation)

## 🧑‍💻 Author

**Akshat**

🚀 Developer | 🎨 Designer | 💭 Thinker

[GitHub](https://github.com/akshat1903kk)

> “A perfect blend of logic, precision, and art — just like coding should be.”
>
> — Akshat

## 📜 License

This project is licensed under the MIT License. Feel free to use, modify, and build upon it—just give credit where it’s due 💖
