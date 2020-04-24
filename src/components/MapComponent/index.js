import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

const MAP_OPTION = {
  zoom: 15,
  center: { lat: 37.6347813, lng: 127.0793528 },
  zoomControl: false,
  mapTypeControl: false
};

const MapComponent = props => {
  const {
    places,
    createMap,
    createMapMarker,
    searchPlaceNearBy,
    setHoveredPlaceId,
    setFocusedPlaceId
  } = props;
  const mapRef = useRef(null);

  useEffect(() => {
    const removeMapMarkers = markers => {
      markers.forEach(marker => marker.setMap(null));
    };

    const createMapMarkerInstance = place => {
      const mapMarker = createMapMarker({
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
    };

    const createMapMarkers = newPlaces => {
      const newMapMarkers = newPlaces.map(place => {
        return createMapMarkerInstance(place);
      });
      return newMapMarkers;
    };

    const mapMarkers = createMapMarkers(places);

    return () => {
      setFocusedPlaceId("");
      removeMapMarkers(mapMarkers);
    };
  }, [places]);

  useEffect(() => {
    if (!window.google) return;
    const map = createMap(mapRef.current, MAP_OPTION);
    const searchRadius = 4000 / map.zoom;
    map.addListener("dragend", () => searchPlaceNearBy(searchRadius));
    searchPlaceNearBy(searchRadius);
  }, [window.google]);

  return (
    <div id="map" ref={mapRef} style={{ height: "100vh", width: "100%" }}>
      Google map
    </div>
  );
};

MapComponent.propTypes = {
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
  createMap: PropTypes.func.isRequired,
  createMapMarker: PropTypes.func.isRequired,
  searchPlaceNearBy: PropTypes.func.isRequired,
  setHoveredPlaceId: PropTypes.func.isRequired,
  setFocusedPlaceId: PropTypes.func.isRequired
};

export default MapComponent;
