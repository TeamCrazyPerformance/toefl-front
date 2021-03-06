import React from "react";
import PropTypes from "prop-types";
import PlaceInfoBox from "../PlaceInfoBox";

const PlaceInfoBoxList = props => {
  const { places, hoveredPlaceId, setFocusedPlaceId } = props;

  return (
    <>
      {places.length ? (
        places.map(place => (
          <PlaceInfoBox
            place={place}
            hoveredPlaceId={hoveredPlaceId}
            setFocusedPlaceId={setFocusedPlaceId}
            key={place.placeId}
          />
        ))
      ) : (
        <div>검색된 장소가 없습니다</div>
      )}
    </>
  );
};

PlaceInfoBoxList.propTypes = {
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

export default PlaceInfoBoxList;
