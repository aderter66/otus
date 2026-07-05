import html from "./app.html";
import './app.css'
import items from "./items";

const table = document.getElementById('contractor-table');

const headRowElement = document.createElement('tr');

const createRowColumn = (content) => {
    const rowColumn = table.content.children[0].cloneNode();
    rowColumn.innerHTML = content;
    return rowColumn;
}

const createRowColumnRemove = () => {
    const rowColumn = table.content.children[0].cloneNode();
    rowColumn.innerHTML = <button type="button" class="inline-flex items-center justify-center  text-white bg-brand hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs rounded-base w-8 h-8 focus:outline-none">
    <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"/>
    </svg>
    <span class="sr-only">Удалить</span>
    </button>;
    return rowColumn;
}


items.forEach((contractor) => {
    const bodyRowElement = document.createElement('tr');
    bodyRowElement.className = 'bg-white border-b hover:bg-gray-50';
    const rowHead = bodyRowElement.content.children[0].cloneNode();

    bodyRowElement.appendChild(createRowColumn(contractor.id));
    bodyRowElement.appendChild(createRowColumn(contractor.name));
    bodyRowElement.appendChild(createRowColumn(contractor.inn));
    bodyRowElement.appendChild(createRowColumn(contractor.address));
    bodyRowElement.appendChild(createRowColumn(contractor.kpp));
    bodyRowElement.appendChild(createRowColumn(createRowColumnRemove));
    table.appendChild(bodyRowElement);
})