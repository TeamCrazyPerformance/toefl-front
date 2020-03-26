import React from "react";
import PropTypes, { shape } from "prop-types";
import GoogleMapReact from "google-map-react";

const Map = props => {
  const { center, zoom } = props;
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        <div lat={37.6347813} lng={127.0793528}>
          여기는 학교!!!
        </div>
      </GoogleMapReact>
    </div>
  );
};

Map.propTypes = {
  center: shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired
  }).isRequired,
  zoom: PropTypes.number.isRequired
};

export default Map;
