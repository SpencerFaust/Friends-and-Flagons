import React, { Component } from 'react';
import { connect } from 'react-redux';
import GameItem from '../GameItem/GameItem';
import Grid from '@material-ui/core/Grid';

class Games extends Component {

  componentWillMount() {
    this.props.dispatch({ type: 'FETCH_GAME', payload: this.props.user.id})
  }

  addGame = (userId, gameId) => {
    console.log('Dispatch hit with ID and Game ID:', userId, gameId)
    this.props.dispatch({ type: 'JOIN_GAME', payload: {id: userId, game: gameId } })
  }

  render() {
    return(
      <>
      <Grid container spacing={24}>
        {this.props.game.map(game => 
          <GameItem game={game} key={game.id} user={this.props.user.id} joinGame={this.addGame} />
        )}
      </Grid>
      </>
      );
    }
  }

const mapStateToProps = reduxState => {
  return reduxState;
};

export default connect(mapStateToProps)(Games);
