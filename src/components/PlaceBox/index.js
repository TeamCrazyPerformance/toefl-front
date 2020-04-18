import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Visibility from "../Visibility";
import ReviewBox from "../ReviewBox";
import ReviewInputBox from "../ReviewInputBox";

const PlaceBoxStyles = makeStyles(() => ({
  placeBoxWrapper: {
    display: "flex",
    paddingBottom: "15px"
  },
  placeInfoBoxWrapper: {
    width: "20rem"
  },
  placeName: {
    fontSize: "2rem",
    paddingBottom: "5px"
  },
  placeRatingWrapper: {
    display: "flex",
    paddingBottom: "5px"
  },
  placeRating: {
    width: "35px",
    fontSize: "1.3rem",
    paddingRight: "10px"
  },
  placeRatingStar: {
    width: "300px",
    height: "1.3rem"
  },
  placeLocationWapper: {
    display: "flex",
    paddingBottom: "5px"
  },
  placeLocationPhoneNum: {
    width: "105px",
    paddingRight: "10px"
  },
  placeLocationAddress: {
    width: "200px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  placeInfo: {
    whiteSpace: "normal",
    height: "100px",
    align: "left",
    overflow: "hidden"
  },
  placePhotoBoxWapper: {
    width: "150px"
  }
}));

const PlaceBox = () => {
  const {
    placeBoxWrapper,
    placeInfoBoxWrapper,
    placeName,
    placeRatingWrapper,
    placeRating,
    placeRatingStar,
    placeLocationWapper,
    placeLocationPhoneNum,
    placeLocationAddress,
    placeInfo,
    placePhotoBoxWapper
  } = PlaceBoxStyles();

  return (
    <>
      <div className={placeBoxWrapper}>
        <div className={placeInfoBoxWrapper}>
          <div className={placeName}>Place name</div>
          <div className={placeRatingWrapper}>
            <div className={placeRating}>4.0</div>
            <div className={placeRatingStar}>star</div>
          </div>
          <div className={placeLocationWapper}>
            <div className={placeLocationPhoneNum}>01000000000</div>
            <div className={placeLocationAddress}>
              locationasdfklfasdfsadfasdfasdfadfs
            </div>
          </div>
          <div className={placeInfo}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div>
        </div>
        <div className={placePhotoBoxWapper}>photo</div>
      </div>

      <Visibility isVisible={false}>
        <ReviewBox />
        <ReviewInputBox />
      </Visibility>
    </>
  );
};

export default PlaceBox;
