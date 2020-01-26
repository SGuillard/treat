import * as constants from '../constants';
//define action interfaces
export interface testInterface {
    type: constants.SET_TEST;
    test: string;
}

//define actions
export const setTest = (val: string): testInterface => ({
    type: constants.SET_TEST,
    test: val
});
