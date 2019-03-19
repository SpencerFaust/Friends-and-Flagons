import React from 'react';
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
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Grid from '@material-ui/core/Grid';

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
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  dateTime = () => {
    let date = this.props.game.date;
    if(date.length > 10) date = date.substring(0,10);
    let time = this.props.game.time;
    if(time.length > 5) time = time.substring(0,5);
    return date + ' at ' + time;
  }

  briefDescription = () => {
    let description = this.props.game.game_description;
    if(description.length > 100) description = description.substring(0,100) + '...';
    return description;
  };

  render() {
    const { classes } = this.props;

    return (
      <Grid item xs={12} sm={6} md={3} lg={2} xl={1}>
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
          <Typography component="p">
            {this.briefDescription()}
          </Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton aria-label="Add to favorites">
            <AddCircleOutline />
            
          </IconButton>
        <Typography component="p">Sign up</Typography>
          {/* <IconButton aria-label="Share">
            <ShareIcon />
          </IconButton> */}
          <Typography component="p" style={styles.floatRight}>Description</Typography>
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
          
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>
              {this.props.game.game_description}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
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