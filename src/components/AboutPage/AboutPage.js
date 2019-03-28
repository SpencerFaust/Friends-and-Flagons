import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typogaphy from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: 'white',
    backgroundColor: 'black',
    opacity: .75,
    },
  typog: {
    color: 'white',
    padding: 15,
  }
});

function AboutPage(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Grid container spacing={24}>
        <Grid item xs={0} sm={1} lg={2} xl={2}>
        </Grid>
        <Grid item xs={12} sm={10} lg={8} xl={8}>
          <Paper className={classes.paper}>
            <Typogaphy variant='h2' className={classes.typog}>Welcome!</Typogaphy>
            <Typogaphy variant='h4' className={classes.typog}>
              Hello and welcome to Friends & Flagons, the newest online community for table top roleplayers!
            </Typogaphy>
            <Typogaphy variant='h6' className={classes.typog}>
              Friends & Flagons' mission statement is to provide a space where table top roleplayers are able to find games to play or even create their own!
              Using the navigation at the top of the page you are able to view and sign up to participate in games, see more information about all the games you've signed up for or created, 
              create a new game and even access a game lobby when it's time to play! The in game lobby provides a chat feature as well as a die rolling method so everyone can see what a hot streak you're
              on! 
            </Typogaphy>
            <Typogaphy variant='h6' className={classes.typog}>
              Friends & Flagons is intended to be used with Discord or another web based voice service for communication. More integration to come!
            </Typogaphy>
          </Paper>
        </Grid>
        <Grid item xs={0} sm={1} lg={2} xl={2}>
        </Grid>
      </Grid>
    </div>
  );
}

AboutPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AboutPage);
