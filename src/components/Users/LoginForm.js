import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from "../../store/users-slice";

// hooks
import { useInput } from "../../hooks";

// ui
import { Input } from "../UI";

//style
import { styles } from ".";

const LoginForm = () => {
  const [formHasError, setFormHasError] = useState(false);
  const { error } = useSelector((state) => state.users)

  const dispatch = useDispatch();
  const history = useHistory();

  // login request function
  const sendLoginRequest = async (userData) => {
    const res = await dispatch(userLogin(userData));
    // check if request response is the same as userLogin.fulfilled, i.e request accepted.
    if (userLogin.fulfilled.match(res)) {
      // redirect to home page
      history.replace("/");
    }
    // if not logged in
    if (userLogin.rejected.match(res)) {
      setFormHasError(true);
    }
  };

  // input validator functions
  const validate = (value) => {
    return value.length !== 0;
  };

  // email input
  const {
    value: email,
    hasError: emailHasError,
    onChange: onEmalilChange,
    onBlur: emailBlur,
    onFocus: onEmailFocus,
  } = useInput(validate);

  // password input
  const {
    value: password,
    hasError: passwordHasError,
    onChange: onPasswordChange,
    onFocus: onPasswordFocus,
    onBlur: passwordBlur,
  } = useInput(validate);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      username: email.toLowerCase(),
      password: password,
    };
    // send request
    sendLoginRequest(data);
  };

  // reset form error message if user input
  useEffect(() => {
    setFormHasError(false);
  }, [email, password]);

  return (
    <form className={`${styles.form}`} onSubmit={handleSubmit}>
      <div className={styles.form__info}>
        <h4 className={styles.form__title}>Log In</h4>
        <p className={`${styles.form__error} ${formHasError && styles.error}`}>
          {error && error.message}
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
