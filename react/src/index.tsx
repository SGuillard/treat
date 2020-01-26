import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import Root from './route/routes';
import './style.scss';
import {MyStore} from "./types";
import {changeTest} from "./reducers";
import {testInterface} from "./actions";
import {Provider} from "react-redux";

/* eslint-disable no-underscore-dangle */
const store = createStore<MyStore, any, any, any>(changeTest, {
    test: 'valuer test',
},(window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__());
/* eslint-enable */
ReactDOM.render( <Provider store={store}><Root /> </Provider>, document.getElementById('root'));
