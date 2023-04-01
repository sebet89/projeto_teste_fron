import React, { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../apiConfig';
import { Box, Button, TextField, Typography } from '@mui/material';
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

function ProductTypeForm() {
  const [typeName, setTypeName] = useState('');
  const [taxPercentage, setTaxPercentage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}?action=addProductType`, {
        name: typeName,
        tax_percentage: taxPercentage,
      });
      setTypeName('');
      setTaxPercentage('');
      alert('Tipo de produto cadastrado com sucesso!');
      window.location.reload();
    } catch (error) {
      console.error('Erro ao cadastrar tipo de produto:', error);
      alert('Erro ao cadastrar tipo de produto!');
    }
  };

  return (
    <Container>
      <StyledBox component="form" onSubmit={handleSubmit}>
        <Typography variant="h4" component="h2" textAlign="center">
          Cadastro de Tipo de Produto
        </Typography>

        <TextField
          label="Nome do Tipo de Produto"
          value={typeName}
          onChange={(event) => setTypeName(event.target.value)}
          required
          fullWidth
        />
        <TextField
          label="Porcentagem de Imposto"
          type="number"
          value={taxPercentage}
          onChange={(event) => setTaxPercentage(event.target.value)}
          required
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary">
          Cadastrar Tipo de Produto
        </Button>
      </StyledBox>
    </Container>
  );
}

export default ProductTypeForm;