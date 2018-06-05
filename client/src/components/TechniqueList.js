import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/DeleteForever";

import SubmissionIcon from "@material-ui/icons/NewReleases";
import MovementIcon from "@material-ui/icons/SwapHoriz";
import TakedownIcon from "@material-ui/icons/SwapVert";
import PositionIcon from "@material-ui/icons/AllOut";

import TechniqueActions from "./TechniqueActions";

const icons = {
  movement: <MovementIcon />,
  submission: <SubmissionIcon />,
  takedown: <TakedownIcon />,
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
  }
});

class TechniqueList extends React.Component {
  render() {
    const { techniques, onTechniqueClick, onAddClick, classes } = this.props;
    //console.log("TechniqueList::techniques", techniques);
    return (
      <div>
        <List component="nav">
          {techniques.map((t, index) => {
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
                >
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={label} />
                  <ListItemSecondaryAction className={classes.listItemSecondaryAction}>
                    <IconButton aria-label="Edit">
                      <EditIcon />
                    </IconButton>
                    <IconButton aria-label="Delete">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            } else {
              return null;
            }
          })}
        </List>
        <TechniqueActions onAddClick={onAddClick} />
      </div>
    );
  }
}

TechniqueList.propTypes = {
  techniques: PropTypes.array.isRequired,
  onTechniqueClick: PropTypes.func.isRequired,
  onAddClick: PropTypes.func.isRequired
};

export default withStyles(styles)(TechniqueList);
