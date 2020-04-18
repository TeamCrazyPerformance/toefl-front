import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import PlaceBox from "../PlaceBox";

const SidebarStyles = makeStyles(() => ({
  sidebarWrapper: {
    position: "absolute",
    zIndex: 100,
    top: 10,
    left: 10
  },
  sidebarButton: {
    position: "absolute",
    background: "white"
  },
  sidebar: {
    width: "30rem",
    height: "95vh",
    background: "white"
  },
  sidebarClose: {
    display: "none"
  },
  sidebarContentWrapper: {
    width: "100%",
    height: "calc(95vh - 50px)",
    paddingTop: "50px",
    overflowY: "auto"
  },
  sidebarContent: {
    width: "28rem",
    margin: "auto"
  }
}));

const Sidebar = props => {
  const [isOpen, setIsOpen] = useState(true);
  const {
    sidebarWrapper,
    sidebarButton,
    sidebar,
    sidebarClose,
    sidebarContentWrapper,
    sidebarContent
  } = SidebarStyles();
  const { places, hoveredPlaceId, focusedPlaceId } = props;

  const changeIsOpen = () => setIsOpen(!isOpen);

  return (
    <div className={sidebarWrapper}>
      <IconButton className={sidebarButton} onClick={changeIsOpen}>
        <MenuIcon />
      </IconButton>
      <div className={isOpen ? sidebar : sidebarClose}>
        <div className={sidebarContentWrapper}>
          <div className={sidebarContent}>
            {places.length ? (
              places.map(place => (
                <PlaceBox
                  place={place}
                  hoveredPlaceId={hoveredPlaceId}
                  focusedPlaceId={focusedPlaceId}
                  key={place.placeId}
                />
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
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
  ),
  hoveredPlaceId: PropTypes.string.isRequired,
  focusedPlaceId: PropTypes.string.isRequired
};

Sidebar.defaultProps = {
  places: []
};

export default Sidebar;
