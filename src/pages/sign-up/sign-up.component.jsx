import { useState } from "react";

import FormInput from "../../components/form-input/form-input.component";
import Checkbox from "../../components/checkbox/checkbox.component";
import Button from "../../components/button/button.component";

import passwordLabel from "../../assets/password-label.png";
import inputLabel from "../../assets/input-label.png";
import formLogo from "../../assets/form-logo.png";

import "./sign-up.styles.scss";

const defaultFormFields = {
  email: "",
  password: "",
};


const SignUp = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [rememberMeChecked, setRememberMeChecked] = useState(false);

  const { email, password } = formFields;

  const handleClick = () => {
    console.log("log in");
  };

  const onHandleChange = (e) => {
    const { name, value } = e.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const onChangeHandler = () => {
    setRememberMeChecked((prev) => !prev);
  };

  return (
    <div className="sign-up-container">
      <form className="sign-up-form">
        <span className="sign-up-logo">
          <img src={formLogo} alt="logo" />
        </span>
        <span className="sign-up-title">Sign Up</span>
        <FormInput
          placeholder="Email"
          label={inputLabel}
          name="email"
          value={email}
          onChange={onHandleChange}
          type="email"
        />
        <FormInput
          placeholder="Email"
          label={inputLabel}
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
        <Button type="submit" onClick={handleClick} login>
          Log In
        </Button>
        <span className="register">Register</span>
      </form>
    </div>
  );
};

export default SignUp;
