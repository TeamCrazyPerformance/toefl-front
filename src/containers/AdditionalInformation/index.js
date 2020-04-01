import React from "react";
import PropTypes from "prop-types";
import AdditionalInformationComponents from "../../components/AdditionalInformationComponents";
import apiCallHelper from "../../helper/apiCallHelper";
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
    apiCallHelper(
      authApi.signUpFetcher({
        id,
        email: emailForRequestBody,
        nickName,
        password
      }),
      {
        apiCallStart: () => setIsLoading(true),
        apiCallSuccess: res => {
          if (res.success) {
            pageChange();
          } else {
            setFailFeedbackMsg();
          }
        },
        apiCallFailure: () => setIsError(true)
      }
    );
  };

  return <AdditionalInformationComponents signUp={signUp} />;
};

AdditionalInformation.propTypes = {
  emailForRequestBody: PropTypes.string.isRequired,
  setIsLoading: PropTypes.func.isRequired,
  setIsError: PropTypes.func.isRequired
};

export default AdditionalInformation;
