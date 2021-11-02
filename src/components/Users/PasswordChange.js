import React, { useEffect, useState } from "react";

// hooks
import { useInput } from "../../hooks";

// ui
import { Authentication } from ".";
import { Input } from "../UI";

// styles
import { styles } from ".";

const PasswordChange = () => {
  const [currentPasswordIsValid, setCurrentPasswordIsValid] =
    useState("godknows2");
  const [error, setError] = useState({ error: false, errorMessage: "" });
  const [newPassword, setNewPassword] = useState("");

  const validateCurrentPassword = (password) => {
    return currentPasswordIsValid === password;
  };
  const validatepassword1 = (password) => {
    return password.length > 5 && password.length !== 0;
  };
  const validatePassword2 = (password) => {
    return password === newPassword;
  };

  const {
    value: currentPassword,
    onChange: onCurrenPasswordChange,
    onBlur: onCurrenPasswordBlur,
    onFocus: onCurrenPasswordFocus,
    hasError: currentPasswordHasError,
  } = useInput(validateCurrentPassword);

  const {
    value: password1,
    onChange: onPassword1Change,
    onBlur: onPassword1Blur,
    onFocus: onPassword1Focus,
    hasError: password1HasError,
  } = useInput(validatepassword1);

  const {
    value: password2,
    onChange: onPassword2Change,
    onBlur: onPassword2Blur,
    onFocus: onPassword2Focus,
    hasError: password2HasError,
  } = useInput(validatePassword2);

  const formHasError = currentPasswordHasError;


  useEffect(() => {
    setNewPassword(password1);
  }, [password1]);

  return (
    <Authentication>
      <form className={styles.form}>
          <h4 className={styles.form__title}>Change password</h4>
        <Input
          type="password"
          placeholder="current password"
          value={currentPassword}
          onChange={onCurrenPasswordChange}
          onBlur={onCurrenPasswordBlur}
          onFocus={onCurrenPasswordFocus}
          hasError={currentPasswordHasError}
          errorMessage={
            currentPassword.length === 0
              ? "Please enter current password"
              : "Current password is incorrect"
          }
        />
        <Input
          type="password"
          placeholder="enter new password"
          value={password1}
          onChange={onPassword1Change}
          onBlur={onPassword1Blur}
          onFocus={onPassword1Focus}
          hasError={password1HasError}
          errorMessage={
            password1.length === 0
              ? "Password cannot be empty!"
              : "Not less than 6 characters"
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
              ? "Password cannot be empty!"
              : "New password did not match!"
          }
        />
        <div className={styles.form__actions}>
          <button className={styles.form__btn}>Save password</button>
        </div>
      </form>
    </Authentication>
  );
};

export default PasswordChange;
