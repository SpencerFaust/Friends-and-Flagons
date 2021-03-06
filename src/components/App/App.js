import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import {connect} from 'react-redux';

import Nav from '../Nav/Nav';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

import AboutPage from '../AboutPage/AboutPage';
import Games from '../Games/Games';
import Profile from '../Profile/Profile';
import MyGames from '../MyGames/MyGames';
import CreateGame from '../CreateGame/CreateGame';
import LoginPage from '../LoginPage/LoginPage';
import Lobby from '../Lobby/Lobby';
import './App.css';

class App extends Component {
  componentWillMount () {
    this.props.dispatch({type: 'FETCH_USER'})
  }

  render() {
    return (
      <Router >
        <div >
        <Route 
              path={/^(?!.*login).*$/}
              component={Nav}
            />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/login" />
            {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
            <Route
              exact
              path="/login"
              component={LoginPage}
            />
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}

            <ProtectedRoute
              exact
              path="/lobby/:id"
              component={Lobby}
              />
             
            <ProtectedRoute
              exact
              path="/about"
              component={AboutPage}
            />
            <ProtectedRoute
              exact
              path="/games"
              component={Games}
            />
            {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
            <ProtectedRoute
              exact
              path="/profile"
              component={Profile}
            />
            <ProtectedRoute
              exact
              path="/mygames"
              component={MyGames}
            />
            <ProtectedRoute
              exact
              path="/creategame"
              component={CreateGame}
            />
            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} /> 
          </Switch>
        </div>
      </Router>
  )}
}

export default connect()(App);
