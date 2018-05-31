import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import TechniqueList from "./TechniqueList";

import data from "../data";

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
  const { technique, classes, onTechniqueClick, onAddClick } = props;

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
          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.title} color="textSecondary">
                Possible next steps
              </Typography>
              <TechniqueList
                techniques={technique.nextSteps.map(id => data.find(t => t.id === id))}
                onTechniqueClick={onTechniqueClick}
                onAddClick={() => onAddClick("Add Next Step", technique.id, "nextSteps")}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={6} xs={12}>
          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.title} color="textSecondary">
                Counters
              </Typography>
              <TechniqueList
                techniques={technique.counters.map(id => data.find(t => t.id === id))}
                onTechniqueClick={onTechniqueClick}
                onAddClick={() => onAddClick("Add Counter", technique.id, "counters")}
              />
            </CardContent>
          </Card>
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
  onAddClick: PropTypes.func.isRequired
};

export default withStyles(styles)(Technique);
