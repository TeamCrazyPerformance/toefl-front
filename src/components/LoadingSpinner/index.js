import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const LoadingSpinnerStyles = makeStyles(() => ({
  loadingStateWrapper: {
    width: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  }
}));

const LoadingSpinner = props => {
  const { loadingState, children } = props;
  const { loadingStateWrapper } = LoadingSpinnerStyles();

  return (
    <>
      {loadingState === true ? (
        <div className={`${loadingStateWrapper}`}>
          <CircularProgress />
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

LoadingSpinner.propTypes = {
  loadingState: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]).isRequired
};

export default LoadingSpinner;
