import React from "react";
import PropTypes from "prop-types";
import EmailValidationComponent from "../../components/EmailValidationComponent";
import apiCallHelper from "../../helper/apiCallHelper";
import * as authApi from "../../api/authApi";

const EmailValidation = props => {
  const {
    setEmailForRequestBody,
    setEmailValidation,
    setIsLoading,
    setIsError
  } = props;

  const sendEmail = ({
    setPendingFeedBackMsg,
    setSuccessFeedBackMsg,
    setFailFeedBackMsg,
    email
  }) => {
    setPendingFeedBackMsg();
    apiCallHelper(authApi.validateEmailFetcher({ email }), {
      apiCallStart: () => setIsLoading(true),
      apiCallSuccess: res => {
        if (res.success) {
          setIsLoading(false);
          setEmailForRequestBody(email);
          setSuccessFeedBackMsg();
        } else {
          setFailFeedBackMsg();
        }
      },
      apiCallFailure: () => setIsError(true)
    });
  };

  const submitValidationCode = ({
    setPendingFeedBackMsg,
    setFailFeedBackMsg,
    email,
    validationCode
  }) => {
    setPendingFeedBackMsg();
    apiCallHelper(
      authApi.validateValidationCodeFetcher({
        email: email.value,
        validationCode: validationCode.value
      }),
      {
        apiCallStart: () => setIsLoading(true),
        apiCallSuccess: res => {
          if (res.success) {
            setIsLoading(false);
            setEmailForRequestBody(email.value);
            setEmailValidation(true);
          } else {
            setFailFeedBackMsg();
          }
        },
        apiCallFailure: () => setIsError(true)
      }
    );
  };

  return (
    <EmailValidationComponent
      sendEmail={sendEmail}
      submitValidationCode={submitValidationCode}
    />
  );
};

EmailValidation.propTypes = {
  setEmailForRequestBody: PropTypes.func.isRequired,
  setEmailValidation: PropTypes.func.isRequired,
  setIsLoading: PropTypes.func.isRequired,
  setIsError: PropTypes.func.isRequired
};

export default EmailValidation;
