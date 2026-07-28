import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
  test('renders logo', () => {
    render(<Header onAdd={jest.fn()} />);

    expect(screen.getByAltText('Logo')).toBeInTheDocument();
  });

  test('renders add button', () => {
    render(<Header onAdd={jest.fn()} />);

    expect(screen.getByRole('button', { name: /добавить/i })).toBeInTheDocument();
  });

  test('calls onAdd when add button is clicked', () => {
    const onAdd = jest.fn();
    render(<Header onAdd={onAdd} />);

    fireEvent.click(screen.getByRole('button', { name: /добавить/i }));

    expect(onAdd).toHaveBeenCalledTimes(1);
  });
});
