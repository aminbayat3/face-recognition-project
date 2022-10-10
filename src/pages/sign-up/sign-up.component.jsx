import { Link } from "react-router-dom";
import { useFormFieldsUpdate } from "../../helpers/useFormFieldsUpdate.js";

import FormInput from "../../components/form-input/form-input.component";
import Button from "../../components/button/button.component";
import AuthenticationHeader from "../../components/authentication-header/authentication-header.component";

import passwordLabel from "../../assets/password-label.png";
import emailLabel from "../../assets/email-label.png";
import nameLabel from "../../assets/name-label.png";

import "./sign-up.styles.scss";

const defaultFormFields = {
  name: "",
  email: "",
  password: "",
}

const SignUp = () => {
  const [onHandleChange, formFields] = useFormFieldsUpdate(defaultFormFields);

  const { email, password, name } = formFields;

  const onHandleSubmit = (e) => {
    e.preventDefault();
    console.log("log in");
    console.log('Sign Up', name);
  };

  return (
    <div className="sign-up-container">
      <form className="sign-up-form" onSubmit={onHandleSubmit}>
        <AuthenticationHeader title="Sign Up" />
        <FormInput
          placeholder="Name"
          label={nameLabel}
          name="name"
          value={name}
          onChange={onHandleChange}
          type="text"
        />
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
        <Button type="submit" login>
          Sign Up
        </Button>
        <Link to='/signin' className="log-in">Sign In</Link>
      </form>
    </div>
  );
};

export default SignUp;
