import fetchHelper from "../../helper/fetchHelper";

const serverUrl = process.env.REACT_APP_TOEFL_SERVER_URL;

export const fetchSignIn = ({ id, password }) => {
  return fetchHelper({
    url: `${serverUrl}/login`,
    method: "post",
    body: { id, password }
  }).then(responseJson => responseJson);
};

export const fetchValidateEmail = ({ email }) => {
  return fetchHelper({
    url: `${serverUrl}/user/email`,
    method: "post",
    body: { email }
  }).then(responseJson => responseJson);
};

export const fetchValidateValidationCode = ({ email, validationCode }) => {
  return fetchHelper({
    url: `${serverUrl}/user/email/validation`,
    method: "post",
    body: { email, validationCode }
  }).then(responseJson => responseJson);
};

export const fetchSignUp = ({ id, email, nickName, password }) => {
  return fetchHelper({
    url: `${serverUrl}/user`,
    method: "post",
    body: {
      id,
      email,
      nickName,
      password
    }
  }).then(responseJson => responseJson);
};
