import React, { useState, useEffect } from 'react';
import {
  Paper, makeStyles
} from '@material-ui/core';
import { palette } from '../../config/GlobalStyle';
import { vinculateMedia, vinculateDataByIndex } from '../../helper/data';

import InputSearch from '../../components/Inputs/Search';
import ListMessages from './ListMessages';
import Conversation from './Conversation';

import listMessageMoch from '../../storage/listMessage.json';
import conversationsMoch from '../../storage/conversations.json';
import api from '../../services/api';

export default function Chat({ history }) {
  const [listMessageData, setlistMessageData] = useState([]);
  const [listContacts, setListContacts] = useState([]);
  const [contact, setContact] = useState({})
  const [conversation, setConversation] = useState();
  const classes = useStyles();

  function filerMessageBySearch(search) {
    const mountName = message => `${message.firstname} ${message.lastname}`
    const filterByName = message => mountName(message).toLowerCase().includes(search.toLowerCase())
    const dataFiltred = vinculateDataByIndex(listMessageMoch, listContacts).filter(filterByName)

    setlistMessageData(dataFiltred.sort(orderByTime));
  };

  function orderByTime(prev, next) {
    return new Date(next.time) - new Date(prev.time)
  };

  async function fetchData() {

    const response = await api.get('contacts');

    if (response.data.length) {
      const contacts = vinculateMedia(response.data);
      let result = vinculateDataByIndex(contacts, listMessageMoch).sort(orderByTime);

      setContact(result[0])
      setListContacts(contacts)
      setlistMessageData(result)
    }
  }

  useEffect(() => {
    if (listMessageData.length) {
      const { state } = history.location;
      const currentContact = state && state.contact ? state.contact : contact;
      const messages = vinculateDataByIndex(listMessageData, conversationsMoch);
      const currentMessage = messages.filter(item => item.email === currentContact.email)

      if (!currentMessage.length)
        return;

      if (state && state.contact)
        delete state.contact

      return setConversation(currentMessage[0]);
    } else
      fetchData();
  }, [contact, history.location.state]);

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
