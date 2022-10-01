import { Fragment } from "react";

import formLogo from '../../assets/form-logo.png';
import "./authentication-header.styles.scss";

const AuthenticationHeader = ({ title }) => {
  return (
    <Fragment>
      <span className="login-logo">
        <img src={formLogo} alt="logo" />
      </span>
    <span className="login-title">{title}</span>
    </Fragment>
  );
};

export default AuthenticationHeader;
