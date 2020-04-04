import React, { useState, useMemo } from "react";
import Map from "../../components/Map";
import Sidebar from "../../components/Sidebar";

const Main = () => {
  const [center, setCenter] = useState({
    lat: 37.6347813,
    lng: 127.0793528
  });
  const [zoom, setZoom] = useState(14);
  const [places, setPlaces] = useState([
    {
      id: "",
      text: "",
      lat: 0,
      lng: 0
    }
  ]);
  const [focusedPlaceId, setFocusedPlaceId] = useState("");

  useMemo(() => {
    setPlaces([
      {
        id: "A",
        text: "A",
        lat: 37.6357224,
        lng: 127.0793213
      },
      {
        id: "B",
        text: "B",
        lat: 37.6467314,
        lng: 127.0793342
      },
      {
        id: "C",
        text: "C",
        lat: 37.6577121,
        lng: 127.0793132
      },
      {
        id: "D",
        text: "D",
        lat: 37.66878414,
        lng: 127.0793443
      }
    ]);
  }, [center, zoom]);

  return (
    <div>
      <Map
        setCenter={setCenter}
        setZoom={setZoom}
        places={places}
        setFocusedPlaceId={setFocusedPlaceId}
        defaultCenter={{
          lat: 37.6347813,
          lng: 127.0793528
        }}
        defaultZoom={14}
      />
      {/* <Sidebar /> */}
    </div>
  );
};

export default Main;
