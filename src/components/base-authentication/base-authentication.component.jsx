import "./base-authentication.styles.scss";

const BaseAuthentication = () => {
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
    <div className="sign-in-container">
      <form className="sign-in-form">
        {/* <AuthenticationHeader title={} /> */}
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

export default BaseAuthentication;
