import "./App.css";
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Add from "./add";
import Edit from "./edit";
import Home from "./home";
import Table from "./table";
import Login from "./login";
import Register from "./register";
import Contact from "./contact";
import PrivateHOC from "./hoc/privateRoutes";
import PublicHOC from "./hoc/publicRoutes";
import View from "./view";
import ContactList from "./contactList";
import EditContact from "./editContact";

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/home" component={Home} />
          <PublicHOC path="/login" component={Login} />
          <PublicHOC path="/register" component={Register} />
          <PrivateHOC exact path="/contacts" component={ContactList} />
          <Route path="/contact-us" component={Contact} />
          <PrivateHOC path="/contacts/edit/:id" component={EditContact} />
          <PrivateHOC exact path="/incidents" component={Table} />
          <PrivateHOC path="/incidents/create" component={Add} />
          <PrivateHOC path="/incidents/view/:id" component={View} />
          <PrivateHOC path="/incidents/edit/:id" component={Edit} />
        </Switch>
      </Router>
    );
  }
}
