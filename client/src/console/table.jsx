import { faEdit, faEye, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import FooterNav from "./footerNav";
import MainNav from "./mainNav";
import { titleCase } from "title-case";
import Dashboard from "./dashboard";
import { formatDistance } from "date-fns";

export default function Table() {
  const [success, setSuccess] = useState("");
  const [errors, setErrors] = useState("");
  const [refresh, setRefresh] = useState(true);
  const [incidents, setIncidents] = useState([]);
  console.log("refers", refresh);

  useEffect(() => {
    let _isMounted = true;
    if (refresh) {
      axios.defaults.headers.common["Authorization"] = localStorage.getItem(
        "jwtToken"
      );
      axios
        .get(`/api/incidents`)
        .then((res) => {
          if (_isMounted) {
            const incidents = res.data.data;
            if (localStorage.getItem("role") === "admin") {
              setIncidents(incidents);
            } else {
              let incident = [];
              let userId = localStorage.getItem("userId");
              for (let i = 0; i < incidents.length; i++) {
                if (userId === incidents[i].userId) {
                  incident.push(incidents[i]);
                }
                setIncidents(incident);
              }
            }
            setRefresh(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [refresh]);

  useEffect(() => {
    let _isMounted = false;
    setRefresh(true);
  }, []);

  const handleDeleteClick = (incident_Id) => {
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "jwtToken"
    );
    axios.delete(`/api/incident/delete/${incident_Id}`).then((res) => {
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
      <div className="container" style={{ marginTop: "3%" }}>
        <Dashboard incidents={incidents} />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "3%",
          }}
        >
          <h1>Incidents</h1>
          {localStorage.getItem("role") !== "admin" && (
            <a
              href="/incidents/create"
              style={{ marginBottom: "10px" }}
              className="btn btn-primary btn-lg"
              role="button"
            >
              Create Incident
            </a>
          )}
        </div>
        <table
          className="table table-striped"
          style={{
            emptyCells: "hide",
            textAlign: "center",
            color: "black",
            background: "white",
            marginBottom: "6%",
          }}
        >
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Incident Type</th>
              <th scope="col">Status</th>
              <th scope="col">Priority</th>
              <th scope="col">Last Updated</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {incidents.length === 0 || incidents === undefined ? (
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
                  <td>{titleCase(incident.name)}</td>
                  <td>{titleCase(incident.issueType)}</td>
                  <td>
                    {incident.status === "pending" && (
                      <span
                        className="tableSpan"
                        style={{
                          backgroundColor: "rgba(254, 226, 226)",
                          color: "rgba(153, 27, 27)",
                        }}
                      >
                        {incident.status}
                      </span>
                    )}
                    {incident.status === "in_progress" && (
                      <span
                        className="tableSpan"
                        style={{
                          backgroundColor: "rgba(254, 243, 199)",
                          color: "rgba(146, 64, 14)",
                        }}
                      >
                        {incident.status}
                      </span>
                    )}

                    {/* {incident.status === "completed" && (
                      <span
                        className="tableSpan"
                        style={{
                          backgroundColor: "rgba(209, 250, 229)",
                          color: "rgba(6, 95, 70)",
                        }}
                      >
                        {incident.status}
                      </span>
                    )} */}
                    {incident.status === "closed" && (
                      <span
                        className="tableSpan"
                        style={{
                          backgroundColor: "rgba(224, 231, 255)",
                          color: "rgba(55, 48, 163)",
                        }}
                      >
                        {incident.status}
                      </span>
                    )}
                  </td>

                  <td>{titleCase(incident.priority)}</td>
                  <td>
                    {formatDistance(new Date(incident.updated_at), new Date())}{" "}
                    ago{" "}
                  </td>
                  {incident.status !== "closed" ? (
                    <td>
                      <Link
                        to={`/incidents/view/${incident._id}`}
                        className="btn btn-sm"
                      >
                        <FontAwesomeIcon
                          icon={faEye}
                          style={{ color: "#007bff" }}
                        />
                      </Link>
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
                  ) : (
                    <td>
                      <Link
                        to={`/incidents/view/${incident._id}`}
                        className="btn btn-sm"
                      >
                        <FontAwesomeIcon
                          icon={faEye}
                          style={{ color: "#007bff" }}
                        />
                      </Link>
                    </td>
                  )}
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
