import React, { Component } from "react";
import PropTypes from "prop-types";
import { MuiThemeProvider, createMuiTheme, withStyles } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
import brown from "@material-ui/core/colors/brown";

import { Route } from "react-router-dom";

import Login from "./components/Login";
import Main from "./components/Main";
import Navbar from "./components/Navbar";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: { main: red[300] },
    secondary: { main: brown[300] }
  }
});

const styles = {
  bodySection: {
    marginTop: 64
  }
};

class App extends Component {
  state = { selectedTechnique: null, user: { userId: 1, username: "Jon Wheeler" } };

  render() {
    const { classes } = this.props;
    const { user } = this.state;
    return (
      <MuiThemeProvider theme={theme}>
        <Navbar user={user} />
        <section className={classes.bodySection}>
          <Route exact path="/" render={props => <Main {...props} user={user} />} />
          <Route path="/login" component={Login} />
        </section>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
