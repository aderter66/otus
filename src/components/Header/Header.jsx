import React from 'react';
import * as stylesModule from './Header.module.css';
import logo from '../../assets/logo.svg';

const styles = stylesModule.default ?? stylesModule;

export default function Header({ onAdd }) {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <img src={logo} className={styles.logo} alt="Logo" />
        <button type="button" className={styles.addBtn} onClick={onAdd}>
          Добавить
        </button>
      </div>
    </header>
  );
}
