import fetchHelper from "../../helper/fetchHelper";

const serverUrl = process.env.REACT_APP_TOEFL_SERVER_URL;

export const fetchPlaceNearBy = (mapInstance, searchRadius) => {
  return new Promise((resolve, reject) => {
    const service = new window.google.maps.places.PlacesService(mapInstance);
    service.nearbySearch(
      {
        location: {
          lat: mapInstance.center.lat(),
          lng: mapInstance.center.lng()
        },
        radius: searchRadius,
        type: ["restaurant"]
      },
      (results, status) => {
        if (status !== "OK") reject();
        resolve(results);
      }
    );
  }).then(newPlaces => {
    const newFormatPlaces = newPlaces.map(place => {
      return {
        name: place.name,
        placeId: place.place_id,
        location: {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        }
      };
    });
    return newFormatPlaces;
  });
};

export const fetchPlaceStar = placeId => {
  return fetchHelper({
    url: `${serverUrl}/place/${placeId}/star`,
    method: "get"
  }).then(responseJson => responseJson);
};

export const fetchPlaceReview = (
  placeId,
  page = 0,
  sort = "date",
  order = "DESC"
) => {
  return fetchHelper({
    url: `${serverUrl}/review?placeId=${placeId}&page=${page}&sort=${sort}&order=${order}`,
    method: "get"
  }).then(responseJson => responseJson);
};

export const fetchPostReview = (placeId, userId, score, content) => {
  return fetchHelper({
    url: `${serverUrl}/review`,
    method: "post",
    body: {
      placeId,
      userId,
      score,
      content
    }
  }).then(responseJson => responseJson);
};

export const fetchDeleteReview = reviewId => {
  return fetchHelper({
    url: `${serverUrl}/review/${reviewId}`,
    method: "delete"
  }).then(responseJson => responseJson);
};
