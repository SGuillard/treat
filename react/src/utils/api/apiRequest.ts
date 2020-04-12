import axios, { Method } from 'axios';
import API from '../../API';
import { castObject, castArrayList, castOptions } from './castObjectToCamelOrSnakeCase';
import { RequestMethod } from '../../types';
import { formReducer } from '../forms/formReducer';
import { AdminUserFormInterface } from '../../views/types/types';

export interface errorObjectInterface {
  // Key is only used as an index for loop through component
  key: number,
  error: string,
}

interface serverResponseDataInterface {
  data: object[]
}

interface serverResponseInterface {
  data: serverResponseDataInterface
}

type fieldErrorMessageInterface = string[];

interface fieldErrorsInterface {
  [fieldName: string] : fieldErrorMessageInterface
}

interface serverErrorInterface {
  status: number
  data : {
    message: string,
    errors: fieldErrorsInterface,
  }
}

export interface errorHandlerResponseInterface {
  errorFields: string[],
  errorMessages: errorObjectInterface[],
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
    .then((response: serverResponseInterface) => resolve(castArrayList(response.data.data, castOptions.ToCamel)))
    .catch((errors: serverErrorInterface) => {
      reject(errors);
    });
});

const handleErrors = (serverError: serverErrorInterface): errorHandlerResponseInterface => {
  let errorFields: string[] = [];
  let errorMessages: errorObjectInterface[] = [];

  if (serverError.status === 403) {
    errorMessages = [{
      error: serverError.data.message,
      key: 0,
    }];
  } else if (serverError.status === 422) {
    const backendErrors = [serverError.data.errors];
    const castedErrorFields = castArrayList(backendErrors, castOptions.ToCamel) as fieldErrorsInterface[];
    castedErrorFields.map((fields: fieldErrorsInterface, key: number) => {
      const fieldNamesWithErrors = Object.keys(fields);
      errorFields = fieldNamesWithErrors;
      Object.values(fields).map((fieldErrorMessages: fieldErrorMessageInterface, index: number) => {
        fieldErrorMessages.map((message: string) => {
          errorMessages.push({
            error: message,
            key: parseInt(`${key}${index}`, 10),
          });
          return null;
        });
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

export const submitRequest = (e: React.FormEvent, url: string, store: any, editEntity?: AdminUserFormInterface) => new Promise<object[]>((resolve, reject) => {
  // If edit mode, add user id for Back end
  const requestData = editEntity ? formReducer(store, { name: 'id', value: editEntity.id }) : store;
  const httpMethod = editEntity ? RequestMethod.PUT : RequestMethod.POST;
  const params = editEntity ? `/${editEntity.id}` : '';
  makeApiRequest(httpMethod,
    `${url}${params}`, requestData).then((response: object[]) => {
    resolve(response);
  })
    .catch((serverErrors: {response: serverErrorInterface}) => {
      const requestErrors = handleErrors(serverErrors.response);
      reject(requestErrors);
    });
});

export default makeApiRequest;
