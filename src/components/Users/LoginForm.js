import React, { useState } from "react";
import { Link } from "react-router-dom";

// hooks
import { useInput } from "../../hooks";

// ui
import { Input } from "../UI";

//style
import { styles } from ".";

const LoginForm = () => {
  const [formHasError, setFormHasError] = useState(false);

  // input validator functions
  const validate = (value) => {
   return value.length !== 0;
  };

  // email input
  const {
    value: email,
    isValid: emailIsValid,
    hasError: emailHasError,
    onChange: onEmalilChange,
    onBlur: emailBlur,
    onFocus: onEmailFocus,
  } = useInput(validate);

  // password input
  const {
    value: password,
    isValid: passwordIsValid,
    hasError:passwordHasError,
    onChange: onPasswordChange,
    onFocus: onPasswordFocus,
    onBlur: passwordBlur,
  } = useInput(validate);
  
  const formIsValid = emailIsValid && passwordIsValid;
  
  const handleSubmit = (event) => {
    event.preventDefault();
    setFormHasError(!formIsValid);

    if (formIsValid) {
      const data = {
        email: email,
        password: password,
      };
      console.log(data)
    }
  };


  return (
    <form className={`${styles.form}`} onSubmit={handleSubmit}>
      <div className={styles.form__info}>
        <h4 className={styles.form__title}>Log In</h4>
        <p className={`${styles.form__error} ${formHasError && styles.error}`}>
          Form error! Not submitted
        </p>
      </div>
      <Input
        value={email}
        id="email"
        type="text"
        placeholder="Email"
        onChange={onEmalilChange}
        onFocus={onEmailFocus}
        onBlur={emailBlur}
        hasError={emailHasError}
        errorMessage="Please enter your email!"
      />
      <Input
        value={password}
        id="password"
        type="password"
        placeholder="Password"
        onChange={onPasswordChange}
        onFocus={onPasswordFocus}
        onBlur={passwordBlur}
        hasError={passwordHasError}
        errorMessage="Please provide a password!"
      />
      <div className={styles.form__actions}>
        <button type="submit" className={styles.form__btn}>
          Log in
        </button>
        <small>
          Don't an account?{" "}
          <Link to="/account/register" className={styles.form__link}>
            Create account
          </Link>
        </small>
      </div>
    </form>
  );
};

export default LoginForm;
