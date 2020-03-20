import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { PublicRouter, PrivateRouter } from "./routerComponents";
import { SignIn, SignUp, Main, MyInformation, NotFound } from "./containers";

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <PublicRouter restricted component={SignIn} path="/" exact />
        <PublicRouter restricted component={SignUp} path="/signup" exact />
        <PrivateRouter component={Main} path="/main" exact />
        <PrivateRouter component={MyInformation} path="/myinformation" exact />
        <PublicRouter restricted={false} component={NotFound} key="notfound" />
      </Switch>
    </Router>
  );
};

export default AppRouter;
