import React, { useEffect, useState } from "react";
import { titleCase } from "title-case";

export default function Dashboard(props) {
  const [closed, setClosed] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [pending, setPending] = useState(0);
  const [inProgress, setInProgress] = useState(0);
  const [status, setStatus] = useState(0);

  useEffect(() => {
    if (props.incidents.length > 0) {
      var closed = 0;
      var pending = 0;
      var inProgress = 0;
      var completed = 0;
      var status = 0;
      for (let i = 0; i < props.incidents.length; i++) {
        console.log("entered loop");
        if (props.incidents[i].status === "closed") {
          closed++;
        } else if (props.incidents[i].status === "completed") {
          completed++;
        } else if (props.incidents[i].status === "in_progress") {
          inProgress++;
        } else {
          pending++;
        }
      }
      setClosed(closed);
      setCompleted(completed);
      setInProgress(inProgress);
      setPending(pending);
      status = (closed * 100) / props.incidents.length;
      var percentage = status.toFixed(1);
      setStatus(percentage);
    }
  }, [props]);

  return (
    <>
      <h1>Overview</h1>
      <div className="overView">
        <div className="spanText" style={{ width: "34%" }}>
          <p style={{ textAlign: "center" }}>Info</p>
          <div style={{ marginTop: "10%" }}>
            {localStorage.getItem("role") === "admin" ? (
              <>
                <p>
                  Hey <span style={{ color: "rgb(55, 48, 163" }}>Admin </span>,
                </p>
                <p style={{ lineHeight: "24px" }}>
                  {" "}
                  You have resolved
                  <span style={{ color: "rgb(55, 48, 163" }}>
                    {" "}
                    {closed}
                  </span>{" "}
                  issue/s,{" "}
                  <span style={{ color: "rgb(55, 48, 163" }}> {pending}</span>{" "}
                  is pending and{" "}
                  <span style={{ color: "rgb(55, 48, 163" }}>
                    {" "}
                    {inProgress}
                  </span>{" "} in progress
                </p>
              </>
            ) : (
              <>
                <p>
                  Hello{" "}
                  <span style={{ color: "rgb(55, 48, 163" }}>
                    {titleCase(localStorage.getItem("username"))}
                  </span>
                  ,
                </p>
                <p style={{ lineHeight: "24px" }}>
                  {" "}
                  Your{" "}
                  <span style={{ color: "rgb(55, 48, 163" }}>
                    {" "}
                    {closed}
                  </span>{" "}
                  issue/s have been resolved or closed
                </p>
              </>
            )}
          </div>
        </div>
        <div className="statusClass" style={{ width: "37%" }}>
          <p style={{ textAlign: "center" }}>Stats</p>

          <div className="overView1">
            <div className="card col">
              <h5 className="fs-3 text">Total Incidents</h5>
              <p>{props.incidents.length}</p>
            </div>
            <div
              className="card col"
              style={{
                backgroundColor: "rgba(254, 226, 226)",
                color: "rgba(153, 27, 27)",
              }}
            >
              <h5 className="fs-3 text">Pending</h5>
              <p>{pending}</p>
            </div>
          </div>
          <div className="overView1">
            <div
              className="card col"
              style={{
                backgroundColor: "rgba(254, 243, 199)",
                color: "rgba(146, 64, 14)",
              }}
            >
              <h5 className="fs-3 text">In Progress</h5>
              <p>{inProgress}</p>
            </div>
            {/* <div
          className="card col"
          style={{
            backgroundColor: "rgba(209, 250, 229)",
            color: "rgba(6, 95, 70)",
          }}
        >
          <h5 className="fs-3 text">Completed</h5>
          <p>{completed}</p>
        </div> */}
            <div
              className="card col"
              style={{
                backgroundColor: "rgba(224, 231, 255)",
                color: "rgba(55, 48, 163)",
              }}
            >
              <h5 className="fs-3 text">Closed</h5>
              <p>{closed}</p>
            </div>
          </div>
        </div>
        <div className="statusClass" style={{ width: "25%" }}>
          <p style={{ textAlign: "center" }}>Resolved Status</p>
          <p className="percentage">{status} %</p>
        </div>
      </div>
    </>
  );
}
