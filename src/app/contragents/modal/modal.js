import { Modal } from 'flowbite';
import items from '../../items.js';

const form = document.getElementById('add-edit-contractor-modal');
const modal = new Modal(form);

const inputName = document.getElementById('name');
const inputAdress = document.getElementById('adress');
const inputInn = document.getElementById('inn');
const inputKpp = document.getElementById('kpp');

const save = document.getElementById('modal-save')
const undo = document.getElementById('modal-undo')

let openForEdit = null;
let updateTable = null;

save.addEventListener('click', (event) => {
  saveContractor(event);
})


undo.addEventListener('click', (event) => {
  closeModal(event);
})

export function openModalForEdit(id){
  const contractor = items.find((item) => item.id === id);
  if (!contractor) return;
  inputName.value = contractor.name;
  inputInn.value = contractor.inn;
  inputAdress.value = contractor.address;
  inputKpp.value = contractor.kpp;
  openForEdit = id;
  modal.show();
}

function getFormData() {
  return {
    name: inputName.value.trim(),
    inn: inputInn.value.trim(),
    address: inputAdress.value.trim(),
    kpp: inputKpp.value.trim(),
  };
}

function closeModal() {
  inputName.value = '';
  inputInn.value = '';
  inputAdress.value = '';
  inputKpp.value = '';
  modal.hide();
}

export function actionsOnSave({ onSave }) {
  updateTable = onSave;
}

function saveContractor(event) {
  event.preventDefault();
  const data = getFormData();
  let index;
  if(openForEdit){
    index = items.findIndex((item) => item.id === openForEdit);
    if (index !== -1) {
      items[index] = { id: openForEdit, ...data };
    }
  }else{
    if(items.length){
      index = Math.max(...items.map((item) => item.id)) + 1;
    }
    items.push({ id: index, ...data });
  }
  
  closeModal();

  updateTable();
}
