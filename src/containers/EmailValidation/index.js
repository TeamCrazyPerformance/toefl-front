import React from "react";
import PropTypes from "prop-types";
import EmailValidationComponent from "../../components/EmailValidationComponent";
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
    Promise.resolve(() => setPendingFeedBackMsg())
      .then(() => setIsLoading(true))
      .then(() => authApi.fetchValidateEmail({ email }))
      .then(res => {
        if (res.success) {
          setIsLoading(false);
          setEmailForRequestBody(email);
          setSuccessFeedBackMsg();
        } else {
          setFailFeedBackMsg();
        }
      })
      .catch(() => setIsError(true));
  };

  const submitValidationCode = ({
    setPendingFeedBackMsg,
    setFailFeedBackMsg,
    email,
    validationCode
  }) => {
    Promise.resolve(() => setPendingFeedBackMsg())
      .then(() => setIsLoading(true))
      .then(() =>
        authApi.fetchValidateValidationCode({
          email: email.value,
          validationCode: validationCode.value
        })
      )
      .then(res => {
        if (res.success) {
          setIsLoading(false);
          setEmailForRequestBody(email.value);
          setEmailValidation(true);
        } else {
          setFailFeedBackMsg();
        }
      })
      .catch(() => setIsError(true));
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
