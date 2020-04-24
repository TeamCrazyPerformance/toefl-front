import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

const DetailPlaceInfoBoxStyles = makeStyles(() => ({
  placeInfoBoxWrapper: {
    width: "100%",
    marginBottom: "1rem",
    border: "0.1rem solid black"
  },
  placeName: {
    width: "100%",
    height: "2rem",
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
  placeRating: {
    width: "100%",
    height: "1.3rem",
    fontSize: "1.3rem",
    marginBottom: "15px"
  },
  placeLocationPhoneNum: {
    width: "100%",
    height: "1rem",
    marginBottom: "15px"
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

const DetailPlaceInfoBox = props => {
  const {
    placeInfoBoxWrapper,
    placeName,
    placeRating,
    placeLocationPhoneNum,
    placeLocationAddress,
    goBackButton
  } = DetailPlaceInfoBoxStyles();
  const {
    focusedPlaceId,
    getDetailPlace,
    getPlaceRating,
    setFocusedPlaceId
  } = props;
  const [detailPlace, setDetailPlace] = useState({});
  const [customPlaceRating, setCustomPlaceRating] = useState(0);

  useEffect(() => {
    if (focusedPlaceId) {
      getDetailPlace(focusedPlaceId).then(response => setDetailPlace(response));
      getPlaceRating(focusedPlaceId).then(rating => {
        if (!isNaN(rating)) setCustomPlaceRating(rating);
        else setCustomPlaceRating(0);
      });
    }

    return () => {
      setDetailPlace({
        name: "",
        placeId: "",
        address: "",
        phoneNumber: "",
        location: {
          lat: 0,
          lng: 0
        }
      });
      setCustomPlaceRating(0);
    };
  }, [focusedPlaceId]);

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
        <div className={placeName}>{detailPlace.name}</div>
        <div className={placeRating}>평점: {customPlaceRating}</div>
        <div className={placeLocationPhoneNum}>
          전화번호: {detailPlace.phoneNumber || "X"}
        </div>
        <div className={placeLocationAddress}>주소: {detailPlace.address}</div>
      </div>
    </>
  );
};

DetailPlaceInfoBox.propTypes = {
  focusedPlaceId: PropTypes.string.isRequired,
  getDetailPlace: PropTypes.func.isRequired,
  getPlaceRating: PropTypes.func.isRequired,
  setFocusedPlaceId: PropTypes.func.isRequired
};

export default DetailPlaceInfoBox;
