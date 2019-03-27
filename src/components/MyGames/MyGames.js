import React, { Component } from 'react';
import { connect } from 'react-redux';
import GameItem from '../GameItem/GameItem';
import Grid from '@material-ui/core/Grid';

class MyGames extends Component {

  componentWillMount() {
    this.props.dispatch({ type: 'FETCH_MY_GAME'})
  }

  leaveGame =(userId, gameId) => {
    this.props.dispatch({ type: 'LEAVE_GAME', payload: {id: userId, game: gameId } })
  }

  render() {

    console.log('My games log', this.props.game)
    return(
      <Grid container spacing={24}>
        {this.props.game.map(game => 
          <GameItem game={game} key={game.id} mygames={true} leaveGame={this.leaveGame} user={this.props.user.id} />
        )}
      </Grid>
      );
    }
  }

const mapStateToProps = reduxState => {
  return reduxState;
};

export default connect(mapStateToProps)(MyGames);