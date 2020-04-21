import React from "react";
import PropTypes from "prop-types";
import * as mainApi from "../../api/mainApi";
import MapComponent from "../../components/Map";

const Map = props => {
  const {
    places,
    setMapInstance,
    setPlaces,
    setHoveredPlaceId,
    setFocusedPlaceId
  } = props;

  const searchPlaceNearBy = mapInstance => {
    const searchRadius = 4000 / mapInstance.zoom;
    mainApi
      .fetchPlaceNearBy(mapInstance, searchRadius)
      .then(newPlaces => setPlaces([...newPlaces]))
      .catch(() => setPlaces([]));
  };

  return (
    <MapComponent
      places={places}
      setParentMapInstance={setMapInstance}
      searchPlaceNearBy={searchPlaceNearBy}
      setHoveredPlaceId={setHoveredPlaceId}
      setFocusedPlaceId={setFocusedPlaceId}
    />
  );
};

Map.propTypes = {
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
  setMapInstance: PropTypes.func.isRequired,
  setPlaces: PropTypes.func.isRequired,
  setHoveredPlaceId: PropTypes.func.isRequired,
  setFocusedPlaceId: PropTypes.func.isRequired
};

export default Map;
