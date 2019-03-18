import React, { Component } from 'react';
import { connect } from 'react-redux';

class CreateGame extends Component {

  state = {
    gameName: '',
    maxPlayers: '',
    gameDescription: '',
    date: '',
    time: '',
    gameImage: '',
    discord: '',
  };

  handleInputChangeFor = (property) => (event) => {
    event.preventDefault();
    this.setState({
      ...this.state,
      [property]: event.target.value,
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.registerUser}>
          <h1>Create a game</h1>
          <div>
            <label htmlFor="gameName">
              Game Name:
              <input
                type="text"
                name="gameName"
                value={this.state.gameName}
                onChange={this.handleInputChangeFor('gameName')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="maxPlayers">
              Max Players:
              <input
                type="number"
                name="maxPlayers"
                value={this.state.maxPlayers}
                onChange={this.handleInputChangeFor('maxPlayers')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="gameDescription">
              Game Description:
              <textarea
                type="text"
                name="gameDescription"
                value={this.state.gameDescription}
                onChange={this.handleInputChangeFor('gameDescription')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="date">
              Date:
              <input
                type="date"
                name="date"
                value={this.state.date}
                onChange={this.handleInputChangeFor('date')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="time">
              Time:
              <input
                type="time"
                name="time"
                value={this.state.time}
                onChange={this.handleInputChangeFor('time')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="gameImage">
              Game Name:
              <input
                type="text"
                name="gameImage"
                value={this.state.gameImage}
                onChange={this.handleInputChangeFor('gameImage')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="discord">
              Game Name:
              <input
                type="text"
                name="discord"
                value={this.state.discord}
                onChange={this.handleInputChangeFor('discord')}
              />
            </label>
          </div>
          <div>
              <input type="submit"/>
          </div>
        </form>
      </div>
    )
  }
}

const maptStateToProps = (reduxState) => {
  return reduxState;
};

export default connect(maptStateToProps)(CreateGame);