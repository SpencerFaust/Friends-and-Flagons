import React, { Component } from 'react';
import { connect } from 'react-redux';
import RegisterPage from '../RegisterPage/RegisterPage';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.primary,
    backgroundColor: 'grey',
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
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    backgroundColor: 'grey',
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
  myButton: {
    color: 'black',
    margin: 'auto',
    width: '100%',
    height: '100%',
    opacity: .9,
    backgroundColor: 'grey',
    '&:hover': {
      backgroundColor: 'white',
      opacity: .5,
    }
  },
});

class LoginPage extends Component {

  state = {
    username: '',
    password: '',
    open: false,
  };

  componentWillMount() {
    this.props.dispatch({type: 'SET_TO_LOGIN_MODE'});
  };

  loginRoute = (event) => {
    event.preventDefault();
    this.login(event);
    this.props.history.push('/about');
  }

  login = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      alert('Incorrect Username and Password combination!');
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  } // end login

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      ...this.state,
      [propertyName]: event.target.value,
    });
  }

  openRegister = () => {
    this.props.dispatch({type: 'SET_TO_REGISTER_MODE'});
    this.handleOpen();
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    // if (this.props.loginMode === 'register') {
      this.props.dispatch({type: 'SET_TO_LOGIN_MODE'});
      this.setState({ open: false });
    // } else {
    //   return false;
    // };
  };
  
  render() {
  const { classes } = this.props;

    return (
      <div className={classes.root}>
      {this.props.errors.loginMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.loginMessage}
          </h2>
        )}
        <Grid container spacing={24}>
        
          <Grid item xs={12}>
            <Typography variant='h2' style={{color: 'white', textAlign: 'center', padding: 30}}>FRIENDS AND FLAGONS</Typography>
          </Grid>
         
        </Grid>

        <Grid container spacing={24}>
          <Grid item xs={4}>
          </Grid>
          
            <Grid item xs={12} sm={4}>
            <Paper className={classes.paper} style={{opacity: .9}}>
              <TextField
                  id="filled-name"
                  label="User Name"
                  className={classes.textField}
                  value={this.state.username}
                  onChange={this.handleInputChangeFor('username')}
                  margin="normal"
                  variant="outlined"
                  color="white"
                  helperText="What is your username?"
                />
              <TextField
                  id="filled-password"
                  type="password"
                  label="Password"
                  className={classes.textField}
                  value={this.state.password}
                  onChange={this.handleInputChangeFor('password')}
                  margin="normal"
                  variant="outlined"
                  style={{border: 'white', color: 'white'}}
                  helperText="What is your password?"
                />
              
             </Paper>
            </Grid>
            <Grid item xs={4}>
            </Grid>

          <Grid item xs={4}>
          </Grid>
            <Grid item xs={6} sm={2}>
              <Button
              className={classes.myButton}
              type="submit"
              name="submit"
              value="Log In"
              onClick={this.loginRoute}
            >Login</Button>
          </Grid>

          <Grid item xs={6} sm={2}>
            <Button
             type="button"
             className={classes.myButton}
             onClick={this.openRegister}
           >
             Register
           </Button>

           <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
          className={classes.modalPaper}
        >
          <div >
            <Typography variant="h6" id="modal-title" style={{textAlign: 'center'}}>
              Thank you for registering!
            </Typography>
            <RegisterPage />
          </div>
        </Modal>
          </Grid>
     </Grid>
  </div>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

 const mapStateToProps = (reduxState) => {
  return reduxState;
};

export default connect(mapStateToProps)(withStyles(styles)(LoginPage));