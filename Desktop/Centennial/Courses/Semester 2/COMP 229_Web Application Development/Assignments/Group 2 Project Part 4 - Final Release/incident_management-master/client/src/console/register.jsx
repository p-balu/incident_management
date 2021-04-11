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
      disabled: true,
    };
  }

  handleChange = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
    if (
      this.state.username.length > 0 &&
      this.state.password.length > 0 &&
      this.state.email.length > 0 &&
      this.state.name.length > 0
    ) {
      this.setState({ disabled: false });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, password, username, messages } = this.state;

    axios
      .post("/api/auth/register", {
        name,
        email,
        username,
        password,
      })
      .then((result) => {
        console.log("test register", result.data.success);
        if (result.data.success === true) {
          this.props.history.push("/login");
          this.setState({
            name: "",
            username: "",
            email: "",
            password: "",
            messages: "",
            disabled: true,
          });
        } else {
          this.setState({
            messages: "Username or email already exits",
          });
        }
      });
  };

  handleClick = (e) => {
    e.preventDefault();
    this.setState({
      messages: "",
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
            display: "flex",
            justifyContent: "center",
          }}
        >
          {messages !== "" && (
            <div
              class="alert alert-danger alert-dismissible fade show"
              role="alert"
              style={{ width: "55%" }}
            >
              <strong>{messages}</strong>
              <button
                type="button"
                class="close"
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
                Register
              </h2>
              <div className="form-group">
                <label htmlFor="name" className="label">
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
                <label htmlFor="email" className="label">
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
                <label htmlFor="username" className="label">
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
                <label htmlFor="password" className="label">
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
              <p style={{ margin: "0.25rem" }}>
                Already a member?{" "}
                <Link to="/login">
                  <span
                    className="glyphicon glyphicon-plus-sign"
                    aria-hidden="true"
                  ></span>{" "}
                  Login here
                </Link>
              </p>
              <div className="button">
                <button className="inputButton" disabled={this.state.disabled}>
                  Register
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
