import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    createCategory,
    getCategoryById,
    updateCategory
} from '../../services/CategoryService';

const CategoryForm = () => {
    const { id } = useParams(); // pega o ID da URL (undefined se for criação)
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const isEditMode = Boolean(id); // true se for edição

    useEffect(() => {
        if (isEditMode) {
            loadCategory();
        }
    }, [id]);

    const loadCategory = async () => {
        try {
            setLoading(true);
            const category = await getCategoryById(id);
            setName(category.name);
        } catch (err) {
            setError('Failed to load category');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (isEditMode) {
                await updateCategory(id, { name });
                alert('Categoria atualizada!');
            } else {
                await createCategory({ name });
                alert('Categoria criada!');
            }
            navigate('/categories'); // volta pra lista após salvar
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>{isEditMode ? 'Editar Categoria' : 'Nova Categoria'}</h2>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nome:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? 'Salvando...' : 'Salvar'}
                </button>

                <button type="button" onClick={() => navigate('/categories')}>
                    Cancelar
                </button>
            </form>
        </div>
    );
};

export default CategoryForm;