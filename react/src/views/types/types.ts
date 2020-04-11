interface AdminUserModel {
  firstName: string,
  lastName: string,
  active: boolean,
}

export interface AdminUserInterface extends AdminUserModel {
  id: number,
}

export interface AdminUserFormInterface extends AdminUserModel {
  id?: number;
}

export interface ServiceModel {
  price: string,
  duration: number,
  name: string,
}

export interface ServiceInterface extends ServiceModel {
  id: number,
}

export interface ServiceFormInterface extends ServiceModel {
  id?: number | null;
}
