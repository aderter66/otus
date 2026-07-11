import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import Header from './components/Header/Header.jsx';
import Table from './components/Table/Table.jsx';
import initialItems from './app/items.js';

const rootElement = document.getElementById('root');

function App() {
  const [items, setItems] = useState<Object>(initialItems);

  const handleDelete = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleEdit = (id) => {
    console.log('Редактировать', id);
  };

  return (
    <>
      <Header onAdd={() => console.log('Добавить')} />
      <main>
        <Table items={items} onDelete={handleDelete} onEdit={handleEdit} />
      </main>
    </>
  );
}

createRoot(rootElement).render(<App />);
