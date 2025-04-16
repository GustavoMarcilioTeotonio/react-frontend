const API_URL = 'http://localhost:8080/api/costumer'; // substitua pela URL real da sua API

// READ - Buscar todos os clientes
export const getAllCustomers = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch customers');
    }
    return await response.json();
};

// CREATE - Criar novo cliente
export const createCustomer = async (customer) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customer),
    });
    if (!response.ok) {
        throw new Error('Failed to create customer');
    }
    return await response.json();
};

// READ (individual) - Buscar cliente por ID
export const getCustomerById = async (id) => {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch customer');
    }
    return await response.json();
};

// UPDATE - Atualizar cliente
export const updateCustomer = async (id, updatedCustomer) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedCustomer),
    });
    if (!response.ok) {
        throw new Error('Failed to update customer');
    }
    return await response.json();
};

// DELETE - Deletar cliente
export const deleteCustomer = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete customer');
    }
    return true;
};