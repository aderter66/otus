import React from 'react';
import { createRoot } from 'react-dom/client';
import Header from './components/Header/Header.jsx';

const rootElement = document.getElementById('root');

createRoot(rootElement).render(
  <Header onAdd={() => console.log('Добавить')} />
);
