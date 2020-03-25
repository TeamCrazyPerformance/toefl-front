import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const SignInComponentStyles = makeStyles(() => ({
  wrapper: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontSize: "10rem"
  },
  textFieldWapper: {
    paddingBottom: "10px",
    width: "20rem"
  },
  buttonWapper: {
    paddingBottom: "10px",
    width: "10rem"
  }
}));

const SignInComponent = props => {
  const {
    id,
    idValidation,
    idFeedbackMsg,
    updateAndValidateId,
    password,
    passowrdValidation,
    passwordFeedbackMsg,
    updateAndValidatePassword,
    validateInputsAndSignIn,
    signUpPageUrl
  } = props;

  const {
    wrapper,
    title,
    textFieldWapper,
    buttonWapper
  } = SignInComponentStyles();

  return (
    <div className={wrapper}>
      <div className={title}>Toefl</div>
      <div className={textFieldWapper}>
        <TextField
          label="Id"
          type="string"
          value={id}
          onChange={updateAndValidateId}
          error={!idValidation}
          helperText={idFeedbackMsg || " "}
          fullWidth
        />
      </div>
      <div className={textFieldWapper}>
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={updateAndValidatePassword}
          error={!passowrdValidation}
          helperText={passwordFeedbackMsg || " "}
          fullWidth
        />
      </div>
      <div className={buttonWapper}>
        <Button
          variant="contained"
          color="primary"
          onClick={validateInputsAndSignIn}
          fullWidth
        >
          로그인
        </Button>
      </div>
      <div className={buttonWapper}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to={signUpPageUrl}
          fullWidth
        >
          회원가입
        </Button>
      </div>
    </div>
  );
};

SignInComponent.propTypes = {
  id: PropTypes.string.isRequired,
  idValidation: PropTypes.bool.isRequired,
  idFeedbackMsg: PropTypes.string.isRequired,
  updateAndValidateId: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  passowrdValidation: PropTypes.bool.isRequired,
  passwordFeedbackMsg: PropTypes.string.isRequired,
  updateAndValidatePassword: PropTypes.func.isRequired,
  validateInputsAndSignIn: PropTypes.func.isRequired,
  signUpPageUrl: PropTypes.string.isRequired
};

export default SignInComponent;
