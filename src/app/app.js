import html from "./app.html";
import './app.css'
import items from "./items";

import { renderTable } from './contragents/table/table.js';
import { openModalForEdit, actionsOnSave} from './contragents/modal/modal.js';


renderTable({
  openEditModal: openModalForEdit,
});

actionsOnSave({
  onSave: () => renderTable({ openEditModal: openModalForEdit }),
});

const table = document.getElementById('contractor-table');
