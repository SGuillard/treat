import React, { Component } from 'react';
import LoginApi from '../utils/api';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
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
          console.log('redirection');
        } else {
          console.log('Mauavis identifiants');
        }
      })
      .catch(error => console.log(error));

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
    const { username, password } = this.state;
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
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default Login;
