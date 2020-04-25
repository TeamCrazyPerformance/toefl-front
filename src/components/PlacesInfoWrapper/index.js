import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";

const PlacesInfoWrapperStyles = makeStyles(() => ({
  placesInfoWrapper: {
    position: "absolute",
    zIndex: 100,
    top: 10,
    left: 10
  },
  placesInfoButton: {
    position: "absolute",
    background: "white"
  },
  placesInfoWrapperOpen: {
    width: "30rem",
    height: "95vh",
    background: "white"
  },
  placesInfoWrapperClose: {
    display: "none"
  },
  placesInfoContentWrapper: {
    width: "100%",
    height: "calc(95vh - 3.1rem)",
    paddingTop: "3.1rem",
    overflowY: "auto"
  },
  placesInfoContent: {
    width: "28rem",
    margin: "auto"
  }
}));

const PlacesInfoWrapper = props => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    placesInfoWrapper,
    placesInfoButton,
    placesInfoWrapperOpen,
    placesInfoWrapperClose,
    placesInfoContentWrapper,
    placesInfoContent
  } = PlacesInfoWrapperStyles();
  const { children } = props;

  const changeIsOpen = () => setIsOpen(!isOpen);

  return (
    <div className={placesInfoWrapper}>
      <IconButton className={placesInfoButton} onClick={changeIsOpen}>
        <MenuIcon />
      </IconButton>
      <div className={isOpen ? placesInfoWrapperOpen : placesInfoWrapperClose}>
        <div className={placesInfoContentWrapper}>
          <div className={placesInfoContent}>{children}</div>
        </div>
      </div>
    </div>
  );
};

PlacesInfoWrapper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]).isRequired
};

export default PlacesInfoWrapper;
