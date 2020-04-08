import fetchHelper from "../../helper/fetchHelper";

export const fetchSignIn = ({ id, password }) => {
  return fetchHelper({
    url: `${process.env.REACT_APP_TOEFL_SERVER_URL}/login`,
    method: "post",
    body: { id, password }
  }).then(responseJson => responseJson);
};

export const fetchValidateEmail = ({ email }) => {
  return fetchHelper({
    url: `${process.env.REACT_APP_TOEFL_SERVER_URL}/user/email`,
    method: "post",
    body: { email }
  }).then(responseJson => responseJson);
};

export const fetchValidateValidationCode = ({ email, validationCode }) => {
  return fetchHelper({
    url: `${process.env.REACT_APP_TOEFL_SERVER_URL}/user/email/validation`,
    method: "post",
    body: { email, validationCode }
  }).then(responseJson => responseJson);
};

export const fetchSignUp = ({ id, email, nickName, password }) => {
  return fetchHelper({
    url: `${process.env.REACT_APP_TOEFL_SERVER_URL}/user`,
    method: "post",
    body: {
      id,
      email,
      nickName,
      password
    }
  }).then(responseJson => responseJson);
};
