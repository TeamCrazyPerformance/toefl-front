import React from "react";
import PropTypes from "prop-types";
import PlaceBox from "../PlaceBox";

const PlaceBoxList = props => {
  const { places, hoveredPlaceId, setFocusedPlaceId } = props;

  return (
    <>
      {places.length ? (
        places.map(place => (
          <PlaceBox
            place={place}
            hoveredPlaceId={hoveredPlaceId}
            setFocusedPlaceId={setFocusedPlaceId}
            key={place.placeId}
          />
        ))
      ) : (
        <></>
      )}
    </>
  );
};

PlaceBoxList.propTypes = {
  places: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      placeId: PropTypes.string.isRequired,
      location: PropTypes.shape({
        lat: PropTypes.number.isRequired,
        lng: PropTypes.number.isRequired
      }).isRequired
    })
  ).isRequired,
  hoveredPlaceId: PropTypes.string.isRequired,
  setFocusedPlaceId: PropTypes.func.isRequired
};

export default PlaceBoxList;
