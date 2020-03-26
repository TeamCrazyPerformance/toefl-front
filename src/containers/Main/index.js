import React, { useState } from "react";
import Map from "../../components/Map";
import Sidebar from "../../components/Sidebar";

const Main = () => {
  const [center, setCenter] = useState({ lat: 37.6347813, lng: 127.0793528 });
  const [zoom, setZoom] = useState(14);

  return (
    <div>
      <Map center={center} zoom={zoom} />
      {/* <Sidebar /> */}
    </div>
  );
};

export default Main;
