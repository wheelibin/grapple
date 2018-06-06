import React, { Component } from "react";
import { MuiThemeProvider, createMuiTheme, withStyles } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
import brown from "@material-ui/core/colors/brown";

import { Route } from "react-router-dom";

import Login from "./components/Login";
import Main from "./components/Main";
import Navbar from "./components/Navbar";

const styles = {};

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: { main: red[300] },
    secondary: { main: brown[300] }
  }
});

class App extends Component {
  state = { selectedTechnique: null, user: { userId: 1, username: "Jon Wheeler" } };

  render() {
    const { user } = this.state;
    return (
      <MuiThemeProvider theme={theme}>
        <Navbar user={user} />
        <Route exact path="/" render={props => <Main {...props} user={user} />} />
        <Route path="/login" component={Login} />
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(App);
