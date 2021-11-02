import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import userAction from "../../store/users-slice";

// icons
import { AiOutlineLogout } from 'react-icons/ai'
// styles
import styles from './Header.module.css'

const AuthUser = () => {
  const { authUser } = useSelector((state) => state.users);

  const dispatch = useDispatch();

  const token = authUser && authUser.token;

  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(userAction.requestLogout(token));
  };

  return (
    <div className={styles.user__auth}>
      {authUser ? (
        <p className={styles.user__info}>
          <span className={styles.user__greeting}> Welcome, {authUser.username} </span>
          <Link to="account/password_change" className={styles.user__password_change}>Change password</Link>
          <a href="no-route" onClick={logoutHandler} className={styles.logout__btn}>
            <AiOutlineLogout className={styles.logout__icon} title="Log out"/>
          </a>
        </p>
      ) : (
        <Link to="account/login">Login</Link>
      )}
    </div>
  );
};

export default AuthUser;
