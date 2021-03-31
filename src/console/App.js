import "./App.css";
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Add from "./add";
import Edit from "./edit";
import Dashboard from "./dashboard";
import Table from "./table";
import Login from "./login";
import Register from "./register";
import Contact from "./contact";
import PrivateHOC from "./hoc/privateRoutes";
import PublicHOC from "./hoc/publicRoutes";

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/home" component={Dashboard} />
          <PublicHOC path="/login" component={Login} />
          <PublicHOC path="/register" component={Register} />
          <Route path="/contact-us" component={Contact} />
          <PrivateHOC exact path="/incidents" component={Table} />
          <PrivateHOC path="/incidents/create" component={Add} />
          <PrivateHOC path="/incidents/edit/:id" component={Edit} />
        </Switch>
      </Router>
    );
  }
}
