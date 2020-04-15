import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import AdditionalInformationComponents from "../../components/AdditionalInformationComponents";
import * as authApi from "../../api/authApi";

const AdditionalInformation = props => {
  const { emailForRequestBody, setIsLoading, setIsError, history } = props;

  const signUp = ({ id, nickName, password }) => {
    setIsLoading(true);
    return authApi
      .fetchSignUp({
        id,
        email: emailForRequestBody,
        nickName,
        password
      })
      .then(response => {
        setIsLoading(false);
        if (response.success) {
          history.push(process.env.REACT_APP_MAIN_URL);
        }
        return false;
      })
      .catch(() => setIsError(true));
  };

  return <AdditionalInformationComponents signUp={signUp} />;
};

AdditionalInformation.propTypes = {
  emailForRequestBody: PropTypes.string.isRequired,
  setIsLoading: PropTypes.func.isRequired,
  setIsError: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default withRouter(AdditionalInformation);
