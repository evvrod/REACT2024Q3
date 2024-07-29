import React from 'react';

import { expect, describe, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import {
  ThemeContext,
  ThemeContextProps,
  Theme,
} from '../../src/context/ThemeContext';

import Header from '../../src/components/Header/Header';

const mockToggleTheme = vi.fn();

const mockThemeContext: ThemeContextProps = {
  theme: Theme.LIGHT,
  toggleTheme: mockToggleTheme,
};

describe('Testing Header', () => {
  test('renders Header with logo and ThemeToggle', () => {
    render(
      <ThemeContext.Provider value={mockThemeContext}>
        <Header />
      </ThemeContext.Provider>,
    );

    const logoImage = screen.getByAltText('Star Wars logo');
    expect(logoImage).toBeInTheDocument();

    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
