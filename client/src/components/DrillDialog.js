import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

class DrillDialog extends React.Component {
  state = {
    open: false,
    drill: {
      name: "",
      steps: [
        // {
        //   techniqueId: mongoose.Schema.Types.ObjectId,
        //   isOpponent: Boolean
        // }
      ],
      notes: ""
    }
  };
  static getDerivedStateFromProps(props, state) {
    return { technique: props.technique || state.technique };
  }
  handleInputChange = e => {
    this.setState({ technique: { ...this.state.technique, [e.target.name]: e.target.value } });
  };
  handleSubmit = () => {
    this.props.onSubmit(this.state.technique, this.props.entityData);
  };
  render() {
    const { classes, open, onCancel, title } = this.props;
    return (
      <form>
        <Dialog open={open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">{title}</DialogTitle>
          <DialogContent>
            <DialogContentText>Describe the drill</DialogContentText>

            <TextField
              onChange={this.handleInputChange}
              value={this.state.drill.name}
              name="name"
              required
              margin="dense"
              id="name"
              label="Name/description of drill"
              type="text"
              fullWidth
            />

            <TextField
              onChange={this.handleInputChange}
              value={this.state.drill.notes}
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

// DrillDialog.propTypes = {
//   classes: PropTypes.object.isRequired,
//   open: PropTypes.bool,
//   onCancel: PropTypes.func.isRequired,
//   onSubmit: PropTypes.func.isRequired,
//   title: PropTypes.string.isRequired,
//   entityData: PropTypes.object.isRequired,
//   technique: PropTypes.object
// };

export default withStyles()(DrillDialog);
