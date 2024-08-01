import React from 'react';

import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';

import Close from '../../src/components/Close/Close';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
  useSearchParams: vi.fn(),
}));

describe('Close Component', () => {
  test('should render the Close button correctly', () => {
    render(<Close />);

    expect(screen.getByText('Close')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
