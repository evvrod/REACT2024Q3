import React from 'react';

import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { Provider } from 'react-redux';

import StoreProvider from '../../src/components/StoreProvider';
import { setupStore } from '../../src/lib/store';

function MockComponent() {
  return <h1>Mock Component</h1>;
}
describe('StoreProvider Component', () => {
  test('should provide the Redux store to its children', () => {
    render(
      <StoreProvider>
        <MockComponent />
      </StoreProvider>,
    );

    expect(screen.getByText('Mock Component')).toBeInTheDocument();
  });

  test('should provide the Redux store to its children', () => {
    const store = setupStore();

    render(
      <Provider store={store}>
        <MockComponent />
      </Provider>,
    );

    expect(screen.getByText('Mock Component')).toBeInTheDocument();
  });
});
