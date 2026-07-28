import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import Header from './components/Header/Header.jsx';
import Table from './components/Table/Table.jsx';
import Modal from './components/Modal/Modal.jsx';
import initialItems from './components/items.js';

const rootElement = document.getElementById('root');

function App() {
  const [items, setItems] = useState(initialItems);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const editingContractor = items.find((item) => item.id === editingId) ?? null;

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

  const handleDelete = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSave = (data) => {
    if (editingId) {
      setItems((prev) =>
        prev.map((item) => (item.id === editingId ? { ...item, ...data } : item)),
      );
    } else {
      const newId = items.length ? Math.max(...items.map((item) => item.id)) + 1 : 1;
      setItems((prev) => [...prev, { id: newId, ...data }]);
    }

    closeModal();
  };

  return (
    <>
      <Header onAdd={openAddModal} />
      <main>
        <Table items={items} onDelete={handleDelete} onEdit={openEditModal} />
      </main>
      <Modal
        isOpen={isModalOpen}
        contractor={editingContractor}
        onClose={closeModal}
        onSave={handleSave}
      />
    </>
  );
}

createRoot(rootElement).render(<App />);
