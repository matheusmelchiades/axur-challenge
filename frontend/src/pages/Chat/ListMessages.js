import React from 'react';
import {
  Paper, makeStyles, Avatar, Divider, Typography
} from '@material-ui/core';
import { palette } from '../../config/GlobalStyle';
import moment from 'moment';

export default function ListMessages({ data = [], onSelect }) {
  const classes = useStyles();

  const handleSelect = (selected) => {
    data = data.map(item => item.id === selected.id ? ({ ...item, selected: true }) : item)

    if (onSelect)
      onSelect(selected)
  }

  const orderByTime = (prev, next) => {
    return new Date(next.time) - new Date(prev.time)
  }

  return (
    <Paper className={classes.root} elevation={4}>
      {
        data.sort(orderByTime).map((message, index) => {
          const classSelect = message.selected ? classes.selected : '';

          return (
            <div key={message.id} className={`${classes.containerMessage} ${classSelect}`}
              onClick={() => handleSelect(message)}>
              <div className={classes.content}>

                <Avatar className={classes.avatar}
                  src={message.avatar.urlMedium} />

                <div className={classes.contentData}>
                  <div className={classes.contentName} >
                    <Typography variant="h5" component="h2">
                      {message.name}
                    </Typography>
                  </div>

                  <div className={classes.contentText}>
                    <Typography color="textSecondary" gutterBottom>
                      {message.content.slice(0, 40)}...
                    </Typography>
                  </div>
                </div>

                <div className={classes.time}>
                  <Typography color="textSecondary" gutterBottom>
                    {moment(message.time).format('h:mm')}
                  </Typography>
                </div>
              </div>

              {
                index < (data.length - 1) &&
                <Divider className={classes.divider} />
              }
            </div>
          )
        })
      }
    </Paper>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    height: '75vh',
    width: '30%',
    borderRadius: 30,
    backgroundColor: palette.colors.purple,
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    overflow: 'auto'
  },
  containerMessage: {
    marginBottom: theme.spacing(2),
    '&:hover': {
      backgroundColor: palette.colors.purpleLight,
      color: '#000',
    }
  },
  selected: {
    backgroundColor: palette.colors.purpleLight,
    color: '#000',
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  avatar: {
    marginLeft: theme.spacing(3),
    width: 75,
    height: 75
  },
  contentData: {
    marginLeft: '3%',
    width: '100%',
    justifyContent: 'space-between'
  },
  contentName: {
    fontSize: 20,
    fontWeight: 550
  },
  contentText: {
    fontSize: 17,
  },
  time: {
    marginRight: theme.spacing(3),
  },
  divider: {
    marginLeft: '21%',
    width: '75%',
    backgroundColor: palette.colors.purpleDark,
    opacity: 10
  },
  '@global': {
    '*::-webkit-scrollbar': {
      width: '0.4em',
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      outline: '1px solid slategrey'
    }
  }
}));
