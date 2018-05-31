import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";

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
  }
});

class TechniqueList extends React.Component {
  render() {
    const { techniques, onTechniqueClick, onAddClick } = this.props;

    return (
      <div>
        <List component="nav">
          {techniques.map((t, index) => {
            const label = t.variation ? `${t.name} (${t.variation})` : t.name;
            const icon = icons[t.type];
            return (
              <ListItem key={index} button onClick={() => onTechniqueClick(t)}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={label} />
              </ListItem>
            );
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
