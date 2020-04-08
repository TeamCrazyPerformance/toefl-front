import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = props => {
  const { component, path, exact, isSignIn } = props;
  return isSignIn ? (
    <Route path={path} key={path} exact={exact} component={component} />
  ) : (
    <Redirect to="/" />
  );
};

PrivateRoute.propTypes = {
  isSignIn: PropTypes.bool.isRequired,
  component: PropTypes.elementType.isRequired,
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool
};

PrivateRoute.defaultProps = {
  exact: false
};

const mapStateToProps = state => {
  const { auth } = state;
  return { isSignIn: auth.isSignIn };
};

export default connect(mapStateToProps)(PrivateRoute);
