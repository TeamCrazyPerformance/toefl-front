import React from "react";
import PropTypes from "prop-types";
import * as mainApi from "../../api/mainApi";
import MapComponent from "../../components/MapComponent";

const Map = props => {
  const { places, setPlaces, setHoveredPlaceId, setFocusedPlaceId } = props;

  const searchPlaceNearBy = searchRadius => {
    mainApi
      .fetchPlaceNearBy(searchRadius)
      .then(newPlaces => setPlaces([...newPlaces]))
      .catch(() => setPlaces([]));
  };

  const createMap = (ref, mapOption) => {
    return mainApi.createMap(ref, mapOption);
  };

  const createMapMarker = position => {
    return mainApi.createMapMarker(position);
  };

  return (
    <MapComponent
      places={places}
      createMap={createMap}
      createMapMarker={createMapMarker}
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
  setPlaces: PropTypes.func.isRequired,
  setHoveredPlaceId: PropTypes.func.isRequired,
  setFocusedPlaceId: PropTypes.func.isRequired
};

export default Map;
