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
    backgroundColor: red[300],
    marginBottom: 16
  },
  opponentStep: {
    backgroundColor: brown[300],
    marginBottom: 16
  }
};

const Drill = props => {
  const { drill, allTechniques, classes } = props;

  if (drill) {
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
          {drill.steps.map((step, index) => {
            const technique = allTechniques.find(t => t._id === step.techniqueId);
            const cardClass = step.isOpponent ? classes.opponentStep : classes.step;
            const who = step.isOpponent ? "Opponent" : "You";
            return (
              <Card key={index} className={cardClass}>
                <CardContent>
                  <Typography variant="headline">{technique.name}</Typography>
                  <Typography variant="caption" align="right">
                    {who}
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
        </Grid>
      </Grid>
    );
  }

  return null;
};

export default withStyles(styles)(Drill);
