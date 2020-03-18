import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

const isLogin = false;

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        isLogin && restricted ? (
          <Redirect to="/main" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

PublicRoute.prototype = {
  component: PropTypes.element.isRequired,
  restricted: PropTypes.bool.isRequired
};

export default PublicRoute;
