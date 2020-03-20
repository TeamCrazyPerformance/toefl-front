import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PublicRoute = props => {
  const { component, restricted, path, exact, isSignIn } = props;
  return isSignIn && restricted ? (
    <Redirect to="/main" />
  ) : (
    <Route path={path} key={path} exact={exact} component={component} />
  );
};

PublicRoute.propTypes = {
  isSignIn: PropTypes.bool.isRequired,
  component: PropTypes.elementType.isRequired,
  restricted: PropTypes.bool.isRequired,
  path: PropTypes.string,
  exact: PropTypes.bool
};

PublicRoute.defaultProps = {
  path: "",
  exact: false
};

const mapStateToProps = state => {
  const { auth } = state;
  return { isSignIn: auth.isSignIn };
};

export default connect(mapStateToProps)(PublicRoute);
