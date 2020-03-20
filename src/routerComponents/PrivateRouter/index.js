import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

const isLogin = false;
const PrivateRoute = props => {
  const { component, path, exact, isSignIn } = props;
  return isSignIn ? (
    <Route path={path} key={path} exact={exact} comopnent={component} />
  ) : (
    <Redirect to="/" />
  );
};

PrivateRoute.prototype = {
  component: PropTypes.element.isRequired
};

export default PrivateRoute;
