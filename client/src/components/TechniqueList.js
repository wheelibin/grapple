import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/DeleteForever";

import SubmissionIcon from "@material-ui/icons/NewReleases";
import MovementIcon from "@material-ui/icons/SwapHoriz";
import TakedownIcon from "@material-ui/icons/SwapVert";
import PositionIcon from "@material-ui/icons/AllOut";

import * as utils from "../utils";

const icons = {
  movement: <MovementIcon />,
  submission: <SubmissionIcon />,
  throw: <TakedownIcon />,
  position: <PositionIcon />
};

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  listItemSecondaryAction: {
    visibility: "hidden",
    opacity: 0,
    transition: "visibility 0s linear 0.5s, opacity 0.5s"
  },
  listItem: {
    "&:hover $listItemSecondaryAction": {
      visibility: "inherit",
      opacity: 1,
      transition: "visibility 0s linear 0s, opacity 0.5s"
    }
  },
  techniqueTypeSubHeader: {
    color: theme.palette.secondary.light
  }
});

class TechniqueList extends React.Component {
  render() {
    const { techniques, onTechniqueClick, onEditClick, classes } = this.props;
    const groupedTechniques = utils.groupBy(techniques, "type");

    return (
      <List component="nav" className="technique-list">
        {Object.keys(groupedTechniques).map((techniqueType, index) => {
          const listItems = groupedTechniques[techniqueType].map((t, index) => {
            if (t !== undefined) {
              const label = t.variation ? `${t.name} (${t.variation})` : t.name;
              const icon = icons[t.type];
              return (
                <ListItem
                  key={index}
                  button
                  onClick={() => onTechniqueClick(t)}
                  classes={{
                    container: classes.listItem
                  }}
                  className="technique-list__technique"
                >
                  <ListItemIcon color="secondary">{icon}</ListItemIcon>
                  <ListItemText primary={label} />
                  <ListItemSecondaryAction className={classes.listItemSecondaryAction}>
                    <IconButton className="technique-list__technique-edit-button" onClick={() => onEditClick(t)} aria-label="Edit" color="secondary">
                      <EditIcon />
                    </IconButton>
                    <IconButton aria-label="Delete" color="secondary">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            } else {
              return null;
            }
          });

          return (
            <List key={index} className="technique-list__typelist">
              <ListSubheader className={classes.techniqueTypeSubHeader}>{techniqueType}</ListSubheader>
              {listItems}
            </List>
          );
        })}
      </List>
    );
  }
}

TechniqueList.propTypes = {
  classes: PropTypes.object.isRequired,
  techniques: PropTypes.array.isRequired,
  onTechniqueClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired
};

export default withStyles(styles)(TechniqueList);
