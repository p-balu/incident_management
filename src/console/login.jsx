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
    };
  }

  handleChange = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    axios
      .post("http://localhost:8080/api/auth/login", { username, password })
      .then((result) => {
        localStorage.setItem("jwtToken", result.data.token);
        this.setState({ message: "" });
        this.props.history.push("/");
      })
      .catch((error) => {
        if (error.response.status === 401) {
          this.setState({
            messages: "Login failed. username or password not match",
          });
        }
      });
  };

  render() {
    const { username, password, messages } = this.state;
    return (
      <>
        <MainNav />
        <div className="container" style={{ marginTop: "4%" }}>
          <form onSubmit={this.handleSubmit}>
            {messages !== "" && (
              <div
                class="alert alert-warning alert-dismissible fade show"
                role="alert"
              >
                <strong>{messages}</strong>
                <button
                  type="button"
                  class="close"
                  data-dismiss="alert"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            )}
            <h2 className="display-5 my-5">Please sign in</h2>
            <div className="form-group">
              <label htmlFor="username" className="sr-only">
                Usernmae
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
              <label htmlFor="passwrod" className="sr-only">
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
            <input
              type="submit"
              value="Login"
              className="btn btn-lg btn-primary btn-block"
              type="submit"
            />
            <p>
              Not a member?{" "}
              <Link to="/register">
                <span
                  className="glyphicon glyphicon-plus-sign"
                  aria-hidden="true"
                ></span>{" "}
                Register here
              </Link>
            </p>
          </form>
        </div>
        <FooterNav />
      </>
    );
  }
}
