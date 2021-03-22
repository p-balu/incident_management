import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Image from "./images/teamLogo.png";

export default class MainNav extends Component {
  handleLogout = () => {
    localStorage.removeItem("jwtToken");
    window.location.reload();
  };

  render() {
    console.log(localStorage.getItem("jwtToken"));

    return (
      <nav
        className="navbar navbar-expand-lg navbar-dark"
        style={{
          backgroundColor: "rgba(17, 24, 39)",
          boxShadow: "1px 1px 5px 3px rgba(31, 41, 55)",
        }}
      >
        <a className="navbar-brand" style={{ color: "white" }} href="/">
          <img
            src={Image}
            className="img-fluid"
            style={{
              maxWidth: "2.5rem",
              borderRadius: "0",
              height: "auto",
              margin: "0",
            }}
            alt="logo"
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            {localStorage.getItem("jwtToken") !== null ? (
              <button class="btn btn-primary" onClick={this.handleLogout}>
                Logout
              </button>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    activeStyle={{
                      borderBottom: "3px solid #ffb700",
                      fontWeight: "600",
                    }}
                    to="/login"
                  >
                    {" "}
                    Login{" "}
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    activeStyle={{
                      borderBottom: "3px solid #ffb700",
                      fontWeight: "600",
                    }}
                    to="/register"
                  >
                    {" "}
                    Register{" "}
                  </NavLink>
                </li>
              </>
            )}
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeStyle={{
                  borderBottom: "3px solid #ffb700",
                  fontWeight: "600",
                }}
                to="/contact"
              >
                {" "}
                Contact{" "}
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
