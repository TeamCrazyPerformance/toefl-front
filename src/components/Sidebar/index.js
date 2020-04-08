import React from "react";
import PlaceBox from "../PlaceBox";
import ReviewBox from "../ReviewBox";
import ReviewInputBox from "../ReviewInputBox";

const Sidebar = () => {
  return (
    <div>
      <PlaceBox />
      <ReviewBox />
      <ReviewInputBox />
    </div>
  );
};

export default Sidebar;
