import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const EmailValidationComponentStyles = makeStyles(() => ({
  wrapper: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontSize: "3.5rem",
    paddingBottom: "10px"
  },
  validationBox: {
    display: "flex",
    paddingBottom: "10px"
  },
  textFieldWapper: {
    width: "17rem",
    marginRight: "20px"
  },
  validationButtonWapper: {
    width: "5rem",
    margin: "auto"
  },
  cancelButtonWrapper: {
    width: "23.3rem"
  }
}));

const EmailValidationComponent = props => {
  const {
    email,
    emailValidation,
    emailFeedbackMsg,
    updateAndValidateEmail,
    validateAndSendEmail,
    validationCode,
    validationCodeValidation,
    validationCodeFeedbackMsg,
    updateAndValidateValidationCode,
    validateAndSubmitValidationCode,
    cancelUrl
  } = props;

  const {
    wrapper,
    title,
    validationBox,
    textFieldWapper,
    validationButtonWapper,
    cancelButtonWrapper
  } = EmailValidationComponentStyles();

  return (
    <div className={wrapper}>
      <div className={title}>이메일 인증</div>
      <div className={validationBox}>
        <div className={textFieldWapper}>
          <TextField
            label="Email"
            type="string"
            value={email}
            onChange={updateAndValidateEmail}
            error={!emailValidation}
            helperText={emailFeedbackMsg || " "}
            fullWidth
          />
        </div>
        <div className={validationButtonWapper}>
          <Button
            variant="contained"
            color="primary"
            onClick={validateAndSendEmail}
            fullWidth
          >
            전송
          </Button>
        </div>
      </div>
      <div className={validationBox}>
        <div className={textFieldWapper}>
          <TextField
            label="Validation code"
            type="string"
            value={validationCode}
            onChange={updateAndValidateValidationCode}
            error={!validationCodeValidation}
            helperText={validationCodeFeedbackMsg || " "}
            fullWidth
          />
        </div>
        <div className={validationButtonWapper}>
          <Button
            variant="contained"
            color="primary"
            onClick={validateAndSubmitValidationCode}
            fullWidth
          >
            인증
          </Button>
        </div>
      </div>
      <div className={cancelButtonWrapper}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to={cancelUrl}
          fullWidth
        >
          가입취소
        </Button>
      </div>
    </div>
  );
};

EmailValidationComponent.propTypes = {
  email: PropTypes.string.isRequired,
  emailValidation: PropTypes.bool.isRequired,
  emailFeedbackMsg: PropTypes.string.isRequired,
  updateAndValidateEmail: PropTypes.func.isRequired,
  validateAndSendEmail: PropTypes.func.isRequired,
  validationCode: PropTypes.string.isRequired,
  validationCodeValidation: PropTypes.bool.isRequired,
  validationCodeFeedbackMsg: PropTypes.string.isRequired,
  updateAndValidateValidationCode: PropTypes.func.isRequired,
  validateAndSubmitValidationCode: PropTypes.func.isRequired,
  cancelUrl: PropTypes.string.isRequired
};

export default EmailValidationComponent;
