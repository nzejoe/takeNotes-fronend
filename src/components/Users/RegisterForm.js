import React from "react";
import { Link } from "react-router-dom";

import { Input } from "../UI";

// style
import { styles } from ".";

const RegisterForm = () => {
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
          Log in
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
