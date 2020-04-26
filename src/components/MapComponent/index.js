import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

const MAP_OPTION = {
  zoom: 15,
  center: { lat: 37.6347813, lng: 127.0793528 },
  zoomControl: false,
  mapTypeControl: false
};

const MapComponent = props => {
  const { places, createMap, createMapMarkers } = props;
  const mapRef = useRef(null);

  useEffect(() => {
    if (!window.google) return;
    createMap(mapRef.current, MAP_OPTION);
  }, [window.google]);

  useEffect(() => {
    const mapMarkers = createMapMarkers(places);

    const removeMapMarkers = () => {
      mapMarkers.forEach(marker => marker.setMap(null));
    };

    return () => removeMapMarkers();
  }, [places]);

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
  createMapMarkers: PropTypes.func.isRequired
};

export default MapComponent;
