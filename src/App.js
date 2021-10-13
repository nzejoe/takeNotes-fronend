import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

// slice
import { fetchNotes } from "./store/note-slice";

// routes
import Home from "./Routes/Home";
import LabelRoute from "./Routes/LabelRoute";
import LoginPage from "./Routes/LoginPage";
import RegisterPage from "./Routes/RegisterPage";

import userActions from "./store/users-slice";
import { getAuthUser } from "./helpers";

import "./App.css";
import{ Header }from "./components/Layout/";

// set axios default baseURL
axios.defaults.baseURL = "http://localhost:8000/";

function App() {
  const refresh = useSelector((state) => state.note.refresh);
  const { isAuthenticated } = useSelector((state) => state.users);

  const dispatch = useDispatch();

  // fetch data from server
  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch, refresh]); // fetch data whenever the refresh state changes

  // set Athenticated user when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const user = getAuthUser();
      dispatch(userActions.setAuthUser(user));
    }
  }, [dispatch, isAuthenticated]);

  return (
    <Router>
      <Header/>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>
        <Route path="/home" exact>
          <Home />
        </Route>
        <Route path="/label/:name" exact>
          <LabelRoute />
        </Route>
        <Route path="/account/login">
          <LoginPage />
        </Route>
        <Route path="/account/register">
          <RegisterPage />
        </Route>
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
