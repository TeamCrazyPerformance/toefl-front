import React, { useState } from "react";
import LoadingSpinner from "../../components/LoadingSpinner";
import PageError from "../PageError";
import EmailValidation from "../EmailValidation";
import AdditionalInformation from "../AdditionalInformation";

const SignUp = () => {
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
            />
          ) : (
            <AdditionalInformation
              emailForRequestBody={emailForRequestBody}
              setIsLoading={setIsLoading}
              setIsError={setIsError}
            />
          )}
        </>
      )}
    </LoadingSpinner>
  );
};

export default SignUp;
