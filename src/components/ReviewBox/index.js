import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const ReviewBoxStyles = makeStyles(() => ({
  reviewBoxWrapper: {
    display: "flex",
    width: "20rem",
    paddingBottom: "15px"
  },
  reviewBoxReviewerId: {
    width: "20rem",
    paddingBottom: "5px"
  },
  reviewBoxReviewerStar: {
    width: "300px",
    height: "1.3rem",
    paddingBottom: "5px"
  },
  reviewBoxReviewContent: {
    width: "20rem",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    paddingBottom: "5px"
  }
}));

const ReviewBox = () => {
  const {
    reviewBoxWrapper,
    reviewBoxReviewerId,
    reviewBoxReviewerStar,
    reviewBoxReviewContent
  } = ReviewBoxStyles();

  return (
    <>
      <div className={reviewBoxWrapper}>
        <div className={reviewBoxReviewerId}>Place name</div>
        <div className={reviewBoxReviewerStar}>star</div>
        <div className={reviewBoxReviewContent}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </div>
      </div>
    </>
  );
};

export default ReviewBox;
