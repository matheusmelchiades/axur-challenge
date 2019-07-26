import React from 'react';
import GlobalStyle from '../config/GlobalStyle';
import {
  CssBaseline, makeStyles, MuiThemeProvider,
} from '@material-ui/core';
import { Route, Redirect } from 'react-router-dom';

import Header from '../components/Header';
import Contacts from '../pages/Contacts/index';
import Chat from '../pages/Chat';

const App = () => {
  const classes = useStyles();

  return (
    <MuiThemeProvider theme={GlobalStyle}>
      <CssBaseline />
      <div className={classes.root}>
        <Header />
        <Route path="/contacts" component={Contacts} />
        <Route path="/messages" component={Chat} />
        <Redirect from="*" to="home" />
      </div>
    </MuiThemeProvider>
  );
}

const useStyles = makeStyles(() => ({
  root: {
    padding: '1%',
    paddingLeft: '3%',
    paddingRight: '3%'
  }
}))

export default App;
