import React from 'react';

import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import ThemeProvider from '../../src/components/ThemeProvider';
import { ThemeContext } from '../../src/context/ThemeContext';

function TestComponentWithContext() {
  const contextValue = React.useContext(ThemeContext);
  return (
    <div>
      {contextValue ? (
        <p>Context value is present</p>
      ) : (
        <p>Context value is not present</p>
      )}
    </div>
  );
}

describe('ThemeProvider Component', () => {
  it('should render its children correctly', () => {
    render(
      <ThemeProvider>
        <TestComponentWithContext />
      </ThemeProvider>,
    );

    expect(screen.getByText('Context value is present')).toBeInTheDocument();
  });
});
