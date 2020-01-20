import axios from 'axios';

const API_URL = 'http://localhost/api';
const LOGIN_SLUG = '/login';

const getToken = () => localStorage.getItem('token');

const isAuthenticated = () => {
  if (getToken()) {
    return true;
  }
  return false;
};

class LoginApi {
  constructor(login, password) {
    this.login = login;
    this.password = password;
  }

  storeToken(tokenItem) {
    localStorage.setItem('token', tokenItem);
  }

  // Call Api to get the first token
  async callApiLoginCheck() {
    const instance = axios.create({
      headers: { 'Content-Type': 'application/json' },
    });
    try {
      const { login } = this;
      const { password } = this;

      const getToken = await instance.request({
        url: `${API_URL}${LOGIN_SLUG}`,
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
      this.storeToken(token);
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

export { LoginApi, getToken, isAuthenticated };
