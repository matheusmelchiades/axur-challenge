import React from 'react';
import palette from '../config/palette';
import Header from '../components/Header';
import {
  CssBaseline, makeStyles, Container, Card,
  Grid, CardContent, CardActions, IconButton,
} from '@material-ui/core';
import {
  Call, Email, Forum as Chat, MoreHoriz
} from '@material-ui/icons';


const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header />
      <Container>
        <Grid container spacing={4}>
          {
            Array(12).fill({ name: 'test' }).map((card, index) => (
              <Grid key={index} item xs={3}>
                <Card className={classes.card}>
                  <CardActions >
                    <IconButton>
                      <MoreHoriz />
                    </IconButton>
                  </CardActions>

                  <CardContent >
                    {card.name}
                  </CardContent>


                  <CardActions>
                    <IconButton>
                      <Call />
                    </IconButton>
                    <IconButton>
                      <Email />
                    </IconButton>
                    <IconButton>
                      <Chat />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))
          }
        </Grid>
      </Container>
    </div>
  );
}

const useStyles = makeStyles(() => ({
  root: {
    background: palette.colors.purpleDark,
    height: '100vh',
  },

  card: {
    backgroundColor: palette.colors.purple
  }

}))

export default App;
