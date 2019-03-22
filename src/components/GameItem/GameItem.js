import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import Cancel from '@material-ui/icons/Cancel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = theme => ({
  card: {
    maxWidth: 400,
    padding: 10,
    backgroundColor: 'grey',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  floatRight: {
    float: 'right',
  }
});

class GameItem extends React.Component {
  state = { 
    expanded: false,
    open: false,
  };

  lobbyURL = () => {
    this.props.history.push('/lobby/' + this.props.game.id + '-' + this.props.game.game_name)
  };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  dateTime = () => {
    let date = this.props.game.date;
    if(date.length > 10) date = date.substring(0,10);
    let time = this.props.game.time;
    if(time.length > 5) time = time.substring(0,5);
    return date + ' at ' + time;
  }

  logoutDispatch =  (userId, gameId) => () => {
    console.log('logoutDis hit', userId, gameId);
    this.props.joinGame(userId, gameId);
    this.handleClose();
  }

  leaveGameDispatch = (userId, gameId) => () => {
    console.log('Leave:', userId, gameId);
    this.props.leaveGame(userId, gameId);
    this.handleClose();
  }

  deleteGameDispatch = (userId, gameId) => () => {
    console.log('Delete:', userId, gameId);
    this.props.delete(userId, gameId);
    this.handleClose();
  }

  render() {
    const { classes } = this.props;
    
    return (
      <>
        {this.props.game.count < (this.props.game.max_players + 1) || this.props.mygames ||this.props.created ? 
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={this.props.key}>
      <Card className={classes.card}>
        




      {this.props.game.creator_id === this.props.user ? 
      
        <CardHeader
          action={
            <IconButton 
            aria-label="Delete this game"
            onClick={this.handleClickOpen}>
            <Cancel />
          </IconButton>
          }
          title={this.props.game.game_name}
          subheader= {`${this.dateTime()}`} 
        /> 
        :
          this.props.mygames ?
          <CardHeader
          title={this.props.game.game_name}
          subheader= {`${this.dateTime()}`}
        />
        
        : <CardHeader
        title={this.props.game.game_name}
        subheader= {`${this.dateTime()} Needs ${this.props.game.max_players - (Number(this.props.game.count) - 1)} players.`}
      />
      }
        <CardMedia
          className={classes.media}
          image={this.props.game.game_img}
          title="Dungeon Image"
        />
        <CardContent>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          
          {this.props.game.creator_id === this.props.user ? 'This is your game.' :
          this.props.mygames ?
          <>
          <IconButton 
            aria-label="Leave this game"
            onClick={this.handleClickOpen}>
            <Cancel />
            
          </IconButton>
        <Typography component="p">Leave Game</Typography> 
        </>
         :
         
         <>
         <IconButton 
           aria-label="Sign up for this game"
           onClick={this.handleClickOpen}>
           <AddCircleOutline />
           
         </IconButton>
       <Typography component="p">Sign up</Typography> 
       </>          
        }

          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded,
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
        <ExpandMoreIcon />
          </IconButton>
          <Typography component="p" style={styles.floatRight}>Description</Typography>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>

          {/* This will conditionally render the Discord link if the user is viewing within MyGames page. */}
          {!this.props.mygames ? '' : <Typography paragraph> {this.props.game.discord} </Typography>}


            <Typography paragraph>
              {this.props.game.game_description} <br />
              <Button style={{marginTop: 5}} onClick={this.lobbyURL} >Game Lobby</Button>
            </Typography>
          </CardContent>
        </Collapse>

      </Card>

      {/* This conditional controls the delete game option for game creators or the join/leave 
      game icon, text and dialogue box based on if the user has already joined the game or not. */}
      {this.props.created ?

        <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">{"Delete this game?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you'd like to delete this game?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Don't Delete
          </Button>
          <Button onClick={this.deleteGameDispatch(this.props.user, this.props.game.id)} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
        </Dialog>
        :
      this.props.mygames ? 
        <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Leave this game?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you'd like to leave this game?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={this.leaveGameDispatch(this.props.user, this.props.game.id)} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      :
      <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Join this game?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Please be certain you are available on {this.dateTime()} before agreeing to participate in this game.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Disagree
            </Button>
            <Button onClick={this.logoutDispatch(this.props.user, this.props.game.id)} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      }

      </Grid> 
       : '' }
      </>
    );
  }
}

GameItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(GameItem));