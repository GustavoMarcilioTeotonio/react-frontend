const API_URL = 'http://localhost:8080/api/categories';
// Sua URL do backendexport 
const getAllCategories = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch categories');
    }
    return await response.json();
};

export const createCategory = async (category) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(category),
    });
    if (!response.ok) {
        throw new Error('Failed to create category');
    }
    return await response.json();
};

// READ (individual) - Buscar uma categoria pelo ID
export const getCategoryById = async (id) => {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch category');
    }
    return await response.json();
};

// UPDATE - Atualizar uma categoria existente
export const updateCategory = async (id, updatedCategory) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedCategory),
    });
    if (!response.ok) {
        throw new Error('Failed to update category');
    }
    return await response.json();
};

// DELETE - Deletar uma categoria
export const deleteCategory = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete category');
    }
    return true; // ou pode retornar response.json() se a API enviar algo
};

// Adicione funções para getById, update, delete