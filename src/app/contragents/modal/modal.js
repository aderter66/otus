import { Modal } from 'flowbite';
import items from '../../items.js';

const form = document.getElementById('add-edit-contractor-modal');
const modal = new Modal(form);

const inputName = document.getElementById('name');
const inputAddress = document.getElementById('address');
const inputInn = document.getElementById('inn');
const inputKpp = document.getElementById('kpp');

const save = document.getElementById('modal-save')
const undo = document.getElementById('modal-undo')

const openModal = document.getElementById('add-new')

let openForEdit = null;
let updateTable = null;

openModal.addEventListener('click', (event) =>{
  openModalForEdit();
})

save.addEventListener('click', (event) => {
  saveContractor(event);
})


undo.addEventListener('click', (event) => {
  closeModal(event);
})

export function openModalForEdit(id){
  if(id !== undefined){
    const contractor = items.find((item) => item.id === id);
    if (!contractor) return;
    inputName.value = contractor.name;
    inputInn.value = contractor.inn;
    inputAddress.value = contractor.address;
    inputKpp.value = contractor.kpp;
    openForEdit = id;
  }else{
    clear();
  }
  modal.show();
}

function getFormData() {
  return {
    name: inputName.value.trim(),
    inn: inputInn.value.trim(),
    address: inputAddress.value.trim(),
    kpp: inputKpp.value.trim(),
  };
}

function clear(){
  inputName.value = '';
  inputInn.value = '';
  inputAddress.value = '';
  inputKpp.value = '';
  openForEdit = null;
}

function closeModal() {
  clear();
  modal.hide();
}

export function actionsOnSave({ onSave }) {
  updateTable = onSave;
}

function saveContractor(event) {
  event.preventDefault();
  const data = getFormData();
  if(openForEdit){
    let index = items.findIndex((item) => item.id === openForEdit);
    if (index !== -1) {
      items[index] = { id: openForEdit, ...data };
    }
  }else{
    let index = items.length ? Math.max(...items.map((item) => item.id)) + 1 : 1;
    items.push({ id: index, ...data });
  }
  
  closeModal();

  updateTable();
}
