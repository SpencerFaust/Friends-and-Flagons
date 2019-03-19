import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
// import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
});

class CreateGame extends Component {

    state = {
      gameName: '',
      maxPlayers: '',
      gameDescription: '',
      date: '',
      time: '',
      gameImage: '',
      discord: '',
      creator: this.props.user.id,
  };

  handleChange = (property) => (event) => {
    event.preventDefault();
    this.setState({
      ...this.state,
      [property]: event.target.value,
    });
  };

  handleSubmit = () => {
    console.log(this.state)
    if (this.state.gameName && this.state.maxPlayers && this.state.gameDescription && this.state.date && this.state.time && this.state.discord) {
      this.props.dispatch({ type: 'CREATE_GAME', payload: this.state })
    } else {
      alert('Please fill out all of the input boxes.')
    };
};

  render() {
  const { classes } = this.props;

  return (
    <form className={classes.container} noValidate autoComplete="off">
    
      <TextField
        id="filled-name"
        label="Game Name"
        className={classes.textField}
        value={this.state.gameName}
        onChange={this.handleChange('gameName')}
        margin="normal"
        variant="filled"
        helperText="What is your adventure called?"
      />

      <TextField
        id="filled-name"
        label="Discord Link"
        className={classes.textField}
        value={this.state.discord}
        onChange={this.handleChange('discord')}
        margin="normal"
        variant="filled"
        helperText="Make sure the link doesn't expire!"
      />
      
      <TextField
        id="filled-number"
        label="Maximum Players"
        value={this.state.maxPlayers}
        onChange={this.handleChange('maxPlayers')}
        type="number"
        className={classes.textField}
        margin="normal"
        variant="filled"
        helperText="How many players do you want?"
      />

      <TextField
        id="filled-date"
        label="Date"
        value={this.state.date}
        onChange={this.handleChange('date')}
        type="date"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        margin="normal"
        variant="filled"
        helperText="What date is your game?"
      />

      <TextField
        id="filled-time"
        label="Time"
        value={this.state.time}
        onChange={this.handleChange('time')}
        type="time"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        margin="normal"
        variant="filled"
        helperText="What time is your game?"
      />

        <br/>

      <TextField
        id="filled-multiline-flexible"
        label="Game Description"
        multiline
        fullWidth
        rowsMax="4"
        value={this.state.gameDescription}
        onChange={this.handleChange('gameDescription')}
        className={classes.textField}
        margin="normal"
        helperText="What can players expect?"
        variant="filled"
      />
      <Button onClick={this.handleSubmit}>Submit</Button>
    </form>
    )
  }
}

CreateGame.propTypes = {
  classes: PropTypes.object.isRequired,
};

const maptStateToProps = (reduxState) => {
  return reduxState;
};

export default connect(maptStateToProps)(withStyles(styles)(CreateGame));


// import React, { Component } from 'react';
// import { connect } from 'react-redux';

// class CreateGame extends Component {

//   state = {
//     gameName: '',
//     maxPlayers: '',
//     gameDescription: '',
//     date: '',
//     time: '',
//     gameImage: '',
//     discord: '',
//     creator: this.props.user.id,
//   };

//   handleInputChangeFor = (property) => (event) => {
//     event.preventDefault();
//     this.setState({
//       ...this.state,
//       [property]: event.target.value,
//     });
//   };

//   handleSubmit = () => {
//     this.props.dispatch({ type: 'CREATE_GAME', payload: this.state })
//   };

//   render() {
//     return (
//       <div>
//           <h1>Create a game</h1>
//           <div>
//             <label htmlFor="gameName">
//               Game Name:
//               <input
//                 type="text"
//                 name="gameName"
//                 value={this.state.gameName}
//                 onChange={this.handleInputChangeFor('gameName')}
//               />
//             </label>
//           </div>
//           <div>
//             <label htmlFor="maxPlayers">
//               Max Players:
//               <input
//                 type="number"
//                 name="maxPlayers"
//                 value={this.state.maxPlayers}
//                 onChange={this.handleInputChangeFor('maxPlayers')}
//               />
//             </label>
//           </div>
//           <div>
//             <label htmlFor="gameDescription">
//               Game Description:
//               <textarea
//                 type="text"
//                 name="gameDescription"
//                 value={this.state.gameDescription}
//                 onChange={this.handleInputChangeFor('gameDescription')}
//               />
//             </label>
//           </div>
//           <div>
//             <label htmlFor="date">
//               Date:
//               <input
//                 type="date"
//                 name="date"
//                 value={this.state.date}
//                 onChange={this.handleInputChangeFor('date')}
//               />
//             </label>
//           </div>
//           <div>
//             <label htmlFor="time">
//               Time:
//               <input
//                 type="time"
//                 name="time"
//                 value={this.state.time}
//                 onChange={this.handleInputChangeFor('time')}
//               />
//             </label>
//           </div>
//           <div>
//             <label htmlFor="gameImage">
//               Game Image:
//               <input
//                 type="text"
//                 name="gameImage"
//                 value={this.state.gameImage}
//                 onChange={this.handleInputChangeFor('gameImage')}
//               />
//             </label>
//           </div>
//           <div>
//             <label htmlFor="discord">
//               Discord Link:
//               <input
//                 type="text"
//                 name="discord"
//                 value={this.state.discord}
//                 onChange={this.handleInputChangeFor('discord')}
//               />
//             </label>
//           </div>
//           <button onClick={this.handleSubmit} >Create Game</button>
        
//       </div>
//     )
//   }
// }

// const maptStateToProps = (reduxState) => {
//   return reduxState;
// };

// export default connect(maptStateToProps)(CreateGame);