import { expect, describe, test } from 'vitest';
import { render, screen } from '@testing-library/react';

import Footer from '../../src/components/Footer/Footer';

describe('Testing Footer', () => {
  test('renders Footer component correctly with links', () => {
    render(<Footer />);

    const githubLink = screen.getByRole('link', { name: /evvrod/i });
    expect(githubLink).toHaveAttribute('href', 'https://github.com/evvrod');

    const courseLink = screen.getByRole('link', { name: /course/i });
    expect(courseLink).toHaveAttribute(
      'href',
      'https://rs.school/courses/reactjs',
    );
  });
});
