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

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/home" component={Dashboard} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/contact-us" component={Contact} />
          <PrivateHOC exact path="/incidents" component={Table} />
          <PrivateHOC path="/incidents/create" component={Add} />
          <PrivateHOC path="/incidents/edit/:id" component={Edit} />
        </Switch>
      </Router>
    );
  }
}
