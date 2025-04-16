import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductListComponent from './components/products/ProductListComponent';
import AddProductComponent from './components/products/AddProductComponent';
import UpdateProductComponent from './components/products/UpdateProductComponent';
import CategoryList from './components/categories/CategoryList';
import CustomerList from './components/customers/CustomerList';
const App = () => {
    return (
        <Router>
            <div className="container">
                <nav>
                    <ul>
                        <li><Link to="/products">Products</Link></li>
                        <li><Link to="/categories">Categories</Link></li>
                        <li><Link to="/customers">Customers</Link></li>
                    </ul>
                </nav>
                <hr />
                <Routes>
                    <Route path="/" element={<ProductListComponent />} />
                    <Route path="/products" element={<ProductListComponent />} />
                    <Route path="/add-product" element={<AddProductComponent />} />
                    <Route path="/update-product/:id" element={<UpdateProductComponent />} />
                    <Route path="/products" element={<ProductList />} />
                    <Route path="/categories" element={<CategoryList />} />
                    {/* Adicione rotas para CategoryForm, CustomerList, CustomerForm */}
                    <Route path="/customers" element={<CustomerList />} />
                </Routes>
            </div>
        </Router>
    );
}