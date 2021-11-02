import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import axios from "axios";
import Cookies from "js-cookie";

// hooks
import { useInput } from "../../hooks";

// ui
import { Authentication } from ".";
import { Input } from "../UI";

// styles
import { styles } from ".";

const PasswordChange = () => {
  const { authUser } = useSelector((state) => state.users);

  const [error, setError] = useState({error: false, message: ''});
  const [newPassword, setNewPassword] = useState("");
  const [passwordChanged, setPasswordChanged] = useState(false)

  const token = authUser && authUser.token;
  const history = useHistory();

  const validateCurrentPassword = (password) => {
    return password.length !== 0;
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
    isValid: currentPasswordIsValid,
    hasError: currentPasswordHasError,
  } = useInput(validateCurrentPassword);

  const {
    value: password1,
    onChange: onPassword1Change,
    onBlur: onPassword1Blur,
    onFocus: onPassword1Focus,
    isValid: password1IsValid,
    hasError: password1HasError,
  } = useInput(validatepassword1);

  const {
    value: password2,
    onChange: onPassword2Change,
    onBlur: onPassword2Blur,
    onFocus: onPassword2Focus,
    isValid: password2IsValid,
    hasError: password2HasError,
  } = useInput(validatePassword2);

  let formHasError =
    !currentPasswordIsValid || !password1IsValid || !password2IsValid;

  useEffect(() => {
    setNewPassword(password1);
  }, [password1]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { currentPassword, password: password1 };
   
    if (token) {// only sent request if user is authenticated
      try {
        const response = await axios({
          url: "accounts/password_change/",
          method: "POST",
          headers: {
            "Content-type": "application/json",
            "x-csrftoken": Cookies.get("csrftoken"),
            authorization: `token ${token}`,
          },
          data: data,
        });
        const resData = JSON.parse(response.data); // convert json to data object
        setError(resData);
        if(!resData.error){ // if no error
          setPasswordChanged(true)
          // wait for 3sec and redirect to home page
          setTimeout(()=>{
            history.replace('/')
          }, 3000)
        }
      } catch (err) {
        const error = { ...err };
        console.log(error);
      }
    }
  };

  return (
    <Authentication>
      {passwordChanged ? (
        <div style={{textAlign: 'center', padding: '1rem'}}>
          <h4>Password Changed</h4>
          <p style={{margin: '1rem 0'}}>Your password has been changed successfully!</p>
          <small style={{fontWeight: 'bold'}}>Please wait...</small>
        </div>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit}>
          <h4 className={styles.form__title}>Change password</h4>
          <Input
            type="password"
            placeholder="current password"
            value={currentPassword}
            onChange={onCurrenPasswordChange}
            onBlur={onCurrenPasswordBlur}
            onFocus={onCurrenPasswordFocus}
            hasError={currentPasswordHasError || error.error}
            errorMessage={
              currentPassword.length === 0
                ? "Please enter current password"
                : error.error && error.message
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
            <button
              className={`${styles.form__btn} ${
                formHasError && styles.submit__error
              }`}
              type="submit"
            >
              Save password
            </button>
          </div>
        </form>
      )}
    </Authentication>
  );
};

export default PasswordChange;
