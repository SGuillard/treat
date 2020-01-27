import {ADD_ADMIN_USER_ACTION} from "../actions/constants";
import {TeamMemberInterface} from "../../containers/admin/types/types";
import {storeType} from "../../index";

type adminUsersInitialStateType = {list: TeamMemberInterface[]};

const adminUserInitialState: adminUsersInitialStateType = {
    list: [
        {
            id: 1,
            first_name: 'My first name',
            last_name: 'My Last name',
            active: true,
        },
    ]
};

export const adminUsersReducer: any = (state: adminUsersInitialStateType = adminUserInitialState, action: any): any => {
    switch (action.type) {
        case ADD_ADMIN_USER_ACTION:
            return {
                ...state,
                list: state.list.concat(action.payload)
            };
    }
    return state;
}
