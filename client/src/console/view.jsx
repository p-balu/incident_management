import React, { Component } from "react";
import MainNav from "./mainNav";
import { Redirect } from "react-router-dom";
import axios from "axios";
import FooterNav from "./footerNav";
import { titleCase } from "title-case";
import { formatDistance } from "date-fns";
export default class View extends Component {
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
      updated_at: "",
      remarks: "",
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

  handleClick = (e) => {
    e.preventDefault();
    console.log("clickde and update entered");
    const id = this.props.match.params.id;
    this.setState({
      submitted: true,
    });
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "jwtToken"
    );
    axios
      .put(
        `/api/incident/edit/${id}?name=${this.state.name}&email=${this.state.email}&description=${this.state.description}&issueType=${this.state.issueType}&priority=${this.state.priority}&status=in_progress&remarks=${this.state.remarks}`,
        {
          method: "PUT",
        }
      )
      .then((res) => {
        if (res.code === 200) {
          this.setState({
            success: "Incident reopend Success:)",
            submitted: true,
          });
        } else {
          this.setState({
            errors: "Error",
          });
        }
      });
  };

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
            updated_at: data.updated_at,
            remarks: data.remarks,
            refresh: false,
          });
        } else {
          this.setState({
            redirect: true,
          });
        }
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
            <li
              className="breadcrumb-item active"
              style={{ cursor: "no-drop" }}
              aria-current="page"
            >
              View Incident
            </li>
          </ol>
        </nav>
        <div
          className="container"
          style={{
            marginTop: "1%",
            marginBottom: "1%",
            paddingLeft: "0",
            paddingRight: "0",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <h3>Incident Info</h3>
          {this.state.updated_at.length > 0 && (
            <p style={{ fontWeight: "600", paddingTop: "5px" }}>
              Last Updated :
              <span style={{ color: "rgb(16, 202, 193)", marginLeft: "5px" }}>
                {formatDistance(new Date(this.state.updated_at), new Date())}{" "}
                ago
              </span>
            </p>
          )}
        </div>

        <div
          className="container"
          style={{
            background: "white",
            color: "black",
            padding: "1.5rem",
            borderRadius: "8px",
            marginBottom: "2%",
          }}
        >
          <form>
            <div className="group" style={{ justifyContent: "space-between" }}>
              <div className="col-2">
                <label className="label" htmlFor="name">
                  Name
                </label>
                <p>{this.state.name}</p>
              </div>
              <div className="col-2">
                <label className="label" htmlFor="email">
                  Email
                </label>
                <p>{this.state.email}</p>
              </div>
              <div className="col-2">
                <label className="label" htmlFor="issueType">
                  Incident Type
                </label>
                <p>{this.state.issueType}</p>
              </div>
              <div className="col-2">
                <label className="label" htmlFor="priority">
                  Priority
                </label>
                <p>{titleCase(this.state.priority)}</p>
              </div>
            </div>
            <div className="group">
              <div className="col-3">
                <label className="label" htmlFor="priority">
                  Status
                </label>
                <p>
                  {" "}
                  {this.state.status === "pending" && (
                    <span
                      className="tableSpan"
                      style={{
                        backgroundColor: "rgba(254, 226, 226)",
                        color: "rgba(153, 27, 27)",
                      }}
                    >
                      {this.state.status}
                    </span>
                  )}
                  {this.state.status === "in_progress" && (
                    <span
                      className="tableSpan"
                      style={{
                        backgroundColor: "rgba(254, 243, 199)",
                        color: "rgba(146, 64, 14)",
                      }}
                    >
                      {this.state.status}
                    </span>
                  )}
                  {this.state.status === "completed" && (
                    <span
                      className="tableSpan"
                      style={{
                        backgroundColor: "rgba(209, 250, 229)",
                        color: "rgba(6, 95, 70)",
                      }}
                    >
                      {this.state.status}
                    </span>
                  )}
                  {this.state.status === "closed" && (
                    <span
                      className="tableSpan"
                      style={{
                        backgroundColor: "rgba(224, 231, 255)",
                        color: "rgba(55, 48, 163)",
                      }}
                    >
                      {this.state.status}
                    </span>
                  )}
                </p>
              </div>

              <div className="col-4" style={{ marginLeft: "2.75%" }}>
                <label className="label" htmlFor="description">
                  Description
                </label>
                <p>{this.state.description}</p>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "0.5%",
              }}
            >
              {this.state.status === "closed" && (
                <button
                  onClick={this.handleClick.bind(this)}
                  type="submit"
                  className="btn btn-primary"
                >
                  ReOpen Issue
                </button>
              )}
            </div>
            {/* <div style={{ display: "flex" }}>
              <a
                className="btn btn-warning"
                href="/incidents"
                style={{ marginLeft: "5px" }}
              >
                Cancel
              </a>
            </div> */}
          </form>
        </div>
        {this.state.remarks.length > 0 && (
          <>
            <div
              className="container"
              style={{
                marginBottom: "1%",
                paddingLeft: "0",
                paddingRight: "0",
              }}
            >
              <h3>Remarks</h3>
            </div>
            <div className="remarksContainer" style={{}}>
              {titleCase(this.state.remarks)}
            </div>
          </>
        )}
        <FooterNav />
      </>
    ) : (
      <Redirect to="/incidents" />
    );
  }
}
