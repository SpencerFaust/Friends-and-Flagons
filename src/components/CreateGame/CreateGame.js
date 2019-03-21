import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
// import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import GameItem from '../GameItem/GameItem';
import Grid from '@material-ui/core/Grid/Grid';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '90%',
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
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.primary,
    backgroundColor: 'grey',
  },
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
      activeStep: 0,
      open: false,
  };

  componentDidMount() {
    this.props.dispatch({ type: 'CREATED_GAME'})
  }

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
    open: false,
    gameName: '',
    maxPlayers: '',
    gameDescription: '',
    date: '',
    time: '',
    gameImage: '',
    discord: '',
    creator: this.props.user.id,
    activeStep: 0,
   });
};

handleChange = propertyName => (event) => {
  this.setState({
    [propertyName]: event.target.value,
  });
}

getSteps() {
  return ['Your Games Name', 'How many players do you need?', 'Provide ptential players with a description of your game.', 'What date will you be playing?', 'What time will you be starting?', 'Provide a link to your Discord server.'];
}

getStepContent = (step) =>  {
  switch (step) {
    case 0:
      return <TextField
              id="filled-name"
              label="Game Name"
              className={this.props.classes.textField}
              value={this.state.gameName}
              onChange={this.handleChange('gameName')}
              margin="normal"
              variant="filled"
              style = {{width: "80%"}}
              helperText="What is your adventure called?"
            />;
    case 1:
      return <TextField
              id="filled-number"
              label="Maximum Players"
              value={this.state.maxPlayers}
              onChange={this.handleChange('maxPlayers')}
              type="number"
              className={this.props.classes.textField}
              margin="normal"
              variant="filled"
              helperText="How many players do you want?"
            />;
    case 2:
      return<TextField
              id="filled-multiline-flexible"
              label="Game Description"
              multiline
              fullWidth
              rowsMax="10"
              value={this.state.gameDescription}
              onChange={this.handleChange('gameDescription')}
              className={this.props.classes.textField}
              margin="normal"
              helperText="What can players expect?"
              variant="filled"
            />;
    case 3:
      return<TextField
              id="filled-date"
              label="Date"
              value={this.state.date}
              onChange={this.handleChange('date')}
              type="date"
              className={this.props.classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
              variant="filled"
              helperText="What date is your game?"
            />;
    case 4:
      return <TextField
                id="filled-time"
                label="Time"
                value={this.state.time}
                onChange={this.handleChange('time')}
                type="time"
                className={this.props.classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                margin="normal"
                variant="filled"
                helperText="What time is your game?"
              />
    case 5:
      return <TextField
              id="filled-name"
              label="Discord Link"
              className={this.props.classes.textField}
              value={this.state.discord}
              onChange={this.handleChange('discord')}
              margin="normal"
              variant="filled"
              style = {{width: "80%"}}
              helperText="Make sure the link doesn't expire!"
            />;
    default:
      return 'Unknown step';
  }
}


deleteGame =(userId, gameId) => {
  this.props.dispatch({ type: 'DELETE_GAME', payload: {id: userId, game: gameId } })
}

  render() {
  const { classes } = this.props;
  const steps = this.getSteps();
  const { activeStep } = this.state;

  return (
    <div>
      <Grid container spacing={24}>
        <Grid item xs={5}>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.paper}>
            <Button onClick={this.handleOpen}>Create a Game</Button>
          </Paper>
        </Grid>
        <Grid item xs={5}>
        </Grid>

        <Grid item xs={4}>
        </Grid>
        <Grid item xs={4}>
          <Paper style={{padding: '0px'}} className={classes.paper}><h2>Games you've created</h2></Paper>
        </Grid>
        <Grid item xs={4}>
        </Grid>

        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
          backgroundColor="grey"
        >
          <div className={classes.modalPaper}>
            <Typography variant="h6" id="modal-title" style={{textAlign: 'center'}}>
              Enter your Game information!
            </Typography>
            <div className={classes.root}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={label} change={this.handleChange}  >
              <StepLabel>{label}</StepLabel>
              <StepContent backgroundColor="grey">
                <Typography>{this.getStepContent(index, this.handleChange)}</Typography>
                <div className={classes.actionsContainer} >
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
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography>Finalize your game creation!</Typography>
            <Button 
              variant="contained"
              color="primary"
              onClick={this.handleSubmit} 
              className={classes.button}>
              Create Game
            </Button>
          </Paper>
        )}
      </div>
          </div>
        </Modal>
        
  </Grid> 
    <Grid container spacing={24}>
      {this.props.game.map(game => 
        <GameItem game={game} key={game.id} user={this.props.user.id} created={true} delete={this.deleteGame} />
      )}
    </Grid>
    </div>
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

