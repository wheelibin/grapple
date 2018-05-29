import React, { Component } from "react";
import "./App.css";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import TechniqueList from "./components/TechniqueList";
import Technique from "./components/Technique";
import data from "./data";

import Login from "./components/Login";
import Main from "./components/Main";
import Navbar from "./components/Navbar";

const styles = {};

class App extends Component {
  state = { selectedTechnique: null, user: { userId: 1, username: "Jon Wheeler" } };
  handleTechniqueClick = technique => {
    this.setState({ selectedTechnique: technique });
  };
  render() {
    const { classes } = this.props;
    const { selectedTechnique, user } = this.state;
    return (
      <div>
        <Navbar user={user} />
        <Route exact path="/" component={Main} />
        <Route path="/login" component={Login} />
      </div>
    );
  }
}

export default withStyles(styles)(App);
