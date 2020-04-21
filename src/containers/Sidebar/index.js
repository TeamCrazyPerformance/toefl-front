import React from "react";
import PropTypes from "prop-types";
import * as reviewApi from "../../api/reviewApi";
import * as mainApi from "../../api/mainApi";
import SidebarComponent from "../../components/Sidebar";
import Visibility from "../../components/Visibility";
import PlaceBoxList from "../../components/PlaceBoxList";
import DetailPlaceBox from "../../components/DetailPlaceBox";
import ReviewsBox from "../../components/ReviewsBox";

const Sidebar = props => {
  const {
    places,
    mapInstance,
    hoveredPlaceId,
    focusedPlaceId,
    setFocusedPlaceId
  } = props;

  const getPlaceRating = placeId => {
    return reviewApi.fetchPlaceStar(placeId);
  };

  const getDetailPlace = placeId => {
    return mainApi.fetchPlace(mapInstance, placeId);
  };

  const getPlaceReview = (placeId, count) => {
    return reviewApi.fetchPlaceReview(placeId, count);
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
          focusedPlaceId={focusedPlaceId}
          getDetailPlace={getDetailPlace}
          getPlaceRating={getPlaceRating}
          setFocusedPlaceId={setFocusedPlaceId}
        />
        <ReviewsBox
          focusedPlaceId={focusedPlaceId}
          getPlaceReview={getPlaceReview}
        />
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
  mapInstance: PropTypes.shape({}),
  hoveredPlaceId: PropTypes.string.isRequired,
  focusedPlaceId: PropTypes.string.isRequired,
  setFocusedPlaceId: PropTypes.func.isRequired
};

Sidebar.defaultProps = {
  mapInstance: {}
};

export default Sidebar;
