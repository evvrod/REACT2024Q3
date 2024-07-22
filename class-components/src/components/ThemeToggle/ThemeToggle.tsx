import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

import styles from './ThemeToggle.module.css';

export default function ThemeToggle() {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error('ThemeToggle must be used within a ThemeProvider');
  }
  const { theme, toggleTheme } = themeContext;

  return (
    <div className={styles.wrapper}>
      <span>Toggle theme</span>
      <button
        type="button"
        className={`${styles.toggledBtn} ${theme === 'dark' ? styles.toggled : ''}`}
        onClick={toggleTheme}
      >
        <div className={styles.thumb} />
      </button>
    </div>
  );
}
