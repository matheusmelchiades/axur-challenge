import React, { useState, useEffect } from 'react';
import {
  Paper, makeStyles, Avatar, Typography,
} from '@material-ui/core';
import { palette } from '../../config/GlobalStyle';
import Input from '../../components/Inputs/SendMessage';
import moment from 'moment';

export default function Conversation({ data, contact }) {
  const [messages, setMessages] = useState([]);
  const classes = useStyle();

  const newMessage = (content) => {
    return { owner: true, time: new Date(), content }
  }

  useEffect(() => {
    const checkMessages = data && data.messages && data.messages.length

    if (!checkMessages)
      return;

    setMessages(data.messages)
  }, [data])

  return (
    <Paper className={classes.conversationContainer} elevation={4}>
      <div className={classes.messagesContent}>

        {/* MESSAGES */}
        {
          messages.map((message, index) => (
            <div key={index} className={classes.messageContainer}>
              <div className={classes.avatarContent}>
                {
                  !message.owner &&
                  <Avatar className={classes.avatar} src={contact.avatar.urlMedium} />
                }
                {
                  !message.owner &&
                  <Typography className={classes.time} color="textSecondary" gutterBottom>
                    {moment(message.time).format('h:mm')}
                  </Typography>
                }
              </div>

              <Paper className={`${classes.message} ${message.owner ? classes.styleOwner : ''}`} elevation={4}>
                <Typography color="textSecondary" gutterBottom>
                  {message.content}
                </Typography>
              </Paper>
            </div>
          ))
        }
      </div>
      <Input onSend={value => setMessages([...messages, newMessage(value)])} />
    </Paper>
  );
}


const useStyle = makeStyles(theme => ({
  conversationContainer: {
    height: '75vh',
    width: '65%',
    borderRadius: 30,
    backgroundColor: palette.colors.purple,
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
  },
  messagesContent: {
    height: '100%',
    overflow: 'auto'
  },
  messageContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  avatarContent: {},
  time: {
    marginLeft: '30%'
  },
  avatar: {
    width: 70,
    height: 70,
    margin: theme.spacing(1),
  },
  message: {
    width: '60%',
    margin: theme.spacing(2),
    borderRadius: 20,
    padding: '3%',
    backgroundColor: palette.colors.purpleDark
  },
  styleOwner: {
    marginLeft: '40%',
    backgroundColor: palette.colors.orange
  }
}))
