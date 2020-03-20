import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

const isLogin = false;
const PublicRoute = props => {
  const { component, restricted, path, exact, isSignIn } = props;
  return isSignIn && restricted ? (
    <Redirect to="/main" />
  ) : (
    <Route path={path} key={path} exact={exact} component={component} />
  );
};

PublicRoute.prototype = {
  component: PropTypes.element.isRequired,
  restricted: PropTypes.bool.isRequired
};

export default PublicRoute;
