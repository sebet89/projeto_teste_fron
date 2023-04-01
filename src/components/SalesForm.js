import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../apiConfig';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Container,
  Paper,
  Box,
  ListItem,
  List,
} from '@mui/material';
import { styled } from '@mui/system';

const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  marginRight: theme.spacing(1),
  minWidth: 120,
}));

function SalesForm() {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [saleItems, setSaleItems] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}?action=listProducts`);
        setProducts(response.data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddItem = () => {
    const selectedProduct = products.find((product) => product.id === productId);

    if (selectedProduct) {
      setSaleItems([...saleItems, { ...selectedProduct, quantity: Number(quantity) }]);
      setProductId('');
      setQuantity('');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post(`${API_BASE_URL}?action=addSale`, { sale_items: saleItems });
      setSaleItems([]);
      alert('Venda cadastrada com sucesso!');
      //window.location.reload();
    } catch (error) {
      console.error('Erro ao cadastrar venda:', error);
      alert('Erro ao cadastrar venda!');
    }
  };

  return (
    <StyledContainer>
      <StyledPaper>
        <Typography variant="h4" component="h2">
          Cadastro de Venda
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <StyledFormControl>
            <InputLabel>Produto</InputLabel>
            <Select
              value={productId}
              onChange={(event) => setProductId(event.target.value)}
            >
              {products.map((product) => (
                <MenuItem key={product.id} value={product.id}>
                  {product.product_name}
                </MenuItem>
              ))}
            </Select>
          </StyledFormControl>
          <TextField
            label="Quantidade"
            type="number"
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
            sx={{ marginRight: 1 }}
          />
          <Button onClick={handleAddItem} variant="contained" color="primary">
            Adicionar Item
          </Button>
          <Typography variant="h6" component="h3" sx={{ marginTop: 2 }}>
            Itens da venda:
          </Typography>
          <List>
            {saleItems.map((item, index) => (
              <ListItem key={index}>
                {item.product_name} - {item.quantity} unidade(s)
              </ListItem>
            ))}
          </List>
          <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
            Cadastrar Venda
          </Button>
        </Box>
      </StyledPaper>
    </StyledContainer>
  );
}

export default SalesForm
