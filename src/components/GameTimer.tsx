import React from 'react';
import '../CSS/GameControls.css';

interface GameTimerProps {
  time: number;
}

const GameTimer: React.FC<GameTimerProps> = ({ time }) => {
  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return [
      hours > 0 ? String(hours).padStart(2, '0') : '',
      String(minutes).padStart(2, '0'),
      String(secs).padStart(2, '0')
    ].filter(Boolean).join(':');
  };

  return <div className="game-timer">{formatTime(time)}</div>;
};

export default GameTimer;
