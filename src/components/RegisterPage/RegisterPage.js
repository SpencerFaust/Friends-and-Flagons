import React, { Component } from 'react';
import {connect} from 'react-redux';

import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

// const styles = theme => ({
//   root: {
//     flexGrow: 1,
//   },
//   paper: {
//     padding: theme.spacing.unit * 2,
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
//   },
// });

class RegisterPage extends Component {
  state = {
    username: '',
    password: '',
    email: '',
    age: '',
    bio: '',
    image: '',
    open: false,
  };

  handleOpen = () => {
    this.setState({ 
      ...this.state,
      open: true });
  };

  handleClose = () => {
    this.setState({ 
      ...this.state,
      open: false });
  };

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password && this.state.email && this.state.age && this.state.bio && this.state.image ) {
      this.props.dispatch({
        type: 'REGISTER',
        payload: {
          username: this.state.username,
          password: this.state.password,
          email: this.state.email,
          age: this.state.age,
          bio: this.state.bio,
          image: this.state.image,
        },
      });
    } else {
      this.props.dispatch({type: 'REGISTRATION_INPUT_ERROR'});
    }
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {

    const { classes } = this.props;
    
    return (
      <div>
        {this.props.errors.registrationMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.registrationMessage}
          </h2>
        )}
        
        <form onSubmit={this.registerUser}>
          <h1>Register User</h1>
          <div>
            <label htmlFor="username">
              Username:
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleInputChangeFor('username')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="password">
              Password:
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="email">
              Email:
              <input
                type="text"
                name="email"
                value={this.state.email}
                onChange={this.handleInputChangeFor('email')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="age">
              Age Range:
              <input
                type="text"
                name="age"
                value={this.state.age}
                onChange={this.handleInputChangeFor('age')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="bio">
              Bio:
              <input
                type="text"
                name="bio"
                value={this.state.bio}
                onChange={this.handleInputChangeFor('bio')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="image">
              Image URL:
              <input
                type="text"
                name="image"
                value={this.state.image}
                onChange={this.handleInputChangeFor('image')}
              />
            </label>
          </div>
          <div>


          

          <Button onClick={this.handleOpen} type="submit" name="submit" value="Register">Register</Button>
          {/* <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="h6" id="modal-title">
              Text in a modal
            </Typography>
            <Typography variant="subtitle1" id="simple-modal-description">
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </div>
        </Modal> */}


            {/* <input
              className="register"
              type="submit"
              name="submit"
              value="Register"
            /> */}
          </div>
        </form>
        <center>
          <button
            type="button"
            className="link-button"
            onClick={() => {this.props.dispatch({type: 'SET_TO_LOGIN_MODE'})}}
          >
            Login
          </button>
        </center>
      </div>
    );
  }
}

RegisterPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(RegisterPage);

