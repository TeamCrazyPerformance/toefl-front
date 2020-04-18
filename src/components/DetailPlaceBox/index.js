import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const DetailPlaceBoxStyles = makeStyles(() => ({
  placeInfoBoxWrapper: {
    width: "100%"
  },
  placeName: {
    width: "100%",
    fontSize: "2rem",
    background: "inherit",
    border: "none",
    boxShadow: "none",
    borderRadius: 0,
    padding: 0,
    paddingBottom: "5px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
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
    width: "calc(100%-35px)",
    height: "1.3rem"
  },
  placeLocationWapper: {
    display: "flex",
    paddingBottom: "5px"
  },
  placeInfoWrapper: {
    width: "100%"
  },
  placeLocationPhoneNum: {
    width: "105px",
    paddingRight: "10px"
  },
  placeLocationAddress: {
    width: "calc(100%-105px)",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  placeIntroduction: {
    whiteSpace: "normal",
    minHeight: "100px"
  }
}));

const DetailPlaceBox = () => {
  const {
    placeInfoBoxWrapper,
    placeName,
    placeRatingWrapper,
    placeRating,
    placeRatingStar,
    placeLocationWapper,
    placeLocationPhoneNum,
    placeLocationAddress,
    placeInfoWrapper,
    placeIntroduction
  } = DetailPlaceBoxStyles();

  return (
    <>
      <div className={placeInfoBoxWrapper}>
        <div className={placeName}>
          Place name lorem idunt ut laboreadipiscing elit
        </div>
        <div className={placeRatingWrapper}>
          <div className={placeRating}>4.0</div>
          <div className={placeRatingStar}>star</div>
        </div>
        <div className={placeInfoWrapper}>
          <div className={placeLocationWapper}>
            <div className={placeLocationPhoneNum}>0100000000000</div>
            <div className={placeLocationAddress}>
              locat lorem sit amet, consectetur adipiscing elit, sed
            </div>
          </div>
          <div className={placeIntroduction}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. consectetur Lorem ipsum dolor sit
            amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit
            esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailPlaceBox;
