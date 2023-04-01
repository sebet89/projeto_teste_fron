import React from 'react';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import ProductTypeForm from './components/ProductTypeForm';
import SalesForm from './components/SalesForm';
import SalesList from './components/SalesList';

function App() {
  return (
    <div>
      <h1>Projeto Mercado</h1>
      <ProductTypeForm />
      <ProductForm />
      <ProductList />
      <SalesForm />
      <SalesList />
    </div>
  );
}

export default App;
