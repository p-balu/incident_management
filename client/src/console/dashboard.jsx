import React, { useEffect, useState } from "react";

export default function Dashboard(props) {
  const [closed, setClosed] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [pending, setPending] = useState(0);
  const [inProgress, setInProgress] = useState(0);

  useEffect(() => {
    if (props.incidents.length > 0) {
      var closed = 0;
      var pending = 0;
      var inProgress = 0;
      var completed = 0;
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
    }
  }, [props]);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h1>Overview</h1>
        <h5>Updated</h5>
      </div>{" "}
      <div className="row">
        <div className="card col-sm">
          <h5 className="fs-3 text">Total Incidents</h5>
          <p>{props.incidents.length}</p>
        </div>
        <div
          className="card col-sm"
          style={{
            backgroundColor: "rgba(254, 226, 226)",
            color: "rgba(153, 27, 27)",
          }}
        >
          <h5 className="fs-3 text">Pending</h5>
          <p>{pending}</p>
        </div>
        <div
          className="card col-sm"
          style={{
            backgroundColor: "rgba(254, 243, 199)",
            color: "rgba(146, 64, 14)",
          }}
        >
          <h5 className="fs-3 text">In Progress</h5>
          <p>{inProgress}</p>
        </div>
        <div
          className="card col-sm"
          style={{
            backgroundColor: "rgba(209, 250, 229)",
            color: "rgba(6, 95, 70)",
          }}
        >
          <h5 className="fs-3 text">Completed</h5>
          <p>{completed}</p>
        </div>
        <div
          className="card col-sm"
          style={{
            backgroundColor: "rgba(224, 231, 255)",
            color: "rgba(55, 48, 163)",
          }}
        >
          <h5 className="fs-3 text">Closed</h5>
          <p>{closed}</p>
        </div>
      </div>
    </>
  );
}
