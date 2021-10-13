import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = ({ children, ...rest }) => {
  const { isAuthenticated } = useSelector((state) => state.users);

  return (
    <Route
      {...rest}
      render={() => {
        return !isAuthenticated ? children : <Redirect to="/home" />;
      }}
    />
  );
};

export default PublicRoute;
