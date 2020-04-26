import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { useValidateInput } from "../../customHooks";

const ReviewInputBoxStyles = makeStyles(() => ({
  reviewInputBoxWrapper: {
    paddingBottom: "1rem"
  },
  reviewOpenCloseButton: {
    width: "100%",
    fontSize: "1rem",
    background: "inherit",
    border: "none",
    boxShadow: "none",
    borderRadius: 0,
    padding: 0,
    cursor: "pointer",
    paddingBottom: "0.3rem",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    textAlign: "center"
  },
  reviewContentInputBox: {
    paddingBottom: "0.3rem"
  }
}));

const ReviewInputBox = () => {
  const {
    reviewInputBoxWrapper,
    reviewOpenCloseButton,
    reviewContentInputBox
  } = ReviewInputBoxStyles();
  const [isOpen, setIsOpen] = useState(false);
  const reviewContent = useValidateInput("", [
    {
      validate: val => !(val === ""),
      validationFalse: "리뷰를 입력해 주세요"
    }
  ]);

  const openReviewInputBox = () => setIsOpen(true);
  const closeReviewInputBox = () => setIsOpen(false);

  const updateAndValidateReview = event => {
    reviewContent.setValue(event.target.value);
    reviewContent.validateAndSetFeedBackMsg(event.target.value);
  };

  const submitReview = event => {
    event.preventDefault();
    if (reviewContent.validateAndSetFeedBackMsg()) {
      alert(reviewContent.value);
    }
  };

  return (
    <div className={reviewInputBoxWrapper}>
      {isOpen ? (
        <>
          <button
            type="button"
            className={reviewOpenCloseButton}
            onClick={closeReviewInputBox}
          >
            리뷰작성취소
          </button>
          <TextField
            className={reviewContentInputBox}
            placeholder="리뷰를 입력해주세요"
            value={reviewContent.value}
            onChange={updateAndValidateReview}
            error={!reviewContent.validation}
            helperText={reviewContent.feedbackMsg || " "}
            multiline
            fullWidth
            rows="10"
          />
          <button type="submit" onClick={submitReview}>
            리뷰작성
          </button>
        </>
      ) : (
        <button
          type="button"
          className={reviewOpenCloseButton}
          onClick={openReviewInputBox}
        >
          리뷰작성하기
        </button>
      )}
    </div>
  );
};

export default ReviewInputBox;
