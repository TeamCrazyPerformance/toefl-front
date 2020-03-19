import * as actionTypes from "./actionTypes";

export const signInAndSetJwt = ({ jwt }) => ({
  type: actionTypes.SIGN_IN_AND_SET_JWT,
  jwt
});

export const signOutAndRemoveJwt = () => ({
  type: actionTypes.SIGN_OUT_AND_REMOVE_JWT
});

export const jwtValidate = () => ({ type: actionTypes.JWT_VALIDATE });
