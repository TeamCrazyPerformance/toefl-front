import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as authActions from "../../redux/auth/actions";
import callSignInApi from "./api";

const SignIn = props => {
  const { setUserInformationAndJwt } = props;
  const validateSignInInformation = () => {};

  const signIn = () => {
    let signInResponse = {
      success: false,
      token: "",
      userInformation: {
        id: "",
        email: "",
        nickName: ""
      }
    };
    if (validateSignInInformation()) {
      signInResponse = callSignInApi();
      if (signInResponse.success) setUserInformationAndJwt();
    }
  };

  return <div>SignIn</div>;
};

SignIn.propTypes = {
  setUserInformationAndJwt: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(authActions, dispatch);

export default connect(null, mapDispatchToProps)(SignIn);
