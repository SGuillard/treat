import axios, { Method } from 'axios';
import { getToken, redirectToLoginPage } from '../containers/admin/login/api-login';
import API from '../API';

export enum RequestMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

const makeRequest = (method: Method, slug: string, data: {} = {}) => new Promise((resolve, reject) => {
  const instance = axios.create({
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
  });
  instance.request({
    url: `${API.API_URL}${slug}`,
    method,
    data,
  })
    .then((response: any) => resolve(response.data.data))
    .catch((e) => reject(redirectToLoginPage()));
});

export default makeRequest;
