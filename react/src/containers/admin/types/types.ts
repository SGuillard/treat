export interface AdminUserInterface {
  id: number,
  firstName: string,
  lastName: string,
  active: boolean,
}

export type AddAdminUserInterface = Omit<AdminUserInterface, 'id'>;
