import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

const PlaceInfoBoxStyles = makeStyles(() => ({
  paceInfoBoxWrapper: {
    width: "100%",
    marginBottom: "1rem",
    border: "1px solid black",
    "&:hover": {
      background: "grey"
    }
  },
  placeInfoBoxHovered: {
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
  placeLocationAddress: {
    width: "100%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  }
}));

const PlaceInfoBox = props => {
  const {
    paceInfoBoxWrapper,
    placeInfoBoxHovered,
    placeName,
    placeLocationAddress
  } = PlaceInfoBoxStyles();
  const { place, hoveredPlaceId, setFocusedPlaceId } = props;
  const focusPlace = () => setFocusedPlaceId(place.placeId);

  return (
    <div
      className={`${paceInfoBoxWrapper} ${hoveredPlaceId === place.placeId &&
        placeInfoBoxHovered}`}
    >
      <button className={placeName} type="button" onClick={focusPlace}>
        {place.name}
      </button>
      <div className={placeLocationAddress}>{place.address}</div>
    </div>
  );
};

PlaceInfoBox.propTypes = {
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

PlaceInfoBox.defaultProps = {
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

export default PlaceInfoBox;
