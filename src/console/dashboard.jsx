import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MainNav from "./mainNav";
import Table from "./table";

export default function Dashboard() {
  return (
    <>
      <MainNav />
      <main className="dashboardClass">
        <div
          style={{
            padding: "3rem 1.5rem",
          }}
          className="textContainer"
        >
          <div>
            <h2 className="display-4">
              Optimizing Incident
              <br />
              Management
            </h2>
            <p>Having any technical issues? We are here to help you!</p>
              <a
                href="/incidents"
                className="btn btn-primary btn-lg"
                role="button"
              >
                Get Started
              </a>
          </div>
        </div>
        <img
          class="image-fluid"
          style={{ marginLeft: "4.75rem" }}
          src="https://tailwindui.com/img/component-images/cloud-illustration-indigo-400.svg"
          alt=""
        />
      </main>
      {/* {incidents &&
          <Table
            incidents={incidents}
          />
        } */}
    </>
  );
}
