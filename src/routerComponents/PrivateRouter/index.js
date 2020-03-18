import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

const isLogin = false;

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        isLogin ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

PrivateRoute.prototype = {
  component: PropTypes.element.isRequired
};

export default PrivateRoute;
