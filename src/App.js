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
import PrivateRoute from "./Routes/PrivateRoute";
import PublicRoute from "./Routes/PublicRoute";

import userActions from "./store/users-slice";
import { getAuthUser } from "./helpers";
import { fetchNotes } from "./store/note-slice";
import Modal from "./components/UI/Modal";

import "./App.css";

// set axios default baseURL
axios.defaults.baseURL = "http://localhost:8000/";

function App() {
  const { isAuthenticated, authUser } = useSelector((state) => state.users);
  const { refresh } = useSelector((state) => state.note);

  const dispatch = useDispatch();
  const token = authUser && authUser.token;

  // set Athenticated user when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const user = getAuthUser(); // this function is from helper.js that fetches data from localStorage
      dispatch(userActions.setAuthUser(user));
    }
  }, [dispatch, isAuthenticated]);

  // refresh note list by fetching new data from server
  useEffect(() => {
    if (token) {
      dispatch(fetchNotes(token));
    }
  }, [dispatch, refresh, token]);

  return (
    <Router>
      <Switch>
      <PrivateRoute path="/NOTE/:id" exact>
        <Modal />
      </PrivateRoute>
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
