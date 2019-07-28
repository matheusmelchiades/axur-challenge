import React, { useState } from 'react';
import { palette } from '../../config/GlobalStyle';
import { makeStyles, Input, IconButton } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import DocIcon from '@material-ui/icons/AttachFile';
import EmojiIcon from '@material-ui/icons/SentimentSatisfied';

export default function Inputs({ onChange, onSend }) {
  const [input, setInput] = useState('');
  const classes = useStyle();

  const handlerInput = (e) => {
    if (onChange)
      onChange(e.target.value)

    setInput(e.target.value)
  };

  const sendValue = (e) => {
    if (!onSend) return;

    onSend(e.target.value)
    setInput('')
  };

  return (
    <div className={classes.inputContent}>
      <Input value={input} className={classes.input} disableUnderline
        placeholder="Type in here..." fullWidth
        startAdornment={
          <IconButton color="inherit">
            <EmojiIcon />
          </IconButton>
        }
        endAdornment={
          <IconButton color="inherit">
            <DocIcon />
          </IconButton>
        }
        onChange={handlerInput}
        onKeyDown={e => e.keyCode === 13 ? sendValue(e) : false}
      />
      <IconButton className={classes.button}
        onClick={sendValue}>
        <SendIcon />
      </IconButton>
    </div>
  );
}

const useStyle = makeStyles(theme => ({
  inputContent: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: theme.spacing(2),
  },
  input: {
    width: '100%',
    borderRadius: 80,
    color: 'black',
    backgroundColor: '#fff',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1)
  },
  button: {
    marginLeft: theme.spacing(2),
    backgroundColor: palette.colors.greenSmoke
  }
}));
