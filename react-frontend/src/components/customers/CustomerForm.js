import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    createCustomer,
    getCustomerById,
    updateCustomer
} from '../../services/customerService';

const CustomerForm = () => {
    const { id } = useParams(); // Pega o ID da URL (undefined se for criação)
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const isEditMode = Boolean(id); // true se for edição

    useEffect(() => {
        if (isEditMode) {
            loadCustomer();
        }
    }, [id]);

    const loadCustomer = async () => {
        try {
            setLoading(true);
            const customer = await getCustomerById(id);
            setName(customer.name);
            setEmail(customer.email);
            setPhone(customer.phone);
            setPassword(customer.password);
        } catch (err) {
            setError('Failed to load customer');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const customerData = { name, email, phone, password };
            if (isEditMode) {
                await updateCustomer(id, customerData);
                alert('Customer updated!');
            } else {
                await createCustomer(customerData);
                alert('Customer created!');
            }
            navigate('/customers'); // Redireciona para a lista de clientes após salvar
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>{isEditMode ? 'Edit Customer' : 'New Customer'}</h2>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Phone:</label>
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? 'Saving...' : 'Save'}
                </button>

                <button type="button" onClick={() => navigate('/customers')}>
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default CustomerForm;