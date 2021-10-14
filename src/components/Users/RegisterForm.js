import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userRegister } from "../../store/users-slice";

// hooks
import { useInput } from "../../hooks";

import { Input } from "../UI";

// style
import { styles } from ".";

const RegisterForm = () => {
  const { error } = useSelector(state => state.users)

  const dispatch = useDispatch();
  const history = useHistory()

  // error message
  let msg = ''
  if(error){
    if(error.username && error.email){
      msg = 'User with that username and email already exists!'
    }else if(error.username){
      msg = error.username[0]
    }else if(error.email){
      msg = error.email[0]
    }
  }

  // username
  const validateUsername = (username) => {
    return username.length > 2;
  };

  const {
    value: username,
    isValid: usernameIsValid,
    hasError: usernameHasError,
    onChange: onUsernameChange,
    onBlur: onUsernameBlur,
  } = useInput(validateUsername);
  // end of username

  // email
  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  const {
    value: email,
    isValid: emailIsValid,
    hasError: emailHasError,
    onChange: onEmailChange,
    onBlur: onEmailBlur,
  } = useInput(validateEmail);
  // end of email

  // first and last name validator
  const validate = (value) => {
    return value.length !== 0;
  };

  // first name
  const {
    value: firstname,
    isValid: firstnameIsValid,
    hasError: firstnameHasError,
    onChange: onFirstnameChange,
    onBlur: onFirstnameBlur,
  } = useInput(validate);
  // end of first name

  // last name
  const {
    value: lastname,
    isValid: lastnameIsValid,
    hasError: lastnameHasError,
    onChange: onLastnameChange,
    onBlur: onLastnameBlur,
  } = useInput(validate);
  // end of last name

  // password
  const validatePassword = (password) => {
    return password.length > 5;
  };
  const {
    value: password,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    onChange: onPasswordChange,
    onBlur: onPasswordBlur,
  } = useInput(validatePassword);
  // end of password

  // password2
  const validatePassword2 = (password2) => {
    return password === password2;
  };
  const {
    value: password2,
    isValid: password2IsValid,
    hasError: password2HasError,
    onChange: onPassword2Change,
    onBlur: onPassword2Blur,
  } = useInput(validatePassword2);
  // end of password

  const formIsValid =
    emailIsValid &&
    usernameIsValid &&
    firstnameIsValid &&
    lastnameIsValid &&
    passwordIsValid &&
    password2IsValid;

  // this function sends request to server
  const sendRegisterRequest = async(userData) => {
    const result = await dispatch(userRegister(userData));
    if(userRegister.fulfilled.match(result)){
      history.replace('/account/login/')
    }
  }

  // form submission handler
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      username,
      email :email.toLowerCase(),
      first_name: firstname,
      last_name: lastname,
      password,
      password2
    }
    
    sendRegisterRequest(data)
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h4 className={styles.form__title}>Register</h4>
      <p className={`${styles.form__error} ${error && styles.error}`}>
        {error && msg}
      </p>
      <Input
        value={username}
        type="text"
        errorMessage={`${
          username.length === 0
            ? "Username cannot be empty!"
            : "Username should not less the 3 characters!"
        }`}
        placeholder="username"
        onChange={onUsernameChange}
        onBlur={onUsernameBlur}
        hasError={usernameHasError}
      />
      <Input
        value={email}
        type="text"
        placeholder="email"
        errorMessage={`${
          email.length === 0 ? "Email cannot be empty!" : "email is not valid!"
        }`}
        onChange={onEmailChange}
        onBlur={onEmailBlur}
        hasError={emailHasError}
      />
      <Input
        value={firstname}
        type="text"
        errorMessage="Please enter your first name!"
        placeholder="first name"
        onChange={onFirstnameChange}
        onBlur={onFirstnameBlur}
        hasError={firstnameHasError}
      />
      <Input
        value={lastname}
        type="text"
        errorMessage="Please enter your last name!"
        placeholder="last name"
        onChange={onLastnameChange}
        onBlur={onLastnameBlur}
        hasError={lastnameHasError}
      />
      <Input
        value={password}
        type="password"
        placeholder="Password"
        errorMessage={`${
          password.length === 0
            ? "Please enter password!"
            : "Password cannot be less than 5 characters!"
        }`}
        onChange={onPasswordChange}
        onBlur={onPasswordBlur}
        hasError={passwordHasError}
      />
      <Input
        value={password2}
        type="password"
        errorMessage="password did not match!"
        placeholder="confirm password"
        onChange={onPassword2Change}
        onBlur={onPassword2Blur}
        hasError={password2HasError}
      />
      <div className={styles.form__actions}>
        <button
          type="submit"
          className={`${styles.form__btn} ${
            !formIsValid && styles.submit__error
          }`}
          disabled={!formIsValid}
        >
          Register
        </button>
        <small>
          Already have an account?{" "}
          <Link to="/account/login" className={styles.form__link}>
            Log in
          </Link>
        </small>
      </div>
    </form>
  );
};

export default RegisterForm;
