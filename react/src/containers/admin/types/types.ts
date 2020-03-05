interface AdminUserModel {
  firstName: string,
  lastName: string,
  active: number,
}

export interface AdminUserInterface extends AdminUserModel {
  id: number,
}

export interface AdminUserFormInterface extends AdminUserModel {
  id?: number | null;
}
