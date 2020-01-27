import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import Root from './route/routes';
import './style.scss';
import {Provider} from "react-redux";
import {adminUsersReducer} from "./store/reducers/adminUsersReducer";
import {AdminUserInterface} from "./containers/admin/types/types";


export interface storeType {
   admin: {
      adminUsers: AdminUserInterface[]
   };
}

const rootReducer = combineReducers({
   adminUsers: adminUsersReducer
});

/* eslint-disable no-underscore-dangle */
const store = createStore<any , any, any, any>(rootReducer,(window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__());
/* eslint-enable */
ReactDOM.render( <Provider store={store}><Root /> </Provider>, document.getElementById('root'));
