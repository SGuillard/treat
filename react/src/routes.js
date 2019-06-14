import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router';
import App from './containers/app';
import Login from './containers/login';

class Routes extends Component {
  render() {
    return (
      <div>
        <Router history={browserHistory}>
          <Route path="/" component={App} />
          <Route path="/login" component={Login} />
        </Router>
      </div>
    );
  }
}

export default Routes;
