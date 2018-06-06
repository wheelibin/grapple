import React from "react";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

const TechniqueActions = props => {
  const { onAddClick } = props;
  return (
    <Button onClick={onAddClick} mini variant="fab" color="primary" aria-label="add">
      <AddIcon />
    </Button>
  );
};

TechniqueActions.propTypes = {
  onAddClick: PropTypes.func.isRequired
};

export default TechniqueActions;
