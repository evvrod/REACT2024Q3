'use client';

import React, { useContext } from 'react';
import { ThemeContext, Theme } from '../../context/ThemeContext';

import styles from './ThemeToggle.module.css';

export default function ThemeToggle(): React.ReactNode {
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
        className={`${styles['toggled-btn']} ${theme === Theme.DARK ? styles.dark : ''}`}
        onClick={toggleTheme}
        aria-label="toggle-theme"
      >
        <div className={styles.thumb} />
      </button>
    </div>
  );
}
