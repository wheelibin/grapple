import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";
import { Route } from "react-router-dom";

import Login from "./components/Login";
import Main from "./components/Main";
import Navbar from "./components/Navbar";

const styles = {};

class App extends Component {
  state = { selectedTechnique: null, user: { userId: 1, username: "Jon Wheeler" } };

  render() {
    const { user } = this.state;
    return (
      <div>
        <Navbar user={user} />
        <Route exact path="/" render={props => <Main {...props} user={user} />} />
        <Route path="/login" component={Login} />
      </div>
    );
  }
}

export default withStyles(styles)(App);
