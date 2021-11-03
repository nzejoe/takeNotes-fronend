import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'

import { userPasswordReset } from "../../store/users-slice";
import { Authentication } from ".";
import { Input } from "../UI";
import { useInput } from "../../hooks";

// styles
import styles from "./Users.module.css";

const PasswordReset = () => {
    const [resetSent, setResetSent] = useState(false)
    const { error, data } = useSelector(state => state.users)
    const [requestError, setRequestError] = useState(false)

    const dispatch = useDispatch()

  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const { value, onChange, onBlur, onFocus, hasError, resetValue } =
    useInput(validateEmail);

  const formIsValid = !hasError && value.length !== 0;

  // reset request error message in user input
  useEffect(()=>{
    if(value){
      setRequestError(false)
    }
  },[value])

  const submitHandler = async(event) => {
      event.preventDefault()
      const resultAction = await dispatch(userPasswordReset({'email': value}));// get request result

      if(userPasswordReset.fulfilled.match(resultAction)){
        setResetSent(true);
        resetValue()
      }
      if(userPasswordReset.rejected.match(resultAction)){
        setRequestError(true)
      }
  };

  return (
    <Authentication>
      {resetSent ? (
        <div style={{ margin: "1rem" }}>
          <h4 style={{ marginBottom: "1rem", textAlign: "center" }}>
            Password reset sent.
          </h4>
          <p>
            A link on how to reset your password has been sent to {data.email}.{" "}
            <br />
            Remember to check your spam folder if you haven't got the mail.{" "}
            <br />
            <Link
              to="/account/password_reset"
              className={styles.form__link}
              onClick={() => setResetSent(false)}
            >
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
            hasError={hasError || requestError}
            errorMessage={
              requestError
                ? error.email[0]
                : value.length === 0
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
          <small>
            Have password?{" "}
            <Link to="/account/login" className={styles.form__link}>
              Log in
            </Link>
          </small>
        </form>
      )}
    </Authentication>
  );
};

export default PasswordReset;
