import React, { Component } from "react";

export default class FooterNav extends Component {
  render() {
    return (
      <nav
        className="navbar fixed-bottom"
        style={{
          backgroundColor: "rgba(31, 41, 55)",
            }}
      >
        <div
          className="container-fluid"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <h6 className="display-6 navbar-text">
            &copy; Copyright 2020 All rights reserved.
          </h6>
        </div>
      </nav>
    );
  }
}
