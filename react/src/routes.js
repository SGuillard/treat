import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./containers/app";
import Login from "./containers/login";

const Root = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/login" component={Login} />
      <Route render={() => <h3>Not Found</h3>} />
    </Switch>
  </BrowserRouter>
);

export default Root;
