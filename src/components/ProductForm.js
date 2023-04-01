import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../apiConfig';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { styled } from '@mui/system';

const Container = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
});

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  maxWidth: '400px',
  padding: theme.spacing(4),
  boxShadow: '0 0 5px rgba(0,0,0,0.1)',
  borderRadius: '8px',
}));

const ProductForm = () => {
  const [product, setProduct] = useState({
    name: '',
    type: '',
    price: 0,
  });

  const [productTypes, setProductTypes] = useState([]);

  useEffect(() => {
    const fetchProductTypes = async () => {
      const response = await axios.get(`${API_BASE_URL}?action=listProductTypes`);
      setProductTypes(response.data);
    };

    fetchProductTypes();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}?action=addProduct`, {
        name: product.name,
        product_type_id: product.type,
        price: product.price,
      });
      alert('Produto cadastrado com sucesso!');
      window.location.reload();
    } catch (error) {
      console.error('Erro ao cadastrar produto:', error);
      alert('Erro ao cadastrar produto!');
    }
  };

  return (
    <Container>
      <StyledBox component="form" onSubmit={handleSubmit}>
        <Typography variant="h4" component="h2" textAlign="center">
          Cadastrar Produto
        </Typography>

      <TextField
        id="name"
        label="Nome"
        value={product.name}
        onChange={(e) => setProduct({ ...product, name: e.target.value })}
        required
        fullWidth
      />

      <FormControl fullWidth required>
        <InputLabel id="product-type-label">Tipo</InputLabel>
        <Select
          labelId="product-type-label"
          id="product-type"
          value={product.type}
          label="Tipo"
          onChange={(e) => setProduct({ ...product, type: e.target.value })}
        >
          {productTypes.map((type) => (
            <MenuItem key={type.id} value={type.id}>
              {type.type_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        id="price"
        label="Preço"
        value={product.price}
        onChange={(e) => setProduct({ ...product, price: e.target.value })}
        required
        type="number"
        InputProps={{ inputProps: { min: 0, step: 0.01 } }}
        fullWidth
      />

      <Button type="submit" variant="contained" color="primary">
        Cadastrar
      </Button>
      </StyledBox>
    </Container>
  );
};

export default ProductForm;
