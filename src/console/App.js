import "./App.css";
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Add from "./add";
import Edit from "./edit";
import Dashboard from "./dashboard";
import Table from "./table";

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/home" component={Dashboard} />
          <Route exact path="/incidents" component={Table} />
          <Route path="/incidents/create" component={Add} />
          <Route path="/incidents/edit/:id" component={Edit} />
        </Switch>
      </Router>
    );
  }
}
