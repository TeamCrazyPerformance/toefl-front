import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

const DetailPlaceBoxStyles = makeStyles(() => ({
  placeInfoBoxWrapper: {
    width: "100%",
    marginBottom: "1rem",
    border: "0.1rem solid black"
  },
  placeName: {
    width: "100%",
    fontSize: "2rem",
    background: "inherit",
    border: "none",
    boxShadow: "none",
    borderRadius: 0,
    padding: 0,
    paddingBottom: "0.3rem",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  placeRatingWrapper: {
    display: "flex",
    paddingBottom: "0.3rem"
  },
  placeRating: {
    width: "2.1rem",
    fontSize: "1.3rem",
    paddingRight: "0.6rem"
  },
  placeRatingStar: {
    width: "calc(100%-35px)",
    height: "1.3rem"
  },
  placeLocationPhoneNum: {
    width: "100%",
    paddingRight: "0.6rem"
  },
  placeLocationAddress: {
    width: "100%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  goBackButton: {
    width: "100%",
    fontSize: "0.8rem",
    background: "inherit",
    border: "none",
    boxShadow: "none",
    borderRadius: 0,
    padding: 0,
    cursor: "pointer",
    paddingBottom: "0.3rem",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  }
}));

const DetailPlaceBox = props => {
  const {
    placeInfoBoxWrapper,
    placeName,
    placeRatingWrapper,
    placeRating,
    placeRatingStar,
    placeLocationPhoneNum,
    placeLocationAddress,
    goBackButton
  } = DetailPlaceBoxStyles();
  const { place, getPlaceRating, setFocusedPlaceId } = props;

  const [customPlaceRating, setCustomPlaceRating] = useState(0);
  useEffect(() => {
    if (!place.placeId) return;
    getPlaceRating(place.placeId).then(rating => {
      if (!isNaN(rating)) setCustomPlaceRating(rating);
      else setCustomPlaceRating(0);
    });
  }, [place]);

  return (
    <>
      <button
        className={goBackButton}
        type="button"
        onClick={() => setFocusedPlaceId("")}
      >
        목록으로 돌아가기
      </button>
      <div className={placeInfoBoxWrapper}>
        <div className={placeName}>
          Place name lorem idunt ut laboreadipiscing elit
        </div>
        <div className={placeRatingWrapper}>
          <div className={placeRating}>{customPlaceRating}</div>
          <div className={placeRatingStar}>star</div>
        </div>
        <div className={placeLocationPhoneNum}>0100000000000</div>
        <div className={placeLocationAddress}>
          locat lorem sit amet, consectetur adipiscing elit, sed
        </div>
      </div>
    </>
  );
};

DetailPlaceBox.propTypes = {
  place: PropTypes.shape({
    name: PropTypes.string,
    placeId: PropTypes.string,
    location: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number
    })
  }),
  getPlaceRating: PropTypes.func.isRequired,
  setFocusedPlaceId: PropTypes.func.isRequired
};

DetailPlaceBox.defaultProps = {
  place: {
    name: "",
    placeId: "",
    location: {
      lat: 0,
      lng: 0
    }
  }
};

export default DetailPlaceBox;
