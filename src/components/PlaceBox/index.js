import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

const PlaceBoxStyles = makeStyles(() => ({
  placeBoxWrapper: {
    width: "100%",
    marginBottom: "1rem",
    border: "1px solid black"
  },
  placeBoxHovered: {
    background: "grey"
  },
  placeName: {
    width: "100%",
    fontSize: "2rem",
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
    textAlign: "left"
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
    width: "calc(100%-2.1rem)",
    height: "1.3rem"
  },
  placeLocationAddress: {
    width: "100%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  }
}));

const PlaceBox = props => {
  const {
    placeBoxWrapper,
    placeBoxHovered,
    placeName,
    placeRatingWrapper,
    placeRating,
    placeRatingStar,
    placeLocationAddress
  } = PlaceBoxStyles();
  const { place, hoveredPlaceId, setFocusedPlaceId } = props;

  const focusPlace = () => setFocusedPlaceId(place.placeId);

  return (
    <div
      className={`${placeBoxWrapper} ${hoveredPlaceId === place.placeId &&
        placeBoxHovered}`}
    >
      <button className={placeName} type="button" onClick={focusPlace}>
        Place nameasdfasdfasdfa
      </button>
      <div className={placeRatingWrapper}>
        <div className={placeRating}>4.0</div>
        <div className={placeRatingStar}>star</div>
      </div>
      <div className={placeLocationAddress}>
        locationasdfklfasdfsadfasdfasdfadfs
      </div>
    </div>
  );
};

PlaceBox.propTypes = {
  place: PropTypes.shape({
    name: PropTypes.string.isRequired,
    placeId: PropTypes.string.isRequired,
    location: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired
    }).isRequired
  }).isRequired,
  hoveredPlaceId: PropTypes.string.isRequired,
  setFocusedPlaceId: PropTypes.func.isRequired
};

export default PlaceBox;
