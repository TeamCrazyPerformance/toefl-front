import React, { useState } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as authActions from "../../redux/auth/actions";
import LoadingSpinner from "../../components/LoadingSpinner";
import * as authApi from "../../api/authApi";
import SignInComponent from "../../components/SignInComponent";

const SignIn = props => {
  const { setUserInformationAndJwt } = props;
  const [isLoading, setIsLoading] = useState(false);

  const signIn = ({ id, password }) => {
    setIsLoading(true);
    return authApi.fetchSignIn({ id, password }).then(response => {
      setIsLoading(false);
      if (response.success) {
        setUserInformationAndJwt({
          jwt: response.token,
          userInformation: response.userInformation
        });
      }
      return false;
    });
  };

  return (
    <LoadingSpinner loadingState={isLoading}>
      <SignInComponent signIn={signIn} />
    </LoadingSpinner>
  );
};

SignIn.propTypes = {
  setUserInformationAndJwt: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(authActions, dispatch);

export default connect(null, mapDispatchToProps)(SignIn);
