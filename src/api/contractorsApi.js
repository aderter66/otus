const API_URL = '/api/contractors';

async function handleResponse(response) {
  if (!response.ok) {
    throw new Error(`Ошибка запроса: ${response.status}`);
  }

  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

export async function getContractors() {
  const response = await fetch(API_URL);
  return handleResponse(response);
}

export async function createContractor(data) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  return handleResponse(response);
}

export async function updateContractor(id, data) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, ...data }),
  });

  return handleResponse(response);
}

export async function deleteContractor(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });

  return handleResponse(response);
}
