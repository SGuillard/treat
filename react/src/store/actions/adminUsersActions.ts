import {testInterface} from "../types";
import {ADD_ADMIN_USER_ACTION} from "./constants";
import {TeamMemberInterface} from "../../containers/admin/types/types";

interface TeamMemberInterfacePayload {
    type: string,
    payload: TeamMemberInterface,
}

//define actions
export const addAdminUser = (val: TeamMemberInterface): TeamMemberInterfacePayload => {
    return {
        type: ADD_ADMIN_USER_ACTION,
        payload: val
    };
}
