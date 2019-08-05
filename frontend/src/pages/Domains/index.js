import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import {
  Table, Paper, TableHead, TableBody,
  TableRow, TableCell, CircularProgress, Container,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { palette } from '../../config/GlobalStyle';
import InputSearch from '../../components/Inputs/Search';

export default function Domains() {
  const [domains, setDomains] = useState([]);
  const [domainsView, setDomainsView] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const classes = useStyle();

  async function fetchData() {
    try {
      const { data } = await api.get('contacts/domains');

      if (!data.length)
        return [];

      setDomains(data);
      setDomainsView(data);
      setIsLoading(true);
    } catch (err) {
      console.log('Erro get domains');
    }
  }

  useEffect(__ => {
    fetchData()
  }, [])

  function handlerSearch(text) {
    const filterData = (item) => item.domain.includes(text)
    const dataFiltred = domainsView.filter(filterData)

    setDomains(dataFiltred)
  }

  return (
    <Container className={classes.root}>
      {
        !isLoading ?
          <CircularProgress className={classes.loader} />
          :
          <React.Fragment>
            <Paper className={classes.inputContainer}>
              <InputSearch onChange={handlerSearch} />
            </Paper>

            <Paper className={classes.table} elevation={4}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">
                      <Typography variant="h3" component="h3" gutterBottom>
                        Dominio
                    </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="h3" component="h3" gutterBottom>
                        Quantidade
                    </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    domains.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell align="center">
                          <Typography>
                            {item.domain}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography>
                            {item.quantity}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))
                  }
                </TableBody>
              </Table>
            </Paper>
          </React.Fragment>
      }
    </Container>
  );
}


const useStyle = makeStyles(theme => ({
  root: {
    marginTop: '5%'
  },
  table: {
    borderRadius: 20,
    margin: theme.spacing(2),
    backgroundColor: palette.colors.purple
  },
  loader: {
    marginTop: '30%',
    marginLeft: '48%',
    color: palette.colors.orange
  },
  inputContainer: {
    borderRadius: 60,
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    backgroundColor: palette.colors.purple
  }
}));
