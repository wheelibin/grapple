import React from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
// import ListItemIcon from "@material-ui/core/ListItemIcon";
// import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

const DrillList = props => {
  const { drills, onDrillClick } = props;
  return (
    <List component="nav">
      {drills.map((d, index) => {
        return (
          <ListItem onClick={() => onDrillClick(d)} key={index} button>
            {/* <ListItemIcon color="secondary">{icon}</ListItemIcon> */}
            <ListItemText primary={d.name} />
            {/* <ListItemSecondaryAction >
              <IconButton onClick={() => onEditClick(t)} aria-label="Edit" color="secondary">
                <EditIcon />
              </IconButton>
              <IconButton aria-label="Delete" color="secondary">
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction> */}
          </ListItem>
        );
      })}
    </List>
  );
};

export default DrillList;
