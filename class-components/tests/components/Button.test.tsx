import { expect, describe, test, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Button from '../../src/components/Button/Button';

describe('Testing Button', () => {
  const onClick = vi.fn();

  beforeEach(() => {
    onClick.mockReset();
  });

  test('renders Button component correctly with only required props', async () => {
    render(<Button>Button</Button>);

    const button = screen.getByRole('button', { name: /Button/i });
    expect(button).toBeInTheDocument();
    expect(button).toBeEnabled();
    expect(button).toHaveAttribute('type', 'button');

    await userEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  test('renders Button component correctly with all props', async () => {
    render(
      <Button
        className="Test Class Name"
        onClick={onClick}
        // disabled={true}
        type="submit"
      >
        Button
      </Button>,
    );

    const button = screen.getByRole('button', { name: /Button/i });
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
    expect(button).toHaveAttribute('type', 'submit');

    await userEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('triggers onClick handler when the button is clicked', async () => {
    render(
      <Button
        className="Test Class Name"
        onClick={onClick}
        disabled={false}
        type="submit"
      >
        Button
      </Button>,
    );

    const button = screen.getByRole('button', { name: /Button/i });
    await userEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
