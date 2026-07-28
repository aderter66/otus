import React, { useEffect, useState } from 'react';
import * as stylesModule from './Modal.module.css';

const styles = stylesModule.default ?? stylesModule;

const emptyForm = {
  name: '',
  inn: '',
  address: '',
  kpp: '',
};

export default function Modal({ isOpen, contractor, onClose, onSave }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setForm({
      name: contractor?.name ?? '',
      inn: contractor?.inn ?? '',
      address: contractor?.address ?? '',
      kpp: contractor?.kpp ?? '',
    });
  }, [isOpen, contractor]);

  if (!isOpen) {
    return null;
  }

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave({
      name: form.name.trim(),
      inn: form.inn.trim(),
      address: form.address.trim(),
      kpp: form.kpp.trim(),
    });
  };

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-labelledby="contractor-modal-title">
      <div className={styles.dialogWrapper}>
        <form className={styles.dialog} onSubmit={handleSubmit}>
          <div className={styles.header}>
            <h3 id="contractor-modal-title" className={styles.title}>
              Контрагент
            </h3>
            <button type="button" className={styles.closeBtn} aria-label="Закрыть" onClick={onClose}>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1 1L6.14286 6.14286M6.14286 6.14286L11.2857 11.2857M6.14286 6.14286L11.2857 1M6.14286 6.14286L1 11.2857"
                  stroke="#9CA3AF"
                  strokeWidth="1.71429"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <div className={styles.body}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="contractor-name">
                наименование
              </label>
              <input
                id="contractor-name"
                type="text"
                className={styles.input}
                placeholder="наименование контрагента"
                value={form.name}
                onChange={handleChange('name')}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="contractor-inn">
                ИНН
              </label>
              <input
                id="contractor-inn"
                type="text"
                inputMode="numeric"
                maxLength={11}
                className={styles.input}
                placeholder="ИНН"
                value={form.inn}
                onChange={handleChange('inn')}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="contractor-address">
                адрес
              </label>
              <input
                id="contractor-address"
                type="text"
                className={styles.input}
                placeholder="адрес"
                value={form.address}
                onChange={handleChange('address')}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="contractor-kpp">
                КПП
              </label>
              <input
                id="contractor-kpp"
                type="text"
                maxLength={9}
                className={styles.input}
                placeholder="КПП"
                value={form.kpp}
                onChange={handleChange('kpp')}
              />
            </div>
          </div>

          <div className={styles.footer}>
            <button type="submit" className={styles.saveBtn}>
              Сохранить
            </button>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>
              Отменить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
