import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import AddIcon from "@material-ui/icons/Add";

import TechniqueList from "./TechniqueList";
import * as utils from "../utils";

const styles = {};

class Technique extends React.Component {
  state = {
    techniqueMenuAnchorElement: null
  };
  handleAddTechniqueMenuClick = event => {
    this.setState({ techniqueMenuAnchorElement: event.currentTarget });
  };
  handleAddTechniqueMenuClose = () => {
    this.setState({ techniqueMenuAnchorElement: null });
  };
  handleAddNewTechniqueClick = (...args) => {
    //onClick={() => onAddClick("Add Next Step", technique.id, "nextSteps")}
    this.props.onAddClick(...args);
  };
  render() {
    const { technique, classes, onTechniqueClick, onAddClick, onEditClick, allTechniques } = this.props;
    const { techniqueMenuAnchorElement } = this.state;

    const groupedTechniques = utils.groupBy(allTechniques, "type");

    if (technique) {
      const notes = technique.notes ? (
        <div>
          <Typography variant="caption">Notes:</Typography>
          <Typography component="p">{technique.notes}</Typography>
        </div>
      ) : null;

      return (
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="headline" component="h2">
                  {technique.name}
                </Typography>
                <Typography className={classes.title} color="textSecondary">
                  {technique.type}
                </Typography>
                <Typography variant="subheading">{technique.variation}</Typography>
                <Typography className={classes.pos} color="textSecondary">
                  {technique.tags}
                </Typography>
                {notes}
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={6} xs={12}>
            <Paper className={classes.paper}>
              <ListSubheader>
                Possible next steps
                <ListItemSecondaryAction className={classes.listItemSecondaryAction}>
                  <IconButton aria-label="Add" onClick={this.handleAddTechniqueMenuClick}>
                    <AddIcon />
                  </IconButton>

                  <Menu
                    id="simple-menu"
                    anchorEl={techniqueMenuAnchorElement}
                    open={techniqueMenuAnchorElement}
                    onClose={this.handleAddTechniqueMenuClose}
                  >
                    {Object.keys(groupedTechniques).map((techniqueType, index) => {
                      const techniqueItems = groupedTechniques[techniqueType].map((t, index) => {
                        const label = t.variation ? `${t.name} (${t.variation})` : t.name;
                        return (
                          <MenuItem key={index} onClick={this.handleAddTechniqueMenuClose}>
                            {label}
                          </MenuItem>
                        );
                      });
                      const menuItems = [
                        <MenuItem key={index} onClick={this.handleAddTechniqueMenuClose}>
                          New technique...
                        </MenuItem>,
                        ...techniqueItems
                      ];
                      return (
                        <span key={index}>
                          <ListSubheader>{techniqueType}</ListSubheader>
                          {menuItems}
                        </span>
                      );
                    })}
                  </Menu>
                </ListItemSecondaryAction>
              </ListSubheader>
              <TechniqueList
                techniques={technique.nextSteps.map(id => allTechniques.find(t => t._id === id))}
                onTechniqueClick={onTechniqueClick}
                onEditClick={onEditClick}
              />
            </Paper>
          </Grid>
          <Grid item md={6} xs={12}>
            <Paper className={classes.paper}>
              <ListSubheader>
                Counters / Escapes
                <ListItemSecondaryAction className={classes.listItemSecondaryAction}>
                  <IconButton aria-label="Add" onClick={() => onAddClick("Add Counter", technique.id, "counters")}>
                    <AddIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListSubheader>
              <TechniqueList
                techniques={technique.counters.map(id => allTechniques.find(t => t._id === id))}
                onTechniqueClick={onTechniqueClick}
                onEditClick={onEditClick}
              />
            </Paper>
          </Grid>
        </Grid>
      );
    }

    return null;
  }
}

Technique.propTypes = {
  technique: PropTypes.object,
  classes: PropTypes.object.isRequired,
  onTechniqueClick: PropTypes.func.isRequired,
  onAddClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
  allTechniques: PropTypes.array.isRequired
};

export default withStyles(styles)(Technique);
