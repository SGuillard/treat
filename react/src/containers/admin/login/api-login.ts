import axios from 'axios';
import API from '../../../API';
import AdminROUTES from '../../../route/admin/admin-routes';

const getStorageToken = () => localStorage.getItem('token');

const getToken = () => {
  if (getStorageToken()) {
    return getStorageToken();
  }
  window.location.href = (`${AdminROUTES.BASE}${AdminROUTES.LOGIN}`);
};

const redirectToLoginPage = () => window.location.href = (`${AdminROUTES.BASE}${AdminROUTES.LOGIN}`);

const storeToken = (tokenItem: string) => localStorage.setItem('token', tokenItem);

const isAuthenticated = () => {
  if (getStorageToken()) {
    return true;
  }
  return false;
};

class LoginApi {
  login: string;

  password: string;

  constructor(login: string, password: string) {
    this.login = login;
    this.password = password;
  }

  // Call Api to get the first token
  async callApiLoginCheck() {
    const instance = axios.create({
      headers: { 'Content-Type': 'application/json' },
    });
    try {
      const { login, password } = this;

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
  }

  // Store the token if the api call is successful or return false if wrong credentials
  async getFirstToken() {
    const apiLoginCheckResponse = await this.callApiLoginCheck();
    if (apiLoginCheckResponse !== false) {
      const token = apiLoginCheckResponse.data.accessToken;
      storeToken(token);
      return true;
    }
    return false;
  }

  async authenticate() {
    if (isAuthenticated()) {
      return getToken();
    }
    const getFirstToken = await this.getFirstToken();
    return getFirstToken;
  }
}

export {
  LoginApi, getToken, isAuthenticated, redirectToLoginPage,
};
