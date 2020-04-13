import axios, { Method } from 'axios';
import API from '../../API';
import { castObject, castArrayList, castOptions } from './castObjectToCamelOrSnakeCase';
import { RequestMethod } from '../../types';
import { formReducer } from '../forms/formReducer';
import { AdminUserFormInterface, ServiceFormInterface } from '../../views/types/types';

export interface ErrorObjectInterface {
  // Key is only used as an index for loop through component
  key: number,
  error: string,
}

interface ServerResponseDataInterface {
  data: object[]
}

interface ServerResponseInterface {
  data: ServerResponseDataInterface
}

type FieldErrorMessageType = string[];

interface FieldErrorsInterface {
  [fieldName: string] : FieldErrorMessageType
}

interface ServerErrorInterface {
  status: number
  data : {
    message: string,
    errors: FieldErrorsInterface,
  }
}

type formEntity = AdminUserFormInterface | ServiceFormInterface;

export interface ErrorHandlerResponseInterface {
  errorFields: string[],
  errorMessages: ErrorObjectInterface[],
}

export const makeApiRequest = (method: Method, slug: string, payload: {} = {}) => new Promise<object[]>((resolve, reject) => {
  const data = castObject(payload, castOptions.ToSnake);
  const instance = axios.create({
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  instance.request({
    url: `${API.API_URL}${slug}`,
    method,
    data,
  })
    // .then((response: any) => resolve(response.data.data))
    .then((response: ServerResponseInterface) => resolve(castArrayList(response.data.data, castOptions.ToCamel)))
    .catch((errors: ServerErrorInterface) => {
      reject(errors);
    });
});

const handleErrors = (serverError: ServerErrorInterface): ErrorHandlerResponseInterface => {
  let errorFields: string[] = [];
  let errorMessages: ErrorObjectInterface[] = [];

  if (serverError.status === 403) {
    errorMessages = [{
      error: serverError.data.message,
      key: 0,
    }];
  } else if (serverError.status === 422) {
    const backendErrors = [serverError.data.errors];
    const castedErrorFields = castArrayList(backendErrors, castOptions.ToCamel) as FieldErrorsInterface[];
    castedErrorFields.map((fields: FieldErrorsInterface, key: number) => {
      const fieldNamesWithErrors = Object.keys(fields);
      errorFields = fieldNamesWithErrors;
      Object.values(fields).map((fieldErrorMessages: FieldErrorMessageType, index: number) => {
        fieldErrorMessages.map((message: string) => {
          errorMessages.push({
            error: message,
            key: parseInt(`${key}${index}`, 10),
          });
          return null;
        });
        return null;
      });
      return null;
    });
  } else {
    errorMessages = [{
      error: 'We encounter some issues with your request, please contact support',
      key: 0,
    }];
  }
  return { errorMessages, errorFields };
};

export const submitRequest = (e: React.FormEvent, url: string, store: any, editEntity?: formEntity) => new Promise<object[]>((resolve, reject) => {
  // If edit mode, add user id for Back end
  const requestData = editEntity ? formReducer(store, { name: 'id', value: editEntity.id }) : store;
  const httpMethod = editEntity ? RequestMethod.PUT : RequestMethod.POST;
  const params = editEntity ? `/${editEntity.id}` : '';
  makeApiRequest(httpMethod,
    `${url}${params}`, requestData).then((response: object[]) => {
    resolve(response);
  })
    .catch((serverErrors: {response: ServerErrorInterface}) => {
      const requestErrors = handleErrors(serverErrors.response);
      reject(requestErrors);
    });
});

export default makeApiRequest;
