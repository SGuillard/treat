import { AdminUserInterface } from '../../types/types';

export interface SettingsAdminUserFormAddProps {
  params?: {
    id?: number,
  };
}

export interface reducerPayloadType {
  name: string,
  value: any
}


export interface SettingsAdminUserListProps {
  adminUsers: AdminUserInterface[],
}
