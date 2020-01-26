import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import Root from './route/routes';
import './style.scss';
import {StoreType} from "./store/types";
import {storeReducer} from "./store/reducers";
import {Provider} from "react-redux";

/* eslint-disable no-underscore-dangle */
const store = createStore<StoreType , any, any, any>(storeReducer,(window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__());
/* eslint-enable */
ReactDOM.render( <Provider store={store}><Root /> </Provider>, document.getElementById('root'));
