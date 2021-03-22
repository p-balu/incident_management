import React, { Component } from "react";
import Image from "./images/teamLogo.png";

export default class MainNav extends Component {
  render() {
    return (
      <nav
        className="navbar navbar-expand-lg navbar-light"
        style={{
          backgroundColor: "rgba(31, 41, 55)",
          display: "flex",
        }}
      >
        <div>
          <a className="navbar-brand" href="/">
            <img src={Image} alt="image" style={{ maxWidth: "2.5rem" }} />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        <div
          className="collapse navbar-collapse"
          id="navbarNav"
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="#" style={{ color: "white" }}>
                Login <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" style={{ color: "white" }}>
                Register
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" style={{ color: "white" }}>
                Contact
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
