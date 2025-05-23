import React from 'react';
import { Sun, Moon } from 'lucide-react';
import '../CSS/ToggleTheme.css';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, toggleTheme }) => {
  return (
      <button
          className="theme-toggle-button"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? (
            <Moon className="icon-light" />
        ) : (
            <Sun className="icon-dark" />
        )}
      </button>
  );
};

export default ThemeToggle;
