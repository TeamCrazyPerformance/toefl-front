import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as authActions from "../redux/auth/actions";

const CheckIsSignInHelper = props => {
  const { validateJwt } = props;
  validateJwt();
  return null;
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(authActions, dispatch);

export default connect(null, mapDispatchToProps)(CheckIsSignInHelper);
