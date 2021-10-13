import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import userAction from "../../store/users-slice";

const AuthUser = () => {
  const { authUser } = useSelector((state) => state.users);

  const dispatch = useDispatch();

  const token = authUser && authUser.token;

  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(userAction.requestLogout(token));
  };

  return (
    <div>
      {authUser ? (
        <span>
          Welcome, {authUser.username}{" "}
          <a href="no-route" onClick={logoutHandler}>
            Logout
          </a>
        </span>
      ) : (
        <Link to="account/login">Login</Link>
      )}
    </div>
  );
};

export default AuthUser;
