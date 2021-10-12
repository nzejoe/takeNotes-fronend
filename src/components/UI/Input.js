import React from "react";

// style
import classes from "./Input.module.css";

const Input = ({
  id,
  label,
  type,
  value,
  onChange,
  onBlur,
  hasError = true,
  errorMessage,
  placeholder,
}) => {
  return (
    <div className={classes.form__group}>
      <label htmlFor={id} className={classes.input__label}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        className={classes.form__input}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
      />
      <span className={`${classes.input__error} ${hasError && classes.error}`}>
        {errorMessage}
      </span>
    </div>
  );
};

export default Input;
