import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import openSocket from 'socket.io-client';
import axios from 'axios';

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

    state = {
      visitors: [
        {
          ip: '',
          city: '',
          state: '',
        }
      ],
      gameInfo: {},
    };

    roster = () => this.props.game.map(player => player.player_id);
 
    componentWillMount() { 
      const socket = openSocket('http://localhost:3000/lobby/' + this.props.match.params.id);
      console.log('Socket is:', socket)
      axios.get('http://geoplugin.net/json.gp').then((res => {
        console.log('res.data results', res.data)
        const {
          geoplugin_request,
          geoplugin_city,
          geoplugin_regionName,
        } = res.data;

        const visitor = {
          ip: geoplugin_request,
          city: geoplugin_city,
          state: geoplugin_regionName,
        }

        console.log('Visitor:', visitor)

        socket.emit('new_visitor', visitor);

        socket.on('visitors', visitors => {
          this.setState({
            ...this.state,
            visitors: visitors,
          })
        })
      }));
    }; 


    componentDidMount() { 
      this.props.dispatch({ type: `FETCH_LOBBY_GAME`, payload: this.props.match.params.id})
    };

    usersHere = () => {
      const {visitors} = this.state;
      return visitors.map((v, i) => {
        return <p>{v.geoplugin_request}</p>
      });
    };

    render() {
        const { classes } = this.props;

        console.log('GAME INFO:', this.props.game)
        
        return (
            <div className={classes.root}>
        <Grid container spacing={24}>
            <Grid item xs={12}>
            <Paper className={classes.paper}><input type="text" /><button onClick={this.handleSubmit}>Submit</button></Paper>
            </Grid>
            <Grid item xs={2}>
            </Grid>
            <Grid item xs={8}>
            <Paper className={classes.paper} style={{color: 'blue'}}>{JSON.stringify(this.state.visitors)}</Paper>
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