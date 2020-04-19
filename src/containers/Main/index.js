import React, { useState, useEffect } from "react";
import * as googleLib from "../../lib/googleLib";
import LoadingSpinner from "../../components/LoadingSpinner";
import PageError from "../PageError";
import Map from "../Map";
import Sidebar from "../Sidebar";
import Visibility from "../../components/Visibility";

const Main = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [places, setPlaces] = useState([]);
  const [hoveredPlaceId, setHoveredPlaceId] = useState("");
  const [focusedPlaceId, setFocusedPlaceId] = useState("");

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
              setHoveredPlaceId={setHoveredPlaceId}
              focusedPlaceId={focusedPlaceId}
              setFocusedPlaceId={setFocusedPlaceId}
            />
            <Map
              places={places}
              setPlaces={setPlaces}
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
