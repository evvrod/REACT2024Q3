import { describe, test, expect } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { useContext } from 'react';
import { ThemeProvider, ThemeContext } from '../src/context/ThemeContext';

function TestComponent() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('TestComponent must be used within a ThemeProvider');
  }

  const { theme, toggleTheme } = context;

  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button type="button" onClick={toggleTheme}>
        Toggle Theme
      </button>
    </div>
  );
}

describe('ThemeProvider', () => {
  test('provides default theme and allows theme to be toggled', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('theme').textContent).toBe('light');

    act(() => {
      screen.getByText('Toggle Theme').click();
    });

    expect(screen.getByTestId('theme').textContent).toBe('dark');
  });

  test('adds the correct class to the body when the theme changes', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    expect(document.body.className).toBe('light-theme');

    act(() => {
      screen.getByText('Toggle Theme').click();
    });

    expect(document.body.className).toBe('dark-theme');
  });

  
});
