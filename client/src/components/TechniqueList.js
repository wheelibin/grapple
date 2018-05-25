import React from "react";
import PropTypes from "prop-types";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";

import SubmissionIcon from "@material-ui/icons/BrokenImage";
import MovementIcon from "@material-ui/icons/TransferWithinAStation";
import TakedownIcon from "@material-ui/icons/DirectionsWalk";
import PositionIcon from "@material-ui/icons/Accessibility";

const icons = {
  movement: <MovementIcon />,
  submission: <SubmissionIcon />,
  takedown: <TakedownIcon />,
  position: <PositionIcon />
};

const TechniqueList = props => {
  const { techniques, onTechniqueClick } = props;
  return (
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
  );
};

TechniqueList.propTypes = {
  techniques: PropTypes.array.isRequired,
  onTechniqueClick: PropTypes.func.isRequired
};

export default TechniqueList;
