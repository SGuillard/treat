import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import LoginApi from '../utils/symfony-api/api-login';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      username: '',
      password: '',
      wrongCredentials: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    const CallApi = new LoginApi(this.state);
    // Handling Api Login response
    CallApi.getFirstToken()
      .then((response) => {
        if (response === true) {
          this.setState({ redirect: true });
        } else {
          this.setState({ wrongCredentials: true });
        }
      })
      .catch(error => console.error(error));
    event.preventDefault();
  }

  handleInputChange(event) {
    const { target } = event;
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const {
      // eslint-disable-next-line comma-dangle
      wrongCredentials,
      redirect,
      username,
      password,
    } = this.state;
    const errorMessage = wrongCredentials ? <p>Wrong credentials</p> : '';

    if (redirect) {
      return <Redirect to="/" />;
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <label id="label-username" htmlFor="username">
          Login:
          <input
            name="username"
            type="text"
            value={username}
            onChange={this.handleInputChange}
          />
        </label>
        <br />
        <label id="label-password" htmlFor="password">
          Password:
          <input
            name="password"
            type="password"
            value={password}
            onChange={this.handleInputChange}
          />
        </label>
        {errorMessage}
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default Login;
