import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './containers/app';
import Login from './containers/login';
import Home from './containers/home';
// const API_END_POINT = 'https://api.themoviedb.org/3/';
// const POPULAR_MOVIES_URL = 'discover/movie?language=fr&sort_by=popularity.desc&include_adult=false&append_to_response=images';
// const API_KEY = 'api_key=934424955328116a494249554a384fe7';
// const dbMovieApiKey = '934424955328116a494249554a384fe7';

const Root = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/login" component={Login} />
      <Route path="/home" component={Home} />
      <Route render={() => <h3>Not Found</h3>} />
    </Switch>
  </BrowserRouter>
);

ReactDOM.render(<Root />, document.getElementById('root'));
