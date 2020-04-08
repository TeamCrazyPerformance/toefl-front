import React, { useState, useEffect } from "react";
import LoadingSpinner from "../../components/LoadingSpinner";
import PageError from "../PageError";
import Map from "../../components/Map";
// import Sidebar from "../../components/Sidebar";

const googleApiUrl = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}&libraries=places`;

const Main = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [places, setPlaces] = useState([]);
  const [hoveredPlaceId, setHoveredPlaceId] = useState("");
  const [focusedPlaceId, setFocusedPlaceId] = useState("");

  const searchPlaceNearBy = mapInstance => {
    const service = new window.google.maps.places.PlacesService(mapInstance);
    const searchRadius = 4000 / mapInstance.zoom;
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
        if (status !== "OK") return;

        const newPlaces = results.map(place => {
          return {
            name: place.name,
            placeId: place.place_id,
            location: {
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng()
            }
          };
        });
        setPlaces([...newPlaces]);
      }
    );
  };

  const getScript = url => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");

      script.src = `${url}`;
      script.async = true;
      script.defer = true;

      script.addEventListener("load", () => resolve());
      script.addEventListener("error", e => reject(e));

      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    setIsLoading(true);
    getScript(googleApiUrl)
      .then(() => {
        setIsLoading(false);
      })
      .catch(() => setIsError(true));
  }, []);

  return (
    <LoadingSpinner loadingState={isLoading}>
      {isError ? (
        <PageError />
      ) : (
        <>
          <Map
            places={places}
            searchPlaceNearBy={searchPlaceNearBy}
            setHoveredPlaceId={setHoveredPlaceId}
            setFocusedPlaceId={setFocusedPlaceId}
          />
          {/* <Sidebar /> */}
        </>
      )}
    </LoadingSpinner>
  );
};

export default Main;
