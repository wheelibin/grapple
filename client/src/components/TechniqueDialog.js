import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const techniqueTypes = [
  { value: "position", label: "Position" },
  { value: "submission", label: "Submission" },
  { value: "movement", label: "Movement" },
  { value: "throw", label: "Throw / Takedown" }
];

class TechniqueDialog extends React.Component {
  state = {
    open: false,
    data: {
      type: "",
      name: "",
      variation: "",
      notes: ""
    }
  };
  handleInputChange = e => {
    this.setState({ data: { ...this.state.data, [e.target.name]: e.target.value } });
  };
  handleSubmit = () => {
    this.props.onSubmit(this.state.data, this.props.entityData);
  };

  render() {
    const { classes, open, onCancel, title } = this.props;
    return (
      <form>
        <Dialog open={open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">{title}</DialogTitle>
          <DialogContent>
            <DialogContentText>Describe the technique</DialogContentText>

            <TextField
              autoFocus
              required
              id="technique-type"
              name="type"
              select
              label="Type"
              className={classes.textField}
              value={this.state.data.type}
              onChange={this.handleInputChange}
              // SelectProps={{
              //   MenuProps: {
              //     className: classes.menu
              //   }
              // }}
              helperText="The type of technique"
              margin="normal"
            >
              {techniqueTypes.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              onChange={this.handleInputChange}
              value={this.state.data.name}
              name="name"
              required
              margin="dense"
              id="name"
              label="Name of technique"
              type="text"
              fullWidth
            />
            <TextField
              onChange={this.handleInputChange}
              value={this.state.data.variation}
              name="variation"
              margin="dense"
              id="variation"
              label="Variation"
              type="text"
              fullWidth
            />
            <TextField
              onChange={this.handleInputChange}
              value={this.state.data.notes}
              name="notes"
              margin="dense"
              id="notes"
              label="Notes"
              type="text"
              fullWidth
              multiline
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={onCancel} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    );
  }
}

TechniqueDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  entityData: PropTypes.object.isRequired
};

export default withStyles()(TechniqueDialog);
