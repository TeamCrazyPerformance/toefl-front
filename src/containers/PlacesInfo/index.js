import React from "react";
import PropTypes from "prop-types";
import * as reviewApi from "../../api/reviewApi";
import * as mainApi from "../../api/mainApi";
import SidebarComponent from "../../components/Sidebar";
import Visibility from "../../components/Visibility";
import PlacesInfoBox from "../../components/PlacesInfoBox";
import DetailPlaceInfoBox from "../../components/DetailPlaceInfoBox";
import ReviewsBox from "../../components/ReviewsBox";

const PlacesInfo = props => {
  const { places, hoveredPlaceId, focusedPlaceId, setFocusedPlaceId } = props;

  const getPlaceRating = placeId => {
    return reviewApi.fetchPlaceStar(placeId);
  };

  const getDetailPlace = placeId => {
    return mainApi.fetchPlace(placeId);
  };

  const getPlaceReview = (placeId, count) => {
    return reviewApi.fetchPlaceReview(placeId, count);
  };

  return (
    <SidebarComponent>
      <Visibility isVisible={!focusedPlaceId}>
        <PlacesInfoBox
          places={places}
          hoveredPlaceId={hoveredPlaceId}
          setFocusedPlaceId={setFocusedPlaceId}
        />
      </Visibility>
      <Visibility isVisible={!!focusedPlaceId}>
        <DetailPlaceInfoBox
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

PlacesInfo.propTypes = {
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

export default PlacesInfo;
