import axios from 'axios';
// import React, { Component } from 'react';

const API_URL = 'http://localhost:80/api';
const LOGIN_SLUG = '/login_check';

const storeToken = (tokenList) => {
  localStorage.setItem('token', tokenList.token);
  localStorage.setItem('refreshToken', tokenList.refresh_token);
};

class LoginApi {
  constructor(credentials) {
    this.credentials = credentials;
  }

  // Call Api to get the first token
  async callApiLoginCheck() {
    const instance = axios.create({
      headers: { 'Content-Type': 'application/json' },
    });
    try {
      const getToken = await instance.request({
        url: `${API_URL}${LOGIN_SLUG}`,
        method: 'post',
        data: JSON.stringify(this.credentials),
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
    try {
      const apiLoginCheckResponse = await this.callApiLoginCheck();
      if (apiLoginCheckResponse !== false) {
        storeToken(apiLoginCheckResponse.data);
        return true;
      }
      return false;
    } catch (e) {
      throw Error(e);
    }
  }
}

export default LoginApi;
