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
      role: "",
      status: "",
    };
  }

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
    axios.get(`/api/incident/${id}`).then((response) => {
      if (this._isMounted) {
        if (response.data.data !== undefined) {
          const data = response.data.data;
          this.setState({
            name: data.name,
            email: data.email,
            issueType: data.issueType,
            description: data.description,
            priority: data.priority,
            role: data.role,
            status: data.status,
          });
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
    if (this._isMounted) {
      const userId = localStorage.getItem("userId");
      console.log("edit test", userId);
      axios.defaults.headers.common["Authorization"] = localStorage.getItem(
        "jwtToken"
      );
      axios
        .put(
          `/api/incident/edit/${id}?name=${this.state.name}&email=${this.state.email}&description=${this.state.description}&issueType=${this.state.issueType}&priority=${this.state.priority}&status=${this.state.status}`,
          {
            method: "PUT",
          }
        )
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
    }
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
                required
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
                required
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
                required
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
                required
              >
                <option value="">Select Priority</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            {localStorage.getItem("role") === "admin" && (
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
                  <option value="in_progress">In Progress</option>
                  {/* <option value="completed">Completed</option> */}
                  <option value="closed">Closed</option>
                </select>
              </div>
            )}

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
                required
              ></textarea>
            </div>
            <div style={{ display: "flex" }}>
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
        <FooterNav />
      </>
    ) : (
      <Redirect to="/incidents" />
    );
  }
}
