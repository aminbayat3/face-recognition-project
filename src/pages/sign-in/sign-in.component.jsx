import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useFormFieldsUpdate } from "../../helpers/useFormFieldsUpdate.js";
import { useToggle } from "../../helpers/useToggle.js";

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

const SignIn = () => {
  const [onHandleChange, formFields] = useFormFieldsUpdate(defaultFormFields);
  const [toggleValue, value] = useToggle(defaultCheckboxValues);
  const [body, setBody] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  // const { setCurrentUser } = useContext(UserContext);
  // const [rememberMeChecked, setRememberMeChecked] = useState(false);

  const { email, password } = formFields;
  const { rememberMeChecked } = value;

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    console.log(body);
    if (body) {
      try {
        setIsLoading(true);
        (async () => {
          const response = await fetch("http://localhost:3000/signin", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
            signal,
          });
          const data = await response.json();
          if (data === "success") {
            // setCurrentUser();
            navigate("/");
          }
        })();
      } catch (err) {
        err.name === 'AbortError' ? console.log('Request Aborted!') : console.error(err); 
      } finally {
        !signal.aborted && setIsLoading(false);
      }
    }

    return () => {
      controller.abort(); //this return call back gets fired everytime the dependency changes or everytime this components mounts or unmounts
      console.log('aborted!');
    }
  }, [body]);

  const onHandleSubmit = (e) => {
    e.preventDefault();
    setBody({email, password});
  };

  // const onChangeHandler = () => {
  //   setRememberMeChecked((prev) => !prev);
  // };

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
  );
};

export default SignIn;
