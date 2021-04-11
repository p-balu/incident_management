import {
  faGithub,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { Component } from "react";
import FooterNav from "./footerNav";
import MainNav from "./mainNav";

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      description: "",
      success: "",
      errors: "",
    };
  }

  handleChange = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  handleClick = (e) => {
    e.preventDefault();
    this.setState({
      success: "",
      errors: "",
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { firstName, lastName, email, mobile, description } = this.state;
    axios
      .post("/api/contact/contact", {
        firstName,
        lastName,
        email,
        mobile,
        description,
      })
      .then((result) => {
        console.log(result.status);
        if (result.status === 200) {
          this.setState({
            success: "We will get in touch with you",
          });
        } else {
          this.setState({
            errors: "Error occured please fill the form again",
          });
        }
      });
  };

  render() {
    const {
      firstName,
      lastName,
      email,
      mobile,
      description,
      success,
      errors,
    } = this.state;
    return (
      <>
        <MainNav />
        <main
          className="container text-center"
          style={{
            marginTop: "2%",
            color: "black",
            marginBottom: "6%",
          }}
        >
          {success !== "" && (
            <div
              class="alert alert-success alert-dismissible fade show"
              role="alert"
            >
              <strong>{success}</strong>
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
          {errors !== "" && (
            <div
              class="alert alert-danger alert-dismissible fade show"
              role="alert"
            >
              <strong>{errors}</strong>
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
          <div
            className="jumbotron"
            style={{ paddingTop: "2rem", paddingBottom: "2rem" }}
          >
            <h1 className="display-6">Contact</h1>
            <p className="lead">
              {" "}
              Feel free to ask any questions regarding the site. Your feedback
              is greatly
              <br />
              appreciated. For all queries email us at
            </p>
            <span
              className="fa fa-envelope"
              style={{ marginRight: "10px" }}
            ></span>
            <a href="mailto:bpalepu1@my.centennialcollege.ca" className="mail">
              support_team@united.com
            </a>
            <div style={{ display: "flex" }}>
              <hr className="my-3" />
              <span className="font-weight-bold my-3 mx-1">or</span>
              <hr className="my-3" />
            </div>

            <h3 className="pb-2">Fill this Form</h3>

            <div className="form-field">
              <form
                style={{ textAlign: "start" }}
                id="form"
                onSubmit={this.handleSubmit.bind(this)}
              >
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div className="mb-3 px-4 mt-2" style={{ width: "50%" }}>
                    <label
                      htmlFor="firstName"
                      className="form-label font-weight-bold"
                    >
                      First Name *
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="firstName"
                      id="firstName"
                      autoComplete="off"
                      value={firstName}
                      onChange={this.handleChange}
                      placeholder="Enter your FirstName"
                    />
                  </div>
                  <div className="mb-3 px-4" style={{ width: "50%" }}>
                    <label
                      htmlFor="lastName"
                      className="form-label font-weight-bold"
                    >
                      Last Name *
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="lastName"
                      id="lastName"
                      value={lastName}
                      onChange={this.handleChange}
                      autoComplete="off"
                      placeholder="Enter your LastName"
                    />
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: " center" }}>
                  <div className="mb-3 px-4" style={{ width: "50%" }}>
                    <label
                      htmlFor="email"
                      className="form-label font-weight-bold"
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      id="email"
                      value={email}
                      onChange={this.handleChange}
                      autoComplete="off"
                      placeholder="Enter your name@example.com"
                    />
                  </div>
                  <div className="mb-3 px-4" style={{ width: "50%" }}>
                    <label
                      htmlFor="mobile"
                      className="form-label font-weight-bold"
                    >
                      Mobile No *
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="mobile"
                      id="mobile"
                      value={mobile}
                      onChange={this.handleChange}
                      autoComplete="off"
                      placeholder="Enter your mobile number with country-code"
                    />
                  </div>
                </div>
                <div className="mb-3 px-4">
                  <label
                    htmlFor="description"
                    className="form-label font-weight-bold"
                  >
                    Description *
                  </label>
                  <textarea
                    className="form-control"
                    autoComplete="off"
                    placeholder="Enter your text here"
                    name="description"
                    value={description}
                    onChange={this.handleChange}
                    id="description"
                    rows="3"
                  ></textarea>
                </div>
                <div
                  className="mb-3 mt-3"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <input
                    type="submit"
                    value="Submit"
                    className="btn btn-primary"
                  />
                </div>
              </form>
            </div>

            <h2>Connect with us</h2>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <a
                href="https://github.com/p-balu"
                target="_blank"
                rel="noopener noreferrer"
                className="mx-2 my-2"
              >
                <FontAwesomeIcon icon={faGithub} size="2x" />
              </a>
              <a
                href="https://www.linkedin.com/in/"
                target="_blank"
                rel="noopener noreferrer"
                className="mx-2 my-2"
              >
                <FontAwesomeIcon icon={faLinkedin} size="2x" />
              </a>
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="mx-2 my-2"
              >
                <FontAwesomeIcon icon={faTwitter} size="2x" />
              </a>
            </div>
          </div>
        </main>
        <FooterNav />
      </>
    );
  }
}
export default Contact;
