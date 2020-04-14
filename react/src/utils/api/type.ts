import { AdminUserFormInterface, ServiceFormInterface } from '../../views/types/types';

export interface ErrorObjectInterface {
  // Key is only used as an index for loop through component
  key: number,
  error: string,
}

export interface ServerResponseDataInterface {
  data: object[]
}

export interface ServerResponseInterface {
  data: ServerResponseDataInterface
}

export type FieldErrorMessageType = string[];

export interface FieldErrorsInterface {
  [fieldName: string] : FieldErrorMessageType
}

export interface ServerErrorInterface {
  status: number
  data : {
    message: string,
    errors: FieldErrorsInterface,
  }
}

export type formEntity = AdminUserFormInterface | ServiceFormInterface;

export interface ErrorHandlerResponseInterface {
  errorFields: string[],
  errorMessages: ErrorObjectInterface[],
}

export interface CastObjectInterface {
  [keyname: string]: any,
}
