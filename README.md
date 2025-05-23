# 🧩 Sudoku Game – React + TypeScript

A fully functional, responsive Sudoku game built using **React**, **TypeScript**, and **custom hooks** — with an emphasis on clean architecture, accessibility, and testability. Playable in both light and dark modes, with varying difficulty levels and best-time tracking.



---

## 🚀 Features

- 🎮 **Sudoku Gameplay** with difficulty levels (Easy, Medium, Hard)
- 💡 **Hints**, **mistake highlighting**, and **solution checking**
- 🕒 **Game timer** with best-time tracking via `localStorage`
- 🎨 **Dark mode toggle** using a custom theme hook
- 🧠 **Smart cell selection** and related-cell highlighting
- 🔄 **Reset**, **new game**, and **restart** options
- ✅ **Fully tested** core logic and puzzle generation with Jest

---

## 🛠️ Tech Stack

- **React** (Functional Components)
- **TypeScript**
- **Custom React Hooks** for state management
- **CSS Modules** 
- **Jest + ts-jest** for unit testing
- **LocalStorage** for persisting best times

---

## 🧩 Game Architecture

### 📁 `hooks/useSudoku.ts`

- Manages game logic: puzzle generation, cell updates, selection, and completion state.
- Controls timer state, validation toggling, and difficulty switching.

### 📁 `components/`

- `SudokuBoard`, `SudokuCell`: render the interactive board and handle selection/input.
- `GameControls`: controls for difficulty, hints, reset, and solution check.
- `GameTimer`: tracks and displays elapsed time.
- `GameComplete`: modal popup on success.
- `BestTimesDisplay`: shows saved best times.

### 📁 `utils/`

- `sudokuGenerator.ts`: generates valid puzzles using backtracking.
- `sudokuValidator.ts`: validates moves and checks full solutions.
- `storageUtils.ts`: handles saving and retrieving best times.

---

## 🧪 Tests

Unit tests cover:

| Module              | Description                          |
|---------------------|--------------------------------------|
| `sudokuGenerator`   | Valid puzzle structure and solution  |
| `sudokuValidator`   | Placement, grid validation, solution |
| `storageUtils`      | `localStorage` mocks and behavior    |

### 🔧 Run Tests

```bash
npm test
