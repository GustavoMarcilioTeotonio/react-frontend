import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Para navegação
import { getAllCustomers, deleteCustomer } from '../../services/customerService';

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate(); // hook para redirecionamento

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            setLoading(true);
            const data = await getAllCustomers();
            setCustomers(data);
            setError(null);
        } catch (err) {
            setError(err.message);
            setCustomers([]);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this customer?')) {
            try {
                await deleteCustomer(id);
                alert('Customer deleted!');
                fetchCustomers(); // Recarrega a lista
            } catch (err) {
                alert('Failed to delete customer: ' + err.message);
            }
        }
    };

    const handleEdit = (id) => {
        navigate(`/customers/edit/${id}`); // Redireciona para o formulário de edição
    };

    const handleCreate = () => {
        navigate('/customers/new'); // Redireciona para o formulário de criação
    };

    if (loading) return <p>Loading customers...</p>;
    if (error) return <p>Error loading customers: {error}</p>;

    return (
        <div>
            <h2>Customers</h2>
            <button onClick={handleCreate}>➕ New Customer</button>

            <ul>
                {customers.map((customer) => (
                    <li key={customer.id}>
                        <p><strong>Name:</strong> {customer.name}</p>
                        <p><strong>Email:</strong> {customer.email}</p>
                        <p><strong>Phone:</strong> {customer.phone}</p>
                        <button onClick={() => handleDelete(customer.id)}>Delete</button>
                        <button onClick={() => handleEdit(customer.id)}>Edit</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CustomerList;