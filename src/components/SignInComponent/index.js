import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useValidateInput } from "../../customHooks";

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
  const { signIn } = props;
  const {
    wrapper,
    title,
    textFieldWapper,
    buttonWapper
  } = SignInComponentStyles();
  const id = useValidateInput("", [
    {
      validate: val => !(val === ""),
      validationFalse: "아이디를 입력해 주세요"
    }
  ]);
  const password = useValidateInput("", [
    {
      validate: val => !(val === ""),
      validationFalse: "비밀번호를 입력해 주세요"
    }
  ]);

  const updateAndValidateId = event => {
    id.setValue(event.target.value);
    id.validateAndSetFeedBackMsg(event.target.value);
  };

  const updateAndValidatePassword = event => {
    password.setValue(event.target.value);
    password.validateAndSetFeedBackMsg(event.target.value);
  };

  const validateInputs = () => {
    const idValidation = id.validateAndSetFeedBackMsg();
    const passwordValidation = password.validateAndSetFeedBackMsg();

    return idValidation && passwordValidation;
  };

  const setFeedBackMsg = () => {
    id.setFeedbackMsgAndValidation("아이디 혹은 비밀번호 오류입니다", false);
    password.setFeedbackMsgAndValidation(
      "아이디 혹은 비밀번호 오류입니다",
      false
    );
  };

  const validateInputsAndSignIn = () => {
    if (validateInputs()) {
      signIn({
        id: id.value,
        password: password.value,
        setFeedBackMsg
      });
    }
  };

  return (
    <div className={wrapper}>
      <div className={title}>Toefl</div>
      <div className={textFieldWapper}>
        <TextField
          label="Id"
          type="string"
          value={id.value}
          onChange={updateAndValidateId}
          error={!id.validation}
          helperText={id.feedbackMsg || " "}
          fullWidth
        />
      </div>
      <div className={textFieldWapper}>
        <TextField
          label="Password"
          type="password"
          value={password.value}
          onChange={updateAndValidatePassword}
          error={!password.validation}
          helperText={password.feedbackMsg || " "}
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
          to={process.env.REACT_APP_SIGN_UP_URL}
          fullWidth
        >
          회원가입
        </Button>
      </div>
    </div>
  );
};

SignInComponent.propTypes = {
  signIn: PropTypes.func.isRequired
};

export default SignInComponent;
