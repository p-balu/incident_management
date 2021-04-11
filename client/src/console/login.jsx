import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MainNav from "./mainNav";
import FooterNav from "./footerNav";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      messages: "",
      disabled: true,
    };
  }

  handleChange = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
    if (this.state.username.length > 0 && this.state.password.length > 0) {
      this.setState({ disabled: false });
    }
  };

  handleClick = (e) => {
    e.preventDefault();
    this.setState({
      messages: "",
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    axios
      .post("/api/auth/login", { username, password })
      .then((result) => {
        localStorage.setItem("jwtToken", result.data.token);
        localStorage.setItem("role", result.data.role);
        localStorage.setItem("userId", result.data.id);
        localStorage.setItem("username", result.data.username);
        this.setState({ message: "" });
        this.props.history.push("/incidents");
        this.setState({
          username: "",
          password: "",
          disabled: true,
        });
      })
      .catch((error) => {
        if (error.response.status === 401 || error.status === 500) {
          this.setState({
            messages: "Login failed. Username and Password doesn't match",
          });
        }
      });
  };

  render() {
    const { username, password, messages } = this.state;
    return (
      <>
        <MainNav />
        <div
          className="container"
          style={{
            marginTop: "4%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {messages !== "" && (
            <div
              className="alert alert-danger alert-dismissible fade show"
              role="alert"
              style={{ width: "55%" }}
            >
              <strong>{messages}</strong>
              <button
                type="button"
                className="close"
                data-dismiss="alert"
                aria-label="Close"
                onClick={this.handleClick}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          )}
        </div>
        <div
          className="container"
          style={{
            marginBottom: "6%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div className="loginContainer">
            <form onSubmit={this.handleSubmit}>
              <h2
                className="display-5"
                style={{ marginBottom: "1rem", textAlign: "center" }}
              >
                Login
              </h2>
              <div className="form-group">
                <label htmlFor="username" className="label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  name="username"
                  id="username"
                  autoComplete="off"
                  value={username}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="passwrod" className="label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  name="password"
                  id="password"
                  autoComplete="off"
                  value={password}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <p style={{ margin: "0.25rem" }}>
                Create an Account?{" "}
                <Link to="/register">
                  <span
                    className="glyphicon glyphicon-plus-sign"
                    aria-hidden="true"
                  ></span>{" "}
                  Register here
                </Link>
              </p>
              <div className="button">
                <button className="inputButton" disabled={this.state.disabled}>
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
        <FooterNav />
      </>
    );
  }
}
