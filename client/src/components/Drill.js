import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
import brown from "@material-ui/core/colors/brown";

const styles = {
  step: {
    backgroundColor: red[300]
  },
  opponentStep: {
    backgroundColor: brown[300]
  }
};

const Drill = props => {
  const { drill, allTechniques, classes } = props;

  if (drill) {
    const steps = drill.steps.map((step, index) => {
      const technique = allTechniques.find(t => t._id === step.techniqueId);
      const cardClass = drill.isOpponent ? classes.opponentStep : classes.step;
      return (
        <Card key={index} className={cardClass}>
          <CardContent>
            <Typography variant="headline">{technique.name}</Typography>
          </CardContent>
        </Card>
      );
    });

    return (
      <Grid container spacing={16} alignItems="center" justify="center">
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="headline">{drill.name}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          {steps}
        </Grid>
      </Grid>
    );
  }

  return null;
};

export default withStyles(styles)(Drill);
