import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../apiConfig';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Container,
  Paper,
} from '@mui/material';
import { styled } from '@mui/system';

const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const SalesList = () => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const fetchSales = async () => {
      const response = await axios.get(`${API_BASE_URL}?action=listSales`);
      const salesData = response.data.map((sale) => {
        return {
          ...sale,
          total: parseFloat(sale.total),
          total_taxes: parseFloat(sale.total_taxes),
        };
      });
      setSales(salesData);
    };

    fetchSales();
  }, []);

  return (
    <StyledContainer>
      <StyledPaper>
        <Typography variant="h4" component="h2">
          Vendas Realizadas
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID da Venda</TableCell>
                <TableCell>Itens</TableCell>
                <TableCell>Total da Venda</TableCell>
                <TableCell>Total de Impostos</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sales.map((sale) => (
                <TableRow key={sale.sale_id}>
                  <TableCell>{sale.sale_id}</TableCell>
                  <TableCell>
                    {sale.items.map((item, index) => (
                      <Typography key={index} variant="body2">
                        {item.name} - {item.quantity} unidade(s)
                      </Typography>
                    ))}
                  </TableCell>
                  <TableCell>R$ {sale.total?.toFixed(2)}</TableCell>
                  <TableCell>R$ {sale.total_taxes?.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </StyledPaper>
    </StyledContainer>
  );
}

export default SalesList;
