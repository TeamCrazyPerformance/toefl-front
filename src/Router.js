import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { PublicRouter, PrivateRouter } from "./routerComponents";
import ScrollOnTopHelper from "./helper/ScrollOnTopHelper";
import { SignIn, SignUp, Main, MyInformation, NotFound } from "./containers";

const AppRouter = () => {
  return (
    <Router>
      <ScrollOnTopHelper />
      <Switch>
        <PublicRouter
          restricted
          component={SignIn}
          path={process.env.REACT_APP_SIGN_IN_URL}
          exact
        />
        <PublicRouter
          restricted
          component={SignUp}
          path={process.env.REACT_APP_SIGN_UP_URL}
          exact
        />
        <PrivateRouter
          component={Main}
          path={process.env.REACT_APP_MAIN_URL}
          exact
        />
        <PrivateRouter
          component={MyInformation}
          path={process.env.REACT_APP_MY_INFORMATION_URL}
          exact
        />
        <PublicRouter restricted={false} component={NotFound} key="notfound" />
      </Switch>
    </Router>
  );
};

export default AppRouter;
