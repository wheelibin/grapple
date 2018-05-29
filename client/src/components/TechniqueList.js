import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";

import SubmissionIcon from "@material-ui/icons/BrokenImage";
import MovementIcon from "@material-ui/icons/TransferWithinAStation";
import TakedownIcon from "@material-ui/icons/DirectionsWalk";
import PositionIcon from "@material-ui/icons/Accessibility";

import TechniqueDialog from "./TechniqueDialog";
import AddIcon from "@material-ui/icons/Add";

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
  state = { addDialogOpen: false };
  handleAddButtonClick = () => {
    this.setState({ addDialogOpen: true });
  };
  handleTechniqueDialogCancel = () => {
    this.setState({ addDialogOpen: false });
  };
  handleTechniqueDialogSubmit = () => {
    this.setState({ addDialogOpen: false });
  };
  render() {
    const { techniques, onTechniqueClick } = this.props;
    const { addDialogOpen } = this.state;
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
        <Button onClick={this.handleAddButtonClick} mini variant="fab" color="primary" aria-label="add">
          <AddIcon />
        </Button>
        <TechniqueDialog open={addDialogOpen} onCancel={this.handleTechniqueDialogCancel} onSubmit={this.handleTechniqueDialogSubmit} />
      </div>
    );
  }
}

TechniqueList.propTypes = {
  techniques: PropTypes.array.isRequired,
  onTechniqueClick: PropTypes.func.isRequired
};

export default withStyles(styles)(TechniqueList);
