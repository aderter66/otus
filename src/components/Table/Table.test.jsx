import { render, screen, fireEvent } from '@testing-library/react';
import Table from './Table';

const mockItems = [
  {
    id: 1,
    name: 'OTUS',
    inn: '12345678910',
    address: 'Москва, ул Ленина 9',
    kpp: '12312ZA32',
  },
  {
    id: 2,
    name: 'OTUS 1',
    inn: '00045678919',
    address: 'Санкт-Петербург, Невский пр 10',
    kpp: '02312GA32',
  },
];

describe('Table', () => {
  test('renders column headers', () => {
    render(<Table items={mockItems} onDelete={jest.fn()} onEdit={jest.fn()} />);

    expect(screen.getByRole('columnheader', { name: /наименование/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /инн/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /адрес/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /кпп/i })).toBeInTheDocument();
  });

  test('renders contractor rows from items', () => {
    render(<Table items={mockItems} onDelete={jest.fn()} onEdit={jest.fn()} />);

    expect(screen.getByText('OTUS')).toBeInTheDocument();
    expect(screen.getByText('12345678910')).toBeInTheDocument();
    expect(screen.getByText('Москва, ул Ленина 9')).toBeInTheDocument();
    expect(screen.getByText('12312ZA32')).toBeInTheDocument();

    expect(screen.getByText('OTUS 1')).toBeInTheDocument();
    expect(screen.getByText('00045678919')).toBeInTheDocument();
    expect(screen.getByText('Санкт-Петербург, Невский пр 10')).toBeInTheDocument();
    expect(screen.getByText('02312GA32')).toBeInTheDocument();
  });

  test('renders delete button for each row', () => {
    render(<Table items={mockItems} onDelete={jest.fn()} onEdit={jest.fn()} />);

    expect(screen.getAllByRole('button', { name: /удалить/i })).toHaveLength(mockItems.length);
  });

  test('calls onDelete when delete button is clicked', () => {
    const onDelete = jest.fn();
    render(<Table items={mockItems} onDelete={onDelete} onEdit={jest.fn()} />);

    fireEvent.click(screen.getAllByRole('button', { name: /удалить/i })[0]);

    expect(onDelete).toHaveBeenCalledTimes(1);
    expect(onDelete).toHaveBeenCalledWith(1);
  });

  test('calls onEdit when row is double-clicked', () => {
    const onEdit = jest.fn();
    render(<Table items={mockItems} onDelete={jest.fn()} onEdit={onEdit} />);

    fireEvent.doubleClick(screen.getByText('OTUS 1'));

    expect(onEdit).toHaveBeenCalledTimes(1);
    expect(onEdit).toHaveBeenCalledWith(2);
  });
});
