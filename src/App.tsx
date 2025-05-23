import React from 'react';
import { useSudoku } from './hooks/useSudoku';
import { useTheme } from './hooks/useTheme';
import SudokuBoard from './components/SudokuBoard';
import GameControls from './components/GameControls';
import GameTimer from './components/GameTimer';
import BestTimesDisplay from './components/BestTimes';
import ThemeToggle from './components/ThemeToggle';
import GameComplete from './components/GameComplete';
import './CSS/App.css'; // import the new CSS

const App: React.FC = () => {
  const {
    gameState,
    selectedCell,
    isGameComplete,
    gameTime,
    showMistakes,
    difficulty,
    selectCell,
    updateCellValue,
    toggleShowMistakes,
    checkCurrentSolution,
    resetPuzzle,
    initializeGame,
    changeDifficulty,
    getHintCell
  } = useSudoku();

  const { theme, toggleTheme } = useTheme();

  return (
      <div className={`app-container ${theme === 'dark' ? 'dark' : ''}`}>
        <div className="inner-container">
          <header className="header">
            <h1 className="title">Sudoku</h1>
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          </header>

          <div className="main-layout">
            <div>
              <div style={{ position: 'relative' }}>
                <SudokuBoard
                    gameState={gameState}
                    onCellSelect={selectCell}
                    onNumberInput={updateCellValue}
                />
                {isGameComplete && (
                    <GameComplete
                        time={gameTime}
                        difficulty={difficulty}
                        onNewGame={initializeGame}
                    />
                )}
              </div>
            </div>

            <div>
              <div className="timer-controls">
                <GameTimer time={gameTime} />
                <GameControls
                    onNewGame={initializeGame}
                    onResetPuzzle={resetPuzzle}
                    onCheckSolution={checkCurrentSolution}
                    onToggleMistakes={toggleShowMistakes}
                    onGetHint={getHintCell}
                    onChangeDifficulty={changeDifficulty}
                    difficulty={difficulty}
                    showMistakes={showMistakes}
                    isGameComplete={isGameComplete}
                />
                <BestTimesDisplay />
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default App;
