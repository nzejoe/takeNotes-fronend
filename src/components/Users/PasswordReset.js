import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Authentication } from ".";
import { Input } from "../UI";
import { useInput } from "../../hooks";

// styles
import styles from "./Users.module.css";

const PasswordReset = () => {
    const [resetSent, setResetSent] = useState(true)

  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  const { value, onChange, onBlur, onFocus, hasError, resetValue } =
    useInput(validateEmail);

  const formIsValid = !hasError && value.length !== 0

  const submitHandler = (event) => {
      event.preventDefault()
      setResetSent(true)
      resetValue()
      console.log(value)
  };

  return (
    <Authentication>
      {resetSent ? (
        <div style={{ margin: "1rem"}}>
          <h4 style={{ marginBottom: "1rem", textAlign: 'center' }}>Password reset sent.</h4>
          <p>
            A link on how to reset your password has been sent to {value}.{" "}
            <br />
            Remember to check your spam folder if you haven't got the mail. <br/>
            <Link to="/account/password_reset" className={styles.form__link} onClick={()=>setResetSent(false)}>
              Send request again
            </Link>
          </p>
        </div>
      ) : (
        <form className={styles.form} onSubmit={submitHandler}>
          <p className={styles.password__reset_info}>
            Please enter a valid email address linked to your account.
          </p>
          <Input
            placeholder="Enter email"
            value={value}
            onFocus={onFocus}
            onChange={onChange}
            onBlur={onBlur}
            hasError={hasError}
            errorMessage={
              value.length === 0
                ? "Email cannot be empty!"
                : "Invalid email address"
            }
          />
          <div className={styles.form__actions}>
            <button
              type="submit"
              className={`${styles.form__btn} ${
                !formIsValid && styles.submit__error
              }`}
            >
              Send request
            </button>
          </div>
        </form>
      )}
    </Authentication>
  );
};

export default PasswordReset;
