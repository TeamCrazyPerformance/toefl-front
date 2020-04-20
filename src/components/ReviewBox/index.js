import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const ReviewBoxStyles = makeStyles(() => ({
  reviewBoxWrapper: {
    width: "100%",
    paddingBottom: "1rem"
  },
  reviewBoxReviewerId: {
    width: "100%",
    paddingBottom: "0.3rem"
  },
  reviewBoxReviewerStar: {
    width: "100%",
    paddingBottom: "0.3rem"
  },
  reviewBoxReviewContent: {
    width: "100%",
    paddingBottom: "0.3rem"
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
    <div className={reviewBoxWrapper}>
      <div className={reviewBoxReviewerId}>Reviewer id</div>
      <div className={reviewBoxReviewerStar}>star</div>
      <div className={reviewBoxReviewContent}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. consectetur adipiscing elit, sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua.
      </div>
    </div>
  );
};

export default ReviewBox;
