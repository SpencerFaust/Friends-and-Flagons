import React from 'react';
import {Route} from 'react-router-dom'
import {connect} from 'react-redux';
import LoginPage from '../LoginPage/LoginPage';

const ProtectedRoute = (props) => {
  const {
    component: ComponentToProtect,
    user,
    loginMode,
    ...otherProps
  } = props;

  let ComponentToShow;

  if(user.id) {
    ComponentToShow = ComponentToProtect;
  } else {
    ComponentToShow = LoginPage;
  } 

  return (
      <Route
        {...otherProps}
        component={ComponentToShow}
      />
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    loginMode: state.loginMode,
  }
}

export default connect(mapStateToProps)(ProtectedRoute)


