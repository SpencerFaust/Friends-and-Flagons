import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';

const styles = theme => ({
  root: {
    display: 'flex',
    flexGrow: 1,
  },
  paper: {
    marginRight: theme.spacing.unit * 2,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  menuItem: {
    backgroundColor: 'white',
    color: 'black',
    opacity: 1,
    '&:hover': {
      backgroundColor: 'grey',
    }
  }
});

class Nav extends React.Component {
  state = {
    open: false,
  };

  logOut = (event) => {
    event.preventDefault();
    this.props.dispatch({ type: 'LOGOUT' });
    this.handleClose(event);
  };

  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    console.log(this.props.title)

    return (
      <div className={classes.root} >
        <AppBar position="static" style = {{
            backgroundColor: 'black', 
            color: 'white', 
            margin: '0px',
            marginBottom: '10px',
            }}>
          <Toolbar>
            <Typography variant="h6" className={classes.grow} style={{color: 'white', backgroundColor: 'none',}}>
              Friends and Flagons
            </Typography>
            <Typography variant="h6" className={classes.grow}>
              {this.props.title}
            </Typography>
            {this.props.user.id && (
              <div>
                {this.props.user ? this.props.user.username : '' }
                <IconButton
                  aria-owns={this.props.user.id ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                  style={{opacity: 1}}
                >

                { this.props.user.id ?
                <>
                  <Link className="nav-link" to="/games" style={{textDecoration: 'none', }}><MenuItem className={classes.menuItem} onClick={this.handleClose}>Games</MenuItem></Link>
                  <Link className="nav-link" to="/mygames" style={{textDecoration: 'none'}}><MenuItem className={classes.menuItem} onClick={this.handleClose}>My Games</MenuItem></Link>
                  <Link className="nav-link" to="/creategame" style={{textDecoration: 'none'}}><MenuItem className={classes.menuItem} onClick={this.handleClose}>Create Game</MenuItem></Link>
                  <Link className="nav-link" to="/about" style={{textDecoration: 'none'}}><MenuItem className={classes.menuItem} onClick={this.handleClose}>About F&F</MenuItem></Link>
                  <Link className="nav-link" to="/login" style={{textDecoration: 'none'}}><MenuItem className={classes.menuItem} onClick={this.logOut}>Log Out</MenuItem></Link>
                </>
                  : '' }

                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Nav.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(Nav));