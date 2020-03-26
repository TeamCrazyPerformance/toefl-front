import React, { useState } from "react";
import PropTypes, { shape } from "prop-types";
import LoadingSpinner from "../../components/LoadingSpinner";
import PageError from "../PageError";

import EmailValidation from "../EmailValidation";
import AdditionalInformation from "../AdditionalInformation";

const SignUp = props => {
  const { history } = props;
  const [isLoaing, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [emailForRequestBody, setEmailForRequestBody] = useState("");
  const [emailValidation, setEmailValidation] = useState(false);

  return (
    <LoadingSpinner loadingState={isLoaing}>
      {isError ? (
        <PageError />
      ) : (
        <>
          {!emailValidation ? (
            <EmailValidation
              setEmailForRequestBody={setEmailForRequestBody}
              setEmailValidation={setEmailValidation}
              setIsLoading={setIsLoading}
              setIsError={setIsError}
              cancelUrl={process.env.REACT_APP_MAIN_URL}
            />
          ) : (
            <AdditionalInformation
              emailForRequestBody={emailForRequestBody}
              setIsLoading={setIsLoading}
              setIsError={setIsError}
              cancelUrl={process.env.REACT_APP_MAIN_URL}
              moveToMain={() => history.push(process.env.REACT_APP_MAIN_URL)}
            />
          )}
        </>
      )}
    </LoadingSpinner>
  );
};

SignUp.propTypes = {
  history: shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default SignUp;
