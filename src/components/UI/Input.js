import React from "react";

// style
import classes from "./Input.module.css";

const Input = ({
  id,
  label,
  type,
  value,
  onChange,
  onFocus,
  onBlur,
  hasError,
  errorMessage,
  placeholder,
  inputRef,
}) => {
  return (
    <div className={classes.form__group}>
      <label htmlFor={id} className={classes.input__label}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        className={classes.form__input}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        placeholder={placeholder}
        ref={inputRef}
      />
      <span className={`${classes.input__error} ${hasError && classes.error}`}>
        {errorMessage}
      </span>
    </div>
  );
};

export default Input;
