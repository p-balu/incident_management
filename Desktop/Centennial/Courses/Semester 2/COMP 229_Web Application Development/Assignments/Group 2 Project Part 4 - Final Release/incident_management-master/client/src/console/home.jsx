import React from "react";
import FooterNav from "./footerNav";
import MainNav from "./mainNav";

export default function Home() {
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
            <a href="/login" className="btn btn-primary btn-lg" role="button">
              Get Started
            </a>
          </div>
        </div>
        <img
          className="image-fluid"
          style={{ marginLeft: "4.75rem" }}
          src="https://tailwindui.com/img/component-images/cloud-illustration-indigo-400.svg"
          alt=""
        />
      </main>
      <FooterNav />
    </>
  );
}
