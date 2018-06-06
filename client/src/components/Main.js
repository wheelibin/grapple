import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";

import AddIcon from "@material-ui/icons/Add";

import TechniqueDialog from "./TechniqueDialog";
import TechniqueList from "./TechniqueList";
import Technique from "./Technique";

import http from "../http";

const styles = {
  root: {
    width: "calc(100% + 0px)"
  }
};

class Main extends Component {
  state = {
    techniques: [],
    selectedTechnique: null,
    techniqueDialogOpen: false,
    techniqueDialogTitle: "",
    techniqueDialogData: {},
    techniqueDialogTechnique: null
  };
  async componentDidMount() {
    const result = await http.get("/techniques");
    this.setState({ techniques: result.data });
  }
  handleTechniqueClick = technique => {
    this.setState({ selectedTechnique: technique });
  };
  handleAddButtonClick = (dialogTitle, parent, entity) => {
    this.setState({
      techniqueDialogOpen: true,
      techniqueDialogTitle: dialogTitle,
      techniqueDialogData: { parent, entity },
      techniqueDialogTechnique: null
    });
  };
  handleEditButtonClick = technique => {
    this.setState({
      techniqueDialogOpen: true,
      techniqueDialogTitle: "Edit Technique",
      techniqueDialogData: {},
      techniqueDialogTechnique: technique
    });
  };
  handleTechniqueDialogCancel = () => {
    this.setState({ techniqueDialogOpen: false });
  };
  handleTechniqueDialogSubmit = async (data, entityData) => {
    const addResult = await http.post("/techniques", { data, entityData, userId: this.props.user.userId });
    let techniques = [...this.state.techniques];
    let selectedTechnique = { ...this.state.selectedTechnique };
    if (addResult.status === 200) {
      techniques.push(addResult.data);
      selectedTechnique[entityData.entity].push(addResult.data._id);
    }
    this.setState({ techniqueDialogOpen: false, techniques });
  };

  render() {
    const { classes } = this.props;
    const { techniques, selectedTechnique, techniqueDialogOpen, techniqueDialogTitle, techniqueDialogData, techniqueDialogTechnique } = this.state;
    return (
      <Grid container className={classes.root} spacing={16} alignItems="stretch" direction="row">
        <Grid item md={3}>
          <Grid item md={12}>
            <Paper className={classes.paper}>
              <ListSubheader>
                Drills
                <ListItemSecondaryAction className={classes.listItemSecondaryAction}>
                  <IconButton aria-label="Add">
                    <AddIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListSubheader>
            </Paper>
          </Grid>
          <Grid item md={12}>
            <Paper className={classes.paper}>
              <ListSubheader>
                All Techniques
                <ListItemSecondaryAction className={classes.listItemSecondaryAction}>
                  <IconButton aria-label="Add" onClick={() => this.handleAddButtonClick("Add Technique")}>
                    <AddIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListSubheader>
              <TechniqueList techniques={techniques} onTechniqueClick={this.handleTechniqueClick} onEditClick={this.handleEditButtonClick} />
            </Paper>
          </Grid>
        </Grid>
        <Grid item md={9}>
          <Technique
            allTechniques={techniques}
            technique={selectedTechnique}
            onTechniqueClick={this.handleTechniqueClick}
            onAddClick={this.handleAddButtonClick}
            onEditClick={this.handleEditButtonClick}
          />
        </Grid>
        <TechniqueDialog
          open={techniqueDialogOpen}
          title={techniqueDialogTitle}
          onCancel={this.handleTechniqueDialogCancel}
          onSubmit={this.handleTechniqueDialogSubmit}
          entityData={techniqueDialogData}
          technique={techniqueDialogTechnique}
        />
      </Grid>
    );
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Main);
