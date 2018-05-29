import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import TechniqueList from "./TechniqueList";
import Technique from "./Technique";
import data from "../data";

const styles = {};

class Main extends Component {
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

export default withStyles(styles)(Main);
