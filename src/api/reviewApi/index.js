import fetchHelper from "../../helper/fetchHelper";

const serverUrl = process.env.REACT_APP_TOEFL_SERVER_URL;

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
