import React from 'react';
import GlobalStyle from '../config/GlobalStyle';
import Header from '../components/Header';
import Contacts from '../pages/Contacts/index';
import {
  CssBaseline, makeStyles, MuiThemeProvider,
} from '@material-ui/core';

const App = () => {
  const classes = useStyles();

  return (
    <MuiThemeProvider theme={GlobalStyle}>
      <CssBaseline />
      <div className={classes.root}>
        <Header />
        <Contacts />
      </div>
    </MuiThemeProvider>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    // background: palette.colors.purpleDark,
  }
}))

export default App;
