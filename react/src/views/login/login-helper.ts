import axios from 'axios';
import API from '../../API';

export const getStorageToken = () => localStorage.getItem('token');

export const loginApi = async (login: any, password: any) => {
  const instance = axios.create({
    headers: { 'Content-Type': 'application/json' },
  });
  try {
    const getToken = await instance.request({
      url: `${API.API_URL}${API.LOGIN}`,
      method: 'post',
      data: JSON.stringify({ username: login, password }),
    });
    return getToken;
  } catch (e) {
    if (e.response.status && e.response.status === 401) {
      return false;
    }
    throw Error(e);
  }
};
