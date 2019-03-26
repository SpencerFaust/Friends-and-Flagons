import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import io from 'socket.io-client';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      color: theme.palette.text.secondary,
      backgroundColor: 'grey',
    },
  });

class Lobby extends Component {

    state = {
      message: '',
      chatMessages: [],
      dieRolls: [],
      playerAllowed: true,
    };

    componentWillMount() {
      this.props.dispatch({ type: `FETCH_LOBBY_GAME`, payload: this.props.match.params.id})
    };

    componentDidMount() { 
      this.mySocket.on('chat message', message => {
        console.log('New message:', message);
        this.setState({
          chatMessages: [
            ...this.state.chatMessages,
            message,
          ],
        });
      });

      this.mySocket.on('die roll', message => {
        console.log('New message:', message);
        this.setState({
          chatMessages: [
            ...this.state.chatMessages,
            message,
          ],
        });
      });
  };

  rollDie = (die) => () => {
    console.log('Die:', die)
    if (die === 'D4') {
      const roll = (Math.floor(Math.random() * 4)) +1;
      this.mySocket.emit('die roll', `${this.props.user.username} rolled a D4: ${roll}`)
    } else if (die === 'D6') {
      const roll = (Math.floor(Math.random() * 6)) +1;
      this.mySocket.emit('die roll', `${this.props.user.username} rolled a D6: ${roll}`)
    } else if (die === 'D8') {
      const roll = (Math.floor(Math.random() * 8)) +1;
      this.mySocket.emit('die roll', `${this.props.user.username} rolled a D8: ${roll}`)
    } else if (die === 'D10') {
      const roll = (Math.floor(Math.random() * 10)) +1;
      this.mySocket.emit('die roll', `${this.props.user.username} rolled a D10: ${roll}`)
    } else if (die === 'D12') {
      const roll = (Math.floor(Math.random() * 12)) +1;
      this.mySocket.emit('die roll', `${this.props.user.username} rolled a D12: ${roll}`)
    }else if (die === 'D20') {
      const roll = (Math.floor(Math.random() * 20)) +1;
      this.mySocket.emit('die roll', `${this.props.user.username} rolled a D20: ${roll}`)
    } else if (die === 'D100') {
      const roll = (Math.floor(Math.random() * 100)) +1;
      this.mySocket.emit('die roll', `${this.props.user.username} rolled a D100: ${roll}`)
    } else {
      return '';
    }
  }

    mySocket = io();

    messageUpdate = () => {
      this.mySocket.emit('chat message', `${this.props.user.username}: ${this.state.message}`);
      this.setState({
        ...this.state,
        message: '',
      });
    };

    onChange = (event) => {
      event.preventDefault();
      this.setState({
        message: event.target.value,
      });
    };

    render() {
        const { classes } = this.props;
        
        return (
            <div className={classes.root}>
        <Grid container spacing={24}>
           <Grid item xs={12} sm={12}>
            <Paper className={classes.paper}><Typography variant='h3'>{this.props.game[0] && this.props.game[0].game_name}</Typography></Paper>
          </Grid>
          
          <Grid item xs={12} sm={3}>
            <Paper className={classes.paper} style={{height: '32vw'}}>
              <Typography variant='h5'>Roll Dice</Typography> <br />
              <Button onClick={this.rollDie('D4')}>    
                <img src="https://openclipart.org/image/2400px/svg_to_png/277761/1492037363.png" style={{maxHeight: 55, padding: 10}} />
              </Button> 
              <Button onClick={this.rollDie('D6')}>    
                <img src="https://openclipart.org/image/2400px/svg_to_png/94489/six-sided-dice.png" style={{maxHeight: 55, padding: 10}} /> <br />
              </Button> 
              <Button onClick={this.rollDie('D8')}>    
                <img src="https://openclipart.org/image/2400px/svg_to_png/248551/D8.png" style={{maxHeight: 55, padding: 10}} />
              </Button> 
              <Button onClick={this.rollDie('D10')}>    
              <img src="https://1001freedownloads.s3.amazonaws.com/vector/thumb/106772/ten_sided_dice.png" style={{maxHeight: 55, padding: 10}} /> <br />
              </Button> 
              <Button onClick={this.rollDie('D12')}>    
              <img src="https://1001freedownloads.s3.amazonaws.com/vector/thumb/107324/Dice7.png" style={{maxHeight: 55, padding: 10}} />
              </Button> 
              <Button onClick={this.rollDie('D20')}>    
              <img src="https://openclipart.org/download/285672/d20-blank.svg" style={{maxHeight: 55, padding: 10, paddingRight: 0}} /> <br />
              </Button> 
              <Button onClick={this.rollDie('D100')}>    
              <img src="https://i.pinimg.com/originals/1c/e0/77/1ce0777fdafcc69e769770a0ed8d4c96.png" style={{maxHeight: 95, padding: 0}} />
              </Button> 
            </Paper>
          </Grid>
            <Grid item xs={12} sm={9}>
            <Paper className={classes.paper} style={{height: '32vw', position: 'relative'}}>
            <div >
              <div id="messages" style={{overflowWrap: 'break-word', position: 'absolute', bottom: 5, width: '100%', textAlign: 'left',  color: 'black'}} >
                {this.state.chatMessages.map(message => <p key={message}>{message}</p>)}
              {/* </div>
              <div  style={{position: 'absolute', bottom: 20, width: '100%'}}> */}
              <TextField
                id="filled-multiline-flexible"
                label="Group Chat"
                className={this.props.classes.textField}
                onChange= {this.onChange}
                margin="normal"
                variant="filled"
                helperText="Please be kind to your fellow gamers!"
                style={{width: '85%'}}
                value={this.state.message}
              />
                <Button onClick={this.messageUpdate} style={{height: 50, width: 100, positon: 'absolute', bottom: -17, marginLeft: 20}} >Submit</Button>
                </div>
              </div>
            </Paper>
            </Grid>
        </Grid>
        </div>
    );
    }
}

Lobby.propTypes = {
    classes: PropTypes.object.isRequired,
  };

const mapStateToProps = reduxState => {
    return reduxState;
};

export default connect(mapStateToProps)(withStyles(styles)(Lobby));