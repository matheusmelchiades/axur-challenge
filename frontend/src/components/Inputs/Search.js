import React, { useState } from 'react';
import { Input, InputAdornment, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search'
import CloseIcon from '@material-ui/icons/Close'

export default function Search(props) {
  const [input, setInput] = useState('');

  const handleClearInput = () => {
    if (props.onChange)
      props.onChange('')
    setInput('')
  };

  const handleChangeInput = (e) => {
    if (props.onChange)
      props.onChange(e.target.value)
    setInput(e.target.value)
  };

  return (
    <Input label="search" value={input}
      placeholder="Search" disableUnderline fullWidth
      startAdornment={
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      }
      endAdornment={
        input &&
        <InputAdornment position="end">
          <IconButton
            onClick={handleClearInput}
          >
            <CloseIcon />
          </IconButton>
        </InputAdornment>
      }
      onChange={handleChangeInput}
    />
  );
}
