import React from "react";
import { Link } from "react-router-dom";

import { Input } from "../UI";

import { styles } from ".";

const LoginForm = () => {
  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  return (
    <form className={styles.form}>
      <h4 className={styles.form__title}>Log In</h4>
      <Input
        type="text"
        errorMessage="email can not be empty!"
        placeholder="Email"
      />
      <Input
        type="password"
        errorMessage="password can not be empty!"
        placeholder="Password"
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
