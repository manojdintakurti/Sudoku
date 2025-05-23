import React, { useState, useEffect } from 'react';
import { BestTimes as BestTimesType, Difficulty } from '../types/sudoku';
import { getBestTimes } from '../utils/storageUtils';
import '../CSS/BestTimesDisplay.css';

const BestTimesDisplay: React.FC = () => {
  const [bestTimes, setBestTimes] = useState<BestTimesType>({
    [Difficulty.EASY]: null,
    [Difficulty.MEDIUM]: null,
    [Difficulty.HARD]: null
  });

  useEffect(() => {
    setBestTimes(getBestTimes());
  }, []);

  const formatTime = (seconds: number | null): string => {
    if (seconds === null) return '-';

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return [
      hours > 0 ? String(hours).padStart(2, '0') : '',
      String(minutes).padStart(2, '0'),
      String(secs).padStart(2, '0')
    ].filter(Boolean).join(':');
  };

  return (
      <div className="best-times-container">
        <h3 className="best-times-title">Best Times</h3>
        <div>
          {Object.entries(bestTimes).map(([difficulty, time]) => (
              <div key={difficulty} className="best-time-row">
                <span className="best-time-label">{difficulty}</span>
                <span className="best-time-value">{formatTime(time)}</span>
              </div>
          ))}
        </div>
      </div>
  );
};

export default BestTimesDisplay;
