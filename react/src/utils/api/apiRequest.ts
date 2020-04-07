import axios, { Method } from 'axios';
import API from '../../API';
import { castObject, castObjectList, castOptions } from './castObjectToCamelOrSnakeCase';

const makeRequest = (method: Method, slug: string, payload: {} = {}) => new Promise((resolve, reject) => {
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
    .then((response: any) => resolve(castObjectList(response.data.data, castOptions.ToCamel)))
    .catch((e) => {
      reject(e);
    });
});

export default makeRequest;
