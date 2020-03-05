import axios, { Method } from 'axios';
import { getToken, redirectToLoginPage } from '../containers/admin/login/api-login';
import API from '../API';
import { castObject, castOptions } from '../helpers/castObjectToCamelOrSnakeCase';

export enum RequestMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

const makeRequest = (method: Method, slug: string, payload: {} = {}) => new Promise((resolve, reject) => {
  const data = castObject(payload, castOptions.ToSnake);
  const instance = axios.create({
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
  });
  instance.request({
    url: `${API.API_URL}${slug}`,
    method,
    data,
  })
    // .then((response: any) => resolve(castObject(response.data.data, castOptions.ToCamel)))
    .then((response: any) => resolve(castObject(response.data.data, castOptions.ToCamel)))
    .catch(() => reject(redirectToLoginPage()));
});

export default makeRequest;
