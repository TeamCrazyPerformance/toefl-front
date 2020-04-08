import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const Map = props => {
  const {
    places,
    searchPlaceNearBy,
    setHoveredPlaceId,
    setFocusedPlaceId
  } = props;
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

  useEffect(() => {
    removeMapMarkers();
    setMapMarkers(createMapMarkers(places));
  }, [places]);

  useEffect(() => {
    if (window.google) {
      setMapInstance(
        (() => {
          const map = new window.google.maps.Map(
            document.getElementById("map"),
            {
              zoom: 15,
              center: { lat: 37.6347813, lng: 127.0793528 }
            }
          );
          map.addListener("dragend", () => {
            searchPlaceNearBy(map);
          });
          searchPlaceNearBy(map);
          return map;
        })()
      );
    }
  }, []);

  return (
    <div id="map" style={{ height: "100vh", width: "100%" }}>
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
