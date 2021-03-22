import React, { Component } from "react";
import MainNav from "./mainNav";
import { Redirect } from "react-router-dom";
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

  handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    this.setState({ [name]: event.target });
  };

  componentDidMount = () => {
    const id = this.props.match.params.id;
    this.fetchData(id);
  };

  fetchData = (id) => {
    this._isMounted = true;
    fetch(`http://localhost:8080/api/incident/${id}`)
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
    console.log(this.state.users);
    fetch(
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
  componentDidMount() {
    if (this.state.redirect !== false) this.setState({ redirect: false });
  }

  handleClick(event) {
    console.log("working");
    this.props.handleRedirect(false);
    event.preventDefault();
  }
  render() {
    const { submitted, success } = this.state;
    return submitted === false ? (
      <>
        <MainNav />
        <div class="container">
          <form onSubmit={this.handleSubmit.bind(this)} className="FormField">
            <p className="hed">
              <b>Edit Incident</b>
            </p>
            <input
              type="text"
              className="AdminField__Input"
              placeholder="Enter Name"
              value={this.state.name}
              onChange={(event) => this.setState({ name: event.target.value })}
              name="name"
              required
            />
            <input
              type="text"
              className="AdminField__Input"
              placeholder="Enter Email"
              value={this.state.email}
              onChange={(event) => this.setState({ email: event.target.value })}
              name="email"
              required
            />
            <input
              type="text"
              className="AdminField__Input"
              placeholder="Enter Issue Type"
              value={this.state.issueType}
              onChange={(event) =>
                this.setState({ issueType: event.target.value })
              }
              name="issueType"
              required
            />
            <input
              type="text"
              className="AdminField__Input"
              placeholder="Enter priority"
              value={this.state.priority}
              onChange={(event) =>
                this.setState({ priority: event.target.value })
              }
              name="priority"
              required
            />
            <input
              type="text"
              className="AdminField__Input"
              placeholder="Enter Description"
              value={this.state.description}
              onChange={(event) =>
                this.setState({ description: event.target.value })
              }
              name="description"
              required
            />
            <input type="submit" value="Submit" className="FormButton" />
          </form>
        </div>
      </>
    ) : (
      <Redirect to="/" />
    );
  }
}
