import * as actionTypes from "./actionTypes";

export const setUserInformationAndJwt = ({
  jwt,
  userInformation: { id, email, nickName }
}) => ({
  type: actionTypes.SET_USER_INFORMATION_AND_JWT,
  jwt,
  userInformation: {
    id,
    email,
    nickName
  }
});

export const removeUserInformationAndJwt = () => ({
  type: actionTypes.REMOVE_UESR_INFORMATION_AND_JWT
});

export const validateJwt = () => ({ type: actionTypes.VALIDATE_JWT });
