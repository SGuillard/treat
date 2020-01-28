import { ADD_ADMIN_USER_ACTION } from './constants';
import { AdminUserInterface } from '../../containers/admin/types/types';

interface AdminUserInterfacePayload {
  type: string,
  payload: AdminUserInterface,
}

// define actions
export default (val: AdminUserInterface): AdminUserInterfacePayload => ({
  type: ADD_ADMIN_USER_ACTION,
  payload: val,
});
