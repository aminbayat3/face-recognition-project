import { useState } from "react";
import { useFormFieldsUpdate } from "../../helpers/useFormFieldsUpdate/useFormFieldsUpdate";

import AuthenticationHeader from "../../components/authentication-header/authentication-header.component";
import FormInput from "../../components/form-input/form-input.component";
import Checkbox from "../../components/checkbox/checkbox.component";
import Button from "../../components/button/button.component";

import passwordLabel from "../../assets/password-label.png";
import emailLabel from "../../assets/email-label.png";
import "./sign-in.styles.scss";

const SignIn = () => {
  const { onHandleChange, formFields } = useFormFieldsUpdate();
  const [rememberMeChecked, setRememberMeChecked] = useState(false);

  const { email, password, name } = formFields;

  const onHandleSubmit = (e) => {
    e.preventDefault();
    console.log("log in");
    console.log('Sign In', name);
  };

  const onChangeHandler = () => {
    setRememberMeChecked((prev) => !prev);
  };

  return (
    <div className="sign-in-container">
      <form className="sign-in-form" onSubmit={onHandleSubmit}>
        <AuthenticationHeader title="Log In" />
        <FormInput
          placeholder="Email"
          label={emailLabel}
          name="email"
          value={email}
          onChange={onHandleChange}
          type="email"
        />
        <FormInput
          placeholder="Password"
          label={passwordLabel}
          name="password"
          value={password}
          onChange={onHandleChange}
          type="password"
        />
        <Checkbox
          type="checkbox"
          label="Remember Me"
          checked={rememberMeChecked}
          onChange={onChangeHandler}
        />
        <Button type="submit" login>
          Log In
        </Button>
        <span className="register">Register</span>
      </form>
    </div>
  );
};

export default SignIn;
