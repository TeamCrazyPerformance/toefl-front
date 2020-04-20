import React from "react";
import PropTypes from "prop-types";
import ReviewBox from "../ReviewBox";

const ReviewsBox = props => {
  const { reviews } = props;

  return (
    <>
      {reviews.length ? (
        reviews.map(review => {
          return <ReviewBox key={review.reviewerId} />;
        })
      ) : (
        <div>아직 리뷰가 없습니다.</div>
      )}
    </>
  );
};

ReviewsBox.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      reviewerId: PropTypes.string.isRequired,
      score: PropTypes.number.isRequired,
      content: PropTypes.string.isRequired
    })
  ).isRequired
};

export default ReviewsBox;
