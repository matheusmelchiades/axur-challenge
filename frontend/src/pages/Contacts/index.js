import React, { useState, useEffect } from 'react';
import { palette } from '../../config/GlobalStyle';
import {
  Container, Card, Grid, CardContent,
  IconButton, Avatar, makeStyles, Divider, Typography
} from '@material-ui/core';
import {
  Call, Email, Forum as Chat, MoreHoriz,
} from '@material-ui/icons';
import { vinculateDataByIndex } from '../../helper/data';
import mediaData from '../../storage/media.json';
import api from '../../services/api';
import { type } from 'os';

const Contacts = () => {
  const [data, setData] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    async function fetchData() {
      const response = await api.get('contacts');

      if (!response.data.length) return;

      const vinculated = vinculateDataByIndex(response.data, mediaData)

      setData(vinculated)

    }

    fetchData();
  }, []);

  return (
    <Container className={classes.root}>
      <Grid container spacing={4}>
        {
          data.map((contact, index) => (
            <Grid key={index} item xs={6} sm={3} >
              <Card className={classes.card}>

                <div className={classes.cardHeader}>
                  <IconButton>
                    <MoreHoriz className={classes.colorCard} />
                  </IconButton>
                </div>

                <CardContent className={classes.cardContent}>
                  <Avatar className={classes.cardAvatar}
                    src={contact.image.urlLarge || ''} />

                  <Typography className={classes.name} variant="h6">
                    {contact.firstname} {contact.lastname}
                  </Typography>

                  <Typography className={classes.email} variant="subtitle1">
                    {contact.email}
                  </Typography>
                </CardContent>

                <Divider className={classes.divider} />

                <div className={classes.contentActions}>
                  <IconButton>
                    <Call className={classes.colorCard} />
                  </IconButton>
                  <IconButton>
                    <Email className={classes.colorCard} />
                  </IconButton>
                  <IconButton>
                    <Chat className={classes.colorCard} />
                  </IconButton>
                </div>

              </Card>
            </Grid>
          ))
        }
      </Grid>
    </Container>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: '3%'
    // background: palette.colors.purpleDark,
  },

  card: {
    backgroundColor: palette.colors.purple,
    borderRadius: 10,
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  name: {
    fontWeight: 'bold',
  },
  email: {
    fontWeight: 200,
  },
  cardAvatar: {
    height: 150,
    width: 150,
    marginBottom: theme.spacing(2)
  },
  divider: {
    marginLeft: '10%',
    width: '80%',
    backgroundColor: palette.colors.purpleDark
  },
  contentActions: {
    display: 'flex',
    justifyContent: 'center',
    padding: 5
  },
  colorCard: {
    color: '#f57c00',
  }
}))

export default Contacts;
