import React from "react";
import PropTypes from "prop-types";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
// Containers for public pages.
import SignIn from "./containers/SignIn";
import SignUp from "./containers/SignUp";
// Containers for private pages.
import Main from "./containers/Main";
import MyInformation from "./containers/MyInformation";
// Container for every pages.
import NotFound from "./containers/NotFound";

const PublicRouter = () => (
  <Switch>
    <Route exact path="/" key="/" component={SignIn} />
    <Route exact path="/signup" key="/signup" component={SignUp} />
    <Route key="NotFound" component={NotFound} />
  </Switch>
);

const PrivateRouter = () => (
  <Switch>
    <Route exact path="/main" key="/main" component={Main} />
    <Route
      exact
      path="/myinformation"
      key="/myinformation"
      component={MyInformation}
    />
    <Route key="NotFound" component={NotFound} />
  </Switch>
);

const AppRouter = () => {
  const isSignIn = false;

  return <Router>{isSignIn ? <PrivateRouter /> : <PublicRouter />}</Router>;
};

export default AppRouter;
