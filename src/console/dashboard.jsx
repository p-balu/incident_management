import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MainNav from "./mainNav";
export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      incidents: [],
      id: "",
      refresh: true,
    };
  }

  componentDidMount = () => {
    this.getIncidents();
    setInterval(this.getIncidents, 500);
  };

  handleDeleteClick = (incident_Id) => {
    console.log("testing", incident_Id);
    this.setState({
      refresh: false,
    });
    axios
      .delete(`http://localhost:8080/api/incident/delete/${incident_Id}`)
      //   .then((res) => res.json())
      .then((res) => {
        if (res.code === 200) {
          this.setState({
            success: "Deleted Success:)",
            refresh: true,
          });
        } else {
          this.setState({
            errors: "Error",
          });
        }
      });
  };

  getIncidents = () => {
    const { incidents, refresh } = this.state;
    if (refresh) {
      axios
        .get(`http://localhost:8080/api/incident`, {
          revalidateOnMount: true,
          refreshInterval: 100000,
          revalidateOnFocus: false,
        })
        .then((res) => {
          console.log(res.data.data);
          const incidents = res.data.data;
          this.setState({
            incidents: incidents,
            refresh: false,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  render() {
    console.log(this.state.refresh);
    console.log(this.state.incidents);
    return (
      <div>
        <MainNav />
        <main class="container" style={{ marginTop: "3%" }}>
          <div class="jumbotron">
            <h2 class="display-4">Hello There,</h2>
            <h3 class="display-5">We are Team United Incident Managament</h3>
            <p>Having any technical issues? We are here to help you!</p>
            <p class="lead">
              <a
                href="/incident-create"
                class="btn btn-primary btn-lg"
                role="button"
              >
                Create Incident
              </a>
            </p>
          </div>
        </main>
        <div class="container">
          <table class="table">
            <thead class="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Incident Type</th>
                <th scope="col">Status</th>
                <th scope="col">Priority</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.incidents.map((incident, id) => (
                <tr key={{ id }}>
                  <td>{id + 1}</td>
                  <td>{incident.name}</td>
                  <td>{incident.issueType}</td>
                  <td>{incident.status}</td>
                  <td>{incident.priority}</td>
                  <td>
                    <td>
                      <Link to={`/edit/${incident._id}`} className="editLink">
                        Edit
                      </Link>
                    </td>
                    <button
                      class="btn btn-sm"
                      onClick={() => {
                        this.handleDeleteClick(incident._id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
