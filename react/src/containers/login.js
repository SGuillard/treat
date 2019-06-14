import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    console.log(this.state);
    event.preventDefault();
  }

  handleInputChange(event) {
    console.log(event.target);

    const { target } = event;
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const { login, password } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <label id="label-login" htmlFor="login">
          Login:
          <input
            name="login"
            type="text"
            value={login}
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
