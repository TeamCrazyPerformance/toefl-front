import React from "react";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PropTypes from "prop-types";

const PlacePin = props => {
  const { color } = props;

  return (
    <div className="place-pin">
      <LocationOnIcon
        style={{
          fontSize: "30px",
          color: `${color}`,
          marginTop: "-13px",
          marginLeft: "-13px"
        }}
      />
    </div>
  );
};

PlacePin.propTypes = {
  color: PropTypes.string
};

PlacePin.defaultProps = {
  color: "red"
};

export default PlacePin;
