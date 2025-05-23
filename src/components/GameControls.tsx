import React from 'react';
import { Difficulty } from '../types/sudoku';
import '../CSS/GameControls.css';

interface GameControlsProps {
  onNewGame: () => void;
  onResetPuzzle: () => void;
  onCheckSolution: () => void;
  onToggleMistakes: () => void;
  onGetHint: () => void;
  onChangeDifficulty: (difficulty: Difficulty) => void;
  difficulty: Difficulty;
  showMistakes: boolean;
  isGameComplete: boolean;
}

const GameControls: React.FC<GameControlsProps> = ({
                                                     onNewGame,
                                                     onResetPuzzle,
                                                     onCheckSolution,
                                                     onToggleMistakes,
                                                     onGetHint,
                                                     onChangeDifficulty,
                                                     difficulty,
                                                     showMistakes,
                                                     isGameComplete
                                                   }) => {
  return (
      <div className="game-controls">
        {/* Difficulty selector */}
        <div className="difficulty-container">
          <span className="difficulty-label">Difficulty</span>
          <div className="difficulty-buttons">
            {Object.values(Difficulty).map((diff) => (
                <button
                    key={diff}
                    className={`difficulty-button ${
                        difficulty === diff ? 'active' : 'inactive'
                    }`}
                    onClick={() => onChangeDifficulty(diff)}
                >
                  {diff.charAt(0).toUpperCase() + diff.slice(1)}
                </button>
            ))}
          </div>
        </div>

        {/* Main game controls */}
        <div className="button-grid">
          <button className="button btn-blue full-button" onClick={onNewGame}>
            New Game
          </button>

          <button
              className="button btn-gray"
              onClick={onResetPuzzle}
              disabled={isGameComplete}
          >
            Reset
          </button>

          <button
              className="button btn-green"
              onClick={onCheckSolution}
              disabled={isGameComplete}
          >
            Check
          </button>
        </div>

        {/* Additional controls */}
        <div className="additional-controls">
          <div className="controls-row">
            <button
                className="button btn-amber"
                onClick={onGetHint}
                disabled={isGameComplete}
            >
              Hint
            </button>

            <div className="controls-row" style={{ marginLeft: 'auto' }}>
              <span className="controls-label">Show mistakes</span>
              <button
                  className={`toggle-switch ${showMistakes ? 'active' : ''}`}
                  onClick={onToggleMistakes}
              >
                <span className="toggle-knob" />
              </button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default GameControls;
