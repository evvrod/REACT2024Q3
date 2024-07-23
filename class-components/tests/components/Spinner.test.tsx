import { expect, describe, test } from 'vitest';
import { render, screen } from '@testing-library/react';

import Spinner from '../../src/components/Spinner/Spinner';

describe('Testing Spinner', () => {
  test('renders Spinner component correctly', () => {
    render(<Spinner />);

    const spinner = screen.getByRole('progressbar');
    expect(spinner).toBeInTheDocument();
  });
  
});
