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
});

class LoginPage extends Component {

  state = {
    username: '',
    password: '',
    open: false,
  };

  loginRoute = (event) => {
    event.preventDefault();
    this.login(event);
    this.props.history.push('/games');
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
    this.props.dispatch({type: 'SET_TO_LOGIN_MODE'});
    this.setState({ open: false });
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
            <Paper className={classes.paper}><h1>FRIENDS AND FLAGONS</h1></Paper>
          </Grid>
         
        </Grid>

        <Grid container spacing={24}>
          <Grid item xs={4}>
          </Grid>
          
            <Grid item xs={4}>
            <Paper className={classes.paper}>
              <TextField
                  // id="filled-name"
                  label="User Name"
                  className={classes.textField}
                  value={this.state.username}
                  onChange={this.handleInputChangeFor('username')}
                  // margin="normal"
                  variant="filled"
                  helperText="What is your username?"
                />
              <TextField
                  // id="filled-password"
                  type="password"
                  label="Password"
                  className={classes.textField}
                  value={this.state.password}
                  onChange={this.handleInputChangeFor('password')}
                  // margin="normal"
                  variant="filled"
                  helperText="What is your password?"
                />
              
             </Paper>
            </Grid>
            <Grid item xs={4}>
            </Grid>

          <Grid item xs={4}>
          </Grid>
            <Grid item xs={2}>
              <Paper className={classes.paper}>
              <Button
              className="log-in"
              type="submit"
              name="submit"
              value="Log In"
              onClick={this.loginRoute}
            >Login</Button>
            </Paper>
          </Grid>

          <Grid item xs={2}>
            <Paper className={classes.paper}>
            <Button
             type="button"
             className="link-button"
             onClick={this.openRegister}
           >
             Register
           </Button>

           <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div className={classes.modalPaper}>
            <Typography variant="h6" id="modal-title" style={{textAlign: 'center'}}>
              Thank you for registering!
            </Typography>
            <RegisterPage />
          </div>
        </Modal>

            </Paper>
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


// class LoginPage extends Component {
  // state = {
  //   username: '',
  //   password: '',
  // };

  // login = (event) => {
  //   event.preventDefault();

  //   if (this.state.username && this.state.password) {
  //     this.props.dispatch({
  //       type: 'LOGIN',
  //       payload: {
  //         username: this.state.username,
  //         password: this.state.password,
  //       },
  //     });
  //   } else {
  //     this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
  //   }
  // } // end login

  // handleInputChangeFor = propertyName => (event) => {
  //   this.setState({
  //     [propertyName]: event.target.value,
  //   });
  // }

//   render() {
//     return (
//       <div>
        // {this.props.errors.loginMessage && (
        //   <h2
        //     className="alert"
        //     role="alert"
        //   >
        //     {this.props.errors.loginMessage}
        //   </h2>
        // )}
//         <form onSubmit={this.login}>
//           <h1>Login</h1>
//           <div>
//             <label htmlFor="username">
//               Username:
//               <input
//                 type="text"
//                 name="username"
//                 value={this.state.username}
//                 onChange={this.handleInputChangeFor('username')}
//               />
//             </label>
//           </div>
//           <div>
//             <label htmlFor="password">
//               Password:
//               <input
//                 type="password"
//                 name="password"
//                 value={this.state.password}
//                 onChange={this.handleInputChangeFor('password')}
//               />
//             </label>
//           </div>
//           <div>
//             <input
//               className="log-in"
//               type="submit"
//               name="submit"
//               value="Log In"
//             />
//           </div>
//         </form>
//         <center>
//           <button
//             type="button"
//             className="link-button"
//             onClick={() => {this.props.dispatch({type: 'SET_TO_REGISTER_MODE'})}}
//           >
//             Register
//           </button>
//         </center>
//       </div>
//     );
//   }
// }

// // Instead of taking everything from state, we just want the error messages.
// // if you wanted you could write this code like this:
// // const mapStateToProps = ({errors}) => ({ errors });
// const mapStateToProps = state => ({
//   errors: state.errors,
// });

// export default connect(mapStateToProps)(LoginPage);
