import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const LoadingSpinnerStyles = makeStyles(() => ({
  loadingStateWrapperDisplay: {
    width: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  loadingStateWrapperDisplayNone: {
    display: "none"
  },
  childrenWapperDisplayNone: {
    display: "none"
  }
}));

const LoadingSpinner = props => {
  const { loadingState, children } = props;
  const {
    loadingStateWrapperDisplay,
    loadingStateWrapperDisplayNone,
    childrenWapperDisplayNone
  } = LoadingSpinnerStyles();

  return (
    <>
      <div
        className={
          loadingState
            ? `${loadingStateWrapperDisplay}`
            : `${loadingStateWrapperDisplayNone}`
        }
      >
        <CircularProgress />
      </div>
      <div className={loadingState ? `${childrenWapperDisplayNone}` : ""}>
        {children}
      </div>
    </>
  );
};

LoadingSpinner.propTypes = {
  loadingState: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]).isRequired
};

export default LoadingSpinner;
