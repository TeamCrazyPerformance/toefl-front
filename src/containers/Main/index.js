import React, { useState, useEffect } from "react";
import * as googleLib from "../../lib/googleLib";
import * as mainApi from "../../api/mainApi";
import LoadingSpinner from "../../components/LoadingSpinner";
import PageError from "../PageError";
import Map from "../../components/Map";
import Sidebar from "../../components/Sidebar";
import Visibility from "../../components/Visibility";

const Main = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [places, setPlaces] = useState([]);
  const [hoveredPlaceId, setHoveredPlaceId] = useState("");
  const [focusedPlaceId, setFocusedPlaceId] = useState("");

  const searchPlaceNearBy = mapInstance => {
    const searchRadius = 4000 / mapInstance.zoom;
    mainApi
      .fetchPlaceNearBy(mapInstance, searchRadius)
      .then(newPlaces => {
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
      })
      .then(newFormatPlaces => setPlaces([...newFormatPlaces]))
      .catch(() => setPlaces([]));
  };

  useEffect(() => {
    setIsLoading(true);
    googleLib
      .fetchGoogleLib()
      .then(() => {
        setIsLoading(false);
      })
      .catch(() => setIsError(true));
  }, []);

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <Visibility isVisible={!isLoading}>
        {isError ? (
          <PageError />
        ) : (
          <>
            <Sidebar
              places={places}
              hoveredPlaceId={hoveredPlaceId}
              focusedPlaceId={focusedPlaceId}
            />
            <Map
              places={places}
              searchPlaceNearBy={searchPlaceNearBy}
              setHoveredPlaceId={setHoveredPlaceId}
              setFocusedPlaceId={setFocusedPlaceId}
            />
          </>
        )}
      </Visibility>
    </>
  );
};

export default Main;
