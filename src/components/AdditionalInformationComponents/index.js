import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const AdditionalInformationComponentStyles = makeStyles(() => ({
  wrapper: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontSize: "4rem",
    paddingBottom: "10px"
  },
  textFieldWapper: {
    width: "20rem",
    paddingBottom: "10px"
  },
  buttonWrapper: {
    width: "20rem"
  },
  cancelButton: {
    float: "left"
  },
  signUpButton: {
    float: "right"
  }
}));

const AdditionalInformationComponent = props => {
  const {
    id,
    idValidation,
    idFeedbackMsg,
    updateAndValidateId,
    nickName,
    nickNameValidation,
    nickNameFeedbackMsg,
    updateAndValidateNickName,
    password,
    passwordValidation,
    passwordFeedbackMsg,
    updateAndValidatePassword,
    passwordConfirm,
    passwordConfirmValidation,
    passwordConfirmFeedbackMsg,
    updateAndValidatePasswordConfirm,
    validateAdditionalInputsAndSignIn,
    cancelUrl
  } = props;

  const {
    wrapper,
    title,
    textFieldWapper,
    buttonWrapper,
    cancelButton,
    signUpButton
  } = AdditionalInformationComponentStyles();

  return (
    <div className={wrapper}>
      <div className={title}>정보 입력</div>
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
          label="Nickname"
          type="string"
          value={nickName}
          onChange={updateAndValidateNickName}
          error={!nickNameValidation}
          helperText={nickNameFeedbackMsg || " "}
          fullWidth
        />
      </div>
      <div className={textFieldWapper}>
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={updateAndValidatePassword}
          error={!passwordValidation}
          helperText={passwordFeedbackMsg || " "}
          fullWidth
        />
      </div>
      <div className={textFieldWapper}>
        <TextField
          label="Password confirm"
          type="password"
          value={passwordConfirm}
          onChange={updateAndValidatePasswordConfirm}
          error={!passwordConfirmValidation}
          helperText={passwordConfirmFeedbackMsg || " "}
          fullWidth
        />
      </div>
      <div className={buttonWrapper}>
        <Button
          className={cancelButton}
          variant="contained"
          color="primary"
          component={Link}
          to={cancelUrl}
        >
          가입취소
        </Button>
        <Button
          className={signUpButton}
          variant="contained"
          color="primary"
          onClick={validateAdditionalInputsAndSignIn}
        >
          회원가입
        </Button>
      </div>
    </div>
  );
};

AdditionalInformationComponent.propTypes = {
  id: PropTypes.string.isRequired,
  idValidation: PropTypes.bool.isRequired,
  idFeedbackMsg: PropTypes.string.isRequired,
  updateAndValidateId: PropTypes.func.isRequired,
  nickName: PropTypes.string.isRequired,
  nickNameValidation: PropTypes.bool.isRequired,
  nickNameFeedbackMsg: PropTypes.string.isRequired,
  updateAndValidateNickName: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  passwordValidation: PropTypes.bool.isRequired,
  passwordFeedbackMsg: PropTypes.string.isRequired,
  updateAndValidatePassword: PropTypes.func.isRequired,
  passwordConfirm: PropTypes.string.isRequired,
  passwordConfirmValidation: PropTypes.bool.isRequired,
  passwordConfirmFeedbackMsg: PropTypes.string.isRequired,
  updateAndValidatePasswordConfirm: PropTypes.func.isRequired,
  validateAdditionalInputsAndSignIn: PropTypes.func.isRequired,
  cancelUrl: PropTypes.string.isRequired
};

export default AdditionalInformationComponent;
