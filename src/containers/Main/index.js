import React, { useState, useEffect } from "react";
import * as googleLib from "../../lib/googleLib";
import * as mainApi from "../../api/mainApi";
import LoadingSpinner from "../../components/LoadingSpinner";
import PageError from "../PageError";
import Map from "../Map";
import PlacesInfo from "../PlacesInfo";
import Visibility from "../../components/Visibility";

const Main = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [places, setPlaces] = useState([]);
  const [hoveredPlaceId, setHoveredPlaceId] = useState("");
  const [focusedPlaceId, setFocusedPlaceId] = useState("");

  const searchPlaceNearBy = searchRadius => {
    mainApi
      .fetchPlaceNearBy(searchRadius)
      .then(newPlaces => setPlaces([...newPlaces]))
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
            <PlacesInfo
              places={places}
              hoveredPlaceId={hoveredPlaceId}
              focusedPlaceId={focusedPlaceId}
              setFocusedPlaceId={setFocusedPlaceId}
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
