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

import AddIcon from "@material-ui/icons/Add";

import TechniqueList from "./TechniqueList";

// const styles = {
//   card: {
//     minWidth: 275
//   },
//   bullet: {
//     display: "inline-block",
//     margin: "0 2px",
//     transform: "scale(0.8)"
//   },
//   title: {
//     marginBottom: 16,
//     fontSize: 14
//   },
//   pos: {
//     marginBottom: 12
//   }
// };

const styles = {};

const Technique = props => {
  const { technique, classes, onTechniqueClick, onAddClick, onEditClick, allTechniques } = props;

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
              <Typography className={classes.title} color="textSecondary">
                {technique.type}
              </Typography>
              <Typography variant="headline" component="h2">
                {technique.name}
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
                <IconButton aria-label="Add" onClick={() => onAddClick("Add Next Step", technique.id, "nextSteps")}>
                  <AddIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListSubheader>
            <TechniqueList techniques={technique.nextSteps.map(id => allTechniques.find(t => t._id === id))} onTechniqueClick={onTechniqueClick} />
          </Paper>
        </Grid>
        <Grid item md={6} xs={12}>
          <Paper className={classes.paper}>
            <ListSubheader>
              Counters
              <ListItemSecondaryAction className={classes.listItemSecondaryAction}>
                <IconButton aria-label="Add" onClick={() => onAddClick("Add Counter", technique.id, "counters")}>
                  <AddIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListSubheader>
            <TechniqueList techniques={technique.counters.map(id => allTechniques.find(t => t._id === id))} onTechniqueClick={onTechniqueClick} />
          </Paper>
        </Grid>
      </Grid>
    );
  }

  return null;
};

Technique.propTypes = {
  technique: PropTypes.object,
  classes: PropTypes.object.isRequired,
  onTechniqueClick: PropTypes.func.isRequired,
  onAddClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
  allTechniques: PropTypes.array.isRequired
};

export default withStyles(styles)(Technique);
