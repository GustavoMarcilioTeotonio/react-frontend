import React, { useState, useEffect } from 'react';
import { getAllCategories, deleteCategory } from '../../services/CategoryService';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const data = await getAllCategories();
            setCategories(data);
            setError(null);
        } catch (err) {
            setError(err.message);
            setCategories([]);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            try {
 // await deleteCategory(id); 
 // Implemente no service
                alert('Category deleted (implement API call)');// Placeholder
                fetchCategories();// Recarrega a lista
            } catch (err) {
                alert('Failed to delete category: ' + err.message);
            }
        }
    };

    const handleEdit = async (id) => {
        if (window.confirm('Are you sure you want to update this category?')) {
            try {
 // await deleteCategory(id); 
 // Implemente no service
                alert('Category updated (implement API call)');// Placeholder
                fetchCategories();// Recarrega a lista
            } catch (err) {
                alert('Failed to updated category: ' + err.message);
            }
        }
    };

    if (loading) return <p>Loading categories...</p>;
    if (error) return <p>Error loading categories: {error}</p>;

    return (
        <div>
            <h2>Categories</h2>
            {/* Adicionar botão para ir para o formulário de criação */}
            <ul>
                {categories.map(category => (
                    <li key={category.id}>
                        {category.name}
                        {/* Adicionar botões Edit/Delete */}
                        <button onClick={() => handleDelete(category.id)}>Delete</button>

                        <button onClick={() => handleEdit(category.id)}>Edit</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CategoryList;

