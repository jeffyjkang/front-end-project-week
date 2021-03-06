import React, { Component } from "react";
import { Form, Input, FormGroup, Button } from "reactstrap";
import "./auth.css";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      usernameInput: "",
      passwordInput: ""
    };
  }
  componentDidMount() {}

  editLoginHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // userHandler = e => {
  //   console.log(e);
  //   this.setState({ usernameInput: e.target.value });
  // };
  // passwordHandler = e => {
  //   console.log(e);
  //   this.setState({ passwordInput: e.target.value });
  // };
  loginSubmit = e => {
    e.preventDefault();
    const username = this.state.usernameInput;
    localStorage.setItem("user", username);
    const password = this.state.passwordInput;
    localStorage.setItem("password", password);
    window.location.reload();
  };

  render() {
    return (
      <div className="background">
        <Form className="login" onSubmit={this.loginSubmit}>
          <FormGroup>
            <Input
              className="username"
              name="usernameInput"
              type="text"
              onChange={this.editLoginHandler}
              placeholder="Username"
              value={this.state.usernameInput}
            />
          </FormGroup>
          <FormGroup>
            <Input
              className="password"
              name="passwordInput"
              type="text"
              onChange={this.editLoginHandler}
              placeholder="Password"
              value={this.state.passwordInput}
            />
          </FormGroup>
          <Button onClick={this.loginSubmit}>Login</Button>
        </Form>
      </div>
    );
  }
}

export default Login;
