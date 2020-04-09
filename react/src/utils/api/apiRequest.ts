import axios, { Method } from 'axios';
import API from '../../API';
import { castObject, castArrayList, castOptions } from './castObjectToCamelOrSnakeCase';
import { RequestMethod } from '../../types';
import { formReducer } from '../forms/formReducer';

export interface errorObjectInterface {
  // Key is only used as a key when mapping over errors
  key: number,
  error: any,
}

export const makeApiRequest = (method: Method, slug: string, payload: {} = {}) => new Promise((resolve, reject) => {
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
    .then((response: any) => resolve(castArrayList(response.data.data, castOptions.ToCamel)))
    .catch((e) => {
      reject(e);
    });
});

const handleErrors = (e: any) => {
  let errorFields: string[] = [];
  let errorMessages: errorObjectInterface[] = [];

  if (e.status === 403) {
    errorMessages = [{
      error: e.data.message,
      key: 0,
    }];
  } else if (e.status === 422) {
    const backendErrors = [e.data.errors];
    const castedErrorFields = castArrayList(backendErrors, castOptions.ToCamel);
    castedErrorFields.map((fields:any, key: any) => {
      const fieldNamesWithErrors = Object.keys(fields);
      errorFields = fieldNamesWithErrors;
      Object.values(fields).map((fieldErrorMessages: any, index: number) => {
        fieldErrorMessages.map((message: any) => {
          errorMessages.push({
            error: message,
            key: parseInt(`${key}${index}`, 10),
          });
        });
      });
    });
  } else {
    errorMessages = [{
      error: 'We encounter some issues with your request, please contact support',
      key: 0,
    }];
  }
  return { errorMessages, errorFields };
};

export const submitRequest = (e: any, url: string, store: any, editObject: any) => new Promise((resolve:any, reject: any) => {
  // If edit mode, add user id for Back end
  const requestData = editObject ? formReducer(store, { name: 'id', value: editObject.id }) : store;
  const httpMethod = editObject ? RequestMethod.PUT : RequestMethod.POST;
  const params = editObject ? `/${editObject.id}` : '';
  makeApiRequest(httpMethod,
    `${url}${params}`, requestData).then((response: any) => {
    resolve(response);
  })
    .catch((e: any) => {
      const requestErrors = handleErrors(e.response);
      reject(requestErrors);
    });
});

export default makeApiRequest;
