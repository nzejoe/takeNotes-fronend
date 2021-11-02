import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import axios from "axios";
import Cookies from "js-cookie";

import { Authentication } from ".";
import { Input } from "../UI";

// style
import { styles } from ".";
import { useInput } from "../../hooks";

const PasswordResetComplete = () => {
  const [password, setPassword] = useState("");
  const [resetDone, setResetDone] = useState(false);
  const [linkIsValid, setLinkIsValid] = useState(true);

  const validatePassword1 = (value) => {
    return value.length > 6;
  };

  const validatePassword2 = (value) => {
    return value.length !== 0 && value === password;
  };

  const {
    value: password1,
    onChange: onPassword1Change,
    onBlur: onPassword1Blur,
    onFocus: onPassword1Focus,
    isValid: password1IsValid,
    hasError: password1HasError,
  } = useInput(validatePassword1);

  const {
    value: password2,
    onChange: onPassword2Change,
    onBlur: onPassword2Blur,
    onFocus: onPassword2Focus,
    isValid: password2IsValid,
    hasError: password2HasError,
  } = useInput(validatePassword2);

  const { id } = useParams();

  const history = useHistory();

  // this function verify if user id is valid
  const sendVerifyRequest = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: `accounts/password_reset_complete/${id}/`,
      });

      if (res.status === 200) {
        setLinkIsValid(true);
      }
    } catch (err) {
      const error = { ...err };
      setLinkIsValid(false);
      console.log(error.response.status);
    }
  };

  sendVerifyRequest();

  useEffect(() => {
    setPassword(password1);
  }, [password1]);


  const formIsValid = password1IsValid && password2IsValid;

  const handleSubmit = async(event) => {
    event.preventDefault();
    if (formIsValid) {
      const data = { password: password };
      try {
        const res = await axios({
          method: "PUT",
          url: `accounts/password_reset_complete/${id}/`,
          headers: {
            "COntent-type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken"),
          },
          data: JSON.stringify(data)
        });

        if (res.status === 200) {
          setResetDone(true);
          setTimeout(()=>{
              history.replace("/account/login");
          }, 3000)
        }
      } catch (err) {
        const error = { ...err };
        setResetDone(false);
        console.log(error.response.status);
      }
    }
  };

  return (
    <Authentication>
      {linkIsValid ? (
        resetDone ? (
          <div style={{ textAlign: "center", margin: ".5rem" }}>
            <h4 style={{ marginBottom: "1rem" }}>
              Password reset was successful!
            </h4>
            <p>Your new password has been set successfully.</p>
            <p>
              <small style={{ marginTop: "1rem", fontWeight: 'bold'}}>
                Please wait...
              </small>
            </p>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            <h4 className={styles.form__title}>Set new password</h4>
            <Input
              type="password"
              placeholder="Enter new password"
              value={password1}
              onChange={onPassword1Change}
              onBlur={onPassword1Blur}
              onFocus={onPassword1Focus}
              hasError={password1HasError}
              errorMessage={
                password1.length === 0
                  ? "Password cannot be empty."
                  : "Password cannot be less than 6 characters."
              }
            />
            <Input
              type="password"
              placeholder="confirm password"
              value={password2}
              onChange={onPassword2Change}
              onBlur={onPassword2Blur}
              onFocus={onPassword2Focus}
              hasError={password2HasError}
              errorMessage={
                password2.length === 0
                  ? "Password cannot be empty."
                  : "Password did not match."
              }
            />

            <div className={styles.form__actions}>
              <button
                type="submit"
                className={`${styles.form__btn} ${
                  !formIsValid && styles.submit__error
                }`}
              >
                Save password
              </button>
            </div>
          </form>
        )
      ) : (
        <p style={{ textAlign: "center", margin: ".5rem", color: "red" }}>
          invalid link
        </p>
      )}
    </Authentication>
  );
};

export default PasswordResetComplete;
