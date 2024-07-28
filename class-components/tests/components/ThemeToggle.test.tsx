import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { userEvent } from '@testing-library/user-event';
import ThemeToggle from '../../src/components/ThemeToggle/ThemeToggle';
import { ThemeContext, Theme } from '../../src/context/ThemeContext';

describe('ThemeToggle', () => {
  const mockToggleTheme = vi.fn();

  const themeContextValue = {
    theme: Theme.LIGHT,
    toggleTheme: mockToggleTheme,
  };

  test('throws an error if used outside of ThemeProvider', () => {
    expect(() => render(<ThemeToggle />)).toThrowError(
      'ThemeToggle must be used within a ThemeProvider',
    );
  });

  test('renders correctly light theme and toggles theme', async () => {
    render(
      <ThemeContext.Provider value={themeContextValue}>
        <ThemeToggle />
      </ThemeContext.Provider>,
    );
    expect(screen.getByText('Toggle theme')).toBeInTheDocument();

    const button = screen.getByRole('button');
    expect(button).not.toHaveClass(/_dark_/);

    await userEvent.click(button);
    expect(mockToggleTheme).toHaveBeenCalled();
  });
});
