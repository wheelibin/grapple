import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import TechniqueDialog from "./TechniqueDialog";
import TechniqueList from "./TechniqueList";
import Technique from "./Technique";
//import data from "../data";
import http from "../http";

const styles = {
  root: {
    width: "calc(100% + 0px)"
  }
};

class Main extends Component {
  state = { techniques: [], selectedTechnique: null, techniqueDialogOpen: false, techniqueDialogTitle: "", techniqueDialogData: {} };
  async componentDidMount() {
    const result = await http.get("/techniques");
    console.log("Read techniques", result.data);
    this.setState({ techniques: result.data });
  }
  handleTechniqueClick = technique => {
    this.setState({ selectedTechnique: technique });
  };
  handleAddButtonClick = (dialogTitle, parent, entity) => {
    this.setState({ techniqueDialogOpen: true, techniqueDialogTitle: dialogTitle, techniqueDialogData: { parent, entity } });
  };
  handleTechniqueDialogCancel = () => {
    this.setState({ techniqueDialogOpen: false });
  };
  handleTechniqueDialogSubmit = async (data, entityData) => {
    const addResult = await http.post("/techniques", { data, entityData, userId: this.props.user.userId });
    let techniques = [...this.state.techniques];
    if (addResult.status === 200) {
      techniques.push(addResult.data);
    }

    this.setState({ techniqueDialogOpen: false, techniques });
  };

  render() {
    const { classes } = this.props;
    const { techniques, selectedTechnique, techniqueDialogOpen, techniqueDialogTitle, techniqueDialogData } = this.state;
    return (
      <Grid container className={classes.root} spacing={16} alignItems="stretch" direction="row">
        <Grid item md={3}>
          <Paper className={classes.paper}>
            <TechniqueList
              techniques={techniques}
              onTechniqueClick={this.handleTechniqueClick}
              onAddClick={() => this.handleAddButtonClick("Add Technique")}
            />
          </Paper>
        </Grid>
        <Grid item md={9}>
          <Technique technique={selectedTechnique} onTechniqueClick={this.handleTechniqueClick} onAddClick={this.handleAddButtonClick} />
        </Grid>
        <TechniqueDialog
          open={techniqueDialogOpen}
          title={techniqueDialogTitle}
          onCancel={this.handleTechniqueDialogCancel}
          onSubmit={this.handleTechniqueDialogSubmit}
          entityData={techniqueDialogData}
        />
      </Grid>
    );
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Main);
