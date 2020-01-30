import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import Root from './route/routes';
import './style.scss';
import { Provider } from 'react-redux';
import { adminUsersReducer } from './store/reducers/adminUsersReducer';
import { AdminUserInterface } from './containers/admin/types/types';
import thunk from 'redux-thunk';

export interface storeType {
  admin: {
    adminUsers: AdminUserInterface[]
  };
}

const rootReducer = combineReducers({
  adminUsers: adminUsersReducer,
});

const composeEnhancers = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
/* eslint-disable no-underscore-dangle */
const store = createStore<any, any, any, any>(rootReducer, composeEnhancers(applyMiddleware()));
/* eslint-enable */
ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>, document.getElementById('root'),
);
