import React, { Component } from 'react';
import { connect } from 'react-redux';
import GameItem from '../GameItem/GameItem';


// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
class MyGames extends Component {

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_MY_GAME'})
  }

  render() {

    console.log(this.props)
    return(
        <div>
          This is the Games Page where the list of  my games will go. <br/>

          {this.props.game.map(game => 
            <GameItem game={game} key={game.id} />
          )}
        </div>
      );
    }
  }
// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = reduxState => {
  return reduxState;
};

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(MyGames);