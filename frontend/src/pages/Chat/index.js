import React, { useState, useEffect } from 'react';
import {
  Paper, makeStyles
} from '@material-ui/core';
import { palette } from '../../config/GlobalStyle';

import InputSearch from '../../components/Inputs/Search';
import ListMessages from './ListMessages';
import Conversation from './Conversation';

import listMessageMoch from '../../storage/listMessage.json';
import conversationsMoch from '../../storage/conversations.json';

export default function Chat() {
  const [listMessageData, setlistMessageData] = useState(listMessageMoch);
  const [contact, setContact] = useState(listMessageMoch[0])
  const [conversation, setConversation] = useState(conversationsMoch);
  const classes = useStyles();

  const filerMessageBySearch = (search) => {
    const filterByName = message => message.name.toLowerCase().includes(search.toLowerCase())
    const dataFiltred = listMessageMoch.filter(filterByName)

    setlistMessageData(dataFiltred);
  };

  /** GET MESSAGES BY CONTACT ID */
  useEffect(() => {
    const filterById = (conversation) => conversation.contact_id === contact.id
    const conversationsFiltred = conversationsMoch.filter(filterById)

    if (conversationsFiltred.length)
      return setConversation(conversationsFiltred[0])

    setConversation({})
  }, [contact]);

  return (
    <div className={classes.root}>
      <div className={classes.toolBar}>
        <Paper className={classes.searchCard} elevation={4}>
          <InputSearch onChange={filerMessageBySearch} />
        </Paper>
      </div>
      <div className={classes.contentChat}>
        <ListMessages data={listMessageData}
          onSelect={setContact} />

        <Conversation contact={contact}
          data={conversation} />
      </div>
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: '3%'
  },
  toolBar: {
    display: 'flex'
  },
  contentChat: {
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between'
  },
  searchCard: {
    marginBottom: theme.spacing(3),
    height: '6vh',
    width: '30%',
    borderRadius: 30,
    backgroundColor: palette.colors.purple,
    padding: theme.spacing(1),
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(3),
  }
}));
