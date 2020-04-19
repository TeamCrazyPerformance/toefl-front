import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

const DetailPlaceBoxStyles = makeStyles(() => ({
  placeInfoBoxWrapper: {
    width: "100%",
    marginBottom: "15px",
    border: "1px solid black"
  },
  placeName: {
    width: "100%",
    fontSize: "2rem",
    background: "inherit",
    border: "none",
    boxShadow: "none",
    borderRadius: 0,
    padding: 0,
    paddingBottom: "5px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  placeRatingWrapper: {
    display: "flex",
    paddingBottom: "5px"
  },
  placeRating: {
    width: "35px",
    fontSize: "1.3rem",
    paddingRight: "10px"
  },
  placeRatingStar: {
    width: "calc(100%-35px)",
    height: "1.3rem"
  },
  placeLocationPhoneNum: {
    width: "100%",
    paddingRight: "10px"
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
    paddingBottom: "5px",
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
  const { setFocusedPlaceId } = props;

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
          <div className={placeRating}>4.0</div>
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
  setFocusedPlaceId: PropTypes.func.isRequired
};

export default DetailPlaceBox;
