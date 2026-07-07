import items from '../../items.js';


const table = document.getElementById('contractor-table');
let onEditCallback = null;

const createRowColumn = (content) => {
  const td = document.createElement('td');
  td.className = 'px-6 py-4';
  td.textContent = content;
  return td;
};

const createRowColumnRemove = (id, openEditModal) => {
  const td = document.createElement('td');
  td.className = 'px-6 py-4';
  td.innerHTML = `
    <button
      type="button"
      class="btn-delete inline-flex items-center justify-center text-blue bg-brand hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs rounded-base w-8 h-8 focus:outline-none"
      data-id="${id}"
    >
      <svg width="32px" height="32px" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 11V17" stroke="#f33333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M14 11V17" stroke="#f33333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M4 7H20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span class="sr-only">Удалить</span>
    </button>
  `;

  const deleteBtn = td.querySelector('.btn-delete');
  deleteBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    deleteContractor(Number(deleteBtn.dataset.id));
  });

  return td;
};

function deleteContractor(id) {
  const index = items.findIndex((item) => item.id === Number(id));
  if (index === -1) return;
  items.splice(index, 1);
  renderTable({ openEditModal: onEditCallback });
}

export function renderTable({ openEditModal }) {
  onEditCallback = openEditModal;

  table.innerHTML = '';

  items.forEach((contractor) => {
    const row = document.createElement('tr');
    row.className = 'bg-white border-b hover:bg-gray-50';
    row.dataset.id = contractor.id;

    row.appendChild(createRowColumn(contractor.name));
    row.appendChild(createRowColumn(contractor.inn));
    row.appendChild(createRowColumn(contractor.address));
    row.appendChild(createRowColumn(contractor.kpp));
    row.appendChild(createRowColumnRemove(contractor.id, openEditModal));
    row.addEventListener('dblclick', (event) => {
      event.stopPropagation();
      const row = event.target.closest('tr[data-id]');
      if (!row) return;
      openEditModal(Number(row.dataset.id));
    });
    table.appendChild(row);
  });
}
