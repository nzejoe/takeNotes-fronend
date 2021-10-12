import React from "react";
import { Link } from "react-router-dom";

import { Input } from "../UI";

// style
import { styles } from ".";

const RegisterForm = () => {

  // email validator
  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }


  return (
    <form className={styles.form}>
      <h4 className={styles.form__title}>Register</h4>
      <Input
        type="text"
        errorMessage="Username can not be empty!"
        placeholder="username"
      />
      <Input
        type="text"
        errorMessage="email can not be empty!"
        placeholder="email"
      />
      <Input
        type="text"
        errorMessage="First can not be empty!"
        placeholder="first name"
      />
      <Input
        type="text"
        errorMessage="Last name can not be empty!"
        placeholder="last name"
      />
      <Input
        type="password"
        errorMessage="password can not be empty!"
        placeholder="Password"
      />
      <Input
        type="password"
        errorMessage="password can not be empty!"
        placeholder="confirm password"
      />
      <div className={styles.form__actions}>
        <button type="submit" className={styles.form__btn}>
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
