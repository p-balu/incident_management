import { faEdit, faEye, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import FooterNav from "./footerNav";
import MainNav from "./mainNav";
import { titleCase } from "title-case";
import Dashboard from "./dashboard";

export default function ContactList() {
  const [success, setSuccess] = useState("");
  const [errors, setErrors] = useState("");
  const [refresh, setRefresh] = useState(true);
  const [contacts, setContacts] = useState([]);
  const isMountedRef = useRef(null);

  console.log("test", refresh);

  useEffect(() => {
    let mounted = true;
    if (refresh) {
      axios.defaults.headers.common["Authorization"] = localStorage.getItem(
        "jwtToken"
      );
      axios
        .get(`/api/contact/contacts`)
        .then((res) => {
          const contacts = res.data.data;
          console.log(contacts);
          if (mounted) {
            setContacts(contacts);
            setRefresh(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    return () => (mounted = false);
  }, [refresh]);

  return (
    <>
      <MainNav />
      <div className="container" style={{ marginTop: "3%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "3%",
          }}
        >
          <h1>Contacts</h1>
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
              <th scope="col">FirstName</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
              <th scope="col">Status</th>
              <th scope="col">Mobile</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.length === 0 || contacts === undefined ? (
              <tr>
                <td
                  colSpan="7"
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
              contacts.map((contact, id) => (
                <tr key={id}>
                  <td>{id + 1}</td>
                  <td>{titleCase(contact.firstName)}</td>
                  <td>{titleCase(contact.lastName)}</td>
                  <td>{titleCase(contact.email)}</td>
                  <td>
                    {contact.status === "pending" && (
                      <span
                        className="tableSpan"
                        style={{
                          backgroundColor: "rgba(254, 226, 226)",
                          color: "rgba(153, 27, 27)",
                        }}
                      >
                        {contact.status}
                      </span>
                    )}
                    {contact.status === "contacted" && (
                      <span
                        className="tableSpan"
                        style={{
                          backgroundColor: "rgba(209, 250, 229)",
                          color: "rgba(6, 95, 70)",
                        }}
                      >
                        {contact.status}
                      </span>
                    )}

                    {/* {contact.status === "completed" && (
                      <span
                        className="tableSpan"
                        style={{
                          backgroundColor: "rgba(209, 250, 229)",
                          color: "rgba(6, 95, 70)",
                        }}
                      >
                        {contact.status}
                      </span>
                    )} */}
                    {contact.status === "busy" && (
                      <span
                        className="tableSpan"
                        style={{
                          backgroundColor: "rgba(224, 231, 255)",
                          color: "rgba(55, 48, 163)",
                        }}
                      >
                        {contact.status}
                      </span>
                    )}
                  </td>
                  <td>{contact.mobile}</td>
                  {contact.status !== "contacted" ? (
                    <td>
                      <Link
                        to={`/contacts/edit/${contact._id}`}
                        className="btn btn-sm"
                      >
                        <FontAwesomeIcon
                          icon={faEdit}
                          style={{ color: "#007bff" }}
                        />
                      </Link>
                    </td>
                  ) : (
                    <td></td>
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
