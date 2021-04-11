import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateHOC = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (localStorage.getItem("jwtToken") === null) {
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        } else {
          return <Component {...props} />;
        }
      }}
    />
  );
};

export default PrivateHOC;
