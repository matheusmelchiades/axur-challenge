import React, { useState, useEffect } from 'react'
import { palette } from '../../config/GlobalStyle';
import {
  makeStyles, Typography,
  Tabs, Tab, IconButton,
} from '@material-ui/core';
import { Search, NotificationsOutlined } from '@material-ui/icons'
import { withRouter } from 'react-router-dom';

import LogoImg from '../../assets/logo.png'
import menusDB from '../../storage/menus.json'

const Header = ({ history }) => {
  const [menus] = useState(menusDB)
  const [indexTab, setIndexTab] = useState(2)
  const classes = useStyles();

  useEffect(() => {
    const currentPath = history.location.pathname;
    const indexMenu = menus.findIndex(menu => menu.path === currentPath);

    setIndexTab(indexMenu);
  })

  return (
    <div className={`${classes.setRowDirection} ${classes.toolBar}`} >
      <div className={`${classes.setRowDirection} ${classes.logoContainer}`}>
        <img className={classes.LogoImg} src={LogoImg} alt="logo" />

        <Typography className={classes.logoTitle} classvariant="h2" noWrap>
          Chat
        </Typography>
      </div>

      <div className={classes.setRowDirection}>
        <Tabs value={indexTab}
          onChange={(_, value) => setIndexTab(value)}>
          {
            menus.map((menu, index) => (
              <Tab disableRipple className={classes.tab} key={index} label={menu.label || ''}
                onClick={() => history.push(menu.path)} />
            ))
          }
        </Tabs>

        <IconButton>
          <Search />
        </IconButton>

        <IconButton>
          <NotificationsOutlined />
        </IconButton>
      </div>
    </div>
  );
};

const useStyles = makeStyles(theme => ({
  setRowDirection: {
    display: 'flex',
    flexDirection: 'row',
  },
  toolBar: {
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: palette.colors.purpleDark,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
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

export default withRouter(Header);
