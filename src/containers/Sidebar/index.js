import React from "react";
import PropTypes from "prop-types";
import SidebarComponent from "../../components/Sidebar";

const Sidebar = props => {
  const {
    places,
    hoveredPlaceId,
    setHoveredPlaceId,
    focusedPlaceId,
    setFocusedPlaceId
  } = props;

  return (
    <SidebarComponent
      places={places}
      hoveredPlaceId={hoveredPlaceId}
      setHoveredPlaceId={setHoveredPlaceId}
      focusedPlaceId={focusedPlaceId}
      setFocusedPlaceId={setFocusedPlaceId}
    />
  );
};

Sidebar.propTypes = {
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
  hoveredPlaceId: PropTypes.string.isRequired,
  setHoveredPlaceId: PropTypes.func.isRequired,
  focusedPlaceId: PropTypes.string.isRequired,
  setFocusedPlaceId: PropTypes.func.isRequired
};

export default Sidebar;
