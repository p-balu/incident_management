import {
  faGithub,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { Component } from "react";
import { Redirect } from "react-router";
import FooterNav from "./footerNav";
import MainNav from "./mainNav";

class EditContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      description: "",
      errors: "",
      submitted: false,
    };
  }

  handleChange = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  componentDidMount = () => {
    const id = this.props.match.params.id;
    this._isMounted = true;
    this.fetchData(id);
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  fetchData = (id) => {
    this._isMounted = true;
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "jwtToken"
    );
    axios.get(`/api/contact/contact/${id}`).then((response) => {
      if (this._isMounted) {
        if (response.data.data !== undefined) {
          const data = response.data.data;
          this.setState({
            firstName: data.firstName,
            email: data.email,
            lastName: data.lastName,
            description: data.description,
            status: data.status,
            mobile: data.mobile,
          });
        }
      }
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const id = this.props.match.params.id;

    if (this._isMounted) {
      axios.defaults.headers.common["Authorization"] = localStorage.getItem(
        "jwtToken"
      );
      const {
        firstName,
        lastName,
        email,
        mobile,
        description,
        status,
      } = this.state;
      axios
        .put(
          `/api/contact/contact/edit/${id}?firstName=${firstName}&email=${email}&description=${description}&lastName=${lastName}&mobile=${mobile}&status=${status}`,
          {
            method: "PUT",
          }
        )
        .then((result) => {
          console.log(result.status);
          if (result.status === 200) {
            this.setState({
              submitted: true,
            });
          } else {
            this.setState({
              errors: "Error occured try again later",
            });
          }
        });
    }
  };

  render() {
    const {
      firstName,
      lastName,
      email,
      mobile,
      description,
      errors,
      submitted,
    } = this.state;
    return submitted === false ? (
      <>
        <MainNav />
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
        <main
          className="container text-center"
          style={{
            marginTop: "2%",
            background: "white",
            marginBottom: "6%",
            padding: "3rem 2rem",
            color: "black",
          }}
        >
          <h3 className="pb-2">Edit Contact</h3>

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

              <div className="mb-3 px-4" style={{ width: "50%" }}>
                <div className="form-group">
                  <label htmlFor="priority">Status</label>
                  <select
                    className="form-control"
                    id="priority"
                    value={this.state.status}
                    onChange={(event) =>
                      this.setState({ status: event.target.value })
                    }
                    required
                  >
                    <option value="">Select Status</option>
                    <option value="pending">Pending</option>
                    <option value="contacted">Contacted</option>
                    {/* <option value="completed">Completed</option> */}
                    <option value="busy">Busy</option>
                  </select>
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
              <div style={{ display: "flex", justifyContent: "center" }}>
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
                <a
                  className="btn btn-warning"
                  href="/incidents"
                  style={{ marginLeft: "5px" }}
                >
                  Cancel
                </a>
              </div>
            </form>
          </div>
        </main>
        <FooterNav />
      </>
    ) : (
      <Redirect to="/contacts" />
    );
  }
}
export default EditContact;
