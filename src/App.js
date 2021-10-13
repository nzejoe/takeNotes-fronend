import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

// routes
import Home from "./Routes/Home";
import LabelRoute from "./Routes/LabelRoute";
import LoginPage from "./Routes/LoginPage";
import RegisterPage from "./Routes/RegisterPage";

import userActions from "./store/users-slice";
import { getAuthUser } from "./helpers";
import PrivateRoute from "./Routes/PrivateRoute";
import PublicRoute from './Routes/PublicRoute'

import "./App.css";

// set axios default baseURL
axios.defaults.baseURL = "http://localhost:8000/";

function App() {
  const { isAuthenticated } = useSelector((state) => state.users);

  const dispatch = useDispatch();


  // set Athenticated user when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const user = getAuthUser(); // this function is from helper.js that fetches data from localStorage
      dispatch(userActions.setAuthUser(user));
    }
  }, [dispatch, isAuthenticated]);

  return (
    <Router>
      <Switch>
        <PublicRoute path="/account/login">
          <LoginPage />
        </PublicRoute>
        <PublicRoute path="/account/register">
          <RegisterPage />
        </PublicRoute>
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>
        <PrivateRoute path="/home" exact>
          <Home />
        </PrivateRoute>
        <PrivateRoute path="/label/:name" exact>
          <LabelRoute />
        </PrivateRoute>
        <Route path="*">
          <Redirect to="/home">
            <Home />
          </Redirect>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
