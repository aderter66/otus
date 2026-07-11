import React from 'react';
import * as stylesModule from './Table.module.css';

const styles = stylesModule.default ?? stylesModule;

export default function Table({ items, onDelete, onEdit }) {
  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th className={styles.th}>наименование</th>
            <th className={styles.th}>ИНН</th>
            <th className={styles.th}>адрес</th>
            <th className={styles.th}>КПП</th>
            <th className={styles.th} />
          </tr>
        </thead>
        <tbody>
          {items.map((contractor) => (
            <tr
              key={contractor.id}
              className={styles.row}
              data-id={contractor.id}
              onDoubleClick={() => onEdit?.(contractor.id)}
            >
              <td className={styles.cell}>{contractor.name}</td>
              <td className={styles.cell}>{contractor.inn}</td>
              <td className={styles.cell}>{contractor.address}</td>
              <td className={styles.cell}>{contractor.kpp}</td>
              <td className={styles.cell}>
                <button
                  type="button"
                  className={styles.deleteBtn}
                  aria-label="Удалить"
                  onClick={(event) => {
                    event.stopPropagation();
                    onDelete?.(contractor.id);
                  }}
                >
                  <svg
                    className={styles.deleteIcon}
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 11V17"
                      stroke="#f33333"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14 11V17"
                      stroke="#f33333"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4 7H20"
                      stroke="#000000"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z"
                      stroke="#000000"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                      stroke="#000000"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className={styles.srOnly}>Удалить</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
