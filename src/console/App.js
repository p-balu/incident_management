import "./App.css";
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Add from "./add";
import Edit from "./edit";
import Dashboard from "./dashboard";

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/home" component={Dashboard} />
          <Route exact path="/incident-create" component={Add} />
          <Route exact path="/edit/:id" component={Edit} />
        </Switch>
      </Router>
    );
  }
}
