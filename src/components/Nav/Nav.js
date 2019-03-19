import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
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
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Friends and Flagons
            </Typography>
            {this.props.user.id && (
              <div>
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
                >

                { this.props.user.id ?
                  <MenuItem onClick={this.handleClose}>
                    <Button><Link  to="/games">Games</Link></Button>
                  </MenuItem>  : '' }

                  { this.props.user.id ?
                  <MenuItem onClick={this.handleClose}>
                   <Link className="nav-link" to="/mygames">My Games</Link>
                  </MenuItem>  : '' }

                  { this.props.user.id ?
                  <MenuItem onClick={this.handleClose}>
                   <Link className="nav-link" to="/creategame">Create Game</Link>
                  </MenuItem>  : '' }
                
                  <MenuItem onClick={this.handleClose}>
                    <Link className="nav-link" to="/about">About F&F</Link>
                  </MenuItem>

                  {this.props.user.id ? <MenuItem onClick={this.logOut}><Link className="nav-link" to="/login">Log Out</Link></MenuItem> : ''}
                  
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


//   handleToggle = () => {
//     this.setState(state => ({ open: !state.open }));
//   };

//   handleClose = event => {
//     if (this.anchorEl.contains(event.target)) {
//       return;
//     }

//     this.setState({ open: false });
//   };

//   render() {
//     const { classes } = this.props;
//     const { open } = this.state;

//     return (
//       <div className={classes.root}>
//       <AppBar position="static" color="default">
//         <Toolbar>
//           <Typography variant='h6' color="inherit">

//           <div>
//           <Button
//             buttonRef={node => {
//               this.anchorEl = node;
//             }}
//             aria-owns={open ? 'menu-list-grow' : undefined}
//             aria-haspopup="true"
//             onClick={this.handleToggle}
//           >
//             Menu
//           </Button>
//           <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
//             {({ TransitionProps, placement }) => (
//               <Grow
//                 {...TransitionProps}
//                 id="menu-list-grow"
//                 style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
//               >
//                 <Paper>
//                   <ClickAwayListener onClickAway={this.handleClose}>
//                     <MenuList>    

                    // { this.props.user.id ?
                    //   <MenuItem onClick={this.handleClose}>
                    //     <Link className="nav-link" to="/games">Games</Link>
                    //   </MenuItem>  : '' }

                    //   { this.props.user.id ?
                    //   <MenuItem onClick={this.handleClose}>
                    //    <Link className="nav-link" to="/mygames">My Games</Link>
                    //   </MenuItem>  : '' }

                    //   { this.props.user.id ?
                    //   <MenuItem onClick={this.handleClose}>
                    //    <Link className="nav-link" to="/creategame">Create Game</Link>
                    //   </MenuItem>  : '' }
                    
                    //   <MenuItem onClick={this.handleClose}>
                    //     <Link className="nav-link" to="/about">About F&F</Link>
                    //   </MenuItem>

                    //   {this.props.user.id ? <MenuItem onClick={this.logOut}>Log Out</MenuItem> : ''}
                      

//                     </MenuList>
//                   </ClickAwayListener>
//                 </Paper>
//               </Grow>
//             )}
//           </Popper>
//         </div>

//           </Typography>
//         </Toolbar>
//       </AppBar>
        
//       </div>
//     );
//   }
// }

// Nav.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// const mapStateToProps = state => ({
//   user: state.user,
// });

// export default connect(mapStateToProps)(withStyles(styles)(Nav));




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
