import React, { useState } from 'react';
import Header from './components/Header/Header.jsx';
import Table from './components/Table/Table.jsx';
import Modal from './components/Modal/Modal.jsx';
import { useContractors } from './context/ContractorsContext.jsx';

export default function App() {
  const {
    contractors,
    loading,
    error,
    addContractor,
    updateContractor,
    deleteContractor,
  } = useContractors();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const editingContractor = contractors.find((item) => item.id === editingId) ?? null;

  const openAddModal = () => {
    setEditingId(null);
    setIsModalOpen(true);
  };

  const openEditModal = (id) => {
    setEditingId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    await deleteContractor(id);
  };

  const handleSave = async (data) => {
    if (editingId) {
      await updateContractor(editingId, data);
    } else {
      await addContractor(data);
    }

    closeModal();
  };

  if (loading) {
    return <main>Загрузка...</main>;
  }

  return (
    <>
      {error && <div role="alert">{error}</div>}
      <Header onAdd={openAddModal} />
      <main>
        <Table items={contractors} onDelete={handleDelete} onEdit={openEditModal} />
      </main>
      {isModalOpen && (
        <Modal
          key={editingId ?? 'new'}
          contractor={editingContractor}
          onClose={closeModal}
          onSave={handleSave}
        />
      )}
    </>
  );
}
