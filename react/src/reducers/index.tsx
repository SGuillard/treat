import { testInterface } from '../actions';
import { MyStore } from '../types/index';
import { SET_TEST} from '../constants/index';
import {Reducer} from "react";

export const changeTest: any = (state: any, action: any):  any => {

    switch (action.type) {
        case SET_TEST:
            return  { ...state, test: action.test};
    }
    return state;
}
