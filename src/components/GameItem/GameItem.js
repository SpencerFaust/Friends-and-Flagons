import React from 'react';
import { connect } from 'react-redux';
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
import MoreVertIcon from '@material-ui/icons/MoreVert';
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

  render() {
    const { classes } = this.props;

    return (
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={this.props.key}>
      <Card className={classes.card}>
        <CardHeader
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title={this.props.game.game_name}
          subheader= {this.dateTime()}
        />
        <CardMedia
          className={classes.media}
          image="http://dndspeak.com/wp-content/uploads/2018/03/cave_by_nele_diel-d655qw5.jpg"
          title="Dungeon Image"
        />
        <CardContent>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          
          {!this.props.mygames ? 
          <>
          <IconButton 
            aria-label="Add to favorites"
            onClick={this.handleClickOpen}>
            <AddCircleOutline />
            
          </IconButton>
        <Typography component="p">Sign up</Typography> 
        </> : <>
          <IconButton 
            aria-label="Leave this game"
            onClick={this.handleClickOpen}>
            <Cancel />
            
          </IconButton>
        <Typography component="p">Leave Game</Typography> 
        </>}

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
            <Typography paragraph>
              {this.props.game.game_description}
            </Typography>
          </CardContent>
        </Collapse>

      </Card>
      <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Please be certian you are available on {this.dateTime()} before agreeing to participate in this game.
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
      </Grid>
    );
  }
}

GameItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GameItem);


// const GameItem = (props) => (
//   <div >
//     {props.game.game_name}
//   </div>
// );

// export default GameItem;