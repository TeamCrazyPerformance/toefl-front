import React from "react";
import PropTypes from "prop-types";
import AdditionalInformationComponents from "../../components/AdditionalInformationComponents";
import * as authApi from "../../api/authApi";

const AdditionalInformation = props => {
  const { emailForRequestBody, setIsLoading, setIsError } = props;

  const signUp = ({
    pageChange,
    setFailFeedbackMsg,
    id,
    nickName,
    password
  }) => {
    Promise.resolve(() => setIsLoading(true))
      .then(() =>
        authApi.fetchSignUp({
          id,
          email: emailForRequestBody,
          nickName,
          password
        })
      )
      .then(res => {
        if (res.success) {
          pageChange();
        } else {
          setFailFeedbackMsg();
        }
      })
      .catch(() => setIsError(true));
  };

  return <AdditionalInformationComponents signUp={signUp} />;
};

AdditionalInformation.propTypes = {
  emailForRequestBody: PropTypes.string.isRequired,
  setIsLoading: PropTypes.func.isRequired,
  setIsError: PropTypes.func.isRequired
};

export default AdditionalInformation;
