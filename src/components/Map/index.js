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

  useEffect(() => {
    const removeMapMarkers = markers => {
      markers.forEach(marker => marker.setMap(null));
    };

    const createMapMarker = place => {
      const mapMarker = new window.google.maps.Marker({
        position: {
          lat: place.location.lat,
          lng: place.location.lng
        },
        map: mapInstance
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
        const mapMarker = createMapMarker(place);
        return mapMarker;
      });
      return newMapMarkers;
    };

    const markers = createMapMarkers(places);

    return () => {
      setFocusedPlaceId("");
      removeMapMarkers(markers);
    };
  }, [places, mapInstance]);

  useEffect(() => {
    if (!window.google) return;
    const createMap = (ref, mapOption) => {
      return new window.google.maps.Map(ref, mapOption);
    };

    const map = createMap(mapRef.current, MAP_OPTION);
    map.addListener("dragend", () => searchPlaceNearBy(map));
    searchPlaceNearBy(map);
    setMapInstance(map);
  }, [window.google]);

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
