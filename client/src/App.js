import React, { Component } from "react";
import "./App.css";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import TechniqueList from "./components/TechniqueList";
import Technique from "./components/Technique";
import data from "./data";

const styles = {};

class App extends Component {
  state = { selectedTechnique: null };
  handleTechniqueClick = technique => {
    this.setState({ selectedTechnique: technique });
  };
  render() {
    const { classes } = this.props;
    const { selectedTechnique } = this.state;
    return (
      <Grid container className={classes.root} spacing={16} alignItems="stretch" direction="row">
        <Grid item md={3}>
          <Paper className={classes.paper}>
            <TechniqueList techniques={data} onTechniqueClick={this.handleTechniqueClick} />
          </Paper>
        </Grid>
        <Grid item md={9}>
          <Technique technique={selectedTechnique} onTechniqueClick={this.handleTechniqueClick} />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(App);
