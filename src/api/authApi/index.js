import fetchHelper from "../../helper/fetchHelper";

export const signInFetcher = ({ id, password }) => {
  return fetchHelper({
    url: process.env.REACT_APP_SIGN_IN_URL,
    method: "post",
    body: { id, password }
  }).then(responseJson => {
    return {
      success: responseJson.success,
      token: responseJson.token,
      userInformation: {
        id: responseJson.userInformation.id,
        email: responseJson.userInformation.email,
        nickName: responseJson.userInformation.nickName
      }
    };
  });
};

export const validateEmailFetcher = ({ email }) => {
  return fetchHelper({
    url: process.env.REACT_APP_VALIDATE_EMAIL,
    method: "post",
    body: { email }
  }).then(responseJson => {
    return {
      success: responseJson.success
    };
  });
};

export const validateValidationCodeFetcher = ({ email, validationCode }) => {
  return fetchHelper({
    url: process.env.REACT_APP_VALIDATE_VALIDATION_CODE,
    method: "post",
    body: { email, validationCode }
  }).then(responseJson => {
    return {
      success: responseJson.success
    };
  });
};

export const signUpFetcher = ({ id, email, nickName, password }) => {
  return fetchHelper({
    url: process.env.REACT_APP_SIGN_UP,
    method: "post",
    body: {
      id,
      email,
      nickName,
      password
    }
  }).then(responseJson => {
    return {
      success: responseJson.success
    };
  });
};
