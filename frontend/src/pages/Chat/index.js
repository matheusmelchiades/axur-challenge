import React from 'react';
import { makeStyles } from '@material-ui/core';
import {
  Card
} from '@material-ui/core'
import { palette } from '../../config/GlobalStyle';


export default function Chat() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.toolBar}>
        <Card className={classes.search}>
          Search
        </Card>
        TOOLS
      </div>
      <div className={classes.contentChat}>
        <Card className={classes.messagesContainer}>
          messages
        </Card>
        <Card className={classes.conversationContainer}>
          CHAT
        </Card>
      </div>
    </div>
  );
}

const useStyles = makeStyles(() => ({
  root: {
    paddingTop: '3%'
  },
  toolBar: {
    display: 'flex'
  },
  contentChat: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  search: {
    height: '100%',
    width: '30%',
    borderRadius: 30,
    backgroundColor: palette.colors.purple
  },
  messagesContainer: {
    // height: '100%',
    width: '30%',
    height: '80vh',
    borderRadius: 30,
    backgroundColor: palette.colors.purple
  },
  conversationContainer: {
    height: '80vh',
    width: '65%',
    borderRadius: 30,
    backgroundColor: palette.colors.purple
  },
}));
