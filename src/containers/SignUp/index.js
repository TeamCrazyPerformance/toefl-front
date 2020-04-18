import React, { useState } from "react";
import LoadingSpinner from "../../components/LoadingSpinner";
import PageError from "../PageError";
import EmailValidation from "../EmailValidation";
import AdditionalInformation from "../AdditionalInformation";
import Visibility from "../../components/Visibility";

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [emailForRequestBody, setEmailForRequestBody] = useState("");
  const [emailValidation, setEmailValidation] = useState(false);

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <Visibility isVisible={!isLoading}>
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
      </Visibility>
    </>
  );
};

export default SignUp;
