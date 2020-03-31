import fetchHelper from "../../helper/fetchHelper";

export const signInFetcher = ({ id, password }) => {
  return fetchHelper({
    url: `${process.env.REACT_APP_TOEFL_SERVER_URL}/login`,
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
    url: `${process.env.REACT_APP_TOEFL_SERVER_URL}/user/email`,
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
    url: `${process.env.REACT_APP_TOEFL_SERVER_URL}/user/email/validation`,
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
    url: `${process.env.REACT_APP_TOEFL_SERVER_URL}/user`,
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
