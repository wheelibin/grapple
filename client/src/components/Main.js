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
import DrillDialog from "./DrillDialog";
import DrillList from "./DrillList";

import http from "../http";

const styles = {
  root: {
    width: "calc(100% + 0px)"
  }
};

class Main extends Component {
  state = {
    techniques: [],
    drills: [],
    selectedTechnique: null,
    techniqueDialogOpen: false,
    techniqueDialogTitle: "",
    techniqueDialogData: {},
    techniqueDialogTechnique: null
  };
  async componentDidMount() {
    const techniques = await http.get("/techniques");
    // const drills = await http.get("/drills");
    const drill = {
      userId: 1,
      name: "Movement Drill 1",
      steps: [
        {
          techniqueId: "5b19384dce9312482c3ec80d",
          isOpponent: true
        },
        {
          techniqueId: "5b1938c0ce9312482c3ec812",
          isOpponent: false
        },
        {
          techniqueId: "5b193886ce9312482c3ec810",
          isOpponent: false
        },
        {
          techniqueId: "5b193891ce9312482c3ec811",
          isOpponent: false
        }
      ]
    };
    this.setState({ techniques: techniques.data, drills: [drill] });
  }
  handleTechniqueClick = technique => {
    this.setState({ selectedTechnique: technique });
  };
  handleAddTechniqueButtonClick = (dialogTitle, parent, entity) => {
    this.setState({
      techniqueDialogOpen: true,
      techniqueDialogTitle: dialogTitle,
      techniqueDialogData: { parent, entity },
      techniqueDialogTechnique: null
    });
  };
  handleAddDrillButtonClick = () => {
    this.setState({
      drillDialogOpen: true,
      drillDialogDrill: null
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
      if (entityData.length) {
        selectedTechnique[entityData.entity].push(addResult.data._id);
      }
    }
    this.setState({ techniqueDialogOpen: false, techniques });
  };

  render() {
    const { classes } = this.props;
    const {
      techniques,
      drills,
      selectedTechnique,
      techniqueDialogOpen,
      techniqueDialogTitle,
      techniqueDialogData,
      techniqueDialogTechnique,
      drillDialogOpen
    } = this.state;

    return (
      <Grid container className={classes.root} spacing={16} alignItems="stretch" direction="row">
        <Grid item md={3}>
          <Grid item md={12}>
            <Paper className={classes.paper}>
              <ListSubheader>
                Drills
                <ListItemSecondaryAction className={classes.listItemSecondaryAction}>
                  <IconButton onClick={this.handleAddDrillButtonClick} aria-label="Add">
                    <AddIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListSubheader>
              <DrillList drills={drills} />
            </Paper>
          </Grid>
          <Grid item md={12}>
            <Paper className={classes.paper}>
              <ListSubheader>
                All Techniques
                <ListItemSecondaryAction className={classes.listItemSecondaryAction}>
                  <IconButton onClick={() => this.handleAddTechniqueButtonClick("Add Technique")} aria-label="Add">
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
            onAddClick={this.handleAddTechniqueButtonClick}
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
        <TechniqueDialog
          open={techniqueDialogOpen}
          title={techniqueDialogTitle}
          onCancel={this.handleTechniqueDialogCancel}
          onSubmit={this.handleTechniqueDialogSubmit}
          entityData={techniqueDialogData}
          technique={techniqueDialogTechnique}
        />
        <DrillDialog open={drillDialogOpen} />
      </Grid>
    );
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Main);
