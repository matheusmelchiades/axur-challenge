import React, { useState } from 'react'
import palette from '../../config/palette';
import {
  Toolbar, makeStyles, Typography,
  Tabs, Tab,
} from '@material-ui/core';
import LogoImg from '../../assets/logo.png'

const Header = () => {
  const [menus] = useState(['HOME', 'CHAT', 'CONTACTS', 'SETTINGS'])
  const [indexTab, setIndexTab] = useState(2)
  const classes = useStyles();

  return (
    <Toolbar className={classes.toolBar} >
      <div className={classes.logoContainer}>
        <img className={classes.LogoImg} src={LogoImg} alt="logo" />

        <Typography className={classes.logoTitle} classvariant="h2" noWrap>
          Chat
        </Typography>
      </div>

      <Tabs value={indexTab}
        onChange={(_, value) => setIndexTab(value)}>
        {
          menus.map((menu, index) => (
            <Tab className={classes.tab} key={index} label={menu} />
          ))
        }
      </Tabs>


    </Toolbar>
  );
};

const useStyles = makeStyles(theme => ({
  toolBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: palette.colors.purpleDark,
    padding: 0,
    paddingLeft: '2%',
  },
  logoContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoImg: {
    height: 'auto',
    width: '100%',
  },
  logoTitle: {
    marginLeft: theme.spacing(2),
    fontSize: 32,
    color: 'whitesmoke',
    alignSelf: 'center',
  },
  tab: {
    color: 'whitesmoke',
    fontWeight: 'bold',
    borderRadius: 3
  }
}));

export default Header;
