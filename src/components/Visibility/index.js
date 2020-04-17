import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

const VisibilityStyles = makeStyles(() => ({
  displayNone: {
    display: "none"
  }
}));

const Visibility = props => {
  const { isVisible, children } = props;
  const { displayNone } = VisibilityStyles();

  return <div className={isVisible ? "" : displayNone}>{children}</div>;
};

Visibility.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]).isRequired
};

export default Visibility;
