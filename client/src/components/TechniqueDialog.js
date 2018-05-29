import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

class TechniqueDialog extends React.Component {
  state = {
    open: false
  };

  render() {
    const { classes, open, onCancel, onSubmit } = this.props;
    return (
      <Dialog open={open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Technique</DialogTitle>
        <DialogContent>
          <DialogContentText>Describe the technique is as much or as little detail as you want</DialogContentText>
          <TextField
            autoFocus
            required
            id="select-currency"
            select
            label="Select"
            className={classes.textField}
            value={this.state.currency}
            //onChange={this.handleChange("currency")}
            SelectProps={{
              MenuProps: {
                className: classes.menu
              }
            }}
            helperText="Please select your currency"
            margin="normal"
          >
            {[{ value: "Position", label: "Position" }].map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField required margin="dense" id="name" label="Name of technique" type="text" fullWidth />
          <TextField margin="dense" id="variation" label="Variation" type="text" fullWidth />

          <TextField margin="dense" id="notes" label="Notes" type="text" fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={onSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles()(TechniqueDialog);
