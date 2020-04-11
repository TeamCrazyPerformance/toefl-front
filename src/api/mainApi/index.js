import fetchHelper from "../../helper/fetchHelper";

const serverUrl = process.env.REACT_APP_TOEFL_SERVER_URL;
const googleApiUrl = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}&libraries=places`;

export const fetchGoogleApiScript = () => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");

    script.src = `${googleApiUrl}`;
    script.async = true;
    script.defer = true;

    script.addEventListener("load", () => resolve());
    script.addEventListener("error", e => reject(e));

    document.body.appendChild(script);
  });
};

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
  });
};
