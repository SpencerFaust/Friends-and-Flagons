import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing.unit * 2,
  },
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

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <div>
          <Button
            buttonRef={node => {
              this.anchorEl = node;
            }}
            aria-owns={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={this.handleToggle}
          >
            Menu Options
          </Button>
          <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="menu-list-grow"
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={this.handleClose}>
                    <MenuList>

                      <MenuItem onClick={this.handleClose}>
                      <Link className="nav-link" to="/home">
                      {this.props.user.id ? 'Games' : 'Login / Register'}
                      </Link>
                      </MenuItem>

                      <MenuItem onClick={this.handleClose}>
                      <Link className="nav-link" to="/about">About</Link>
                      </MenuItem>

                      {this.props.user.id ? <MenuItem onClick={this.logOut}>Log Out</MenuItem> : ''}
                      

                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
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




// import React from 'react';
// import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import LogOutButton from '../LogOutButton/LogOutButton';
// import './Nav.css';

// const Nav = (props) => (
//   <div className="nav">
//     <Link to="/about">
//       <h2 className="nav-title">Friends and Flagons</h2>
//     </Link>
//     <div className="nav-right">
//       <Link className="nav-link" to="/home">
//         {/* Show this link if they are logged in or not,
//         but call this link 'Home' if they are logged in,
//         and call this link 'Login / Register' if they are not */}
//         {props.user.id ? 'Games' : 'Login / Register'}
//       </Link>
//       <Link className="nav-link" to="/about">
//         About
//       </Link>
//       {/* Show the link to the info page and the logout button if the user is logged in */}
//       {props.user.id && (
//         <>
//           <Link className="nav-link" to="/profile">
//             Profile
//           </Link>
//           <Link className="nav-link" to="/mygames">
//             My Games
//           </Link>
//           <Link className="nav-link" to="/creategame">
//             Create Game
//           </Link>
//           <LogOutButton className="nav-link"/>
//         </>
//       )}
//       {/* Always show this link since the about page is not protected */}

//     </div>
//   </div>
// );

// // Instead of taking everything from state, we just want the user
// // object to determine if they are logged in
// // if they are logged in, we show them a few more links 
// // if you wanted you could write this code like this:
// // const mapStateToProps = ({ user }) => ({ user });
// const mapStateToProps = state => ({
//   user: state.user,
// });

// export default connect(mapStateToProps)(Nav);
