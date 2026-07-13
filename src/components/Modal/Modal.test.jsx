import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Modal from './Modal';

const mockContractor = {
  id: 1,
  name: 'OTUS',
  inn: '12345678910',
  address: 'Москва, ул Ленина 9',
  kpp: '12312ZA32',
};

describe('Modal', () => {
  test('does not render when closed', () => {
    render(
      <Modal
        isOpen={false}
        contractor={null}
        onClose={jest.fn()}
        onSave={jest.fn()}
      />,
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  test('renders title and form fields when open', () => {
    render(
      <Modal
        isOpen
        contractor={null}
        onClose={jest.fn()}
        onSave={jest.fn()}
      />,
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /контрагент/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/наименование/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/инн/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/адрес/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/кпп/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /сохранить/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /отменить/i })).toBeInTheDocument();
  });

  test('renders empty form for adding contractor', () => {
    render(
      <Modal
        isOpen
        contractor={null}
        onClose={jest.fn()}
        onSave={jest.fn()}
      />,
    );

    expect(screen.getByLabelText(/наименование/i)).toHaveValue('');
    expect(screen.getByLabelText(/инн/i)).toHaveValue('');
    expect(screen.getByLabelText(/адрес/i)).toHaveValue('');
    expect(screen.getByLabelText(/кпп/i)).toHaveValue('');
  });

  test('fills form when editing contractor', async () => {
    render(
      <Modal
        isOpen
        contractor={mockContractor}
        onClose={jest.fn()}
        onSave={jest.fn()}
      />,
    );

    await waitFor(() => {
      expect(screen.getByLabelText(/наименование/i)).toHaveValue('OTUS');
    });
    expect(screen.getByLabelText(/инн/i)).toHaveValue('12345678910');
    expect(screen.getByLabelText(/адрес/i)).toHaveValue('Москва, ул Ленина 9');
    expect(screen.getByLabelText(/кпп/i)).toHaveValue('12312ZA32');
  });

  test('calls onClose when cancel button is clicked', () => {
    const onClose = jest.fn();
    render(
      <Modal
        isOpen
        contractor={null}
        onClose={onClose}
        onSave={jest.fn()}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: /отменить/i }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('calls onClose when close button is clicked', () => {
    const onClose = jest.fn();
    render(
      <Modal
        isOpen
        contractor={null}
        onClose={onClose}
        onSave={jest.fn()}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: /закрыть/i }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('calls onSave with form data when save button is clicked', () => {
    const onSave = jest.fn();
    render(
      <Modal
        isOpen
        contractor={null}
        onClose={jest.fn()}
        onSave={onSave}
      />,
    );

    fireEvent.change(screen.getByLabelText(/наименование/i), {
      target: { value: 'Новый контрагент' },
    });
    fireEvent.change(screen.getByLabelText(/инн/i), {
      target: { value: '11111111111' },
    });
    fireEvent.change(screen.getByLabelText(/адрес/i), {
      target: { value: 'Новый адрес' },
    });
    fireEvent.change(screen.getByLabelText(/кпп/i), {
      target: { value: '999999999' },
    });
    fireEvent.click(screen.getByRole('button', { name: /сохранить/i }));

    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith({
      name: 'Новый контрагент',
      inn: '11111111111',
      address: 'Новый адрес',
      kpp: '999999999',
    });
  });
});
