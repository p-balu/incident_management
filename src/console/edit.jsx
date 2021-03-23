import React, { Component } from "react";
import MainNav from "./mainNav";
import { Redirect } from "react-router-dom";
import axios from "axios";
import FooterNav from "./footerNav";
export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      issueType: "",
      email: "",
      priority: "",
      description: "",
      submitted: false,
      success: "",
    };
  }

  componentDidMount = () => {
    const id = this.props.match.params.id;
    this.fetchData(id);
  };

  fetchData = (id) => {
    this._isMounted = true;
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "jwtToken"
    );
    axios
      .get(`http://localhost:8080/api/incident/${id}`)
      .then((response) => response.json())
      .then((response) => {
        console.log(response.data.status);
        if (this._isMounted) {
          if (response.data !== undefined) {
            this.setState({
              name: response.data.name,
              email: response.data.email,
              issueType: response.data.issueType,
              description: response.data.description,
              priority: response.data.priority,
            });
            if (this.state.published === "Yes") {
              this.setState({
                checked: true,
              });
            } else {
              this.setState({
                checked: false,
              });
            }
          } else {
            this.setState({
              redirect: true,
            });
          }
        }
      });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const id = this.props.match.params.id;
    this.setState({
      submitted: true,
    });
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "jwtToken"
    );
    axios
      .put(
        `http://localhost:8080/api/incident/edit/${id}?name=${this.state.name}&email=${this.state.email}&description=${this.state.description}&issueType=${this.state.issueType}&priority=${this.state.priority}`,
        {
          method: "PUT",
        }
      )
      .then((res) => res.json())
      .then((res) => {
        if (res.code === 200) {
          this.setState({
            success: "Edit Success:)",
            submitted: true,
          });
        } else {
          this.setState({
            errors: "Error",
          });
        }
      });
  };

  render() {
    const { submitted, success } = this.state;
    return submitted === false ? (
      <>
        <MainNav />
        <nav
          aria-label="breadcrumb"
          className="container"
          style={{
            marginTop: "3%",
            paddingLeft: "0",
            paddingRight: "0",
          }}
        >
          {" "}
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/incidents">Incidents</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Edit Incident
            </li>
          </ol>
        </nav>
        <div
          className="container"
          style={{
            background: "white",
            color: "black",
            padding: "3rem 2rem",
            marginTop: "4%",
            borderRadius: "8px",
          }}
        >
          <h3>Edit Incident</h3>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Name"
                value={this.state.name}
                onChange={(event) =>
                  this.setState({ name: event.target.value })
                }
                name="name"
                id="name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter Email"
                value={this.state.email}
                onChange={(event) =>
                  this.setState({ email: event.target.value })
                }
                name="email"
                id="email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="issueType">Incident Type</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Incident type"
                value={this.state.issueType}
                onChange={(event) =>
                  this.setState({ issueType: event.target.value })
                }
                name="issueType"
                id="issueType"
              />
            </div>

            <div className="form-group">
              <label htmlFor="priority">Priority</label>
              <select
                className="form-control"
                id="priority"
                value={this.state.priority}
                onChange={(event) =>
                  this.setState({ priority: event.target.value })
                }
              >
                <option value="">Select Priority</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                className="form-control"
                id="description"
                rows="3"
                placeholder="Short description about the incident"
                value={this.state.description}
                onChange={(event) =>
                  this.setState({ description: event.target.value })
                }
              ></textarea>
            </div>
            <div style={{ display: "flex" }}>
              <button type="submit" className="btn btn-primary">
                Submit
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
        <FooterNav />
      </>
    ) : (
      <Redirect to="/incidents" />
    );
  }
}
