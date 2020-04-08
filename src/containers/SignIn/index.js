import React, { useState } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as authActions from "../../redux/auth/actions";
import LoadingSpinner from "../../components/LoadingSpinner";
import * as authApi from "../../api/authApi";
import PageError from "../PageError";
import SignInComponent from "../../components/SignInComponent";

const SignIn = props => {
  const { setUserInformationAndJwt } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const signIn = ({ id, password, setFeedBackMsg }) => {
    Promise.resolve(() => setIsLoading(true))
      .then(() => authApi.fetchSignIn({ id, password }))
      .then(response => {
        setIsLoading(false);
        if (response.success) {
          setUserInformationAndJwt({
            jwt: response.token,
            userInformation: response.userInformation
          });
        } else {
          setFeedBackMsg();
        }
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
      });
  };

  return (
    <LoadingSpinner loadingState={isLoading}>
      {isError ? <PageError /> : <SignInComponent signIn={signIn} />}
    </LoadingSpinner>
  );
};

SignIn.propTypes = {
  setUserInformationAndJwt: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(authActions, dispatch);

export default connect(null, mapDispatchToProps)(SignIn);
