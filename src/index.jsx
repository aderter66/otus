import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { ContractorsProvider } from './context/ContractorsContext.jsx';

const rootElement = document.getElementById('root');

createRoot(rootElement).render(
  <ContractorsProvider>
    <App />
  </ContractorsProvider>,
);
