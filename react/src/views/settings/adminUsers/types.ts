import { AdminUserInterface } from '../../types/types';

export interface SettingsAdminUserFormAddProps {
  adminUser: AdminUserInterface
}

export interface SettingsFormLoaderProps {
  params?: {
    id?: number,
  };
}


export interface reducerPayloadType {
  name: string,
  value: any
}
