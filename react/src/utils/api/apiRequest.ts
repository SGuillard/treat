import axios, { Method } from 'axios';
import API from '../../API';
import { castObject, castArrayList, castOptions } from './castObjectToCamelOrSnakeCase';
import { RequestMethod } from '../../types';
import { formReducer } from '../forms/formReducer';
import {
  ErrorHandlerResponseInterface,
  ErrorObjectInterface,
  FieldErrorMessageType,
  FieldErrorsInterface,
  formEntity,
  ServerErrorInterface,
  ServerResponseInterface,
} from './type';

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
    .then((response: ServerResponseInterface) => {
      const datas = response.data.data;
      resolve(Array.isArray(datas) ? castArrayList(datas, castOptions.ToCamel) : datas);
    })
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
    }];
  } else if (serverError.status === 422) {
    const backendErrors = [serverError.data.errors];
    const castedErrorFields = castArrayList(backendErrors, castOptions.ToCamel) as FieldErrorsInterface[];
    castedErrorFields.forEach((fields: FieldErrorsInterface) => {
      const fieldNamesWithErrors = Object.keys(fields);
      errorFields = fieldNamesWithErrors;
      Object.values(fields).forEach((fieldErrorMessages: FieldErrorMessageType) => {
        fieldErrorMessages.forEach((message: string) => {
          errorMessages.push({
            error: message,
          });
        });
      });
    });
  } else {
    errorMessages = [{
      error: 'We encounter some issues with your request, please contact support',
    }];
  }
  return { errorMessages, errorFields };
};

export const getRequest = (url: string) => new Promise<object[]>((resolve, reject) => {
  console.log(url);
  makeApiRequest(RequestMethod.GET, url).then((response: object[]) => {
      console.log(response);
    resolve(response);
  })
    .catch((serverErrors: { response: ServerErrorInterface }) => {
      const requestErrors = handleErrors(serverErrors.response);
      reject(requestErrors);
    });
});

export const submitRequest = (url: string, store: any, editEntity?: formEntity) => new Promise<object[]>((resolve, reject) => {
  // If edit mode, add user id for Back end
  const requestData = editEntity && editEntity.id ? formReducer(store, { name: 'id', value: editEntity.id }) : store;
  const httpMethod = editEntity && editEntity.id ? RequestMethod.PUT : RequestMethod.POST;
  const params = editEntity && editEntity.id ? `/${editEntity.id}` : '';
  makeApiRequest(httpMethod,
    `${url}${params}`, requestData).then((response: object[]) => {
    resolve(response);
  })
    .catch((serverErrors: {response: ServerErrorInterface}) => {
      const requestErrors = handleErrors(serverErrors.response);
      reject(requestErrors);
    });
});

export const deleteRequest = (url: string, id: number) => new Promise<object[]>((resolve, reject) => {
  makeApiRequest('DELETE',
    `${url}/${id}`).then((response: object[]) => {
    resolve(response);
  })
    .catch((serverErrors: {response: ServerErrorInterface}) => {
      const requestErrors = handleErrors(serverErrors.response);
      reject(requestErrors);
    });
});

export default makeApiRequest;
