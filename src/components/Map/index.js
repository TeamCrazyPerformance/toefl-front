import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

const MAP_OPTION = {
  zoom: 15,
  center: { lat: 37.6347813, lng: 127.0793528 },
  zoomControl: false,
  mapTypeControl: false
};

const Map = props => {
  const {
    places,
    searchPlaceNearBy,
    setHoveredPlaceId,
    setFocusedPlaceId
  } = props;
  const mapRef = useRef(null);
  const [mapInstance, setMapInstance] = useState({});
  const [mapMarkers, setMapMarkers] = useState([]);

  const removeMapMarkers = () => {
    mapMarkers.forEach(mapMarker => mapMarker.setMap(null));
    setMapMarkers([]);
  };

  const createMapMarkers = newPlaces => {
    const newMapMarkers = newPlaces.map(place => {
      const placeMarker = new window.google.maps.Marker({
        position: {
          lat: place.location.lat,
          lng: place.location.lng
        },
        map: mapInstance
      });
      placeMarker.addListener("hover", () => {
        setHoveredPlaceId(place.placeId);
      });
      placeMarker.addListener("click", () => {
        setFocusedPlaceId(place.placeId);
      });
      return placeMarker;
    });
    return newMapMarkers;
  };

  const createMap = (ref, mapOption) => {
    return new window.google.maps.Map(ref, mapOption);
  };

  useEffect(() => {
    removeMapMarkers();
    setMapMarkers(createMapMarkers(places));
  }, [places]);

  useEffect(() => {
    if (!window.google) return;
    const map = createMap(mapRef.current, MAP_OPTION);
    map.addListener("dragend", () => searchPlaceNearBy(map));
    searchPlaceNearBy(map);
    setMapInstance(map);
  }, []);

  return (
    <div id="map" ref={mapRef} style={{ height: "100vh", width: "100%" }}>
      Google map
    </div>
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
