import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      color: theme.palette.text.secondary,
      backgroundColor: 'red',
    },
  });

class Lobby extends Component {

    componentDidMount() {

    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
        <Grid container spacing={24}>
            <Grid item xs={12}>
            <Paper className={classes.paper}>xs=12</Paper>
            </Grid>
            <Grid item xs={2}>
            </Grid>
            <Grid item xs={8}>
            <Paper className={classes.paper} style={{color: 'blue'}}>xs=6</Paper>
            </Grid>
            <Grid item xs={2}>
            <Paper className={classes.paper}>xs=3</Paper>
            </Grid>
        </Grid>
        </div>
    );
    }
}

Lobby.propTypes = {
    classes: PropTypes.object.isRequired,
  };

const mapStateToProps = reduxState => {
    return reduxState;
};

export default connect(mapStateToProps)(withStyles(styles)(Lobby));