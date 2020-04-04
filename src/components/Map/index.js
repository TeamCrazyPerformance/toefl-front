import React, { useState } from "react";
import PropTypes from "prop-types";
import GoogleMapReact from "google-map-react";
import PlacePin from "../PlacePin";

const Map = props => {
  const {
    setCenter,
    setZoom,
    places,
    setFocusedPlaceId,
    defaultCenter,
    defaultZoom
  } = props;

  const [hover, setHover] = useState(false);
  const [hoveredPlace, setHoveredPlace] = useState({
    id: "",
    text: "",
    lat: 0,
    lng: 0
  });

  const onBoundsChange = (newcenter, newZoom) => {
    setCenter(newcenter);
    setZoom(newZoom);
  };

  const onChildClick = key => {
    setFocusedPlaceId(key);
  };

  const onChildMouseEnter = (key, childProps) => {
    setHover(true);
    setHoveredPlace(childProps);
  };

  const onChildMouseLeave = () => {
    setHover(false);
    setHoveredPlace({
      id: "",
      key: "",
      text: "",
      lat: 0,
      lng: 0
    });
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
        defaultCenter={defaultCenter}
        defaultZoom={defaultZoom}
        hoverDistance={20}
        onBoundsChange={onBoundsChange}
        onChildClick={onChildClick}
        onChildMouseEnter={onChildMouseEnter}
        onChildMouseLeave={onChildMouseLeave}
      >
        {places.map(place => (
          <PlacePin key={place.id} lat={place.lat} lng={place.lng} />
        ))}
        {hover ? (
          <PlacePin
            key={hoveredPlace.id}
            lat={hoveredPlace.lat}
            lng={hoveredPlace.lng}
            color="blue"
          />
        ) : (
          <></>
        )}
      </GoogleMapReact>
    </div>
  );
};

Map.propTypes = {
  setCenter: PropTypes.func.isRequired,
  setZoom: PropTypes.func.isRequired,
  places: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired
    })
  ),
  setFocusedPlaceId: PropTypes.func.isRequired,
  defaultCenter: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired
  }),
  defaultZoom: PropTypes.number
};

Map.defaultProps = {
  defaultCenter: {
    lat: 37.6347813,
    lng: 127.0793528
  },
  places: [
    {
      id: "",
      text: "",
      lat: 37.6347813,
      lng: 127.0793528
    }
  ],
  defaultZoom: 14
};

export default Map;
