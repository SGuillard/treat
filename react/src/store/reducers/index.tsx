import { testInterface } from '../actions';
import { StoreType } from '../types';
import { SET_TEST} from '../constants';
import {Reducer} from "react";

const initialState =  {
    test: 'valuer test',
}

export const storeReducer: any = (state: StoreType = initialState, action: any):  any => {
    console.log(action.type);
    switch (action.type) {
        case SET_TEST:
            return  { ...state, test: action.test};
        case 'ADD_MEMBER':
            return  {
                ...state,
                test: action.payload
            };
    }
    return state;
}
