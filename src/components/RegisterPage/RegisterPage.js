import React, { Component} from 'react';
import { withRouter } from 'react-router';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  root: {
    width: '70%',
  },
  modalPaper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: theme.spacing.unit * 50,
    backgroundColor: 'grey',
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
    height: '80%',
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2,
  },
  resetContainer: {
    padding: theme.spacing.unit * 3,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

class RegisterPage extends Component {
  state = {
    username: '',
    password: '',
    email: '',
    age: 1,
    bio: '',
    image: '',
    open: false,
    activeStep: 0,
  };

  handleNext = () => {
    console.log(this.state)
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
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
      this.props.history.push('/')
  };

  loginReroute = () => {
    this.props.dispatch({type: 'SET_TO_LOGIN_MODE'});
    this.props.history.push('/about');
  }

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password && this.state.email && this.state.age && this.state.bio) {
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
      this.loginReroute();
    } else {
      alert('There was an error creating your account.')
      this.props.dispatch({type: 'REGISTRATION_INPUT_ERROR'});
    }
  } // end registerUser

  handleChange = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  getSteps() {
    return ['Set your Username', 'Set your Password', 'What is your email address?', 'Write a brief biography.'];
  }

  getStepContent = (step) =>  {
    switch (step) {
      case 0:
        return <TextField
                id="filled-name"
                label="User Name"
                className={this.props.classes.textField}
                onChange= {this.handleChange('username')}
                margin="normal"
                variant="filled"
                style = {{width: "80%"}}
                helperText="What do you want your username to be?"
              />;
      case 1:
        return <TextField
                id="filled-name"
                label="Password"
                type="password"
                className={this.props.classes.textField}
                onChange= {this.handleChange('password')}
                margin="normal"
                variant="filled"
                style = {{width: "80%"}}
                helperText="What do you want your password to be?"
              />;
      case 2:
        return<TextField
                id="filled-name"
                label="Email Address"
                className={this.props.classes.textField}
                onChange= {this.handleChange('email')}
                margin="normal"
                variant="filled"
                style = {{width: "80%"}}
                helperText="What email can we use to send you game reminders?"
              />;
      // case 3:
      //   return 'Age range goes here.'
      case 3:
        return<TextField
                id="filled-multiline-flexible"
                label="Player Biography"
                className={this.props.classes.textField}
                onChange= {this.handleChange('bio')}
                margin="normal"
                variant="filled"
                style = {{width: "80%"}}
                helperText="Include what games you like to play and your prefered play styles!"
              />;
      default:
        return 'Unknown step';
    }
  }

  render() {
    const { classes } = this.props;
    const steps = this.getSteps();
    const { activeStep } = this.state;

    return (
      <div >
      <div className={classes.modalPaper}>
      <Button onClick={this.handleClose} style={{color: 'white'}}>X</Button>
        <Stepper activeStep={activeStep} orientation="vertical" className={classes.modalPaper}>
          {steps.map((label, index) => (
            <Step key={label} change={this.handleChange}>
              <StepLabel>{label}</StepLabel>
              <StepContent>
                  <Typography>{this.getStepContent(index, this.handleChange)}</Typography>
                <div className={classes.actionsContainer}>
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={this.handleBack}
                      className={classes.button}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </div>
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.modalPaper}>
            <Typography>All you need to do now is finalize registration!</Typography>
            <Button 
              variant="contained"
              color="primary"
              onClick={this.registerUser} 
              className={classes.button}>
              Register your Account
            </Button>
          </Paper>
        )}
      </div>
      </div>
    );
  }
}

RegisterPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

// // Instead of taking everything from state, we just want the error messages.
// // if you wanted you could write this code like this:
// // const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(withStyles(styles)(withRouter(RegisterPage)));

