import React, { Component } from "react";
import MainNav from "./mainNav";
import { Redirect } from "react-router-dom";

export default class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      issueType: "",
      email: "",
      priority: "",
      description: "",
      incidents: [],
      erros: [],
      success: [],
      submitted: false,
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      submitted: true,
      errors: [],
      success: [],
    });

    console.log("name", this.state.name);
    fetch(
      `http://localhost:8080/api/incident?name=${this.state.name}&email=${this.state.email}&description=${this.state.description}&issueType=${this.state.issueType}&priority=${this.state.priority}`,
      {
        method: "POST",
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.code === 200) {
          this.setState({
            success: "Added Success:)",
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
    const { submitted } = this.state;

    return submitted === false ? (
      <>
        <MainNav />
        <div class="container">
          <form onSubmit={this.handleSubmit.bind(this)} className="FormField">
            <p className="hed">
              <b>Add Incident</b>
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
