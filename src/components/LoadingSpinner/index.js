import React from "react";
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

const LoadingSpinner = () => {
  const { loadingStateWrapper } = LoadingSpinnerStyles();

  return (
    <div className={`${loadingStateWrapper}`}>
      <CircularProgress />
    </div>
  );
};

export default LoadingSpinner;
