import { faEdit, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FooterNav from "./footerNav";
import MainNav from "./mainNav";

export default function Table() {
  const [success, setSuccess] = useState("");
  const [errors, setErrors] = useState("");
  const [refresh, setRefresh] = useState(true);
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    console.log("entered");
    if (refresh) {
      axios.defaults.headers.common["Authorization"] = localStorage.getItem(
        "jwtToken"
      );
      axios
        .get(`http://localhost:8080/api/incident`)
        .then((res) => {
          console.log(res.data.data);
          const incidents = res.data.data;
          setIncidents(incidents);
          setRefresh(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [refresh]);

  const handleDeleteClick = (incident_Id) => {
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "jwtToken"
    );
    axios
      .delete(`http://localhost:8080/api/incident/delete/${incident_Id}`)
      .then((res) => {
        console.log(res.data.code);
        if (res.data.code !== "200") {
          setErrors("Error occured");
        } else {
          setRefresh(true);
          setSuccess("Deleted Successfully");
        }
      });
  };

  return (
    <>
      <MainNav />
      <div className="container" style={{ marginTop: "4%" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h1>Incidents</h1>
          <a
            href="/incidents/create"
            style={{ marginBottom: "10px" }}
            className="btn btn-primary btn-lg"
            role="button"
          >
            Create Incident
          </a>
        </div>
        <table
          className="table table-striped"
          style={{
            emptyCells: "hide",
            textAlign: "center",
            color: "black",
            background: "white",
          }}
        >
          <thead>
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
            {incidents.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  style={{
                    fontSize: "2rem",
                    fontWeight: "500",
                    marginTop: "2%",
                  }}
                >
                  No Data
                </td>
              </tr>
            ) : (
              incidents.map((incident, id) => (
                <tr key={id}>
                  <td>{id + 1}</td>
                  <td>{incident.name}</td>
                  <td>{incident.issueType}</td>
                  <td>{incident.status}</td>
                  <td>{incident.priority}</td>
                  <td>
                    <Link
                      to={`/incidents/edit/${incident._id}`}
                      className="btn btn-sm"
                    >
                      <FontAwesomeIcon
                        icon={faEdit}
                        style={{ color: "#007bff" }}
                      />
                    </Link>
                    <button
                      className="btn btn-sm"
                      onClick={() => {
                        handleDeleteClick(incident._id);
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faTrashAlt}
                        style={{ color: "#007bff" }}
                      />{" "}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <FooterNav />
    </>
  );
}
