import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import * as reviewApi from "../../api/reviewApi";
import SidebarComponent from "../../components/Sidebar";
import Visibility from "../../components/Visibility";
import PlaceBoxList from "../../components/PlaceBoxList";
import DetailPlaceBox from "../../components/DetailPlaceBox";
import ReviewsBox from "../../components/ReviewsBox";

const Sidebar = props => {
  const { places, hoveredPlaceId, focusedPlaceId, setFocusedPlaceId } = props;

  const findPlace = place => {
    return place.placeId === focusedPlaceId;
  };

  const [focusedPlace, setFocusedPlace] = useState({});

  useEffect(() => {
    setFocusedPlace(places.find(findPlace));
  }, [focusedPlaceId]);

  const getPlaceRating = placeId => {
    return reviewApi.fetchPlaceStar(placeId).then(response => response);
  };

  return (
    <SidebarComponent>
      <Visibility isVisible={!focusedPlaceId}>
        <PlaceBoxList
          places={places}
          hoveredPlaceId={hoveredPlaceId}
          setFocusedPlaceId={setFocusedPlaceId}
        />
      </Visibility>
      <Visibility isVisible={!!focusedPlaceId}>
        <DetailPlaceBox
          place={focusedPlace}
          getPlaceRating={getPlaceRating}
          setFocusedPlaceId={setFocusedPlaceId}
        />
        <ReviewsBox reviews={[]} />
      </Visibility>
    </SidebarComponent>
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
  focusedPlaceId: PropTypes.string.isRequired,
  setFocusedPlaceId: PropTypes.func.isRequired
};

export default Sidebar;
