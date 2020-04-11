import { AdminUserFormInterface, AdminUserInterface } from '../../types/types';

export interface SettingsAdminUserFormAddProps {
  addEditTeamMember: (User: AdminUserInterface) => (payload: any) => void;
  params?: object;
  adminUser?: AdminUserFormInterface;
}

export interface reducerPayloadType {
  name: string,
  value: any
}
