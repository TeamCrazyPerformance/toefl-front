import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

const PlaceBoxStyles = makeStyles(() => ({
  placeBoxWrapper: {
    width: "100%",
    marginBottom: "15px",
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
    paddingBottom: "5px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    textAlign: "left"
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
        {place.name}
      </button>
      <div className={placeLocationAddress}>{place.address}</div>
    </div>
  );
};

PlaceBox.propTypes = {
  place: PropTypes.shape({
    name: PropTypes.string,
    placeId: PropTypes.string,
    address: PropTypes.string,
    location: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number
    })
  }),
  hoveredPlaceId: PropTypes.string.isRequired,
  setFocusedPlaceId: PropTypes.func.isRequired
};

PlaceBox.defaultProps = {
  place: {
    name: "",
    placeId: "",
    address: "",
    location: {
      lat: 0,
      lng: 0
    }
  }
};

export default PlaceBox;
