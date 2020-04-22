import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ReviewBox from "../ReviewBox";

const ReviewsBox = props => {
  const { focusedPlaceId, getPlaceReview } = props;

  const [reviews, setRreviews] = useState([]);
  const [page, setPage] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);

  const PAGE_PER_COUNT = 10;

  useEffect(() => {
    if (focusedPlaceId) {
      getPlaceReview(focusedPlaceId, page).then(response => {
        if (!(response instanceof Error)) {
          const remainReviews = response.totalReview - PAGE_PER_COUNT * page;
          if (remainReviews < 0) setHasNextPage(false);
          else setHasNextPage(true);

          setRreviews([...response.reviewList]);
        }
      });
    }

    return () => {
      setRreviews([]);
      setPage(0);
      setHasNextPage(false);
    };
  }, [focusedPlaceId, page]);

  const getPreviousReview = () => setPage(page - 1);

  const getNextReview = () => setPage(page + 1);

  return (
    <>
      {reviews.length ? (
        reviews.map(review => {
          return <ReviewBox key={review.reviewerId} />;
        })
      ) : (
        <div>아직 리뷰가 없습니다.</div>
      )}

      {page === 0 ? null : (
        <button type="button" onClick={getPreviousReview}>
          이전 리뷰
        </button>
      )}
      {hasNextPage ? (
        <button type="button" onClick={getNextReview}>
          다음 리뷰
        </button>
      ) : null}
    </>
  );
};

ReviewsBox.propTypes = {
  focusedPlaceId: PropTypes.string.isRequired,
  getPlaceReview: PropTypes.func.isRequired
};

export default ReviewsBox;
