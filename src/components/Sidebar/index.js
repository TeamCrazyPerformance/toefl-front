import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import DetailPlaceBox from "../DetailPlaceBox";
import PlaceBox from "../PlaceBox";
import Visibility from "../Visibility";

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
  },
  goBackButton: {
    width: "100%",
    fontSize: "0.8rem",
    background: "inherit",
    border: "none",
    boxShadow: "none",
    borderRadius: 0,
    padding: 0,
    cursor: "pointer",
    paddingBottom: "5px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
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
    sidebarContent,
    goBackButton
  } = SidebarStyles();
  const { places, hoveredPlaceId, focusedPlaceId, setFocusedPlaceId } = props;

  const changeIsOpen = () => setIsOpen(!isOpen);

  const findPlace = place => {
    return place.placeId === focusedPlaceId;
  };

  return (
    <div className={sidebarWrapper}>
      <IconButton className={sidebarButton} onClick={changeIsOpen}>
        <MenuIcon />
      </IconButton>
      <div className={isOpen ? sidebar : sidebarClose}>
        <div className={sidebarContentWrapper}>
          <div className={sidebarContent}>
            {focusedPlaceId ? (
              <Visibility isVisible={!!focusedPlaceId}>
                <button
                  className={goBackButton}
                  type="button"
                  onClick={() => setFocusedPlaceId("")}
                >
                  목록으로 돌아가기
                </button>
                <DetailPlaceBox place={places.find(findPlace)} />
              </Visibility>
            ) : (
              <Visibility isVisible={!focusedPlaceId}>
                {places.length ? (
                  places.map(place => (
                    <PlaceBox
                      place={place}
                      hoveredPlaceId={hoveredPlaceId}
                      setFocusedPlaceId={setFocusedPlaceId}
                      key={place.placeId}
                    />
                  ))
                ) : (
                  <></>
                )}
              </Visibility>
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
  focusedPlaceId: PropTypes.string.isRequired,
  setFocusedPlaceId: PropTypes.func.isRequired
};

Sidebar.defaultProps = {
  places: []
};

export default Sidebar;
