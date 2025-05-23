import React from 'react';
import { Difficulty } from '../types/sudoku';
import '../CSS/GameComplete.css';

interface GameCompleteProps {
  time: number;
  difficulty: Difficulty;
  onNewGame: () => void;
}

const GameComplete: React.FC<GameCompleteProps> = ({ time, difficulty, onNewGame }) => {
  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return [
      hours > 0 ? `${hours} ${hours === 1 ? 'hour' : 'hours'}` : '',
      minutes > 0 ? `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}` : '',
      secs > 0 ? `${secs} ${secs === 1 ? 'second' : 'seconds'}` : ''
    ].filter(Boolean).join(', ');
  };

  return (
      <div className="game-complete-overlay">
        <div className="game-complete-box">
          <h2 className="game-complete-title">Puzzle Solved!</h2>
          <div className="game-complete-subtitle">
            You completed the {difficulty} puzzle in
            <p className="game-complete-time">{formatTime(time)}</p>
          </div>
          <div className="game-complete-button-container">
            <button className="game-complete-button" onClick={onNewGame}>
              Play Again
            </button>
          </div>
        </div>
      </div>
  );
};

export default GameComplete;
