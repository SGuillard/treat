import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import Root from './router/routes';
import './style.scss';
import { adminUsersReducer } from './store/reducers/adminUsersReducer';
import { servicesReducer } from './store/reducers/ServicesReducer';
import { globalReducer } from './store/reducers/globalReducer';
import { appointmentReducer } from './store/reducers/appointmentReducer';

const rootReducer = combineReducers({
  adminUsers: adminUsersReducer,
  services: servicesReducer,
  global: globalReducer,
  appointments: appointmentReducer,
});

const composeEnhancers = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>, document.getElementById('root'),
);
