import React, { Component } from "react";
import axios from "axios";
import MainNav from "./mainNav";
import { Link } from "react-router-dom";
import FooterNav from "./footerNav";

export default class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      username: "",
      email: "",
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

    const { name, email, password, username, messages } = this.state;

    axios
      .post("http://localhost:8080/api/auth/register", {
        name,
        email,
        username,
        password,
      })
      .then((result) => {
        console.log("test register", result.data.success);
        if (result.data.success === true) {
          this.props.history.push("/login");
        } else {
          this.setState({
            messages: "Username or email already exits",
          });
        }
      });
  };

  render() {
    const { name, email, password, username, messages } = this.state;
    return (
      <>
        <MainNav />
        <div
          className="container"
          style={{
            marginTop: "4%",
          }}
        >
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
            <h2 className="display-5 my-4">Register</h2>
            <div className="form-group">
              <label htmlFor="name" className="sr-only">
                Name *
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                name="name"
                id="name"
                autoComplete="off"
                value={name}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="username" className="sr-only">
                Username *
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
              <label htmlFor="email" className="sr-only">
                Email *
              </label>
              <input
                type="email"
                className="form-control"
                placeholder="Email address"
                name="email"
                id="email"
                autoComplete="off"
                value={email}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="sr-only">
                Password *
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
              value="Register"
              className="btn btn-lg btn-primary btn-block"
              type="submit"
            />
            <p>
              Already a member?{" "}
              <Link to="/login">
                <span
                  className="glyphicon glyphicon-plus-sign"
                  aria-hidden="true"
                ></span>{" "}
                Login here
              </Link>
            </p>
          </form>
        </div>
        <FooterNav />
      </>
    );
  }
}
