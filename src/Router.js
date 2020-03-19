import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { PublicRouter, PrivateRouter } from "./routerComponents";
import { SignIn, SignUp, Main, MyInformation, NotFound } from "./containers";

const AppRouter = () => (
  <Router>
    <Switch>
      <PublicRouter restricted component={SignIn} path="/" key="/" exact />
      <PublicRouter
        restricted
        component={SignUp}
        path="/signup"
        key="/signup"
        exact
      />
      <PrivateRouter component={Main} path="/main" key="/main" exact />
      <PrivateRouter
        component={MyInformation}
        path="/myinformation"
        key="/myinformation"
        exact
      />
      <PublicRouter restricted={false} component={NotFound} key="notfound" />
    </Switch>
  </Router>
);

export default AppRouter;
