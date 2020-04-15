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

  const sendEmail = ({ email }) => {
    setIsLoading(true);
    return authApi
      .fetchValidateEmail({ email })
      .then(res => {
        setIsLoading(false);
        if (res.success) {
          setEmailForRequestBody(email);
          return true;
        }
        return false;
      })
      .catch(() => setIsError(true));
  };

  const submitValidationCode = ({ email, validationCode }) => {
    setIsLoading(true);
    return authApi
      .fetchValidateValidationCode({
        email: email.value,
        validationCode: validationCode.value
      })
      .then(res => {
        setIsLoading(false);
        if (res.success) {
          setEmailForRequestBody(email.value);
          setEmailValidation(true);
          return true;
        }
        return false;
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
