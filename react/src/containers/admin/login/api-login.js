import axios from 'axios';

const API_URL = 'http://localhost/api';
const LOGIN_SLUG = '/login';

class LoginApi {
  constructor(login, password) {
    this.login = 'test';
    this.password = 'test';
  }

  storeToken(tokenList) {
    console.log('stored');
    localStorage.setItem('token', tokenList.token);
  }

  // Call Api to get the first token
  async callApiLoginCheck() {
    const instance = axios.create({
      headers: { 'Content-Type': 'application/json' },
    });
    try {
      const { login } = this;
      const { password } = this;

      console.log('oooo');
      const getToken = await instance.request({
        url: `${API_URL}${LOGIN_SLUG}`,
        method: 'post',
        data: JSON.stringify({ username: login, password }),
      });
      console.log('iookk');
      return getToken;
    } catch (e) {
      if (e.response.status && e.response.status === 401) {
        console.log('failed');
        return false;
      }
      throw Error(e);
    }
  }

  // Store the token if the api call is successful or return false if wrong credentials
  async getFirstToken() {
    try {
      console.log('aaa');
      const apiLoginCheckResponse = await this.callApiLoginCheck();
      console.log('bbb');
      if (apiLoginCheckResponse !== false) {
        this.storeToken(apiLoginCheckResponse.data);
        return true;
      }
      return false;
    } catch (e) {
      throw Error(e);
    }
  }

  getToken() {
    const tokenItem = localStorage.getItem('token');
    if (tokenItem) {
      return tokenItem;
    }
    return this.getFirstToken();
  }
}

export default LoginApi;
