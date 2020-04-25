import React from "react";
import PropTypes from "prop-types";
import * as mainApi from "../../api/mainApi";
import MapComponent from "../../components/MapComponent";

const Map = props => {
  const {
    places,
    searchPlaceNearBy,
    setHoveredPlaceId,
    setFocusedPlaceId
  } = props;

  const createMap = (ref, mapOption) => {
    const mapInstance = mainApi.createMap(ref, mapOption);
    const searchRadius = 4000 / mapInstance.zoom;
    mapInstance.addListener("dragend", () => searchPlaceNearBy(searchRadius));
    searchPlaceNearBy(searchRadius);
  };

  const createMapMarkers = newPlaces => {
    const mapMarkersInstance = newPlaces.map(place => {
      const mapMarker = mainApi.createMapMarker({
        lat: place.location.lat,
        lng: place.location.lng
      });

      mapMarker.addListener("mouseover", () => {
        setHoveredPlaceId(place.placeId);
      });
      mapMarker.addListener("mouseout", () => {
        setHoveredPlaceId("");
      });
      mapMarker.addListener("click", () => {
        setFocusedPlaceId(place.placeId);
      });

      return mapMarker;
    });

    return mapMarkersInstance;
  };

  return (
    <MapComponent
      places={places}
      createMap={createMap}
      createMapMarkers={createMapMarkers}
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
  searchPlaceNearBy: PropTypes.func.isRequired,
  setHoveredPlaceId: PropTypes.func.isRequired,
  setFocusedPlaceId: PropTypes.func.isRequired
};

export default Map;
