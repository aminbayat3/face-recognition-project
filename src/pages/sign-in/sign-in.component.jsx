import { useState, Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { useFormFieldsUpdate } from "../../helpers/useFormFieldsUpdate.js";
import { useToggle } from "../../helpers/useToggle.js";
import { useCancellableFetch } from "../../helpers/useCancellableFetch.js";

// import { UserContext } from "../../context/user.context";

import AuthenticationHeader from "../../components/authentication-header/authentication-header.component";
import FormInput from "../../components/form-input/form-input.component";
import Checkbox from "../../components/checkbox/checkbox.component";
import Button from "../../components/button/button.component";

import passwordLabel from "../../assets/password-label.png";
import emailLabel from "../../assets/email-label.png";
import "./sign-in.styles.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

const defaultCheckboxValues = {
  rememberMeChecked: false,
};

const fetchOption = (body) => {
  return {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
};

const SignIn = () => {
  const [onHandleChange, formFields] = useFormFieldsUpdate(defaultFormFields);
  const [toggleValue, value] = useToggle(defaultCheckboxValues);
  const [body, setBody] = useState("");
  // const { setCurrentUser } = useContext(UserContext);
  // const [rememberMeChecked, setRememberMeChecked] = useState(false);
  const [isLoading, logIn, abort] = useCancellableFetch();

  const { email, password } = formFields;
  const { rememberMeChecked } = value;

  useEffect(() => {
    const option = fetchOption(body);
    logIn("http://localhost:3000/signin", option, body);

    return () => {
      abort();
      console.log("aborted!");
    };
  }, [body]);

  const onHandleSubmit = (e) => {
    e.preventDefault();
    setBody({ email, password });
  };

  // const onChangeHandler = () => {
  //   setRememberMeChecked((prev) => !prev);
  // };

  return (
    <Fragment>
      {isLoading ? (
        <div className="loading">loading ...</div>
      ) : (
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
              name="rememberMeChecked"
              checked={rememberMeChecked}
              onChange={toggleValue}
            />
            <Button type="submit" login>
              Log In
            </Button>
            <Link to="/signup" className="register">
              Register
            </Link>
          </form>
        </div>
      )}
    </Fragment>
  );
};

export default SignIn;
